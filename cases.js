/* =========================================================
   GeneBite — Case Study data (data-driven)
   ---------------------------------------------------------
   Every case is anchored to a real, citable source (primary
   paper, official database entry, or consensus guideline).
   Structure of each case:
     Question → Input → Method(steps) → Observation & Evidence
     → Interpretation → Limitations → Next question → Try it → References
   free:true  → whole case is open.
   free:false → Question / Input / Method / References + one
                observation are open; the rest is Premium.
   To add a case: copy an entry, change the fields. Nothing else
   in the site needs to change.
========================================================= */
window.GB_CASES = (() => {
  const B = (en, fa) => ({ en, fa });
  const S = (tool, en, fa) => ({ tool, d: B(en, fa) });

  return [

  /* 01 ---------------------------------------------------- GFP */
  {
    id: "gfp", free: true, level: "beginner", categories: ["protein", "structure"], workflows: ["protein"],
    tools: ["uniprot", "rcsb-pdb", "pymol"],
    flow: ["Protein", "UniProt", "PDB", "Structure", "Interpretation"],
    title: B("Exploring GFP structure", "بررسی ساختار GFP"),
    hook: B("How does a 238-residue protein build its own fluorophore?", "چطور یک پروتئین ۲۳۸ آمینواسیدی فلوروفور خودش را می‌سازد؟"),
    question: B("Which part of the GFP structure creates fluorescence, and what does the 3D structure tell us that the sequence alone does not?",
                "کدام بخش از ساختار GFP فلورسانس را می‌سازد و ساختار سه‌بعدی چه چیزی می‌گوید که توالی به‌تنهایی نمی‌گوید؟"),
    input: B("Green fluorescent protein from Aequorea victoria (UniProt P42212, 238 aa). Structures: PDB 1EMA (S65T variant) and 1GFL (wild type).",
             "پروتئین فلورسنت سبز از Aequorea victoria (UniProt P42212، ۲۳۸ آمینواسید). ساختارها: PDB 1EMA (واریانت S65T) و 1GFL (نوع وحشی)."),
    steps: [
      S("UniProt", "Open P42212, note the length and read the Features section for the chromophore-forming residues (65–67).", "رکورد P42212 را باز کن، طول توالی را ببین و در بخش Features دنبال residueهای سازنده‌ی کروموفور (۶۵ تا ۶۷) بگرد."),
      S("PDB", "Open 1GFL and 1EMA, compare them, and check the resolution and the exact mutations of the entry you choose.", "ورودی‌های 1GFL و 1EMA را باز و مقایسه کن و رزولوشن و جهش‌های دقیق ورودی انتخابی را چک کن."),
      S("PyMOL", "Show the cartoon, select residues 65–67 as sticks and look at where they sit relative to the β-barrel.", "ساختار را cartoon نشان بده، residueهای ۶۵ تا ۶۷ را stick کن و ببین نسبت به بشکه‌ی β کجا قرار دارند.")
    ],
    obs: [
      B("GFP folds into an 11-stranded β-barrel with a central helix running through it; the chromophore sits on that helix, inside the barrel, shielded from solvent.", "GFP به یک بشکه‌ی β با ۱۱ رشته تا می‌خورد که یک هلیکس مرکزی از داخلش عبور می‌کند؛ کروموفور روی همین هلیکس و داخل بشکه، دور از حلال قرار دارد."),
      B("The chromophore forms from three consecutive residues (Ser65–Tyr66–Gly67) by cyclisation and oxidation, with no external cofactor other than molecular oxygen.", "کروموفور از سه residue متوالی (Ser65–Tyr66–Gly67) با حلقه‌ای‌شدن و اکسید‌شدن ساخته می‌شود و به‌جز اکسیژن مولکولی به کوفاکتور دیگری نیاز ندارد."),
      B("The S65T variant (PDB 1EMA) shifts the excitation peak to about 489 nm and is brighter, which is why it became a workhorse reporter.", "واریانت S65T (PDB 1EMA) قله‌ی برانگیختگی را به حدود ۴۸۹ نانومتر می‌برد و روشن‌تر است؛ به همین دلیل به یک reporter استاندارد تبدیل شد.")
    ],
    interp: B("Fluorescence is a property of the folded structure, not of the sequence in isolation: the barrel holds the chromophore rigid and protected. That explains why GFP works as a self-contained tag in many organisms, and why point mutations near the chromophore change its colour (BFP, YFP variants).",
              "فلورسانس ویژگی ساختار تاخورده است، نه توالی به‌تنهایی: بشکه کروموفور را سفت و محافظت‌شده نگه می‌دارد. این توضیح می‌دهد چرا GFP در ارگانیسم‌های مختلف مثل یک برچسب مستقل کار می‌کند و چرا جهش‌های نزدیک کروموفور رنگ را عوض می‌کنند (واریانت‌های BFP و YFP)."),
    limit: [
      B("A crystal structure is a static snapshot in a crystal lattice; it does not show the cyclisation chemistry as it happens.", "ساختار کریستالی یک تصویر ثابت داخل شبکه‌ی کریستال است و شیمی حلقه‌ای‌شدن را در حال وقوع نشان نمی‌دهد."),
      B("PDB entries are often mutants; always match the entry to the variant you actually use.", "ورودی‌های PDB اغلب واریانت هستند؛ همیشه ورودی را با واریانتی که واقعاً استفاده می‌کنی تطبیق بده."),
      B("A GFP fusion can perturb the behaviour of the partner protein; a working tag is not proof of a normal fusion.", "فیوژن GFP می‌تواند رفتار پروتئین شریک را تغییر دهد؛ کارکردن تگ اثبات فیوژن سالم نیست.")
    ],
    next: B("How do specific mutations (e.g. S65T, Y66H) change the spectrum? Compare structures of variants and check a fluorescent-protein database such as FPbase.",
            "جهش‌های مشخص (مثل S65T و Y66H) طیف را چطور تغییر می‌دهند؟ ساختار واریانت‌ها را مقایسه کن و یک پایگاه پروتئین‌های فلورسنت مثل FPbase را ببین."),
    tryit: [
      B("Superimpose 1GFL and 1EMA in PyMOL (align command) and measure how much the chromophore region moves.", "در PyMOL ساختارهای 1GFL و 1EMA را با دستور align روی هم بگذار و میزان جابه‌جایی ناحیه‌ی کروموفور را اندازه بگیر."),
      B("List the residues within 4 Å of the chromophore and note which ones are polar.", "residueهای در فاصله‌ی ۴ آنگستروم از کروموفور را فهرست کن و مشخص کن کدام‌ها قطبی‌اند.")
    ],
    refs: ["Ormö M et al. Crystal structure of the Aequorea victoria green fluorescent protein. Science 1996;273:1392–1395.",
           "Yang F, Moss LG, Phillips GN. The molecular structure of green fluorescent protein. Nat Biotechnol 1996;14:1246–1251.",
           "Heim R, Cubitt AB, Tsien RY. Improved green fluorescence. Nature 1995;373:663–664."]
  },

  /* 02 ---------------------------------------------- HBB sickle */
  {
    id: "hbb-sickle", free: false, level: "beginner", categories: ["gene", "protein", "structure"], workflows: ["gene", "protein"],
    tools: ["ncbi-gene", "clinvar", "gnomad", "uniprot", "rcsb-pdb", "omim"],
    flow: ["Gene", "Variant", "Protein", "Structure", "Disease"],
    title: B("HBB and sickle cell disease: one base, one amino acid", "HBB و بیماری سلول داسی‌شکل: یک باز، یک آمینواسید"),
    hook: B("How a single nucleotide change becomes a disease you can see in a structure.", "چطور تغییر یک نوکلئوتید به بیماری‌ای تبدیل می‌شود که در ساختار پروتئین دیده می‌شود."),
    question: B("Which single change in the HBB gene causes sickle cell disease, and how do we see its consequence at the protein level?",
                "کدام تغییر منفرد در ژن HBB باعث بیماری سلول داسی‌شکل می‌شود و پیامدش در سطح پروتئین چگونه دیده می‌شود؟"),
    input: B("Gene HBB (human, chromosome 11p15.4); protein β-globin (UniProt P68871); variant rs334; reference structure PDB 2HHB (normal deoxyhemoglobin).",
             "ژن HBB (انسان، کروموزوم 11p15.4)؛ پروتئین β-globin (UniProt P68871)؛ واریانت rs334؛ ساختار مرجع PDB 2HHB (دِاکسی‌هموگلوبین طبیعی)."),
    steps: [
      S("NCBI Gene", "Confirm the official symbol HBB, species and the NCBI Gene ID before anything else.", "نماد رسمی HBB، گونه و NCBI Gene ID را قبل از هر کار دیگری تأیید کن."),
      S("ClinVar", "Search the Glu→Val variant. Note the two numbering systems: legacy p.Glu6Val versus HGVS p.Glu7Val (the initiator Met is counted in HGVS).", "واریانت Glu→Val را جست‌وجو کن. به دو سیستم شماره‌گذاری دقت کن: p.Glu6Val قدیمی در برابر p.Glu7Val در HGVS (متیونین آغازین در HGVS شمرده می‌شود)."),
      S("gnomAD", "Check the allele frequency across ancestry groups.", "فراوانی آلل را بین گروه‌های اجدادی بررسی کن."),
      S("UniProt / PDB", "Open P68871, locate position 6 (mature numbering) and view it in 2HHB.", "P68871 را باز کن، موقعیت ۶ (شماره‌گذاری پروتئین بالغ) را پیدا کن و در 2HHB ببین.")
    ],
    obs: [
      B("The variant is a missense change (c.20A>T, GAG→GTG) that replaces a polar glutamate with a hydrophobic valine on the surface of β-globin.", "این واریانت یک تغییر missense است (c.20A>T، ‏GAG→GTG) که گلوتامات قطبی را در سطح β-globin با والین آبگریز جایگزین می‌کند."),
      B("In the deoxygenated state, the exposed valine fits into a hydrophobic pocket (near Phe85 and Leu88) on a neighbouring hemoglobin molecule, driving polymerisation of hemoglobin S into fibres.", "در حالت بدون اکسیژن، والین در معرض دید در یک جیب آبگریز (نزدیک Phe85 و Leu88) روی مولکول هموگلوبین مجاور جا می‌گیرد و پلیمریزاسیون هموگلوبین S به رشته‌ها را پیش می‌برد."),
      B("The allele is common in populations with a history of malaria; carriers (HbAS) are protected against severe malaria (Allison, 1954).", "این آلل در جمعیت‌های با سابقه‌ی مالاریا رایج است؛ ناقلین (HbAS) در برابر مالاریای شدید محافظت می‌شوند (Allison، ۱۹۵۴).")
    ],
    interp: B("A structural mechanism explains an association that sequence statistics alone could not: the mutation creates a new sticky surface that triggers polymerisation only when hemoglobin is deoxygenated. The disease is recessive because heterozygotes still make enough normal β-globin.",
              "یک مکانیسم ساختاری، ارتباطی را توضیح می‌دهد که آمار توالی به‌تنهایی نمی‌توانست: جهش یک سطح چسبنده‌ی جدید می‌سازد که فقط وقتی هموگلوبین بدون اکسیژن است پلیمریزاسیون را راه می‌اندازد. بیماری مغلوب است چون هتروزیگوت‌ها هنوز β-globin طبیعی کافی می‌سازند."),
    limit: [
      B("2HHB is normal hemoglobin, not HbS; fibre structures come from other entries and methods.", "2HHB هموگلوبین طبیعی است، نه HbS؛ ساختار رشته‌ها از ورودی‌ها و روش‌های دیگر می‌آید."),
      B("Severity varies between patients; modifiers such as fetal hemoglobin level (e.g. BCL11A regulation) change the clinical picture.", "شدت بیماری بین بیماران فرق می‌کند؛ عواملی مثل سطح هموگلوبین جنینی (مثلاً تنظیم توسط BCL11A) تصویر بالینی را تغییر می‌دهند."),
      B("Population allele frequency describes history and selection; it is not a risk estimate for an individual.", "فراوانی آللی در جمعیت تاریخچه و انتخاب را توصیف می‌کند؛ برآورد خطر برای یک فرد نیست.")
    ],
    next: B("How do modifiers such as fetal hemoglobin explain differences in severity, and how do therapies (hydroxyurea, BCL11A-targeted gene editing) exploit that?",
            "چگونه عواملی مثل هموگلوبین جنینی تفاوت شدت را توضیح می‌دهند و درمان‌ها (هیدروکسی‌اوره، ویرایش ژنی هدف‌گرفته BCL11A) چطور از آن استفاده می‌کنند؟"),
    tryit: [
      B("In PyMOL open 2HHB, select β-chain residue 6 and measure its distance to Phe85 and Leu88 of the β-chain on a neighbouring tetramer copy (use the symmetry mates or a polymer entry).", "در PyMOL ساختار 2HHB را باز کن، residue شماره ۶ زنجیره‌ی β را انتخاب کن و فاصله‌اش را با Phe85 و Leu88 زنجیره‌ی β تترامر مجاور بسنج (با نسخه‌های تقارنی یا یک ورودی پلیمری)."),
      B("Write your own one-paragraph Research Record using the Gene template.", "با قالب Gene یک Research Record یک‌پاراگرافی برای خودت بنویس.")
    ],
    refs: ["Pauling L, Itano HA, Singer SJ, Wells IC. Sickle cell anemia, a molecular disease. Science 1949;110:543–548.",
           "Ingram VM. A specific chemical difference between the globins of normal human and sickle-cell anaemia haemoglobin. Nature 1956;178:792–794.",
           "Fermi G et al. The crystal structure of human deoxyhaemoglobin at 1.74 Å resolution. J Mol Biol 1984;175:159–174.",
           "Allison AC. Protection afforded by sickle-cell trait against subtertian malarial infection. Br Med J 1954;1:290–294.",
           "OMIM: HBB (141900); Sickle cell anemia (603903)."]
  },

  /* 03 ---------------------------------------------------- TP53 */
  {
    id: "tp53", free: false, level: "intermediate", categories: ["gene", "protein", "structure"], workflows: ["gene", "protein"],
    tools: ["ncbi-gene", "uniprot", "rcsb-pdb", "pymol", "clinvar", "omim"],
    flow: ["Gene", "Mutations", "Protein", "Structure", "Interpretation"],
    title: B("TP53: why cancer mutations cluster where they do", "TP53: چرا جهش‌های سرطانی در نقاط مشخصی متمرکز می‌شوند"),
    hook: B("Use a structure to explain a mutation map.", "از یک ساختار برای توضیح نقشه‌ی جهش‌ها استفاده کن."),
    question: B("Where in TP53 do cancer-associated missense mutations concentrate, and why does that location matter structurally?",
                "جهش‌های missense مرتبط با سرطان در TP53 کجا متمرکز شده‌اند و این موقعیت از نظر ساختاری چرا مهم است؟"),
    input: B("Gene TP53 (17p13.1); protein p53 (UniProt P04637); structure PDB 1TUP (p53 core domain bound to DNA); mutation data from public cancer-genomics portals.",
             "ژن TP53 (17p13.1)؛ پروتئین p53 (UniProt P04637)؛ ساختار PDB 1TUP (دامنه‌ی مرکزی p53 متصل به DNA)؛ داده‌ی جهش از پورتال‌های عمومی ژنومیکس سرطان."),
    steps: [
      S("NCBI Gene / UniProt", "Confirm identity, read the domain map: transactivation, DNA-binding core, tetramerisation and regulatory regions.", "هویت را تأیید کن و نقشه‌ی دامنه‌ها را بخوان: ترانس‌اکتیویشن، هسته‌ی اتصال به DNA، تترامریزاسیون و نواحی تنظیمی."),
      S("cBioPortal / ClinVar", "Plot or list where missense mutations fall along the protein; note the most frequent positions.", "ببین جهش‌های missense روی طول پروتئین کجا می‌افتند و پرتکرارترین موقعیت‌ها را یادداشت کن."),
      S("PDB / PyMOL", "Open 1TUP and highlight the hotspot residues R175, G245, R248, R249, R273, R282 and the zinc-binding residues.", "1TUP را باز و residueهای hotspot یعنی R175، G245، R248، R249، R273، R282 و residueهای اتصال‌دهنده‌ی روی را هایلایت کن.")
    ],
    obs: [
      B("Most cancer missense mutations fall in the central DNA-binding domain rather than being spread evenly across the 393 residues.", "بیشتر جهش‌های missense سرطانی در دامنه‌ی مرکزی اتصال به DNA هستند، نه به‌طور یکنواخت روی ۳۹۳ آمینواسید."),
      B("R248 and R273 directly contact DNA (contact mutants); R175, G245, R249 and R282 mainly destabilise the fold (structural mutants).", "R248 و R273 مستقیماً با DNA تماس دارند (contact mutant)؛ R175، G245، R249 و R282 بیشتر ساختار تاخورده را ناپایدار می‌کنند (structural mutant)."),
      B("A zinc ion coordinated by C176, H179, C238 and C242 stabilises the DNA-binding surface.", "یک یون روی که با C176، H179، C238 و C242 کوردینه شده سطح اتصال به DNA را پایدار می‌کند.")
    ],
    interp: B("The hotspots reflect functional constraint: p53 works as a sequence-specific transcription factor, so mutations that abolish DNA contact or destabilise the domain remove its tumour-suppressor activity. Because p53 acts as a tetramer, some mutants can also interfere with the remaining wild-type copy (dominant-negative effect). Germline TP53 variants cause Li-Fraumeni syndrome.",
              "hotspotها محدودیت عملکردی را نشان می‌دهند: p53 یک فاکتور رونویسی اختصاصی توالی است و جهش‌هایی که تماس با DNA را از بین ببرند یا دامنه را ناپایدار کنند فعالیت مهارکننده‌ی تومور را حذف می‌کنند. چون p53 به‌صورت تترامر عمل می‌کند، بعضی جهش‌ها می‌توانند نسخه‌ی طبیعی باقی‌مانده را هم مختل کنند (اثر dominant-negative). واریانت‌های germline در TP53 عامل سندرم Li-Fraumeni هستند."),
    limit: [
      B("1TUP contains only the core domain bound to DNA, not full-length p53; large parts of the protein are intrinsically disordered.", "1TUP فقط دامنه‌ی مرکزی متصل به DNA است، نه p53 کامل؛ بخش‌های بزرگی از پروتئین ذاتاً disordered هستند."),
      B("Mutation frequency reflects both selection and mutability: several hotspots are CpG sites that mutate more easily, so frequency alone does not prove pathogenicity of each variant.", "فراوانی جهش هم انتخاب و هم جهش‌پذیری را نشان می‌دهد: چند hotspot جایگاه CpG هستند که راحت‌تر جهش می‌یابند؛ پس فراوانی به‌تنهایی بیماری‌زایی هر واریانت را ثابت نمی‌کند."),
      B("Structural location suggests a mechanism; it is not functional proof for a specific variant.", "موقعیت ساختاری یک مکانیسم را پیشنهاد می‌کند؛ اثبات عملکردی برای یک واریانت مشخص نیست.")
    ],
    next: B("For a rare TP53 variant, which functional assays and curated classifications (e.g. expert-panel variant curation) support calling it pathogenic or benign?",
            "برای یک واریانت نادر TP53 کدام سنجش‌های عملکردی و طبقه‌بندی‌های curated (مثلاً بازبینی پنل‌های تخصصی واریانت) پشتوانه‌ی بیماری‌زا یا خنثی نامیدنش هستند؟"),
    tryit: [
      B("Colour 1TUP by residue and label all six hotspots; check which of them touch the DNA.", "1TUP را بر اساس residue رنگ کن، شش hotspot را برچسب بزن و ببین کدام‌ها به DNA تماس دارند."),
      B("Pick one hotspot and find its ClinVar records; note the classification and the evidence behind it.", "یک hotspot را انتخاب کن، رکوردهای ClinVar آن را پیدا کن و طبقه‌بندی و شواهدش را یادداشت کن.")
    ],
    refs: ["Cho Y, Gorina S, Jeffrey PD, Pavletich NP. Crystal structure of a p53 tumor suppressor–DNA complex. Science 1994;265:346–355.",
           "Bullock AN, Fersht AR. Rescuing the function of mutant p53. Nat Rev Cancer 2001;1:68–76.",
           "Malkin D et al. Germ line p53 mutations in a familial syndrome of breast cancer, sarcomas, and other neoplasms. Science 1990;250:1233–1238.",
           "OMIM: TP53 (191170); Li-Fraumeni syndrome (151623)."]
  },

  /* 04 --------------------------------------------------- CFTR */
  {
    id: "cftr", free: false, level: "intermediate", categories: ["gene", "drug", "protein"], workflows: ["gene", "drug"],
    tools: ["ncbi-gene", "omim", "clinvar", "uniprot", "rcsb-pdb", "pubmed"],
    flow: ["Gene", "Variant", "Protein defect", "Drug class", "Evidence"],
    title: B("CFTR: from gene discovery to mechanism-based drugs", "CFTR: از کشف ژن تا داروهای مبتنی بر مکانیسم"),
    hook: B("How knowing exactly what the protein defect is led to targeted therapy.", "چطور دانستن دقیق نقص پروتئین به درمان هدفمند رسید."),
    question: B("How did identifying the CFTR gene and its variants lead to drugs that target the underlying protein defect?",
                "شناسایی ژن CFTR و واریانت‌هایش چطور به داروهایی رسید که نقص پروتئینی زیرین را هدف می‌گیرند؟"),
    input: B("Gene CFTR (7q31.2); protein CFTR (UniProt P13569); variant F508del (c.1521_1523delCTT, p.Phe508del); OMIM CFTR 602421, cystic fibrosis 219700.",
             "ژن CFTR (7q31.2)؛ پروتئین CFTR (UniProt P13569)؛ واریانت F508del (‏c.1521_1523delCTT، ‏p.Phe508del)؛ OMIM: ‏CFTR 602421 و فیبروز کیستیک 219700."),
    steps: [
      S("NCBI Gene / OMIM", "Confirm identity and the disease link (autosomal recessive cystic fibrosis).", "هویت و ارتباط با بیماری (فیبروز کیستیک اتوزومال مغلوب) را تأیید کن."),
      S("ClinVar / CFTR2", "Look up F508del and other variants; read how each is classified and how common it is.", "F508del و واریانت‌های دیگر را جست‌وجو کن و ببین هرکدام چطور طبقه‌بندی شده و چقدر رایج است."),
      S("UniProt / PDB", "Read the domain layout (two membrane-spanning domains, two nucleotide-binding domains, a regulatory domain), locate Phe508 in NBD1, and search PDB for cryo-EM structures of CFTR.", "چیدمان دامنه‌ها را بخوان (دو دامنه‌ی غشایی، دو دامنه‌ی اتصال به نوکلئوتید، یک دامنه‌ی تنظیمی)، Phe508 را در NBD1 پیدا کن و در PDB دنبال ساختارهای cryo-EM پروتئین CFTR بگرد."),
      S("PubMed", "Read the pivotal trials for the potentiator and corrector combinations.", "کارآزمایی‌های کلیدی ترکیب‌های potentiator و corrector را بخوان.")
    ],
    obs: [
      B("F508del is the most common cystic fibrosis–causing variant, present on roughly 70% of CF alleles worldwide.", "F508del رایج‌ترین واریانت عامل فیبروز کیستیک است و روی حدود ۷۰٪ آلل‌های CF در سراسر جهان دیده می‌شود."),
      B("The deletion causes misfolding of NBD1: the protein is largely retained and degraded in the endoplasmic reticulum, so little reaches the cell surface (a folding/trafficking defect), and the channel that does arrive has reduced gating.", "این حذف باعث misfolding دامنه‌ی NBD1 می‌شود: پروتئین عمدتاً در شبکه‌ی آندوپلاسمی نگه داشته و تخریب می‌شود و کمی به سطح سلول می‌رسد (نقص folding/trafficking)؛ کانالی هم که می‌رسد gating ضعیف‌تری دارد."),
      B("Two drug classes follow from the mechanism: correctors (e.g. tezacaftor, elexacaftor) improve folding and trafficking; potentiators (ivacaftor) increase channel open probability.", "دو دسته دارو از همین مکانیسم می‌آید: correctorها (مثل tezacaftor و elexacaftor) folding و trafficking را بهتر می‌کنند؛ potentiatorها (ivacaftor) احتمال باز بودن کانال را بالا می‌برند.")
    ],
    interp: B("Variants fall into mechanistic classes (e.g. trafficking versus gating defects), and matching the drug to the defect is what makes the therapy work. This is a full gene → protein → mechanism → drug chain built from database and trial evidence.",
              "واریانت‌ها به کلاس‌های مکانیستی تقسیم می‌شوند (مثلاً نقص trafficking در برابر gating) و تطبیق دارو با نقص است که درمان را کارا می‌کند. این یک زنجیره‌ی کامل ژن ← پروتئین ← مکانیسم ← دارو است که از شواهد پایگاه‌داده و کارآزمایی ساخته می‌شود."),
    limit: [
      B("Not every variant responds; in-vitro responsiveness helps predict but does not guarantee clinical benefit.", "همه‌ی واریانت‌ها پاسخ نمی‌دهند؛ پاسخ آزمایشگاهی پیش‌بینی را بهتر می‌کند ولی سود بالینی را تضمین نمی‌کند."),
      B("Cost and access limit real-world benefit, and long-term outcome data are still accumulating.", "هزینه و دسترسی سود واقعی را محدود می‌کنند و داده‌ی پیامد بلندمدت هنوز در حال جمع‌شدن است."),
      B("A structure of the protein does not by itself explain every drug's binding site or mechanism.", "ساختار پروتئین به‌تنهایی محل اتصال و مکانیسم هر دارو را توضیح نمی‌دهد.")
    ],
    next: B("For a rare variant with no trial data, what combination of functional assays and curated evidence supports treatment eligibility?",
            "برای یک واریانت نادر بدون داده‌ی کارآزمایی، چه ترکیبی از سنجش‌های عملکردی و شواهد curated پشتوانه‌ی واجد شرایط بودن برای درمان است؟"),
    tryit: [
      B("Pick two CFTR variants from ClinVar/CFTR2 and decide which mechanistic class each most likely belongs to, citing the evidence.", "دو واریانت CFTR را از ClinVar/CFTR2 انتخاب کن و با ذکر شواهد تصمیم بگیر هرکدام بیشتر به کدام کلاس مکانیستی تعلق دارد."),
      B("Write a Gene Research Record that ends with a limitations paragraph about in-vitro versus clinical evidence.", "یک Gene Research Record بنویس که با پاراگراف محدودیت‌ها درباره‌ی شواهد آزمایشگاهی در برابر بالینی تمام شود.")
    ],
    refs: ["Riordan JR et al. Identification of the cystic fibrosis gene: cloning and characterization of complementary DNA. Science 1989;245:1066–1073.",
           "Kerem B et al. Identification of the cystic fibrosis gene: genetic analysis. Science 1989;245:1073–1080.",
           "Ramsey BW et al. A CFTR potentiator in patients with cystic fibrosis and the G551D mutation. N Engl J Med 2011;365:1663–1672.",
           "Middleton PG et al. Elexacaftor–tezacaftor–ivacaftor for cystic fibrosis with a single Phe508del allele. N Engl J Med 2019;381:1809–1819."]
  },

  /* 05 ------------------------------------------------ Imatinib */
  {
    id: "imatinib-abl", free: true, level: "intermediate", categories: ["drug", "protein", "structure"], workflows: ["drug", "protein"],
    tools: ["pubchem", "chembl", "uniprot", "rcsb-pdb", "pymol", "pubmed"],
    flow: ["Drug", "PubChem/ChEMBL", "Target", "PDB", "Evidence"],
    title: B("Imatinib and ABL kinase: structure explains selectivity and resistance", "Imatinib و کیناز ABL: ساختار، انتخاب‌گری و مقاومت را توضیح می‌دهد"),
    hook: B("A drug name to a structural hypothesis you can defend.", "از نام یک دارو تا یک فرضیه‌ی ساختاری قابل دفاع."),
    question: B("Why does imatinib inhibit ABL kinase so selectively, and what does the structure say about how resistance arises?",
                "چرا imatinib کیناز ABL را این‌قدر انتخابی مهار می‌کند و ساختار درباره‌ی چگونگی پیدایش مقاومت چه می‌گوید؟"),
    input: B("Imatinib (PubChem CID 5291, ChEMBL CHEMBL941 — confirm in the databases); target ABL1 (UniProt P00519); structures PDB 1IEP and 1FPU.",
             "Imatinib (‏PubChem CID 5291 و ChEMBL CHEMBL941 — در خود پایگاه‌ها تأیید کن)؛ هدف ABL1 (UniProt P00519)؛ ساختارها PDB 1IEP و 1FPU."),
    steps: [
      S("PubChem", "Confirm identity with at least two identifiers; separate imatinib from imatinib mesylate.", "هویت را با دست‌کم دو شناسه تأیید کن و imatinib را از imatinib mesylate جدا کن."),
      S("ChEMBL", "Read activity values and assay types; keep IC50, Ki and Kd separate; note KIT and PDGFR as additional targets.", "مقادیر فعالیت و نوع assay را بخوان؛ IC50، Ki و Kd را جدا نگه دار و KIT و PDGFR را به‌عنوان targetهای دیگر یادداشت کن."),
      S("PDB / PyMOL", "Open 1IEP, show the ligand and residues within ~4 Å; look at the DFG motif and the gatekeeper Thr315 (literature numbering).", "1IEP را باز کن، لیگاند و residueهای حدود ۴ آنگستروم اطرافش را نشان بده؛ به موتیف DFG و gatekeeper یعنی Thr315 (شماره‌گذاری مقالات) نگاه کن.")
    ],
    obs: [
      B("Imatinib binds the ABL kinase domain in the inactive, DFG-out conformation, occupying the ATP site and an adjacent pocket that opens when the DFG motif flips.", "Imatinib به دامنه‌ی کینازی ABL در حالت غیرفعال DFG-out متصل می‌شود و جایگاه ATP و یک جیب مجاور را که با چرخش موتیف DFG باز می‌شود اشغال می‌کند."),
      B("Key hydrogen bonds involve the hinge (Met318), the gatekeeper Thr315, Glu286 and the DFG aspartate (Asp381).", "پیوندهای هیدروژنی کلیدی شامل ناحیه‌ی hinge (‏Met318)، gatekeeper یعنی Thr315، ‏Glu286 و آسپارتات DFG (‏Asp381) است."),
      B("The clinical T315I mutation replaces threonine with a bulkier isoleucine: it removes a hydrogen bond and adds steric hindrance, and it was identified in relapsed CML patients.", "جهش بالینی T315I ترئونین را با ایزولوسین حجیم‌تر عوض می‌کند: یک پیوند هیدروژنی را حذف می‌کند و مانع فضایی می‌آورد و در بیماران عود‌کرده‌ی CML شناسایی شد.")
    ],
    interp: B("Selectivity is partly explained by recognition of a specific inactive conformation that differs between kinases, while activity on KIT and PDGFR explains use beyond CML. The structure gives a testable explanation for T315I resistance and motivated later inhibitors designed to handle it.",
              "انتخاب‌گری تا حدی با شناسایی یک کونفورماسیون غیرفعال اختصاصی که بین کینازها فرق دارد توضیح داده می‌شود و فعالیت روی KIT و PDGFR کاربرد فراتر از CML را توضیح می‌دهد. ساختار یک توضیح قابل‌آزمون برای مقاومت T315I می‌دهد و انگیزه‌ی طراحی مهارکننده‌های بعدی برای غلبه بر آن بود."),
    limit: [
      B("A crystal structure shows a binding mode, not clinical efficacy; potency in vitro is not response in patients.", "ساختار کریستالی یک حالت اتصال را نشان می‌دهد، نه اثربخشی بالینی؛ potency آزمایشگاهی برابر پاسخ در بیمار نیست."),
      B("Resistance is not only kinase-domain mutation; BCR-ABL amplification and other mechanisms also occur.", "مقاومت فقط جهش دامنه‌ی کینازی نیست؛ تکثیر BCR-ABL و مکانیسم‌های دیگر هم رخ می‌دهد."),
      B("The structures use the isolated kinase domain, not full-length BCR-ABL in a cell.", "ساختارها دامنه‌ی کینازی جداشده را نشان می‌دهند، نه BCR-ABL کامل داخل سلول.")
    ],
    next: B("How does a drug that binds the active-like conformation (e.g. dasatinib–ABL structures) differ in its contacts and its resistance profile?",
            "داروی متصل به کونفورماسیون شبیه‌فعال (مثلاً ساختارهای dasatinib–ABL) از نظر تماس‌ها و پروفایل مقاومت چه فرقی دارد؟"),
    tryit: [
      B("Compare the ligand contacts in 1IEP and 1FPU; list residues that appear in both.", "تماس‌های لیگاند را در 1IEP و 1FPU مقایسه کن و residueهای مشترک را فهرست کن."),
      B("Mutate residue 315 to Ile in PyMOL (mutagenesis wizard) and look at the clash with the ligand.", "در PyMOL باقی‌مانده‌ی ۳۱۵ را با mutagenesis wizard به Ile تغییر بده و برخورد با لیگاند را ببین.")
    ],
    refs: ["Schindler T et al. Structural mechanism for STI-571 inhibition of Abelson tyrosine kinase. Science 2000;289:1938–1942.",
           "Nagar B et al. Crystal structures of the kinase domain of c-Abl in complex with the small molecule inhibitors PD173955 and imatinib (STI-571). Cancer Res 2002;62:4236–4243.",
           "Gorre ME et al. Clinical resistance to STI-571 cancer therapy caused by BCR-ABL gene mutation or amplification. Science 2001;293:876–880.",
           "Druker BJ et al. Efficacy and safety of a specific inhibitor of the BCR-ABL tyrosine kinase in chronic myeloid leukemia. N Engl J Med 2001;344:1031–1037."]
  },

  /* 06 ----------------------------------------------- SARS-CoV-2 */
  {
    id: "sars2-genome", free: false, level: "intermediate", categories: ["sequence", "protein"], workflows: ["unknown", "sequence"],
    tools: ["blast", "interpro", "uniprot", "rcsb-pdb", "pubmed"],
    flow: ["Sequence", "BLAST", "Domains", "Structure", "Hypothesis"],
    title: B("An unknown virus genome: what can the sequence alone tell you?", "ژنوم یک ویروس ناشناخته: توالی به‌تنهایی چه می‌گوید؟"),
    hook: B("January 2020: a new genome appears. How do you work out what it is?", "ژانویه ۲۰۲۰: یک ژنوم جدید ظاهر می‌شود. چطور می‌فهمی چیست؟"),
    question: B("Given only the genome sequence of a newly detected virus, what can be inferred about its identity, its proteins and possible drug targets?",
                "با داشتن فقط توالی ژنوم یک ویروس تازه‌شناسایی‌شده، چه چیزهایی درباره‌ی هویت، پروتئین‌ها و اهداف دارویی احتمالی می‌شود نتیجه گرفت؟"),
    input: B("The Wuhan-Hu-1 genome (GenBank MN908947, 29,903 nt; later RefSeq NC_045512.2), published in early 2020.",
             "ژنوم Wuhan-Hu-1 (‏GenBank MN908947، ‏۲۹٬۹۰۳ نوکلئوتید؛ بعداً RefSeq NC_045512.2) که اوایل ۲۰۲۰ منتشر شد."),
    steps: [
      S("BLAST", "Run nucleotide BLAST against viral sequences; read identity, coverage and E-value of the top hits, not only the top name.", "BLAST نوکلئوتیدی را روی توالی‌های ویروسی اجرا کن؛ identity، coverage و E-value بهترین hitها را بخوان، نه فقط نام اولین hit را."),
      S("ORF / BLASTx", "Find open reading frames and compare translated proteins against curated protein databases.", "ORFها را پیدا کن و پروتئین‌های ترجمه‌شده را با پایگاه‌های پروتئینی curated مقایسه کن."),
      S("InterPro / UniProt", "Identify domains in the predicted proteins (e.g. the 3C-like protease and the spike protein).", "دامنه‌ها را در پروتئین‌های پیش‌بینی‌شده شناسایی کن (مثلاً پروتئاز 3C-like و پروتئین spike)."),
      S("PDB", "Search for solved structures of homologous proteins and of the new proteins as they appear.", "دنبال ساختارهای حل‌شده‌ی پروتئین‌های هومولوگ و پروتئین‌های جدید بگرد.")
    ],
    obs: [
      B("The genome organisation placed it in the betacoronaviruses; early comparisons found it closest to bat SARS-like coronaviruses (~88% identity to bat-SL-CoVZC45/ZXC21), ~79% to SARS-CoV and ~50% to MERS-CoV.", "سازمان‌دهی ژنوم آن را در بتاکروناویروس‌ها قرار داد؛ مقایسه‌های اولیه نزدیک‌ترین را کروناویروس‌های شبیه SARS خفاش نشان داد (حدود ۸۸٪ identity با bat-SL-CoVZC45/ZXC21)، حدود ۷۹٪ با SARS-CoV و حدود ۵۰٪ با MERS-CoV."),
      B("A later comparison with the bat coronavirus RaTG13 reported about 96% genome-wide identity.", "مقایسه‌ی بعدی با کروناویروس خفاش RaTG13 حدود ۹۶٪ identity در کل ژنوم گزارش کرد."),
      B("Homology to known proteins predicted the spike as the receptor-binding protein and the main protease and RNA polymerase as drug targets; structures such as spike (6VSB) and the main protease (6LU7) were published within weeks.", "هومولوژی با پروتئین‌های شناخته‌شده spike را پروتئین اتصال به گیرنده و پروتئاز اصلی و RNA پلیمراز را اهداف دارویی پیش‌بینی کرد؛ ساختارهایی مثل spike (‏6VSB) و پروتئاز اصلی (‏6LU7) ظرف چند هفته منتشر شدند.")
    ],
    interp: B("Sequence similarity placed the virus in a known group within days and generated specific, testable hypotheses (receptor use, drug targets) that experiments then confirmed — for example ACE2 as the entry receptor. That is the unknown-sequence workflow working as intended: similarity → domains → structure → hypothesis.",
              "شباهت توالی ظرف چند روز ویروس را در یک گروه شناخته‌شده قرار داد و فرضیه‌های مشخص و قابل‌آزمون (استفاده از گیرنده، اهداف دارویی) ساخت که آزمایش‌ها بعداً تأییدشان کردند — مثلاً ACE2 به‌عنوان گیرنده‌ی ورود. این همان Workflow توالی ناشناخته است که درست کار می‌کند: شباهت ← دامنه‌ها ← ساختار ← فرضیه."),
    limit: [
      B("Similarity supports relatedness, not a transmission history; overall identity hides region-specific differences (the spike gene diverges more than the whole genome).", "شباهت، خویشاوندی را پشتیبانی می‌کند، نه تاریخچه‌ی انتقال؛ identity کلی تفاوت‌های ناحیه‌ای را پنهان می‌کند (ژن spike بیشتر از کل ژنوم واگرا است)."),
      B("Homology-based function is a hypothesis until it is tested experimentally.", "عملکرد مبتنی بر هومولوژی تا وقتی آزمایش نشود یک فرضیه است."),
      B("Early database coverage was limited by sampling bias, so 'closest known relative' meant closest sampled relative.", "پوشش پایگاه‌ها در آن زمان به‌خاطر سوگیری نمونه‌برداری محدود بود؛ «نزدیک‌ترین خویشاوند شناخته‌شده» یعنی نزدیک‌ترین خویشاوند نمونه‌برداری‌شده.")
    ],
    next: B("Which spike residues contact the receptor, and how do variants in that region change binding? Combine structure with phylogenetics to follow them.",
            "کدام residueهای spike با گیرنده تماس دارند و واریانت‌های آن ناحیه اتصال را چگونه تغییر می‌دهند؟ ساختار را با فیلوژنتیک ترکیب کن تا دنبالشان کنی."),
    tryit: [
      B("Run BLAST on a 1–2 kb fragment of MN908947 and compare the top hits' identity and coverage with the genome-wide numbers above.", "BLAST را روی یک قطعه‌ی ۱ تا ۲ کیلوبازی از MN908947 اجرا کن و identity و coverage بهترین hitها را با اعداد کل‌ژنوم بالا مقایسه کن."),
      B("Translate the spike gene, run InterPro, and note the domains.", "ژن spike را ترجمه کن، InterPro را اجرا کن و دامنه‌ها را یادداشت کن.")
    ],
    refs: ["Wu F et al. A new coronavirus associated with human respiratory disease in China. Nature 2020;579:265–269.",
           "Zhou P et al. A pneumonia outbreak associated with a new coronavirus of probable bat origin. Nature 2020;579:270–273.",
           "Lu R et al. Genomic characterisation and epidemiology of 2019 novel coronavirus. Lancet 2020;395:565–574.",
           "Wrapp D et al. Cryo-EM structure of the 2019-nCoV spike in the prefusion conformation. Science 2020;367:1260–1263.",
           "Jin Z et al. Structure of Mpro from SARS-CoV-2 and discovery of its inhibitors. Nature 2020;582:289–293.",
           "Hoffmann M et al. SARS-CoV-2 cell entry depends on ACE2 and TMPRSS2. Cell 2020;181:271–280."]
  },

  /* 07 ------------------------------------------- kinase motifs */
  {
    id: "kinase-motifs", free: false, level: "intermediate", categories: ["sequence", "protein"], workflows: ["sequence", "protein"],
    tools: ["uniprot", "blast", "interpro", "clustal-omega", "mafft"],
    flow: ["Sequence", "BLAST", "Domain", "Alignment", "Motifs"],
    title: B("Is this a kinase? Recognising conserved motifs from sequence", "این یک کیناز است؟ شناخت موتیف‌های حفاظت‌شده از روی توالی"),
    hook: B("From an unlabelled sequence to the residues that matter.", "از یک توالی بدون برچسب تا residueهای مهم."),
    question: B("Given only the ABL1 sequence, how can you tell it is a protein kinase and locate the motifs behind ATP binding and catalysis?",
                "با داشتن فقط توالی ABL1 چطور می‌فهمی یک کیناز پروتئینی است و موتیف‌های مربوط به اتصال ATP و کاتالیز را کجا پیدا می‌کنی؟"),
    input: B("Human ABL1 sequence (UniProt P00519) and a few reference kinases for comparison.",
             "توالی ABL1 انسانی (UniProt P00519) و چند کیناز مرجع برای مقایسه."),
    steps: [
      S("BLAST", "Search Swiss-Prot with the kinase-domain region; read coverage and identity across many kinases.", "ناحیه‌ی دامنه‌ی کینازی را در Swiss-Prot جست‌وجو کن؛ coverage و identity را در بین کینازهای مختلف بخوان."),
      S("InterPro", "Look for the protein kinase domain (InterPro IPR000719; Pfam PF00069; PROSITE PS50011) and read its boundaries.", "دنبال دامنه‌ی کیناز پروتئینی بگرد (InterPro IPR000719؛ Pfam PF00069؛ PROSITE PS50011) و مرزهایش را بخوان."),
      S("Clustal Omega / MAFFT", "Align ABL1 with several kinases and look for columns that stay conserved.", "ABL1 را با چند کیناز هم‌تراز کن و ستون‌هایی را که حفظ می‌شوند ببین.")
    ],
    obs: [
      B("The alignment reveals classic conserved motifs: the glycine-rich loop (GxGxxG) that positions ATP, the catalytic lysine in the VAIK motif, the HRD motif of the catalytic loop, and the DFG motif at the start of the activation loop.", "هم‌ترازی موتیف‌های حفاظت‌شده‌ی کلاسیک را نشان می‌دهد: حلقه‌ی غنی از گلیسین (GxGxxG) که ATP را جا می‌دهد، لیزین کاتالیتیک در موتیف VAIK، موتیف HRD حلقه‌ی کاتالیتیک و موتیف DFG در آغاز حلقه‌ی فعال‌سازی."),
      B("The catalytic-loop motif differs by substrate class: tyrosine kinases typically show HRDLAARN, serine/threonine kinases HRDLKPEN.", "موتیف حلقه‌ی کاتالیتیک بر اساس کلاس سوبسترا فرق می‌کند: کینازهای تیروزینی معمولاً HRDLAARN و کینازهای سرین/ترئونین HRDLKPEN دارند."),
      B("Literature and database numbering can differ (ABL isoforms), so the same residue may carry different numbers in different sources.", "شماره‌گذاری مقالات و پایگاه‌ها می‌تواند فرق کند (ایزوفرم‌های ABL)؛ پس یک residue ممکن است در منابع مختلف شماره‌ی متفاوت داشته باشد.")
    ],
    interp: B("Domain membership plus intact catalytic motifs is strong evidence for a protein-kinase fold with ATP-dependent phosphotransfer, and the motif signature suggests tyrosine specificity. The same DFG motif is the one whose conformation matters for imatinib binding, connecting sequence analysis to the drug case.",
              "عضویت در دامنه به‌همراه موتیف‌های کاتالیتیک سالم شواهد قوی برای فولد کیناز پروتئینی با انتقال فسفات وابسته به ATP است و امضای موتیف به اختصاصیت تیروزینی اشاره می‌کند. همین موتیف DFG است که کونفورماسیونش در اتصال imatinib مهم است و تحلیل توالی را به Case داروی imatinib وصل می‌کند."),
    limit: [
      B("Conservation shows family membership, not substrate specificity or regulation.", "حفاظت‌شدگی عضویت در خانواده را نشان می‌دهد، نه اختصاصیت سوبسترا یا تنظیم را."),
      B("Pseudokinases keep the fold but lack key catalytic residues, so motif presence must be checked, not assumed.", "شبه‌کینازها فولد را نگه می‌دارند ولی residueهای کاتالیتیک کلیدی را ندارند؛ پس وجود موتیف باید چک شود، نه فرض."),
      B("Alignment quality strongly affects what looks conserved.", "کیفیت هم‌ترازی به‌شدت روی آنچه حفاظت‌شده به نظر می‌رسد اثر می‌گذارد.")
    ],
    next: B("Use conservation to predict the effect of a variant such as a gatekeeper mutation, then test the prediction against structure.",
            "از حفاظت‌شدگی برای پیش‌بینی اثر یک واریانت مثل جهش gatekeeper استفاده کن و پیش‌بینی را با ساختار بسنج."),
    tryit: [
      B("Align ABL1, SRC and a serine/threonine kinase (e.g. PKA) and mark GxGxxG, VAIK, HRD, DFG in each.", "ABL1 و SRC و یک کیناز سرین/ترئونین (مثلاً PKA) را هم‌تراز کن و GxGxxG، VAIK، HRD و DFG را در هرکدام علامت بزن."),
      B("Find a pseudokinase and describe which motifs are missing.", "یک شبه‌کیناز پیدا کن و بگو کدام موتیف‌ها را ندارد.")
    ],
    refs: ["Hanks SK, Quinn AM, Hunter T. The protein kinase family: conserved features and deduced phylogeny of the catalytic domains. Science 1988;241:42–52.",
           "Manning G et al. The protein kinase complement of the human genome. Science 2002;298:1912–1934.",
           "InterPro entry IPR000719 (Protein kinase domain); Pfam PF00069."]
  },

  /* 08 ------------------------------------------------ HIV origin */
  {
    id: "hiv-origin", free: false, level: "advanced", categories: ["phylogeny", "sequence"], workflows: ["phylogeny"],
    tools: ["mafft", "ncbi", "pubmed"],
    flow: ["Sequences", "Alignment", "Model", "Tree", "Interpretation"],
    title: B("Tracing the origin of HIV-1 with phylogenetics", "ردیابی منشأ HIV-1 با فیلوژنتیک"),
    hook: B("Why a tree, not similarity, answers 'where did it come from?'", "چرا برای پرسش «از کجا آمده؟» درخت لازم است، نه شباهت."),
    question: B("Where did HIV-1 come from, and what does a phylogenetic tree add beyond simple sequence similarity?",
                "HIV-1 از کجا آمده و درخت فیلوژنتیک چه چیزی فراتر از شباهت ساده‌ی توالی اضافه می‌کند؟"),
    input: B("Representative HIV-1 sequences (groups M, N, O, P) and simian immunodeficiency virus sequences from chimpanzees (SIVcpz) and gorillas (SIVgor), from public sequence databases.",
             "توالی‌های نماینده‌ی HIV-1 (گروه‌های M، N، O و P) و توالی‌های ویروس نقص ایمنی میمون‌ها از شامپانزه (SIVcpz) و گوریل (SIVgor) از پایگاه‌های عمومی توالی."),
    steps: [
      S("NCBI / sequence DB", "Collect sequences of a conserved gene region with metadata (host, country, year), balancing groups.", "توالی‌های یک ناحیه‌ی حفاظت‌شده را همراه با متادیتا (میزبان، کشور، سال) جمع کن و بین گروه‌ها تعادل برقرار کن."),
      S("MAFFT", "Align sequences and inspect the alignment by eye for problem regions.", "توالی‌ها را هم‌تراز کن و هم‌ترازی را با چشم برای نواحی مشکل‌دار بازبینی کن."),
      S("Model + Tree", "Choose a substitution model, infer a maximum-likelihood tree and assess support with bootstrap.", "یک مدل جایگزینی انتخاب کن، درخت maximum-likelihood بساز و پشتیبانی را با bootstrap بسنج."),
      S("Interpretation", "Read where each HIV-1 group nests among the SIV lineages, and how well supported that placement is.", "ببین هر گروه HIV-1 کجا بین دودمان‌های SIV قرار می‌گیرد و پشتیبانی این جایگاه چقدر است.")
    ],
    obs: [
      B("HIV-1 groups do not form one cluster: groups M and N nest within SIVcpz from chimpanzees, whereas groups O and P nest with SIVgor from gorillas, indicating separate cross-species transmissions.", "گروه‌های HIV-1 یک خوشه‌ی واحد نمی‌سازند: گروه‌های M و N داخل SIVcpz شامپانزه‌ها قرار می‌گیرند در حالی که گروه‌های O و P با SIVgor گوریل‌ها قرار می‌گیرند؛ یعنی انتقال‌های بین‌گونه‌ای جداگانه."),
      B("Group M, the pandemic group, traces to SIVcpz from chimpanzees in south-eastern Cameroon (Keele et al., 2006).", "گروه M، گروه پاندمیک، به SIVcpz شامپانزه‌های جنوب‌شرقی کامرون برمی‌گردد (Keele و همکاران، ۲۰۰۶)."),
      B("Molecular-clock analyses date the ancestor of group M to the early 20th century, with Kinshasa as an early hub (Worobey 2008; Faria 2014).", "تحلیل‌های ساعت مولکولی نیای گروه M را به اوایل قرن بیستم می‌رسانند و کینشاسا را یک کانون اولیه نشان می‌دهند (Worobey 2008؛ Faria 2014).")
    ],
    interp: B("Nesting inside the SIV diversity, not just high similarity, is what supports a zoonotic origin: it shows the human viruses descend from ape viruses. Dating shows decades of undetected spread before the syndrome was recognised in 1981.",
              "قرارگیری داخل تنوع SIV، نه فقط شباهت بالا، است که منشأ زئونوتیک را پشتیبانی می‌کند: نشان می‌دهد ویروس‌های انسانی از ویروس‌های میمون‌های آنتروپوئید منشعب شده‌اند. تاریخ‌گذاری چند دهه انتشار ناشناخته را قبل از شناسایی سندرم در ۱۹۸۱ نشان می‌دهد."),
    limit: [
      B("HIV recombines frequently, which violates the single-tree assumption; recombination-aware methods are needed.", "HIV زیاد نوترکیب می‌شود که فرض یک‌درخت را نقض می‌کند؛ روش‌های آگاه از نوترکیبی لازم است."),
      B("Ape sampling is sparse and non-invasive, so unsampled lineages may change the picture.", "نمونه‌برداری از میمون‌ها پراکنده و غیرتهاجمی است؛ پس دودمان‌های نمونه‌برداری‌نشده می‌توانند تصویر را تغییر دهند."),
      B("Clock dates depend on rate models and have wide credible intervals; a tree is a hypothesis about relatedness, not a map of individual transmission events.", "تاریخ‌های ساعت مولکولی به مدل نرخ وابسته‌اند و بازه‌های اطمینان پهن دارند؛ درخت یک فرضیه درباره‌ی خویشاوندی است، نه نقشه‌ی رویدادهای انتقال فردی.")
    ],
    next: B("Re-run the analysis with recombination detection and additional SIV sampling and check whether the placements stay supported.",
            "تحلیل را با تشخیص نوترکیبی و نمونه‌برداری بیشتر SIV تکرار کن و ببین جایگاه‌ها هنوز پشتیبانی می‌شوند یا نه."),
    tryit: [
      B("Build a small tree (about 20 sequences) with MAFFT plus a tree tool and record bootstrap values at the nodes that place groups M and O.", "با MAFFT و یک ابزار ساخت درخت یک درخت کوچک (حدود ۲۰ توالی) بساز و مقدار bootstrap گره‌هایی را که گروه‌های M و O را جا می‌دهند ثبت کن."),
      B("Fill a Phylogenetic Analysis Record and state one limitation about recombination.", "یک Phylogenetic Analysis Record پر کن و یک محدودیت درباره‌ی نوترکیبی بنویس.")
    ],
    refs: ["Gao F et al. Origin of HIV-1 in the chimpanzee Pan troglodytes troglodytes. Nature 1999;397:436–441.",
           "Keele BF et al. Chimpanzee reservoirs of pandemic and nonpandemic HIV-1. Science 2006;313:523–526.",
           "Worobey M et al. Direct evidence of extensive diversity of HIV-1 in Kinshasa by 1960. Nature 2008;455:661–664.",
           "Faria NR et al. The early spread and epidemic ignition of HIV-1 in human populations. Science 2014;346:56–61.",
           "Sharp PM, Hahn BH. Origins of HIV and the AIDS pandemic. Cold Spring Harb Perspect Med 2011;1:a006841."]
  },

  /* 09 ------------------------------------------ Hershey-Chase */
  {
    id: "hershey-chase", free: false, level: "beginner", categories: ["literature", "design"], workflows: ["paper", "experimental-design"],
    tools: ["pubmed"],
    flow: ["Question", "Design", "Result", "Interpretation", "Limitation"],
    title: B("Reading a classic: the Hershey–Chase experiment", "خواندن یک مقاله‌ی کلاسیک: آزمایش Hershey–Chase"),
    hook: B("How convincing was the 1952 evidence that DNA carries genetic information?", "شواهد ۱۹۵۲ برای اینکه DNA اطلاعات ژنتیکی را حمل می‌کند چقدر قانع‌کننده بود؟"),
    question: B("Which molecule enters the bacterial cell to direct new phage production — protein or DNA — and how strong was the evidence?",
                "کدام مولکول برای هدایت تولید فاژ جدید وارد سلول باکتری می‌شود — پروتئین یا DNA — و شواهد چقدر قوی بود؟"),
    input: B("Hershey AD, Chase M. Independent functions of viral protein and nucleic acid in growth of bacteriophage. J Gen Physiol 1952;36:39–56.",
             "Hershey AD, Chase M. Independent functions of viral protein and nucleic acid in growth of bacteriophage. J Gen Physiol 1952;36:39–56."),
    steps: [
      S("Question", "State the question and the two competing candidates (protein versus DNA).", "سؤال و دو کاندیدای رقیب (پروتئین در برابر DNA) را بنویس."),
      S("Design", "Protein was labelled with 35S and DNA with 32P (phosphorus is in DNA, sulfur in protein but not DNA). Labelled T2 phage infected E. coli.", "پروتئین با 35S و DNA با 32P نشانه‌گذاری شد (فسفر در DNA است، گوگرد در پروتئین نه در DNA). فاژ T2 نشان‌دار E. coli را آلوده کرد."),
      S("Method", "A blender detached phage particles from the cell surface; centrifugation separated cells (pellet) from phage ghosts (supernatant).", "میکسر ذرات فاژ را از سطح سلول جدا کرد؛ سانتریفیوژ سلول‌ها (رسوب) را از پوسته‌های فاژ (مایع رویی) جدا کرد.")
    ],
    obs: [
      B("Most 32P (DNA) label was found with the infected cells, while most 35S (protein) label remained in the supernatant with phage ghosts.", "بیشتر نشانگر 32P (DNA) همراه سلول‌های آلوده بود، در حالی که بیشتر نشانگر 35S (پروتئین) در مایع رویی همراه پوسته‌های فاژ ماند."),
      B("Progeny phage inherited a portion of the parental 32P but very little parental 35S.", "فاژهای نسل بعد بخشی از 32P والدی را به ارث بردند ولی 35S والدی بسیار کمی."),
    ],
    interp: B("The design gives a clean comparison: the two labels mark two different molecules, and the fate of each is measured separately. The authors concluded that phage protein has no function in later multiplication and that DNA has some function — a deliberately cautious statement.",
              "طراحی مقایسه‌ای تمیز می‌دهد: دو نشانگر دو مولکول متفاوت را علامت می‌زنند و سرنوشت هرکدام جدا سنجیده می‌شود. نویسندگان نتیجه گرفتند پروتئین فاژ در تکثیر بعدی نقشی ندارد و DNA نقشی دارد — یک بیان عمداً محتاطانه."),
    limit: [
      B("Separation was incomplete: some 35S always remained with cells, so the conclusion rests on relative amounts, not absolutes.", "جداسازی ناقص بود: مقداری 35S همیشه با سلول‌ها ماند؛ پس نتیجه بر مقدارهای نسبی استوار است، نه مطلق."),
      B("It was one virus in one host; earlier work (Avery, MacLeod, McCarty 1944) and later experiments were needed to build the general case.", "این یک ویروس در یک میزبان بود؛ کارهای قبلی (Avery, MacLeod, McCarty 1944) و آزمایش‌های بعدی برای ساختن حکم عمومی لازم بودند."),
      B("It does not show that DNA alone is sufficient; that required later evidence such as infection by purified nucleic acid.", "کافی بودن DNA به‌تنهایی را نشان نمی‌دهد؛ برای آن شواهد بعدی مثل آلودگی با اسید نوکلئیک خالص لازم بود.")
    ],
    next: B("What experiment shows that purified DNA alone can produce infection or transformation?",
            "چه آزمایشی نشان می‌دهد DNA خالص به‌تنهایی می‌تواند عفونت یا ترانسفورماسیون ایجاد کند؟"),
    tryit: [
      B("Fill a Paper Reading Record for this paper with the Observation and Interpretation sections kept strictly separate.", "یک Paper Reading Record برای این مقاله پر کن و بخش‌های Observation و Interpretation را کاملاً جدا نگه دار."),
      B("Write what result would have told you protein was the genetic material.", "بنویس چه نتیجه‌ای نشان می‌داد پروتئین ماده‌ی ژنتیکی است.")
    ],
    refs: ["Hershey AD, Chase M. J Gen Physiol 1952;36:39–56.",
           "Avery OT, MacLeod CM, McCarty M. Studies on the chemical nature of the substance inducing transformation of pneumococcal types. J Exp Med 1944;79:137–158."]
  },

  /* 10 ------------------------------------------------ Ioannidis */
  {
    id: "ioannidis-2005", free: false, level: "intermediate", categories: ["literature", "design"], workflows: ["paper", "data-analysis"],
    tools: ["pubmed", "r", "python"],
    flow: ["Claim", "Prior", "Power", "Bias", "PPV"],
    title: B("Why a 'significant' result can still be false", "چرا یک نتیجه‌ی «معنادار» باز هم می‌تواند غلط باشد"),
    hook: B("Read a paper about reading papers.", "مقاله‌ای درباره‌ی خواندن مقاله‌ها بخوان."),
    question: B("Given p < 0.05, how likely is a published positive finding to be true, and what does that depend on?",
                "با p < 0.05 احتمال درست بودن یک یافته‌ی مثبت منتشرشده چقدر است و به چه چیزهایی بستگی دارد؟"),
    input: B("Ioannidis JPA. Why most published research findings are false. PLoS Med 2005;2(8):e124.",
             "Ioannidis JPA. Why most published research findings are false. PLoS Med 2005;2(8):e124."),
    steps: [
      S("Concept", "Positive predictive value (PPV) is the probability a positive finding is true. In the basic model PPV = (1 − β)R / (R − βR + α), where R is the pre-study odds, α the significance level and 1 − β the power.", "ارزش پیش‌بینی مثبت (PPV) احتمال درست بودن یک یافته‌ی مثبت است. در مدل پایه PPV = (1 − β)R / (R − βR + α) که R شانس پیش از مطالعه، α سطح معناداری و 1 − β توان است."),
      S("Calculate", "Try α = 0.05, power 0.8 and R = 1:10, then power 0.2 with the same R.", "α = 0.05، توان ۰٫۸ و R = 1:10 را امتحان کن، بعد توان ۰٫۲ با همان R."),
      S("Read", "Read the paper's corollaries on effect size, number of tested relationships, flexibility of designs and bias.", "نتیجه‌های فرعی مقاله درباره‌ی اندازه‌ی اثر، تعداد رابطه‌های آزمون‌شده، انعطاف طراحی و سوگیری را بخوان.")
    ],
    obs: [
      B("With α = 0.05, power 0.8 and R = 0.1, PPV ≈ 0.62. With power 0.2 and the same R, PPV ≈ 0.29.", "با α = 0.05، توان ۰٫۸ و R = 0.1 مقدار PPV ≈ 0.62 می‌شود. با توان ۰٫۲ و همان R مقدار PPV ≈ 0.29."),
      B("Lower prior odds, small studies, small effects, many tested hypotheses and analytic flexibility all reduce PPV.", "شانس پیشین کمتر، مطالعات کوچک، اثرهای کوچک، فرضیه‌های آزمون‌شده‌ی زیاد و انعطاف تحلیلی همگی PPV را کم می‌کنند.")
    ],
    interp: B("A p-value is not the probability that a hypothesis is true. Whether a significant result is believable depends on how plausible the hypothesis was, how well powered the study was and how much bias crept in.",
              "p-value احتمال درست بودن فرضیه نیست. اینکه یک نتیجه‌ی معنادار باورپذیر است یا نه به این بستگی دارد که فرضیه چقدر محتمل بود، مطالعه چقدر توان داشت و چقدر سوگیری وارد شد."),
    limit: [
      B("It is a theoretical model with assumptions; critiques argue its conclusion is too strong (Goodman & Greenland 2007).", "این یک مدل نظری با فرض‌هاست؛ نقدها می‌گویند نتیجه‌اش بیش‌ازحد قوی است (Goodman و Greenland 2007)."),
      B("Empirical estimates of the false-discovery rate in some literatures are lower than the title suggests (e.g. Jager & Leek 2014).", "برآوردهای تجربی نرخ کشف کاذب در بعضی ادبیات پایین‌تر از چیزی است که عنوان القا می‌کند (مثلاً Jager و Leek 2014)."),
      B("It does not tell you which particular published result is false.", "نمی‌گوید کدام نتیجه‌ی منتشرشده‌ی مشخص غلط است.")
    ],
    next: B("Estimate a plausible prior and power for a claim in your own field and see how PPV changes; consider pre-registration and independent replication.",
            "برای یک ادعا در حوزه‌ی خودت پیشین و توان معقولی برآورد کن و ببین PPV چطور تغییر می‌کند؛ ثبت پیشین پروتکل و replicate مستقل را در نظر بگیر."),
    tryit: [
      B("Compute PPV for three combinations of prior odds and power in R or Python and tabulate them.", "PPV را برای سه ترکیب از شانس پیشین و توان در R یا Python محاسبه و جدول کن."),
      B("Read the ASA statement on p-values and list its six principles.", "بیانیه‌ی ASA درباره‌ی p-value را بخوان و شش اصلش را فهرست کن.")
    ],
    refs: ["Ioannidis JPA. PLoS Med 2005;2(8):e124.",
           "Goodman S, Greenland S. Assessing the unreliability of the medical literature: a response to 'Why most published research findings are false'. PLoS Med 2007;4:e168.",
           "Jager LR, Leek JT. An estimate of the science-wise false discovery rate. Biostatistics 2014;15:1–12.",
           "Wasserstein RL, Lazar NA. The ASA statement on p-values: context, process, and purpose. Am Stat 2016;70:129–133."]
  },

  /* 11 ------------------------------------------------- Druker 2001 */
  {
    id: "druker-2001", free: false, level: "intermediate", categories: ["literature", "drug"], workflows: ["paper", "drug"],
    tools: ["pubmed"],
    flow: ["Question", "Design", "Figures", "Evidence", "Limitation"],
    title: B("Reading a first-in-human trial: imatinib in CML", "خواندن یک کارآزمایی نخستین‌بار در انسان: imatinib در CML"),
    hook: B("What a phase 1 paper can — and cannot — prove.", "یک مقاله‌ی فاز ۱ چه چیزی را می‌تواند و چه چیزی را نمی‌تواند ثابت کند."),
    question: B("What did the first clinical trial of imatinib in chronic myeloid leukemia actually show, and what could it not show?",
                "اولین کارآزمایی بالینی imatinib در لوسمی میلوئید مزمن واقعاً چه چیزی نشان داد و چه چیزی را نمی‌توانست نشان دهد؟"),
    input: B("Druker BJ et al. Efficacy and safety of a specific inhibitor of the BCR-ABL tyrosine kinase in chronic myeloid leukemia. N Engl J Med 2001;344:1031–1037.",
             "Druker BJ et al. Efficacy and safety of a specific inhibitor of the BCR-ABL tyrosine kinase in chronic myeloid leukemia. N Engl J Med 2001;344:1031–1037."),
    steps: [
      S("Design", "Identify the design: a phase 1 dose-escalation study in patients whose chronic-phase CML had failed interferon alfa.", "طراحی را مشخص کن: یک مطالعه‌ی فاز ۱ با افزایش دوز در بیمارانی که CML فاز مزمنشان به interferon alfa پاسخ نداده بود."),
      S("Endpoints", "Note the outcomes reported: safety, dose, and hematologic and cytogenetic response.", "پیامدهای گزارش‌شده را یادداشت کن: ایمنی، دوز و پاسخ هماتولوژیک و سیتوژنتیک."),
      S("Figures", "Read the dose–response table before the discussion.", "قبل از بحث، جدول دوز–پاسخ را بخوان.")
    ],
    obs: [
      B("At daily doses of 300 mg or more, complete hematologic responses were seen in the great majority of patients (53 of 54).", "در دوزهای روزانه‌ی ۳۰۰ میلی‌گرم یا بیشتر، پاسخ هماتولوژیک کامل در اکثریت قاطع بیماران دیده شد (۵۳ از ۵۴)."),
      B("Side effects were generally mild, and a maximum tolerated dose was not reached in the tested range.", "عوارض جانبی در کل خفیف بودند و در بازه‌ی آزمون‌شده به حداکثر دوز قابل تحمل نرسیدند.")
    ],
    interp: B("This was proof of concept: inhibiting the driver kinase (BCR-ABL) can produce remissions, supporting the target-based approach that the structure and mechanism (see the imatinib case) had suggested.",
              "این اثبات مفهوم بود: مهار کینازِ محرک (BCR-ABL) می‌تواند به بهبود منجر شود و رویکرد مبتنی بر target را که ساختار و مکانیسم (Case «imatinib» را ببین) پیشنهاد کرده بودند تقویت کرد."),
    limit: [
      B("Phase 1, single-arm and short follow-up: no control group, and hematologic response is a surrogate for survival.", "فاز ۱، تک‌بازو و با پیگیری کوتاه: گروه کنترل نداشت و پاسخ هماتولوژیک جانشینی برای بقاست."),
      B("The population (interferon-refractory chronic-phase patients) limits generalisation.", "جمعیت (بیماران فاز مزمن مقاوم به interferon) تعمیم را محدود می‌کند."),
      B("Superiority over standard therapy needed the later randomised IRIS trial (O'Brien 2003); acquired resistance emerged afterwards.", "برتری نسبت به درمان استاندارد به کارآزمایی تصادفی‌شده‌ی IRIS بعدی نیاز داشت (O'Brien 2003)؛ مقاومت اکتسابی پس از آن پدیدار شد.")
    ],
    next: B("What do the randomised IRIS trial and its long-term follow-up add that a phase 1 study cannot?",
            "کارآزمایی تصادفی‌شده‌ی IRIS و پیگیری بلندمدتش چه چیزی اضافه می‌کنند که یک مطالعه‌ی فاز ۱ نمی‌تواند؟"),
    tryit: [
      B("Complete a Paper Reading Record and mark each claim as 'measured' or 'interpreted'.", "یک Paper Reading Record کامل کن و هر ادعا را «اندازه‌گیری‌شده» یا «تفسیری» علامت بزن."),
      B("Find the IRIS trial in PubMed and compare its design with this one in a short table.", "کارآزمایی IRIS را در PubMed پیدا کن و طراحی‌اش را در یک جدول کوتاه با این مطالعه مقایسه کن.")
    ],
    refs: ["Druker BJ et al. N Engl J Med 2001;344:1031–1037.",
           "O'Brien SG et al. Imatinib compared with interferon and low-dose cytarabine for newly diagnosed chronic-phase chronic myeloid leukemia. N Engl J Med 2003;348:994–1004."]
  },

  /* 12 ------------------------------------------- Meselson-Stahl */
  {
    id: "meselson-stahl", free: true, level: "beginner", categories: ["design", "literature"], workflows: ["experimental-design"],
    tools: [],
    flow: ["Hypotheses", "Predictions", "Experiment", "Observation", "Conclusion"],
    title: B("Designing a decisive experiment: Meselson–Stahl", "طراحی یک آزمایش قاطع: Meselson–Stahl"),
    hook: B("Three hypotheses, one experiment, one clear answer.", "سه فرضیه، یک آزمایش، یک پاسخ روشن."),
    question: B("After DNA replicates, are the parental strands kept together (conservative), split between daughters (semiconservative) or fragmented and mixed (dispersive)?",
                "پس از همانندسازی DNA، رشته‌های والدی کنار هم می‌مانند (محافظه‌کارانه)، بین دختران تقسیم می‌شوند (نیمه‌محافظه‌کارانه) یا تکه‌تکه و مخلوط می‌شوند (پراکنده)؟"),
    input: B("E. coli grown for many generations in medium with heavy nitrogen (15N), then shifted to light nitrogen (14N); DNA analysed by CsCl density-gradient centrifugation.",
             "E. coli که چند نسل در محیط دارای نیتروژن سنگین (15N) رشد کرده و سپس به نیتروژن سبک (14N) منتقل شده؛ DNA با سانتریفیوژ گرادیان چگالی CsCl تحلیل می‌شود."),
    steps: [
      S("Hypotheses", "Write the three models and, for each, what DNA densities you expect after one and two generations in light medium.", "سه مدل را بنویس و برای هرکدام چگالی‌های DNA مورد انتظار بعد از یک و دو نسل در محیط سبک را مشخص کن."),
      S("Experiment", "Grow in 15N, shift to 14N, sample at generation 0, ~1 and ~2; centrifuge in CsCl and photograph the bands.", "در 15N رشد بده، به 14N منتقل کن، در نسل ۰، حدود ۱ و حدود ۲ نمونه بگیر؛ در CsCl سانتریفیوژ کن و باندها را عکس بگیر."),
      S("Controls", "Include a heavy-only and a light-only sample so band positions are calibrated.", "یک نمونه‌ی فقط سنگین و یک نمونه‌ی فقط سبک برای کالیبره‌کردن جایگاه باندها بگذار.")
    ],
    obs: [
      B("Generation 0: a single heavy band. After one generation: a single band of intermediate density. After about two generations: two bands, intermediate and light, in similar amounts.", "نسل ۰: یک باند سنگین. بعد از یک نسل: یک باند با چگالی میانی. بعد از حدود دو نسل: دو باند، میانی و سبک، با مقدار مشابه."),
      B("A conservative model predicts heavy and light bands (no intermediate) after one generation, so it is excluded; a dispersive model predicts one band that gets lighter over generations, so the two-band result excludes it.", "مدل محافظه‌کارانه بعد از یک نسل باند سنگین و سبک (بدون میانی) پیش‌بینی می‌کند و رد می‌شود؛ مدل پراکنده یک باند که نسل به نسل سبک‌تر می‌شود پیش‌بینی می‌کند و نتیجه‌ی دوباندی آن را رد می‌کند.")
    ],
    interp: B("The strength of the design is that each hypothesis makes a different, checkable prediction, so the observation excludes two models and supports the third. This is the template for good experimental design: hypotheses → predictions → controls → decisive readout.",
              "قوت طراحی در این است که هر فرضیه پیش‌بینی متفاوت و قابل‌بررسی دارد؛ پس مشاهده دو مدل را رد و مدل سوم را پشتیبانی می‌کند. این الگوی طراحی خوب آزمایش است: فرضیه ← پیش‌بینی ← کنترل ← سنجش قاطع."),
    limit: [
      B("The experiment shows how labelled DNA is distributed, not the enzymatic mechanism of replication.", "آزمایش توزیع DNA نشان‌دار را نشان می‌دهد، نه مکانیسم آنزیمی همانندسازی را."),
      B("It was done in E. coli; generality to other organisms was shown separately (e.g. Taylor et al. 1957 in plant chromosomes).", "در E. coli انجام شد؛ تعمیم به ارگانیسم‌های دیگر جداگانه نشان داده شد (مثلاً Taylor و همکاران 1957 روی کروموزوم‌های گیاهی)."),
      B("Density banding reflects bulk DNA subunits, so structural details need other methods.", "باندهای چگالی زیرواحدهای DNA در حجم را نشان می‌دهند؛ پس جزئیات ساختاری به روش‌های دیگر نیاز دارند.")
    ],
    next: B("What further experiment tests the structure of the hybrid molecule, for example separating its strands after heat denaturation?",
            "چه آزمایش بعدی ساختار مولکول هیبرید را می‌آزماید، مثلاً جداکردن رشته‌هایش بعد از دناتوره‌کردن با حرارت؟"),
    tryit: [
      B("Draw the predicted band patterns for all three models at generations 0, 1 and 2 before looking at the result.", "الگوی باند پیش‌بینی‌شده برای هر سه مدل در نسل‌های ۰، ۱ و ۲ را قبل از دیدن نتیجه بکش."),
      B("Use the Experimental Design template to plan a similar decisive experiment for a question of your own.", "با قالب Experimental Design یک آزمایش قاطع مشابه برای یک سؤال خودت طراحی کن.")
    ],
    refs: ["Meselson M, Stahl FW. The replication of DNA in Escherichia coli. Proc Natl Acad Sci USA 1958;44:671–682.",
           "Taylor JH, Woods PS, Hughes WL. The organization and duplication of chromosomes as revealed by autoradiographic studies using tritium-labeled thymidine. Proc Natl Acad Sci USA 1957;43:122–128."]
  },

  /* 13 ---------------------------------------------- Anscombe */
  {
    id: "anscombe-quartet", free: false, level: "beginner", categories: ["design"], workflows: ["data-analysis"],
    tools: ["r", "python", "graphpad-prism"],
    flow: ["Data", "Summary", "Plot", "Test", "Report"],
    title: B("Same statistics, different data: Anscombe's quartet", "آمار یکسان، داده‌ی متفاوت: چهارتایی Anscombe"),
    hook: B("Why you must plot your data before you test it.", "چرا باید داده را قبل از آزمون رسم کنی."),
    question: B("If two datasets have identical summary statistics and regression lines, are they telling the same story?",
                "اگر دو مجموعه‌داده آمار خلاصه و خط رگرسیون یکسان داشته باشند، همان داستان را می‌گویند؟"),
    input: B("Anscombe's quartet: four small datasets of 11 (x, y) pairs each (Anscombe 1973).",
             "چهارتایی Anscombe: چهار مجموعه‌داده‌ی کوچک هرکدام با ۱۱ جفت (x, y) (Anscombe 1973)."),
    steps: [
      S("Summarise", "Compute mean, variance, correlation and the linear regression for each dataset.", "میانگین، واریانس، همبستگی و رگرسیون خطی را برای هر مجموعه‌داده حساب کن."),
      S("Plot", "Draw a scatter plot of each dataset.", "برای هر مجموعه‌داده یک نمودار پراکندگی رسم کن."),
      S("Compare", "Ask whether a straight-line model is appropriate for each.", "بپرس آیا مدل خط مستقیم برای هرکدام مناسب است.")
    ],
    obs: [
      B("All four have essentially the same mean of x (9) and y (about 7.5), variance of x (11) and y (about 4.1), correlation (about 0.82) and regression line (y ≈ 3.0 + 0.5x).", "هر چهار مجموعه اساساً میانگین x (برابر ۹) و y (حدود ۷٫۵)، واریانس x (برابر ۱۱) و y (حدود ۴٫۱)، همبستگی (حدود ۰٫۸۲) و خط رگرسیون (‏y ≈ 3.0 + 0.5x) یکسان دارند."),
      B("The plots differ completely: one is a noisy linear trend, one is a curve, one is a tight line with a single outlier, and one is a vertical cluster with a single high-leverage point.", "نمودارها کاملاً فرق می‌کنند: یکی روند خطی نویزدار، یکی منحنی، یکی خط تنگ با یک outlier و یکی خوشه‌ی عمودی با یک نقطه‌ی پرنفوذ است.")
    ],
    interp: B("Summary statistics compress data and can hide structure. Correlation and regression are sensitive to curvature, outliers and leverage points, so a plot is part of the analysis, not decoration.",
              "آمار خلاصه داده را فشرده می‌کند و می‌تواند ساختار را پنهان کند. همبستگی و رگرسیون به انحنا، outlier و نقاط پرنفوذ حساس‌اند؛ پس نمودار بخشی از تحلیل است، نه تزئین."),
    limit: [
      B("These are small constructed datasets meant to teach; they show what can go wrong, not how often it does.", "این‌ها مجموعه‌داده‌های کوچک ساختگی برای آموزش‌اند؛ نشان می‌دهند چه چیزی ممکن است خراب شود، نه اینکه چقدر رخ می‌دهد."),
      B("Plotting does not replace formal checks of assumptions or a suitable model.", "رسم نمودار جای بررسی رسمی فرض‌ها یا مدل مناسب را نمی‌گیرد.")
    ],
    next: B("Apply the habit to your own data: plot first, then choose the test; consider robust methods when outliers matter.",
            "این عادت را روی داده‌ی خودت اعمال کن: اول رسم کن، بعد آزمون را انتخاب کن؛ وقتی outlierها مهم‌اند روش‌های robust را در نظر بگیر."),
    tryit: [
      B("Load the quartet in R (the anscombe dataset is built in) or Python and reproduce the four plots.", "چهارتایی را در R (مجموعه‌داده‌ی anscombe داخلی است) یا Python بارگذاری کن و چهار نمودار را بازتولید کن."),
      B("Add a fifth dataset of your own with the same mean and variance but a different shape.", "یک مجموعه‌داده‌ی پنجم خودت با همان میانگین و واریانس ولی شکل متفاوت اضافه کن.")
    ],
    refs: ["Anscombe FJ. Graphs in statistical analysis. Am Stat 1973;27:17–21.",
           "Matejka J, Fitzmaurice G. Same stats, different graphs: generating datasets with varied appearance and identical statistics through simulated annealing. CHI 2017.",
           "Wasserstein RL, Lazar NA. The ASA statement on p-values. Am Stat 2016;70:129–133."]
  },

  /* 14 ------------------------------------ Antibody validation */
  {
    id: "antibody-validation", free: false, level: "intermediate", categories: ["lab", "design"], workflows: ["experimental-design"], technique: "western",
    tools: ["hpa"],
    flow: ["Antibody", "Controls", "Pillars", "Result", "Claim"],
    title: B("Is your antibody detecting your protein? The five pillars", "آنتی‌بادی‌ات پروتئین تو را می‌بیند؟ پنج ستون اعتبارسنجی"),
    hook: B("A band at the right size is not proof.", "باند در اندازه‌ی درست اثبات نیست."),
    question: B("How do you know an antibody detects your target — and only your target — in your application?",
                "از کجا می‌فهمی یک آنتی‌بادی هدف تو را — و فقط هدف تو را — در کاربرد تو تشخیص می‌دهد؟"),
    input: B("A commercial primary antibody, cells or tissue that express the target and, ideally, a matched sample that lacks it.",
             "یک آنتی‌بادی اولیه‌ی تجاری، سلول یا بافتی که هدف را بیان می‌کند و ترجیحاً یک نمونه‌ی متناظر که ندارد."),
    steps: [
      S("Genetic", "Test the antibody in knockout or knockdown material; the signal should disappear or drop.", "آنتی‌بادی را در مواد knockout یا knockdown آزمون کن؛ سیگنال باید حذف یا کم شود."),
      S("Orthogonal", "Compare signal across samples with an antibody-independent measurement (e.g. RNA or mass-spectrometry levels).", "سیگنال را بین نمونه‌ها با یک اندازه‌گیری مستقل از آنتی‌بادی (مثلاً سطح RNA یا طیف‌سنجی جرمی) مقایسه کن."),
      S("Independent antibodies", "Use a second antibody against a different epitope and compare the patterns.", "از آنتی‌بادی دوم علیه اپی‌توپ دیگر استفاده کن و الگوها را مقایسه کن."),
      S("Tagged expression / capture", "Confirm with tagged-protein expression or immunocapture followed by mass spectrometry.", "با بیان پروتئین دارای تگ یا immunocapture و سپس طیف‌سنجی جرمی تأیید کن.")
    ],
    obs: [
      B("A proposal from the Human Protein Atlas group defined five pillars of antibody validation: genetic, orthogonal, independent antibodies, tagged protein expression and immunocapture with mass spectrometry.", "پیشنهادی از گروه Human Protein Atlas پنج ستون اعتبارسنجی آنتی‌بادی را تعریف کرد: ژنتیکی، orthogonal، آنتی‌بادی‌های مستقل، بیان پروتئین دارای تگ و immunocapture با طیف‌سنجی جرمی."),
      B("Commentaries in Nature have argued that poorly characterised antibodies are a major contributor to irreproducible results and called for standardisation.", "مقاله‌های نظری در Nature استدلال کرده‌اند که آنتی‌بادی‌های ناکافی شناسایی‌شده سهم بزرگی در نتایج غیرقابل‌تکرار دارند و استانداردسازی خواسته‌اند.")
    ],
    interp: B("Validation is specific to an application and context: an antibody validated for Western blot is not automatically validated for immunofluorescence or immunoprecipitation. Using at least two independent lines of evidence makes the claim much harder to overturn.",
              "اعتبارسنجی مخصوص کاربرد و زمینه است: آنتی‌بادی معتبر برای وسترن بلات خودبه‌خود برای ایمونوفلورسانس یا ایمونوپرسیپیتیشن معتبر نیست. داشتن دست‌کم دو خط شواهد مستقل ادعا را بسیار سخت‌تر قابل‌رد می‌کند."),
    limit: [
      B("Knockout or knockdown material is not always available or cheap; then orthogonal and independent-antibody evidence carries the weight.", "مواد knockout یا knockdown همیشه در دسترس یا ارزان نیستند؛ آن‌وقت شواهد orthogonal و آنتی‌بادی مستقل بار اصلی را می‌برند."),
      B("Lot-to-lot variation, especially in polyclonals, means validation may need repeating for new lots.", "تفاوت بین لات‌ها، به‌ویژه در پلی‌کلونال‌ها، یعنی ممکن است اعتبارسنجی برای لات جدید تکرار شود."),
      B("Passing validation shows fitness for that use, not that the biology you infer is correct.", "قبول‌شدن در اعتبارسنجی مناسب‌بودن برای همان کاربرد را نشان می‌دهد، نه درست‌بودن زیست‌شناسی‌ای که استنباط می‌کنی.")
    ],
    next: B("Prefer recombinant antibodies and check open antibody-characterisation resources before buying; record catalogue number, lot and dilution in your methods.",
            "آنتی‌بادی‌های ریکامبیننت را ترجیح بده و قبل از خرید منابع باز شناسایی آنتی‌بادی را ببین؛ شماره‌ی کاتالوگ، لات و رقت را در روش‌هایت ثبت کن."),
    tryit: [
      B("Choose an antibody you use and list which of the five pillars you currently have evidence for.", "یک آنتی‌بادی که استفاده می‌کنی انتخاب کن و فهرست کن برای کدام ستون‌ها شواهد داری."),
      B("Design a minimal validation plan (two pillars) using the Experimental Design template.", "با قالب Experimental Design یک برنامه‌ی حداقلی اعتبارسنجی (دو ستون) طراحی کن.")
    ],
    refs: ["Uhlén M et al. A proposal for validation of antibodies. Nat Methods 2016;13:823–827.",
           "Baker M. Reproducibility crisis: blame it on the antibodies. Nature 2015;521:274–276.",
           "Bradbury A, Plückthun A. Reproducibility: standardize antibodies used in research. Nature 2015;518:27–29."]
  },

  /* 15 ---------------------------------------- CRISPR off-target */
  {
    id: "crispr-offtarget", free: false, level: "advanced", categories: ["lab", "gene"], workflows: ["experimental-design"], technique: "crispr",
    tools: ["ensembl", "ncbi-gene"],
    flow: ["Guide", "Prediction", "Detection", "Validation", "Claim"],
    title: B("Is your CRISPR edit specific? Off-target evidence", "ویرایش CRISPR تو اختصاصی است؟ شواهد off-target"),
    hook: B("Prediction is not detection.", "پیش‌بینی همان تشخیص نیست."),
    question: B("How can you judge whether a CRISPR–Cas9 edit is specific, and what evidence should accompany a phenotype claim?",
                "چطور می‌توان قضاوت کرد یک ویرایش CRISPR–Cas9 اختصاصی است و چه شواهدی باید همراه ادعای فنوتیپ باشد؟"),
    input: B("A guide RNA targeting a gene in human cells with SpCas9; predicted off-target sites from design tools; genome-wide detection methods.",
             "یک guide RNA علیه یک ژن در سلول انسانی با SpCas9؛ جایگاه‌های off-target پیش‌بینی‌شده از ابزارهای طراحی؛ روش‌های تشخیص در سطح ژنوم."),
    steps: [
      S("Design", "Score guides with a design tool (for example CRISPOR or CHOPCHOP), prefer guides with few close matches and record predicted off-targets.", "guideها را با یک ابزار طراحی (مثلاً CRISPOR یا CHOPCHOP) امتیازدهی کن، guideهای با تطابق نزدیک کم را ترجیح بده و off-targetهای پیش‌بینی‌شده را ثبت کن."),
      S("Detect", "Look for off-target cutting empirically (for example GUIDE-seq) and amplicon-sequence the top candidate sites.", "off-target را تجربی جست‌وجو کن (مثلاً GUIDE-seq) و بالاترین جایگاه‌های کاندید را amplicon sequencing کن."),
      S("Validate", "Reproduce the phenotype with at least two independent guides and, where possible, rescue it.", "فنوتیپ را با دست‌کم دو guide مستقل بازتولید کن و در صورت امکان rescue انجام بده.")
    ],
    obs: [
      B("An early human-cell study found that SpCas9 can tolerate several mismatches, with off-target mutation rates at some sites comparable to the on-target site (Fu et al., 2013).", "یک مطالعه‌ی اولیه در سلول انسانی نشان داد SpCas9 می‌تواند چند mismatch را تحمل کند و در بعضی جایگاه‌ها نرخ جهش off-target قابل‌مقایسه با جایگاه on-target است (Fu و همکاران، ۲۰۱۳)."),
      B("Mitigations followed: truncated guides, high-fidelity Cas9 variants (e.g. SpCas9-HF1, eSpCas9) and transient ribonucleoprotein delivery.", "راهکارهای کاهش‌دهنده به دنبالش آمد: guideهای کوتاه‌شده، واریانت‌های Cas9 با دقت بالا (مثل SpCas9-HF1 و eSpCas9) و تحویل گذرای ریبونوکلئوپروتئین.")
    ],
    interp: B("In-silico prediction ranks risk but cannot prove absence of off-target editing. A convincing claim combines careful guide choice, empirical off-target detection and phenotype confirmation with independent guides, ideally with a rescue.",
              "پیش‌بینی in-silico ریسک را رتبه‌بندی می‌کند ولی نبود ویرایش off-target را ثابت نمی‌کند. ادعای قانع‌کننده انتخاب دقیق guide، تشخیص تجربی off-target و تأیید فنوتیپ با guideهای مستقل را ترکیب می‌کند، ترجیحاً همراه با rescue."),
    limit: [
      B("Detection methods have limited sensitivity and depend on cell type and delivery.", "روش‌های تشخیص حساسیت محدود دارند و به نوع سلول و روش تحویل وابسته‌اند."),
      B("Results in cell lines do not automatically transfer to primary cells or in vivo.", "نتایج در رده‌های سلولی خودبه‌خود به سلول‌های اولیه یا in vivo منتقل نمی‌شوند."),
      B("On-target problems such as large deletions or rearrangements can also occur and need separate checks.", "مشکلات on-target مثل حذف‌های بزرگ یا بازآرایی‌ها هم ممکن است رخ دهد و بررسی جدا می‌خواهد.")
    ],
    next: B("How do you check for large on-target deletions and confirm that a clonal line carries the intended allele only?",
            "چطور حذف‌های بزرگ on-target را چک می‌کنی و مطمئن می‌شوی یک رده‌ی کلونال فقط آلل موردنظر را دارد؟"),
    tryit: [
      B("Design two guides for a gene you know, list their top predicted off-targets and decide how you would test the three highest-risk sites.", "برای یک ژن آشنا دو guide طراحی کن، off-targetهای برتر پیش‌بینی‌شده را فهرست کن و تصمیم بگیر سه جایگاه پرخطر را چطور بیازمایی."),
      B("Write a validation plan using the CRISPR troubleshooting entries in the library.", "با استفاده از بخش‌های CRISPR در کتابخانه‌ی رفع اشکال یک برنامه‌ی اعتبارسنجی بنویس.")
    ],
    refs: ["Fu Y et al. High-frequency off-target mutagenesis induced by CRISPR-Cas nucleases in human cells. Nat Biotechnol 2013;31:822–826.",
           "Fu Y et al. Improving CRISPR-Cas nuclease specificity using truncated guide RNAs. Nat Biotechnol 2014;32:279–284.",
           "Tsai SQ et al. GUIDE-seq enables genome-wide profiling of off-target cleavage by CRISPR-Cas nucleases. Nat Biotechnol 2015;33:187–197.",
           "Kleinstiver BP et al. High-fidelity CRISPR-Cas9 nucleases with no detectable genome-wide off-target effects. Nature 2016;529:490–495.",
           "Slaymaker IM et al. Rationally engineered Cas9 nucleases with improved specificity. Science 2016;351:84–88.",
           "Kosicki M, Tomberg K, Bradley A. Repair of double-strand breaks induced by CRISPR-Cas9 leads to large deletions and complex rearrangements. Nat Biotechnol 2018;36:765–771."]
  },

  /* 16 ---------------------------------------------- qPCR MIQE */
  {
    id: "qpcr-miqe", free: false, level: "intermediate", categories: ["lab", "design"], workflows: ["data-analysis"], technique: "qpcr",
    tools: [],
    flow: ["RNA", "Assay", "Reference genes", "Analysis", "Reporting"],
    title: B("Why two labs get different qPCR fold-changes: the MIQE checklist", "چرا دو آزمایشگاه از qPCR فولد‌چنج متفاوت می‌گیرند: چک‌لیست MIQE"),
    hook: B("Small details decide whether a fold-change can be trusted.", "جزئیات کوچک تعیین می‌کنند یک fold-change قابل‌اعتماد است یا نه."),
    question: B("What choices in a qPCR experiment change the reported fold-change, and what minimum information lets others judge it?",
                "چه انتخاب‌هایی در یک آزمایش qPCR fold-change گزارش‌شده را تغییر می‌دهند و چه حداقل اطلاعاتی به دیگران اجازه‌ی قضاوت می‌دهد؟"),
    input: B("The MIQE guidelines (Bustin et al., Clin Chem 2009) and a typical relative-quantification experiment (target and reference genes, treated versus control).",
             "راهنمای MIQE (Bustin و همکاران، Clin Chem 2009) و یک آزمایش کمی‌سازی نسبی معمول (ژن هدف و مرجع، تیمار در برابر کنترل)."),
    steps: [
      S("RNA", "Record RNA quality and integrity and include a no-RT control.", "کیفیت و integrity RNA را ثبت کن و کنترل no-RT بگذار."),
      S("Assay", "Determine amplification efficiency from a dilution series and check melt-curve specificity.", "کارایی تکثیر را از سری رقت تعیین و اختصاصیت melt curve را بررسی کن."),
      S("Reference genes", "Validate reference-gene stability under your conditions instead of assuming it (for example with geNorm-type analysis).", "پایداری ژن مرجع را در شرایط خودت اعتبارسنجی کن، نه اینکه فرضش کنی (مثلاً با تحلیل شبیه geNorm)."),
      S("Statistics", "Use independent biological replicates as n and report raw Cq values.", "biological replicate مستقل را به‌عنوان n استفاده کن و Cq خام را گزارش کن.")
    ],
    obs: [
      B("The 2^−ΔΔCq method assumes about 100% efficiency. If true efficiency is 1.9 per cycle, a 3-cycle difference corresponds to about 6.9-fold (1.9³) rather than 8-fold (2³) — an overestimate of roughly 17%.", "روش 2^−ΔΔCq حدود ۱۰۰٪ کارایی را فرض می‌کند. اگر کارایی واقعی ۱٫۹ در هر چرخه باشد، اختلاف ۳ سیکل معادل حدود ۶٫۹ برابر (‏1.9³) است، نه ۸ برابر (‏2³) — بیش‌برآورد حدود ۱۷٪."),
      B("Commonly used 'housekeeping' genes can change with treatment or cell state, so an unvalidated reference gene can shift every result.", "ژن‌های «housekeeping» رایج می‌توانند با تیمار یا وضعیت سلول تغییر کنند؛ پس یک ژن مرجع اعتبارسنجی‌نشده می‌تواند همه‌ی نتایج را جابه‌جا کند.")
    ],
    interp: B("A fold-change is the product of many choices: RNA quality, efficiency, normalisation and statistics. Reporting them (as MIQE asks) lets a reader decide whether the number can be trusted, and lets another lab reproduce it.",
              "fold-change حاصل انتخاب‌های زیادی است: کیفیت RNA، کارایی، نرمال‌سازی و آمار. گزارش‌کردن آن‌ها (آنچه MIQE می‌خواهد) به خواننده اجازه می‌دهد بسنجد عدد قابل‌اعتماد است یا نه و به آزمایشگاه دیگر اجازه‌ی بازتولید می‌دهد."),
    limit: [
      B("MIQE is a reporting guideline: following it makes an experiment transparent, not automatically correct.", "MIQE یک راهنمای گزارش‌دهی است: رعایتش آزمایش را شفاف می‌کند، نه خودبه‌خود درست."),
      B("Full compliance is demanding; prioritise the items that most change the result (RNA quality, efficiency, reference genes).", "رعایت کامل دشوار است؛ به موارد اثرگذارتر (کیفیت RNA، کارایی، ژن‌های مرجع) اولویت بده."),
      B("The illustration above is an arithmetic example, not a measured dataset.", "مثال بالا یک مثال حسابی است، نه یک مجموعه‌داده‌ی اندازه‌گیری‌شده.")
    ],
    next: B("When absolute quantification or very small differences matter, consider digital PCR, and check the latest MIQE revision.",
            "وقتی کمی‌سازی مطلق یا تفاوت‌های خیلی کوچک مهم است، digital PCR را در نظر بگیر و آخرین بازبینی MIQE را ببین."),
    tryit: [
      B("Compute the fold-change for ΔCq = 2, 3 and 5 at efficiencies 2.0, 1.9 and 1.8 and tabulate the differences.", "fold-change را برای ΔCq برابر ۲، ۳ و ۵ در کارایی‌های ۲٫۰، ۱٫۹ و ۱٫۸ حساب و تفاوت‌ها را جدول کن."),
      B("Take a qPCR figure from a paper and check which MIQE items are reported.", "یک شکل qPCR از یک مقاله بردار و ببین کدام آیتم‌های MIQE گزارش شده‌اند.")
    ],
    refs: ["Bustin SA et al. The MIQE guidelines: minimum information for publication of quantitative real-time PCR experiments. Clin Chem 2009;55:611–622.",
           "Vandesompele J et al. Accurate normalization of real-time quantitative RT-PCR data by geometric averaging of multiple internal control genes. Genome Biol 2002;3:research0034.",
           "Dheda K et al. Validation of housekeeping genes for normalizing RNA expression in real-time PCR. Biotechniques 2004;37:112–119."]
  }

  ];
})();
