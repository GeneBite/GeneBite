/* =========================================================
   GeneBite — shared site script
   Loaded on every page. kb.js (Knowledge Base) loads first.
   Each block below only activates if its markup exists.
========================================================= */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const KB = window.GB_KB || null;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  const TITLES = {
    "index.html": ["GeneBite | Practical Biology & Research", "GeneBite | زیست‌شناسی و پژوهش کاربردی"],
    "workflows.html": ["Research Workflows | GeneBite", "مسیرهای پژوهشی | GeneBite"],
    "case-studies.html": ["Case Studies | GeneBite", "مطالعات موردی | GeneBite"],
    "tools.html": ["Research Tools | GeneBite", "ابزارهای پژوهشی | GeneBite"],
    "search.html": ["Search | GeneBite", "جست‌وجو | GeneBite"],
    "workspace.html": ["Research Workspace | GeneBite", "فضای کار پژوهشی | GeneBite"],
    "research-outputs.html": ["Research Outputs | GeneBite", "خروجی‌های پژوهشی | GeneBite"],
    "research-decision.html": ["Research Finder | GeneBite", "یابنده‌ی مسیر پژوهش | GeneBite"],
    "troubleshooting.html": ["Troubleshooting Library | GeneBite", "کتابخانه‌ی رفع اشکال | GeneBite"],
    "sequence.html": ["Sequence Analysis | GeneBite", "تحلیل توالی | GeneBite"],
    "protein.html": ["Protein Analysis | GeneBite", "تحلیل پروتئین | GeneBite"],
    "unknown-sequence.html": ["Unknown Sequence Analysis | GeneBite", "تحلیل توالی ناشناخته | GeneBite"],
    "phylogenetics.html": ["Phylogenetic Analysis | GeneBite", "تحلیل فیلوژنتیک | GeneBite"],
    "paper.html": ["Scientific Paper Reading | GeneBite", "خواندن مقاله علمی | GeneBite"],
    "bioinformatics.html": ["Bioinformatics Workflows | GeneBite", "ورک‌فلوهای بیوانفورماتیک | GeneBite"],
    "molecular-biology.html": ["Molecular Biology Workflows | GeneBite", "ورک‌فلوهای زیست‌شناسی مولکولی | GeneBite"],
    "data-analysis.html": ["Data Analysis | GeneBite", "تحلیل داده | GeneBite"],
    "experimental-design.html": ["Experimental Design | GeneBite", "طراحی آزمایش | GeneBite"],
    "drug.html": ["Drug Research | GeneBite", "تحقیق روی دارو | GeneBite"],
    "research-skills.html": ["Research Skills | GeneBite", "مهارت‌های پژوهشی | GeneBite"],
    "about.html": ["About GeneBite", "درباره GeneBite"]
  };
  const pageName = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  /* =========================================================
     LANGUAGE
  ========================================================= */
  let lang = store.get("genebite-language") === "en" ? "en" : "fa";
  const langListeners = [];

  function applyLanguage(next) {
    lang = next;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";

    $$("[data-en][data-fa]").forEach((el) => {
      el.textContent = lang === "fa" ? el.dataset.fa : el.dataset.en;
    });
    $$("[data-placeholder-en][data-placeholder-fa]").forEach((el) => {
      el.placeholder = lang === "fa" ? el.dataset.placeholderFa : el.dataset.placeholderEn;
    });

    const toggle = $("#languageSwitcher, #languageToggle");
    if (toggle) {
      const options = $$(".language-option", toggle);
      if (options.length) {
        options[0].classList.toggle("active", lang === "en");
        if (options[1]) options[1].classList.toggle("active", lang === "fa");
      } else {
        toggle.textContent = lang === "fa" ? "EN" : "FA";
      }
      toggle.setAttribute("aria-label", lang === "fa" ? "Switch to English" : "تغییر زبان به فارسی");
    }

    const custom = lang === "fa" ? root.dataset.titleFa : root.dataset.titleEn;
    const mapped = TITLES[pageName] && TITLES[pageName][lang === "fa" ? 1 : 0];
    if (custom || mapped) document.title = custom || mapped;

    store.set("genebite-language", lang);
    fixFlowChains();
    langListeners.forEach((fn) => fn(lang));
  }

  const langToggleBtn = $("#languageSwitcher, #languageToggle");
  if (langToggleBtn) langToggleBtn.addEventListener("click", () => applyLanguage(lang === "fa" ? "en" : "fa"));

  /* =========================================================
     YEAR + MOBILE MENU
  ========================================================= */
  $$("#currentYear, #footerYear").forEach((el) => { el.textContent = new Date().getFullYear(); });

  const menuBtn = $("#mobileMenuToggle, #mobileMenuBtn, #navToggle, #menuToggle");
  const mainNav = $("#mainNav");
  if (menuBtn && mainNav) {
    const setOpen = (open) => {
      mainNav.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    };
    menuBtn.addEventListener("click", () => setOpen(!mainNav.classList.contains("open")));
    $$("a", mainNav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  /* =========================================================
     RTL FLOW-CHAIN FIX
     Legacy content stores workflow chains as one plain-text
     string ("Sequence → BLAST → Domains"). Inside an RTL page
     the browser's bidi algorithm reorders the English words
     unpredictably. Fix: split into separate chip <span>s inside
     a flex row, so visual order always matches source order
     regardless of script direction. Runs once per element and
     again after any dynamic re-render (decision tool, KB slots).
  ========================================================= */
  function fixFlowChains(root = document) {
    const sel = ".workflow-flow-mini, .result-flow, .library-flow, .research-output-flow, " +
                ".protein-flow, [class$='-flow']:not(.workflow-flow):not(.flow-chain)";
    $$(sel, root).forEach((el) => {
      if (el.dataset.flowFixed === "1") return;
      const raw = el.textContent;
      if (!raw || raw.indexOf("→") === -1) return;
      const steps = raw.split("→").map((s) => s.trim()).filter(Boolean);
      if (steps.length < 2) return;
      el.textContent = "";
      el.classList.add("flow-chain");
      steps.forEach((s, i) => {
        if (i > 0) {
          const sep = document.createElement("span");
          sep.className = "flow-sep";
          sep.setAttribute("aria-hidden", "true");
          sep.textContent = "→";
          el.appendChild(sep);
        }
        const chip = document.createElement("span");
        chip.className = "flow-step";
        chip.textContent = s;
        el.appendChild(chip);
      });
      el.dataset.flowFixed = "1";
    });
  }
  fixFlowChains();

  /* =========================================================
     INTERACTIVE WORKFLOW STEPS (accordion)
  ========================================================= */
  $$(".workflow-step").forEach((step) => {
    const panel = document.getElementById(`panel-${step.dataset.step}`);
    if (!panel) return;
    step.setAttribute("aria-controls", panel.id);
    step.addEventListener("click", () => {
      const wasOpen = !panel.hidden;
      $$(".workflow-panel").forEach((p) => { p.hidden = true; });
      $$(".workflow-step").forEach((s) => {
        s.setAttribute("aria-expanded", "false");
        const a = $(".workflow-arrow", s);
        if (a) a.textContent = "+";
      });
      if (!wasOpen) {
        panel.hidden = false;
        step.setAttribute("aria-expanded", "true");
        const a = $(".workflow-arrow", step);
        if (a) a.textContent = "−";
        setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
      }
    });
  });

  /* =========================================================
     CASE STUDIES (data-driven, from cases.js) + premium gate
  ========================================================= */
  const csApp = $("#caseStudiesApp");
  if (csApp && window.GB_CASES) initCaseStudies(csApp);

  function initCaseStudies(root) {
    const CASES = window.GB_CASES;
    const chips = $("#csFilterChips", root);
    const grid = $("#csGrid", root);
    const countEl = $("#csCount", root);

    const CAT_LABEL = {
      all: ["All", "همه"], protein: ["Protein", "پروتئین"], gene: ["Gene", "ژن"], drug: ["Drug", "دارو"],
      sequence: ["Sequence", "توالی"], structure: ["Structure", "ساختار"], literature: ["Literature", "ادبیات"],
      phylogeny: ["Phylogenetics", "فیلوژنتیک"], design: ["Experimental Design", "طراحی آزمایش"], lab: ["Lab Technique", "تکنیک آزمایشگاهی"]
    };
    const allCats = Array.from(new Set(CASES.flatMap((c) => c.categories)));
    let active = new URLSearchParams(location.search).get("topic") || "all";
    if (active !== "all" && !allCats.includes(active)) active = "all";
    let onlyFree = false;

    function renderChips() {
      const cats = ["all", ...allCats.filter((c) => CAT_LABEL[c])];
      chips.innerHTML = cats.map((k) => {
        const label = CAT_LABEL[k] ? (lang === "fa" ? CAT_LABEL[k][1] : CAT_LABEL[k][0]) : k;
        return `<button type="button" class="cs-filter${k === active ? " active" : ""}" data-cat="${k}">${label}</button>`;
      }).join("") + `<button type="button" class="cs-filter cs-filter-free${onlyFree ? " active" : ""}" id="csFreeOnly">
        ${lang === "fa" ? "فقط رایگان" : "Free only"}</button>`;
      $$("[data-cat]", chips).forEach((b) => b.addEventListener("click", () => { active = b.dataset.cat; render(); }));
      $("#csFreeOnly", chips).addEventListener("click", () => { onlyFree = !onlyFree; render(); });
    }

    function levelLabel(l) {
      const M = { beginner: ["Beginner", "مبتدی"], intermediate: ["Intermediate", "متوسط"], advanced: ["Advanced", "پیشرفته"] };
      return M[l] ? (lang === "fa" ? M[l][1] : M[l][0]) : l;
    }

    function caseCard(c) {
      const locked = !c.free;
      const flow = c.flow.map((s, i) => (i ? '<span class="flow-sep" aria-hidden="true">→</span>' : "") + `<span class="flow-step">${s}</span>`).join("");
      const stepsHtml = c.steps.map((s) => `<li><strong>${s.tool}:</strong> ${lang === "fa" ? s.d.fa : s.d.en}</li>`).join("");
      const obsHtml = c.obs.map((o) => `<li>${lang === "fa" ? o.fa : o.en}</li>`).join("");
      const limitHtml = c.limit.map((o) => `<li>${lang === "fa" ? o.fa : o.en}</li>`).join("");
      const tryHtml = c.tryit.map((o) => `<li>${lang === "fa" ? o.fa : o.en}</li>`).join("");
      const refsHtml = c.refs.map((r) => `<li class="cs-ref">${r}</li>`).join("");

      const deepContent = `
            <div class="cs-block"><h4>${lang === "fa" ? "مشاهده و شواهد" : "Observation & evidence"}</h4><ul>${obsHtml}</ul></div>
            <div class="cs-block"><h4>${lang === "fa" ? "تفسیر" : "Interpretation"}</h4><p>${lang === "fa" ? c.interp.fa : c.interp.en}</p></div>
            <div class="cs-block"><h4>${lang === "fa" ? "محدودیت‌ها" : "Limitations"}</h4><ul>${limitHtml}</ul></div>
            <div class="cs-block"><h4>${lang === "fa" ? "سؤال بعدی" : "Next question"}</h4><p>${lang === "fa" ? c.next.fa : c.next.en}</p></div>
            <div class="cs-block"><h4>${lang === "fa" ? "خودت امتحان کن" : "Try it yourself"}</h4><ul>${tryHtml}</ul></div>
            <div class="cs-block"><h4>${lang === "fa" ? "منابع" : "References"}</h4><ul class="cs-refs">${refsHtml}</ul></div>`;

      const gatedSection = locked
        ? `<div class="premium-gate" data-premium-gate>
          <div class="premium-hidden-content">${deepContent}</div>
          <div class="premium-unlock-overlay">
            <span class="lock-icon">🔒</span>
            <strong>${lang === "fa" ? "بقیه‌ی این Case برای اعضای Premium است" : "The rest of this case is for Premium members"}</strong>
            <p>${lang === "fa" ? "مشاهده، تفسیر، محدودیت‌ها، سؤال بعدی و منابع کامل را با یک اشتراک پرمیوم ببین." : "See the observation, interpretation, limitations, next question and full references with Premium."}</p>
            <a href="account.html" class="button button-primary">${lang === "fa" ? "باز کردن با Premium" : "Unlock with Premium"}</a>
          </div>
        </div>`
        : `<div class="cs-free-content">${deepContent}</div>`;

      return `<article class="case-card cs-card" data-category="${c.categories.join(" ")}" data-free="${c.free}">
        <div class="case-card-top">
          <span class="case-badge">${levelLabel(c.level)}</span>
          ${locked ? '<span class="premium-badge">★ Premium</span>' : `<span class="status-badge">${lang === "fa" ? "رایگان" : "Free"}</span>`}
        </div>
        <h3>${lang === "fa" ? c.title.fa : c.title.en}</h3>
        <p class="cs-hook">${lang === "fa" ? c.hook.fa : c.hook.en}</p>
        <div class="workflow-flow-mini flow-chain">${flow}</div>

        <div class="cs-block"><h4>${lang === "fa" ? "سؤال" : "Question"}</h4><p>${lang === "fa" ? c.question.fa : c.question.en}</p></div>
        <div class="cs-block"><h4>${lang === "fa" ? "ورودی" : "Input"}</h4><p>${lang === "fa" ? c.input.fa : c.input.en}</p></div>
        <div class="cs-block"><h4>${lang === "fa" ? "روش" : "Method"}</h4><ul>${stepsHtml}</ul></div>

        ${gatedSection}

        ${c.workflows && c.workflows[0] ? `<a class="card-link" href="${(KB && KB.workflows[c.workflows[0]] && KB.workflows[c.workflows[0]].link) || "workflows.html"}">${lang === "fa" ? "مشاهده‌ی Workflow مرتبط ←" : "Open related workflow →"}</a>` : ""}
      </article>`;
    }

    function render() {
      renderChips();
      const list = CASES.filter((c) => (active === "all" || c.categories.includes(active)) && (!onlyFree || c.free));
      grid.innerHTML = list.map(caseCard).join("");
      if (countEl) {
        const fa = new Intl.NumberFormat("fa-IR");
        countEl.textContent = lang === "fa" ? `${fa.format(list.length)} Case Study` : `${list.length} case studies`;
      }
      fixFlowChains(grid);
      if (window.GB_renderPremiumGates) window.GB_renderPremiumGates();
    }
    render();
    langListeners.push(render);
  }

  /* =========================================================
     GLOBAL SEARCH — now also a Problem Search:
     matches troubleshooting KB entries, not just static cards.
  ========================================================= */
  const searchInput = $("#globalSearch");
  if (searchInput) {
    const cards = $$(".search-result-card");
    const filters = $$(".search-filter");
    const countEl = $("#searchResultCount");
    const emptyEl = $("#searchEmptyState");
    const resultsGrid = $("#searchResults");
    let activeFilter = "all";

    const haystack = cards.map((c) => {
      const attrs = $$("[data-en],[data-fa]", c).map((n) => `${n.dataset.en || ""} ${n.dataset.fa || ""}`).join(" ");
      return `${c.textContent} ${attrs} ${c.dataset.category || ""}`.toLowerCase();
    });

    let problemBox = null;
    function renderProblemMatches(query) {
      const hits = KB ? KB.searchProblems(query).slice(0, 3) : [];
      if (!problemBox) {
        problemBox = document.createElement("div");
        problemBox.id = "problemMatches";
        problemBox.className = "problem-matches";
        resultsGrid.before(problemBox);
      }
      if (!hits.length) { problemBox.hidden = true; problemBox.innerHTML = ""; return; }
      problemBox.hidden = false;
      problemBox.innerHTML = `<div class="problem-matches-label">${lang === "fa" ? "راه‌حل مستقیم برای مشکل تو" : "Direct troubleshooting match"}</div>` +
        hits.map(({ category, problem }) => `
          <article class="problem-card">
            <span class="badge">${lang === "fa" ? KB.troubleshooting[category].title.fa : KB.troubleshooting[category].title.en}</span>
            <h3>${lang === "fa" ? problem.title.fa : problem.title.en}</h3>
            <p class="problem-causes"><strong>${lang === "fa" ? "علت‌های محتمل: " : "Likely causes: "}</strong>${problem.causes.map((c) => (lang === "fa" ? c.fa : c.en)).join("، ")}</p>
            <p class="problem-next">${lang === "fa" ? problem.next.fa : problem.next.en}</p>
            <a class="text-link" href="troubleshooting.html?cat=${category}">${lang === "fa" ? "مشاهده‌ی راهنمای کامل ←" : "Open full troubleshooting guide →"}</a>
          </article>`).join("");
    }

    const runSearch = () => {
      const q = searchInput.value.toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      let shown = 0;
      cards.forEach((card, i) => {
        const cats = (card.dataset.category || "").split(/\s+/);
        const okFilter = activeFilter === "all" || cats.includes(activeFilter);
        const okText = terms.every((t) => haystack[i].includes(t));
        const visible = okFilter && okText;
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      renderProblemMatches(q);
      if (emptyEl) emptyEl.style.display = (shown || (problemBox && !problemBox.hidden)) ? "none" : "block";
      if (countEl) {
        const fa = new Intl.NumberFormat("fa-IR");
        countEl.textContent = lang === "fa"
          ? `نمایش ${fa.format(shown)} از ${fa.format(cards.length)} منبع`
          : `Showing ${shown} of ${cards.length} resources`;
      }
    };

    filters.forEach((btn) => btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter || "all";
      filters.forEach((b) => b.classList.toggle("active", b === btn));
      runSearch();
    }));
    searchInput.addEventListener("input", runSearch);
    const searchBtn = $("#searchButton");
    if (searchBtn) searchBtn.addEventListener("click", runSearch);
    searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") runSearch(); });

    const qParam = new URLSearchParams(location.search).get("q");
    if (qParam) searchInput.value = qParam;
    langListeners.push(runSearch);
    runSearch();
  }

  /* =========================================================
     RESEARCH OUTPUTS — jump to and highlight the template
     matching ?template=<workflowKey> from the Research Finder.
  ========================================================= */
  const outputLibrary = $("#output-library");
  if (outputLibrary) {
    const TEMPLATE_MAP = {
      drug: "output-drug", sequence: "output-sequence", unknown: "output-sequence",
      paper: "output-paper", phylogeny: "output-phylogeny", protein: "output-protein",
      gene: "output-gene", primer: "output-general", docking: "output-drug", modeling: "output-protein", "data-analysis": "output-data-analysis", "experimental-design": "output-experimental-design"
    };
    const wanted = new URLSearchParams(location.search).get("template");
    const targetId = wanted && TEMPLATE_MAP[wanted];
    if (targetId) {
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        setTimeout(() => {
          targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          targetCard.classList.add("featured");
          targetCard.style.outline = "2px solid var(--primary)";
          targetCard.style.outlineOffset = "3px";
        }, 250);
      }
    }
  }

  /* =========================================================
     WORKSPACE — quick download grid for the Research Output
     templates (Word + PDF), rendered from the Knowledge Base.
  ========================================================= */
  const workspaceTemplates = $("#workspaceTemplates");
  if (workspaceTemplates && KB) {
    function renderWorkspaceTemplates() {
      workspaceTemplates.innerHTML = KB.templates.map((t) => `
        <article class="template-card">
          <h3>${lang === "fa" ? t.title.fa : t.title.en}</h3>
          <div class="research-output-downloads">
            <a href="downloads/genebite-output-${t.key}.docx" download class="download-btn">${lang === "fa" ? "دانلود Word" : "Download Word"}</a>
            <a href="downloads/genebite-output-${t.key}.pdf" download class="download-btn download-btn-outline">${lang === "fa" ? "دانلود PDF" : "Download PDF"}</a>
          </div>
          <a class="text-link" href="${t.link}">${lang === "fa" ? "مشاهده‌ی Workflow مرتبط ←" : "See the matching workflow →"}</a>
        </article>`).join("");
    }
    renderWorkspaceTemplates();
    langListeners.push(renderWorkspaceTemplates);
  }

  /* =========================================================
     TROUBLESHOOTING LIBRARY (data-driven page)
  ========================================================= */
  const tsRoot = $("#troubleshootingApp");
  if (tsRoot && KB) initTroubleshooting(tsRoot);

  function initTroubleshooting(root) {
    const chips = $("#tsCategoryChips", root);
    const list = $("#tsList", root);
    const cats = Object.keys(KB.troubleshooting);
    let active = new URLSearchParams(location.search).get("cat") || "all";
    if (!cats.includes(active)) active = "all";

    function chipLabel(key) { return key === "all" ? (lang === "fa" ? "همه" : "All") : (lang === "fa" ? KB.troubleshooting[key].title.fa : KB.troubleshooting[key].title.en); }

    function renderChips() {
      chips.innerHTML = ["all"].concat(cats).map((k) =>
        `<button type="button" class="case-filter${k === active ? " active" : ""}" data-cat="${k}">${chipLabel(k)}</button>`).join("");
      $$("[data-cat]", chips).forEach((b) => b.addEventListener("click", () => { active = b.dataset.cat; render(); }));
    }

    function render() {
      renderChips();
      const cats2 = active === "all" ? cats : [active];
      list.innerHTML = cats2.map((catKey) => {
        const cat = KB.troubleshooting[catKey];
        const techLink = cat.technique && KB.techniques[cat.technique] ? KB.techniques[cat.technique].link : null;
        return `<div class="ts-category">
          <div class="ts-category-head">
            <h2>${lang === "fa" ? cat.title.fa : cat.title.en}</h2>
            ${techLink ? `<a class="text-link" href="${techLink}">${lang === "fa" ? "مشاهده‌ی Workflow تکنیک ←" : "Open technique workflow →"}</a>` : ""}
          </div>
          <div class="ts-problem-grid">
            ${cat.problems.map((p) => `
              <article class="problem-card">
                <h3>${lang === "fa" ? p.title.fa : p.title.en}</h3>
                <p class="problem-causes"><strong>${lang === "fa" ? "علت‌های محتمل" : "Likely causes"}</strong></p>
                <ul>${p.causes.map((c) => `<li>${lang === "fa" ? c.fa : c.en}</li>`).join("")}</ul>
                <p class="problem-causes"><strong>${lang === "fa" ? "چه چیزی را چک کنی" : "What to check"}</strong></p>
                <ul>${p.checks.map((c) => `<li>${lang === "fa" ? c.fa : c.en}</li>`).join("")}</ul>
                <p class="problem-next"><strong>${lang === "fa" ? "قدم بعدی: " : "Next step: "}</strong>${lang === "fa" ? p.next.fa : p.next.en}</p>
              </article>`).join("")}
          </div>
        </div>`;
      }).join("");
    }
    render();
    langListeners.push(render);
  }

  /* =========================================================
     KB SLOT INJECTOR — lets any page pull a piece of the
     Knowledge Base into a placeholder without hand-written
     HTML for every technique/workflow page.
     Usage: <div class="kb-slot" data-kb="troubleshooting" data-key="pcr"></div>
  ========================================================= */
  const kbSlots = $$(".kb-slot");
  if (kbSlots.length && KB) {
    function renderSlots() {
      kbSlots.forEach((slot) => {
        const kind = slot.dataset.kb;
        const key = slot.dataset.key;
        if (kind === "troubleshooting" && KB.troubleshooting[key]) {
          const cat = KB.troubleshooting[key];
          slot.innerHTML = `
            <div class="section-heading">
              <span class="section-label">${lang === "fa" ? "رفع اشکال" : "TROUBLESHOOTING"}</span>
              <h2>${lang === "fa" ? "مشکل رایج؟ از اینجا شروع کن" : "Common problem? Start here"}</h2>
            </div>
            <div class="ts-problem-grid">
              ${cat.problems.slice(0, 3).map((p) => `
                <article class="problem-card">
                  <h3>${lang === "fa" ? p.title.fa : p.title.en}</h3>
                  <p class="problem-next">${lang === "fa" ? p.next.fa : p.next.en}</p>
                </article>`).join("")}
            </div>
            <a class="text-link" href="troubleshooting.html?cat=${key}">${lang === "fa" ? "مشاهده‌ی همه‌ی مشکلات این تکنیک ←" : "See all problems for this technique →"}</a>`;
        }
      });
      fixFlowChains();
    }
    renderSlots();
    langListeners.push(renderSlots);
  }

  /* =========================================================
     RESEARCH FINDER  (research-decision.html)
     Six short questions → a rich, cross-linked result instead
     of a single workflow name.
  ========================================================= */
  const tool = $("#decisionTool");
  if (tool && KB) initResearchFinder(tool);

  function initResearchFinder(root) {
    const stepEls = [1, 2, 3, 4, 5, 6].map((n) => document.getElementById(`decisionStep${n}`));
    const els = {
      label: $("#decisionStepLabel"), question: $("#decisionQuestion"), description: $("#decisionDescription"),
      dots: $$(".decision-progress span"), back: $("#decisionBack"), result: $("#decisionResult"), body: $("#decisionResultBody")
    };
    const state = { step: 1, have: null, goal2: null, stage: null, evidence: null, purpose: null, depth: null, showingResult: false };
    const T2 = (fa, en) => ({ fa, en });

    const STEP_TEXT = {
      1: { q: T2("چه چیزی در اختیار داری؟", "What do you have?"), d: T2("نزدیک‌ترین گزینه به داده یا سؤال فعلی‌ات را انتخاب کن.", "Choose the option closest to what you're starting with.") },
      2: { q: T2("چه چیزی می‌خواهی بفهمی؟", "What do you want to find out?"), d: T2("سؤال اصلی‌ای را انتخاب کن که می‌خواهی به آن پاسخ بدهی.", "Choose the main question you're trying to answer.") },
      3: { q: T2("در چه مرحله‌ای هستی؟", "What stage are you at?"), d: T2("این به ما می‌گوید چقدر راهنمایی از ابتدا لازم داری.", "This tells us how much guidance you need from the start.") },
      4: { q: T2("چه نوع شواهدی در دست داری؟", "What kind of evidence do you already have?"), d: T2("نوع داده‌ای که الان داری را انتخاب کن.", "Choose the type of evidence you already hold.") },
      5: { q: T2("هدف نهایی‌ات چیست؟", "What's your ultimate goal?"), d: T2("این مسیر پیشنهادی و خروجی نهایی را شکل می‌دهد.", "This shapes the recommended path and the final output.") },
      6: { q: T2("چقدر راهنمایی می‌خواهی؟", "How much guidance do you want?"), d: T2("عمق توضیح هر مرحله را مشخص کن.", "Choose how detailed each step should be.") }
    };

    const WORKFLOWS = KB.workflows;
    const DEPTH_NOTE = {
      quick: T2("مرور سریع: فقط مراحل کلیدی را دنبال کن تا تصویر اولیه بگیری.", "Quick overview: follow only the key steps for a first impression."),
      practical: T2("قدم‌به‌قدم: همه‌ی مراحل اصلی را به‌ترتیب و با خروجی هر مرحله انجام بده.", "Step-by-step: run every core step in order and record each output."),
      deep: T2("تحلیل عمیق: مراحل اصلی به‌علاوه‌ی اعتبارسنجی، محدودیت‌ها و تفسیر نهایی.", "Deep dive: the core steps plus validation, limitations and final interpretation.")
    };

    const VOTES = {
      have: { protein: { protein: 2, unknown: 1 }, gene: { gene: 4 }, primers: { primer: 4 }, docking: { docking: 4 }, "no-structure": { modeling: 4 }, sequence: { sequence: 3 }, unknown: { unknown: 3 },
              drug: { drug: 3 }, paper: { paper: 3 }, experimental: { "data-analysis": 3 },
              dataset: { phylogeny: 2, "data-analysis": 1 }, "lab-result": { "data-analysis": 2, "experimental-design": 1 }, other: {} },
      goal2: { identity: { unknown: 1, sequence: 1 }, function: { sequence: 1, protein: 1 }, structure: { protein: 3 },
               relationship: { phylogeny: 4 }, evidence: { paper: 3 }, target: { drug: 3 },
               "interpret-data": { "data-analysis": 3 }, troubleshoot: {} },
      evidence: { sequence: { sequence: 1, unknown: 1 }, structure: { protein: 2 }, experimental: { "data-analysis": 1 },
                  literature: { paper: 1 }, dataset: { phylogeny: 1 }, "question-only": { "experimental-design": 2 } }
    };
    const HAVE_PRIMARY = { protein: "protein", gene: "gene", primers: "primer", docking: "docking", "no-structure": "modeling", sequence: "sequence", unknown: "unknown", drug: "drug", paper: "paper", experimental: "data-analysis", dataset: "phylogeny", "lab-result": "data-analysis" };

    function chooseWorkflow() {
      const score = {};
      ["have", "goal2", "evidence"].forEach((k) => {
        const key = k === "have" ? state.have : k === "goal2" ? state.goal2 : state.evidence;
        const votes = (VOTES[k][key]) || {};
        Object.entries(votes).forEach(([wf, pts]) => { score[wf] = (score[wf] || 0) + pts; });
      });
      const primary = HAVE_PRIMARY[state.have];
      const keys = Object.keys(score);
      if (!keys.length) return primary || "sequence";
      return keys.sort((a, b) => score[b] - score[a] || (b === primary) - (a === primary))[0];
    }

    function renderHeader() {
      const c = STEP_TEXT[state.step];
      const n = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en").format(state.step);
      const total = new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en").format(6);
      els.label.textContent = lang === "fa" ? `مرحله ${n} از ${total}` : `Step ${n} of ${total}`;
      els.question.textContent = c.q[lang];
      els.description.textContent = c.d[lang];
      els.back.textContent = lang === "fa" ? "← بازگشت" : "← Back";
    }

    function showStep(n, { scroll = true } = {}) {
      state.step = n;
      state.showingResult = false;
      stepEls.forEach((s, i) => { if (!s) return; s.hidden = i !== n - 1; s.classList.toggle("active", i === n - 1); });
      els.dots.forEach((d, i) => d.classList.toggle("active", i < n));
      els.result.hidden = true;
      els.back.hidden = n === 1;
      renderHeader();
      if (scroll) root.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function chip(text, href) {
      return href ? `<a class="chip-link" href="${href}">${text}</a>` : `<span class="chip-link">${text}</span>`;
    }

    function renderResult() {
      const wfKey = chooseWorkflow();
      const wf = WORKFLOWS[wfKey];
      const depth = state.depth || "practical";
      let flowSteps = wf.steps.map((s) => s[lang]);
      if (depth === "quick") flowSteps = flowSteps.slice(0, 3);

      const wantsTroubleshoot = state.stage === "has-problem" || state.purpose === "troubleshoot";
      const wantsOutput = state.stage === "needs-output" || state.purpose === "prepare-output";

      const toolsHtml = (wf.tools || []).map((t) => chip(lang === "fa" ? KB.tools[t].fa : KB.tools[t].en, `tools.html#tool-${t}`)).join("");
      const csHtml = (wf.caseStudies || []).map((k) => {
        const cs = KB.caseStudies[k]; if (!cs) return "";
        return chip(lang === "fa" ? cs.title.fa : cs.title.en, `case-studies.html?topic=${cs.filter}`);
      }).join("");
      const tsHtml = (wf.troubleshooting || []).map((catKey) => {
        const cat = KB.troubleshooting[catKey];
        return chip(lang === "fa" ? cat.title.fa : cat.title.en, `troubleshooting.html?cat=${catKey}`);
      }).join("") || `<span class="chip-link muted">${lang === "fa" ? "موردی ثبت نشده" : "None logged yet"}</span>`;

      const why = lang === "fa"
        ? `این مسیر برای «${wf.title.fa}» پیشنهاد شد چون چیزی که داری و چیزی که می‌خواهی بفهمی، بیشتر با همین Workflow جور درمی‌آید. اگر نتیجه مناسب نیست، «شروع دوباره» را بزن و گزینه‌ی دیگری انتخاب کن.`
        : `This path was suggested for "${wf.title.en}" because what you have and what you want to learn best match this workflow. If it doesn't fit, restart and choose differently.`;

      els.body.innerHTML = `
        <span class="eyebrow">${lang === "fa" ? "WORKFLOW پیشنهادی" : "RECOMMENDED WORKFLOW"}</span>
        <h2>${wf.title[lang]}</h2>
        <p class="result-problem">${wf.problem[lang]}</p>

        <div class="result-flow flow-chain">${flowSteps.map((s, i) => (i ? '<span class="flow-sep" aria-hidden="true">→</span>' : "") + `<span class="flow-step">${s}</span>`).join("")}</div>
        <p class="result-note">${DEPTH_NOTE[depth][lang]}</p>

        <details class="result-why" open>
          <summary>${lang === "fa" ? "چرا این Workflow؟" : "Why this workflow?"}</summary>
          <p>${why}</p>
        </details>

        <div class="result-grid">
          <div class="result-block"><h4>${lang === "fa" ? "ابزارهای مرتبط" : "Related tools"}</h4><div class="chip-row">${toolsHtml}</div></div>
          <div class="result-block"><h4>${lang === "fa" ? "مطالعات موردی مرتبط" : "Related case studies"}</h4><div class="chip-row">${csHtml}</div></div>
          <div class="result-block"><h4>${lang === "fa" ? "مشکلات رایج / رفع اشکال" : "Common problems / troubleshooting"}</h4><div class="chip-row">${tsHtml}</div></div>
        </div>

        <div class="result-actions">
          <a class="button button-primary" href="${wf.link}">${lang === "fa" ? "شروع Workflow" : "Start the workflow"}</a>
          <a class="button button-secondary" href="research-outputs.html?template=${wfKey}">${lang === "fa" ? "ساخت خروجی پژوهشی" : "Prepare a research output"}</a>
          ${wantsTroubleshoot ? `<a class="button button-secondary" href="troubleshooting.html${wf.troubleshooting.length ? "?cat=" + wf.troubleshooting[0] : ""}">${lang === "fa" ? "رفتن به رفع اشکال" : "Go to troubleshooting"}</a>` : ""}
          <button type="button" id="decisionRestart" class="button button-secondary">${lang === "fa" ? "شروع دوباره" : "Start over"}</button>
        </div>
        ${wantsOutput ? `<p class="result-hint">${lang === "fa" ? "چون گفتی می‌خواهی خروجی پژوهشی آماده کنی، دکمه‌ی «ساخت خروجی پژوهشی» این Workflow را از قبل برایت پر می‌کند." : "Since you're preparing a research output, the button above pre-fills this workflow for you."}</p>` : ""}
      `;
      $("#decisionRestart").addEventListener("click", resetAll);
      fixFlowChains(els.result);
    }

    function showResult() {
      state.showingResult = true;
      renderResult();
      stepEls.forEach((s) => { if (s) { s.hidden = true; s.classList.remove("active"); } });
      els.dots.forEach((d) => d.classList.add("active"));
      els.result.hidden = false;
      els.back.hidden = false;
      els.result.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function resetAll() {
      Object.assign(state, { have: null, goal2: null, stage: null, evidence: null, purpose: null, depth: null });
      $$(".decision-option.selected", root).forEach((b) => { b.classList.remove("selected"); b.setAttribute("aria-pressed", "false"); });
      showStep(1);
    }

    function select(btn) {
      $$(".decision-option", btn.parentElement).forEach((b) => { b.classList.remove("selected"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("selected");
      btn.setAttribute("aria-pressed", "true");
    }

    const FIELD_TO_STEP = { have: 1, goal2: 2, stage: 3, evidence: 4, purpose: 5, depth: 6 };
    function bind(attr, key) {
      $$(`[data-${attr}]`, root).forEach((btn) => {
        btn.setAttribute("aria-pressed", "false");
        btn.addEventListener("click", () => {
          select(btn);
          state[key] = btn.dataset[attr];
          const next = FIELD_TO_STEP[key] + 1;
          if (next <= 6) showStep(next); else showResult();
        });
      });
    }
    bind("have", "have"); bind("goal2", "goal2"); bind("stage", "stage");
    bind("evidence", "evidence"); bind("purpose", "purpose"); bind("depth", "depth");

    els.back.addEventListener("click", () => {
      if (state.showingResult) showStep(6);
      else if (state.step > 1) showStep(state.step - 1);
    });

    langListeners.push(() => { renderHeader(); if (state.showingResult) renderResult(); });
    showStep(1, { scroll: false });
  }

  /* ---------- go ---------- */
  applyLanguage(lang);
})();
