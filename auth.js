/* =========================================================
   GeneBite — Account & Premium (client-side, static-site)
   ---------------------------------------------------------
   No server exists yet, so this is a *soft* gate: it is good
   enough to sell early access and see if people pay, but a
   determined person could bypass it from the browser console.
   See account.html for the upgrade path to a real backend.

   Storage (all under one localStorage key "gb_account"):
     { name, email, premiumUntil: <ISO date or null>, plan }
========================================================= */
window.GB_AUTH = (() => {
  const KEY = "gb_account";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* ignore */ }
  }

  function getUser() { return read(); }

  function signup(name, email) {
    const existing = read() || {};
    const next = { ...existing, name: name.trim(), email: email.trim().toLowerCase() };
    write(next);
    return next;
  }

  function logout() { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } }

  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  function normCode(code) { return (code || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); }

  /**
   * Activate a premium code. Returns {ok:true, days, plan} or {ok:false, reason}.
   * reason: "empty" | "format" | "invalid" | "used"
   */
  async function activateCode(rawCode) {
    const norm = normCode(rawCode);
    if (!norm) return { ok: false, reason: "empty" };
    if (norm.length < 8) return { ok: false, reason: "format" };

    const list = window.GB_PREMIUM_CODES || [];
    const hash = await sha256("GB1|" + norm);
    const match = list.find((c) => c.h === hash);
    if (!match) return { ok: false, reason: "invalid" };

    const used = read() || {};
    const usedCodes = used.usedCodeHashes || [];
    if (usedCodes.includes(hash)) return { ok: false, reason: "used" };

    const now = new Date();
    const base = used.premiumUntil && new Date(used.premiumUntil) > now ? new Date(used.premiumUntil) : now;
    base.setDate(base.getDate() + match.d);

    const planNames = { T: "Test", M: "Monthly", Y: "Yearly" };
    const next = { ...used, premiumUntil: base.toISOString(), plan: planNames[match.t] || "Premium",
                   usedCodeHashes: [...usedCodes, hash] };
    write(next);
    return { ok: true, days: match.d, until: base, plan: next.plan };
  }

  function isPremium() {
    const u = read();
    return !!(u && u.premiumUntil && new Date(u.premiumUntil) > new Date());
  }
  function daysLeft() {
    const u = read();
    if (!u || !u.premiumUntil) return 0;
    const ms = new Date(u.premiumUntil) - new Date();
    return Math.max(0, Math.ceil(ms / 86400000));
  }

  return { getUser, signup, logout, activateCode, isPremium, daysLeft, normCode };
})();

/* =========================================================
   Header account badge + premium-gate rendering.
   Runs on every page (safe no-ops if markup absent).
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const A = window.GB_AUTH;
  if (!A) return;

  function renderAccountBadge() {
    const slot = document.getElementById("accountNavSlot");
    if (!slot) return;
    const u = A.getUser();
    const lang = document.documentElement.lang === "en" ? "en" : "fa";
    const premium = A.isPremium();
    if (premium) {
      slot.innerHTML = `<a href="account.html" class="account-chip is-premium">
        <span class="account-chip-dot"></span>
        Premium
      </a>`;
    } else if (u && u.email) {
      slot.innerHTML = `<a href="account.html" class="account-chip">
        <span class="account-chip-dot"></span>
        ${lang === "fa" ? "حساب من" : "My account"}
      </a>`;
    } else {
      slot.innerHTML = `<a href="account.html" class="account-chip">${lang === "fa" ? "ورود / ثبت‌نام" : "Log in / Sign up"}</a>`;
    }
  }

  function renderPremiumGates() {
    const premium = A.isPremium();
    document.querySelectorAll("[data-premium-gate]").forEach((el) => {
      el.classList.toggle("is-locked", !premium);
    });
    document.querySelectorAll("[data-premium-badge]").forEach((el) => {
      el.hidden = premium;
    });
  }

  renderAccountBadge();
  renderPremiumGates();
  window.GB_renderAccountBadge = renderAccountBadge;
  window.GB_renderPremiumGates = renderPremiumGates;

  /* ---------- account.html page logic ---------- */
  const statusCard = document.getElementById("accountStatusCard");
  function renderStatus() {
    if (!statusCard) return;
    const u = A.getUser();
    const lang = document.documentElement.lang === "en" ? "en" : "fa";
    if (!u || !u.email) { statusCard.hidden = true; return; }
    statusCard.hidden = false;
    document.getElementById("accountStatusName").textContent = u.name || (lang === "fa" ? "بدون نام" : "No name set");
    document.getElementById("accountStatusEmail").textContent = u.email;
    const planEl = document.getElementById("accountStatusPlan");
    if (A.isPremium()) {
      const days = A.daysLeft();
      planEl.innerHTML = `<span class="premium-badge">★ ${u.plan || "Premium"}</span><div style="font-size:.78rem;color:var(--text-soft);margin-top:4px">${lang === "fa" ? days + " روز باقی‌مانده" : days + " days left"}</div>`;
    } else {
      planEl.innerHTML = `<span style="font-size:.82rem;color:var(--text-muted)">${lang === "fa" ? "بدون اشتراک پرمیوم" : "No premium subscription"}</span>`;
    }
  }

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const u = A.getUser();
    if (u) {
      if (document.getElementById("suName")) document.getElementById("suName").value = u.name || "";
      if (document.getElementById("suEmail")) document.getElementById("suEmail").value = u.email || "";
    }
    signupForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const name = document.getElementById("suName").value;
      const email = document.getElementById("suEmail").value;
      A.signup(name, email);
      const msg = document.getElementById("signupMsg");
      const lang = document.documentElement.lang === "en" ? "en" : "fa";
      msg.textContent = lang === "fa" ? "حساب ذخیره شد." : "Account saved.";
      msg.className = "gb-form-msg show ok";
      renderStatus();
      renderAccountBadge();
    });
  }

  const codeForm = document.getElementById("codeForm");
  if (codeForm) {
    codeForm.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const input = document.getElementById("codeInput");
      const msg = document.getElementById("codeMsg");
      const lang = document.documentElement.lang === "en" ? "en" : "fa";
      const result = await A.activateCode(input.value);
      if (result.ok) {
        const msgs = { fa: `فعال شد! ${result.days} روز به حساب شما اضافه شد.`, en: `Activated! ${result.days} days added to your account.` };
        msg.textContent = msgs[lang];
        msg.className = "gb-form-msg show ok";
        input.value = "";
        renderStatus();
        renderAccountBadge();
        renderPremiumGates();
      } else {
        const reasons = {
          empty: { fa: "کد را وارد کن.", en: "Enter a code." },
          format: { fa: "فرمت کد درست نیست.", en: "That code format looks wrong." },
          invalid: { fa: "این کد معتبر نیست.", en: "That code isn't valid." },
          used: { fa: "این کد قبلاً در همین مرورگر استفاده شده.", en: "This code was already used on this browser." }
        };
        msg.textContent = (reasons[result.reason] || reasons.invalid)[lang];
        msg.className = "gb-form-msg show err";
      }
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      A.logout();
      renderStatus();
      renderAccountBadge();
      renderPremiumGates();
      if (signupForm) signupForm.reset();
    });
  }

  renderStatus();

  /* Zarinpal plan links: placeholder — replace href with real payment links. */
  document.querySelectorAll(".zarinpal-link").forEach((a) => {
    a.addEventListener("click", (ev) => {
      if (a.getAttribute("href") === "#") {
        ev.preventDefault();
        const lang = document.documentElement.lang === "en" ? "en" : "fa";
        alert(lang === "fa"
          ? "لینک پرداخت هنوز وصل نشده. صاحب سایت باید لینک زرین‌پال واقعی را جایگزین کند."
          : "Payment link not connected yet. The site owner needs to add the real Zarinpal link.");
      }
    });
  });
});


/* ---------- Ease-of-use helpers: back-to-top, "find my path" pill, "/" to search ---------- */
(() => {
  const getLang = () => { try { return localStorage.getItem("genebite-language") === "en" ? "en" : "fa"; } catch (e) { return "fa"; } };
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const up = document.createElement("button");
  up.type = "button"; up.className = "gb-fab gb-top"; up.hidden = true;
  up.setAttribute("aria-label", "Back to top"); up.textContent = "↑";
  up.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(up);
  window.addEventListener("scroll", () => { up.hidden = window.scrollY < 700; }, { passive: true });

  if (!/research-decision|account/.test(page)) {
    const a = document.createElement("a");
    a.href = "research-decision.html"; a.className = "gb-fab gb-start";
    a.dataset.en = "Find my path"; a.dataset.fa = "مسیرم چیست؟";
    a.textContent = getLang() === "fa" ? a.dataset.fa : a.dataset.en;
    document.body.appendChild(a);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable) return;
    e.preventDefault();
    const s = document.getElementById("globalSearch");
    if (s) s.focus(); else location.href = "search.html";
  });
})();
