/* =========================================================
   GeneBite — Knowledge Base (data-driven core)
   ---------------------------------------------------------
   Every workflow, technique, troubleshooting problem and tool
   is one entry here. Pages (Research Finder, Problem Search,
   Troubleshooting Library, technique pages) read this object
   at runtime — adding a new problem/workflow/tool means
   editing this file only, never touching page markup.
   Bilingual fields use {en, fa}.
========================================================= */
window.GB_KB = (() => {

  const T = (en, fa) => ({ en, fa });

  /* ---------------------------------------------------------
     WORKFLOWS
     Matches the standard 12-part structure the site uses:
     problem, goal, input, steps, tools, evidence, interpretation,
     mistakes, troubleshooting, output, next, sources.
  --------------------------------------------------------- */
  const workflows = {

    protein: {
      title: T("Protein Analysis", "تحلیل پروتئین"),
      link: "protein.html",
      problem: T("You have a protein and need to understand its identity, sequence or structure.",
                 "یک پروتئین داری و باید هویت، توالی یا ساختارش را بفهمی."),
      input: ["protein", "protein-id", "structure"],
      steps: [T("Identify", "شناسایی"), T("Sequence", "توالی"), T("Domains", "دامنه‌ها"), T("Structure", "ساختار"), T("Interpretation", "تفسیر")],
      tools: ["uniprot", "blast", "interpro", "rcsb-pdb", "alphafold-db", "pymol", "vmd"],
      troubleshooting: ["bioinformatics"],
      caseStudies: ["protein", "gfp"],
      output: "protein",
      sources: [T("UniProt Knowledgebase — documentation", "مستندات UniProt Knowledgebase"),
                T("RCSB PDB — data usage guidelines", "راهنمای استفاده از داده در RCSB PDB")]
    },

    sequence: {
      title: T("Sequence Analysis", "تحلیل توالی"),
      link: "sequence.html",
      problem: T("You have a DNA, RNA or protein sequence and need to find similar sequences, domains or motifs.",
                 "یک توالی DNA، RNA یا پروتئین داری و باید توالی‌های مشابه، دامنه‌ها یا motifها را پیدا کنی."),
      input: ["sequence", "dataset"],
      steps: [T("Sequence", "توالی"), T("BLAST", "BLAST"), T("Domains / Motifs", "دامنه‌ها / Motifها"), T("Interpretation", "تفسیر")],
      tools: ["blast", "interpro", "clustal-omega", "mafft"],
      troubleshooting: ["bioinformatics"],
      caseStudies: ["sequence"],
      output: "sequence",
      sources: [T("NCBI BLAST — user guide", "راهنمای کاربری NCBI BLAST"),
                T("InterPro — documentation", "مستندات InterPro")]
    },

    unknown: {
      title: T("Unknown Sequence Analysis", "تحلیل توالی ناشناخته"),
      link: "unknown-sequence.html",
      problem: T("You have a sequence with no known identity and need to work out what it is and what it does.",
                 "توالی‌ای داری که هویتش مشخص نیست و باید بفهمی چیست و چه می‌کند."),
      input: ["sequence", "unknown"],
      steps: [T("Sequence", "توالی"), T("BLAST", "BLAST"), T("UniProt", "UniProt"), T("InterPro", "InterPro"), T("Domains", "دامنه‌ها"), T("Structure", "ساختار"), T("Literature", "ادبیات"), T("Hypothesis", "فرضیه")],
      tools: ["blast", "uniprot", "interpro", "rcsb-pdb", "alphafold-db", "pubmed"],
      troubleshooting: ["bioinformatics"],
      caseStudies: ["unknown"],
      output: "unknown",
      sources: [T("NCBI BLAST — user guide", "راهنمای کاربری NCBI BLAST"),
                T("UniProt — how annotation confidence is scored", "نحوه‌ی امتیازدهی اعتبار annotation در UniProt")]
    },

    drug: {
      title: T("Drug Research", "تحقیق روی دارو"),
      link: "drug.html",
      problem: T("You have a drug or compound name and need its properties, targets and structural evidence.",
                 "نام یک دارو یا ترکیب داری و باید ویژگی‌ها، Targetها و شواهد ساختاری‌اش را پیدا کنی."),
      input: ["drug"],
      steps: [T("Identify", "شناسایی"), T("Properties", "ویژگی‌ها"), T("Bioactivity", "Bioactivity"), T("Target", "Target"), T("Structure", "ساختار"), T("Literature", "ادبیات"), T("Evidence Map", "نقشه‌ی شواهد")],
      tools: ["pubchem", "chembl", "rcsb-pdb", "pymol", "pubmed"],
      troubleshooting: [],
      caseStudies: ["drug", "imatinib"],
      output: "drug",
      sources: [T("PubChem — data documentation", "مستندات داده‌ی PubChem"),
                T("ChEMBL — database guide", "راهنمای دیتابیس ChEMBL")]
    },

    paper: {
      title: T("Scientific Paper Reading", "خواندن مقاله علمی"),
      link: "paper.html",
      problem: T("You have a paper and need to evaluate its question, methods and evidence critically.",
                 "یک مقاله داری و باید سؤال، روش و شواهدش را نقادانه ارزیابی کنی."),
      input: ["paper"],
      steps: [T("Question", "سؤال"), T("Study Design", "طراحی مطالعه"), T("Methods", "Methods"), T("Figures", "Figures"), T("Observation", "مشاهده"), T("Interpretation", "تفسیر"), T("Limitation", "محدودیت"), T("Next Question", "سؤال بعدی")],
      tools: ["pubmed"],
      troubleshooting: [],
      caseStudies: ["paper"],
      output: "paper",
      sources: [T("CONSORT / STROBE reporting guidelines (EQUATOR Network)", "راهنماهای گزارش‌دهی CONSORT / STROBE (شبکه‌ی EQUATOR)")]
    },

    phylogeny: {
      title: T("Phylogenetic Analysis", "تحلیل فیلوژنتیک"),
      link: "phylogenetics.html",
      problem: T("You have multiple sequences and need to understand their evolutionary relationship.",
                 "چند توالی داری و باید رابطه‌ی تکاملی‌شان را بفهمی."),
      input: ["dataset", "sequence"],
      steps: [T("Sequences", "توالی‌ها"), T("Alignment", "Alignment"), T("Model", "Model"), T("Tree", "درخت"), T("Interpretation", "تفسیر")],
      tools: ["mafft", "clustal-omega"],
      troubleshooting: ["bioinformatics"],
      caseStudies: ["phylogeny"],
      output: "phylogeny",
      sources: [T("MAFFT — documentation", "مستندات MAFFT"),
                T("Molecular Evolutionary Genetics Analysis (MEGA) manual", "راهنمای نرم‌افزار MEGA")]
    },

    "data-analysis": {
      title: T("Data Analysis", "تحلیل داده"),
      link: "data-analysis.html",
      problem: T("You have experimental data and need to choose the right statistical test and report it honestly.",
                 "داده‌ی آزمایشگاهی داری و باید آزمون آماری درست را انتخاب و صادقانه گزارش کنی."),
      input: ["experimental", "dataset"],
      steps: [T("Question", "سؤال"), T("Data type", "نوع داده"), T("Test", "آزمون"), T("Effect size", "اندازه‌ی اثر"), T("Report", "گزارش")],
      tools: ["graphpad-prism", "r", "python"],
      troubleshooting: [],
      caseStudies: [],
      output: "data-analysis",
      sources: [T("Nature Methods — Points of Significance series", "مجموعه‌ی Points of Significance در Nature Methods")]
    },

    "experimental-design": {
      title: T("Experimental Design", "طراحی آزمایش"),
      link: "experimental-design.html",
      problem: T("You are planning an experiment and need controls, replicates and sample size decided before you start.",
                 "در حال برنامه‌ریزی آزمایشی و باید کنترل‌ها، replicateها و حجم نمونه را پیش از شروع مشخص کنی."),
      input: ["question", "protein", "drug"],
      steps: [T("Hypothesis", "فرضیه"), T("Variables", "متغیرها"), T("Controls", "کنترل‌ها"), T("Replicates", "Replicateها"), T("Sample size", "حجم نمونه")],
      tools: ["graphpad-prism", "r"],
      troubleshooting: [],
      caseStudies: [],
      output: "experimental-design",
      sources: [T("NC3Rs — Experimental Design Assistant", "ابزار EDA از NC3Rs")]
    },

    primer: {
      title: T("Primer Design", "طراحی پرایمر"), link: "primer-design.html",
      problem: T("You need primers that amplify only your target.", "پرایمری می‌خواهی که فقط هدف تو را تکثیر کند."),
      input: ["primers"],
      steps: [T("Target", "هدف"), T("Template", "Template"), T("Design", "طراحی"), T("Specificity", "اختصاصیت"), T("Test", "آزمون")],
      tools: ["ncbi-gene", "primer-blast", "oligoanalyzer", "ensembl"], troubleshooting: ["pcr", "qpcr"], caseStudies: [], output: "general",
      sources: [T("Ye J et al. Primer-BLAST. BMC Bioinformatics 2012", "Ye J و همکاران. Primer-BLAST. BMC Bioinformatics 2012"),
                T("Untergasser A et al. Primer3. Nucleic Acids Res 2012", "Untergasser A و همکاران. Primer3. Nucleic Acids Res 2012")]
    },

    docking: {
      title: T("Docking Preparation", "آماده‌سازی داکینگ"), link: "docking-prep.html",
      problem: T("You want to dock a ligand and need a clean, validated setup.", "می‌خواهی لیگاندی را داک کنی و به یک setup تمیز و اعتبارسنجی‌شده نیاز داری."),
      input: ["docking"],
      steps: [T("Structure", "ساختار"), T("Protein prep", "آماده‌سازی پروتئین"), T("Ligand prep", "آماده‌سازی لیگاند"), T("Box", "جعبه"), T("Validate", "اعتبارسنجی")],
      tools: ["rcsb-pdb", "pymol", "pubchem", "chembl", "openbabel", "swissadme", "autodock-vina"], troubleshooting: [], caseStudies: [], output: "drug",
      sources: [T("Trott O, Olson AJ. AutoDock Vina. J Comput Chem 2010", "Trott O و Olson AJ. AutoDock Vina. J Comput Chem 2010"),
                T("Daina A et al. SwissADME. Sci Rep 2017", "Daina A و همکاران. SwissADME. Sci Rep 2017")]
    },

    modeling: {
      title: T("Protein Modeling", "مدل‌سازی پروتئین"), link: "protein-modeling.html",
      problem: T("Your protein has no solved structure and you need a model you can trust.", "پروتئین تو ساختار حل‌شده ندارد و به مدلی قابل‌اعتماد نیاز داری."),
      input: ["no-structure"],
      steps: [T("Check", "بررسی"), T("Method", "روش"), T("Build", "ساخت"), T("Validate", "اعتبارسنجی"), T("Use", "استفاده")],
      tools: ["uniprot", "rcsb-pdb", "alphafold-db", "swiss-model", "colabfold", "molprobity", "pymol"], troubleshooting: ["bioinformatics"], caseStudies: [], output: "protein",
      sources: [T("Jumper J et al. AlphaFold. Nature 2021", "Jumper J و همکاران. AlphaFold. Nature 2021"),
                T("Waterhouse A et al. SWISS-MODEL. Nucleic Acids Res 2018", "Waterhouse A و همکاران. SWISS-MODEL. Nucleic Acids Res 2018")]
    },

    gene: {
      title: T("Gene Research", "تحقیق روی ژن"),
      link: "gene-research.html",
      problem: T("You have a gene name or symbol and need an ordered picture of its identity, structure, expression, protein product, pathways and disease links.",
                 "یک نام یا نماد ژن داری و باید تصویری مرتب از هویت، ساختار، بیان، پروتئین، مسیرها و ارتباط آن با بیماری بسازی."),
      input: ["gene"],
      steps: [T("Identity", "هویت"), T("Structure / Variants", "ساختار / واریانت‌ها"), T("Expression", "بیان"), T("Protein", "پروتئین"), T("Pathways", "مسیرها"), T("Disease", "بیماری")],
      tools: ["ncbi-gene", "ensembl", "gnomad", "clinvar", "gtex", "hpa", "uniprot", "alphafold-db", "string", "reactome", "omim", "gwas-catalog", "pubmed"],
      troubleshooting: ["bioinformatics"],
      caseStudies: [],
      output: "gene",
      sources: [T("NCBI Gene, Ensembl and UniProt — official documentation", "مستندات رسمی NCBI Gene، Ensembl و UniProt"),
                T("GTEx Portal and Human Protein Atlas — data usage notes", "یادداشت‌های استفاده از داده در GTEx Portal و Human Protein Atlas")]
    }
  };

  /* ---------------------------------------------------------
     LAB TECHNIQUES  (linked 1:1 to troubleshooting categories)
  --------------------------------------------------------- */
  const techniques = {
    pcr:      { title: T("PCR", "PCR"), link: "molecular-biology-pcr.html", troubleshooting: "pcr" },
    qpcr:     { title: T("qPCR", "qPCR"), link: "molecular-biology-qpcr.html", troubleshooting: "qpcr" },
    gel:      { title: T("Gel Electrophoresis", "الکتروفورز ژل"), link: "molecular-biology-gel.html", troubleshooting: "gel" },
    western:  { title: T("Western Blot", "وسترن بلات"), link: "molecular-biology-western-blot.html", troubleshooting: "western" },
    elisa:    { title: T("ELISA", "ELISA"), link: "molecular-biology-elisa.html", troubleshooting: "elisa" },
    if:       { title: T("Immunofluorescence", "ایمونوفلورسانس"), link: "molecular-biology-if.html", troubleshooting: "if" },
    flow:     { title: T("Flow Cytometry", "فلوسایتومتری"), link: "molecular-biology-flow.html", troubleshooting: "flow" },
    crispr:   { title: T("CRISPR-Cas", "CRISPR-Cas"), link: "molecular-biology-crispr.html", troubleshooting: "crispr" }
  };

  /* ---------------------------------------------------------
     TROUBLESHOOTING LIBRARY
     Each problem: causes (ranked, most likely first), checks
     (what to actually look at), next (what to do next + link).
  --------------------------------------------------------- */
  const troubleshooting = {

    pcr: {
      title: T("PCR", "PCR"), technique: "pcr",
      problems: [
        { title: T("No band", "بدون باند"),
          causes: [T("Primers failed or template absent", "شکست primer یا نبود template"), T("Annealing temperature too high", "دمای annealing زیاد بالا"), T("Inhibitors carried over from extraction", "مهارکننده‌های باقی‌مانده از استخراج"), T("Polymerase or reagent degraded", "تخریب پلیمراز یا سایر مواد")],
          checks: [T("Run the NTC and a positive control alongside", "کنترل NTC و کنترل مثبت را کنار هم اجرا کن"), T("Re-check primer Tm and specificity (Primer-BLAST)", "Tm و اختصاصیت primer را با Primer-BLAST دوباره چک کن"), T("Quantify and dilute the template 1:10 to test for inhibitors", "template را کمّی کن و ۱:۱۰ رقیق کن تا مهارکننده رد شود")],
          next: T("Lower the annealing temperature by 2–3°C and repeat with fresh reagents.", "دمای annealing را ۲ تا ۳ درجه کم کن و با مواد تازه تکرار کن.") },
        { title: T("Multiple bands", "چند باند"),
          causes: [T("Nonspecific primer binding", "اتصال غیراختصاصی primer"), T("Annealing temperature too low", "دمای annealing خیلی پایین"), T("Primer-dimers", "Primer-dimer")],
          checks: [T("Compare band sizes with a ladder", "اندازه‌ی باندها را با ladder مقایسه کن"), T("Check primers for self- and hetero-dimers", "primerها را از نظر dimer با خودشان و با هم چک کن")],
          next: T("Raise the annealing temperature or redesign primers with a gradient PCR.", "دمای annealing را بالا ببر یا با gradient PCR primerها را دوباره طراحی کن.") },
        { title: T("Smear", "اسمییر"),
          causes: [T("Too many cycles", "چرخه‌ی زیاد"), T("Too much template or primer", "template یا primer زیاد"), T("Degraded template", "template تخریب‌شده")],
          checks: [T("Reduce cycle number by 5 and repeat", "تعداد چرخه را ۵ تا کم کن و تکرار کن"), T("Check template integrity on a separate gel", "integrity template را روی یک ژل جدا چک کن")],
          next: T("Lower template amount and cycle count together, then re-run.", "مقدار template و تعداد چرخه را همزمان کم کن و دوباره اجرا کن.") },
        { title: T("Weak band", "باند ضعیف"),
          causes: [T("Low template amount", "مقدار کم template"), T("Suboptimal annealing", "annealing غیربهینه"), T("Low polymerase activity", "فعالیت کم پلیمراز")],
          checks: [T("Increase template input within a reasonable range", "مقدار template را در بازه‌ی معقول افزایش بده"), T("Try a temperature gradient around the current annealing point", "gradient دمایی اطراف annealing فعلی را امتحان کن")],
          next: T("Increase cycles by 3–5 or increase template concentration.", "تعداد چرخه را ۳ تا ۵ عدد افزایش بده یا غلظت template را بالا ببر.") },
        { title: T("Wrong size", "اندازه‌ی اشتباه"),
          causes: [T("Primer binds an unintended site", "اتصال primer به جایگاه غیرمنظور"), T("Genomic DNA contamination when cDNA expected", "آلودگی DNA ژنومی وقتی cDNA مورد انتظار است"), T("Splice variant amplified", "تکثیر یک splice variant")],
          checks: [T("Re-run Primer-BLAST against the correct database", "Primer-BLAST را روی دیتابیس درست دوباره اجرا کن"), T("Sequence the product to confirm identity", "محصول را sequencing کن تا هویتش تأیید شود")],
          next: T("Redesign primers, ideally spanning an exon–exon junction.", "primerها را دوباره طراحی کن، ترجیحاً روی محل اتصال دو اگزون.") }
      ] },

    qpcr: {
      title: T("qPCR", "qPCR"), technique: "qpcr",
      problems: [
        { title: T("No amplification", "بدون تکثیر"),
          causes: [T("Failed reverse transcription", "شکست رونویسی معکوس"), T("Primer or probe failure", "شکست primer یا probe"), T("RNA degradation", "تخریب RNA")],
          checks: [T("Run a no-RT control", "کنترل no-RT اجرا کن"), T("Check RNA integrity before cDNA synthesis", "integrity RNA را قبل از سنتز cDNA چک کن")],
          next: T("Repeat reverse transcription with fresh, quality-checked RNA.", "رونویسی معکوس را با RNA تازه و کیفیت‌سنجی‌شده تکرار کن.") },
        { title: T("Late Cq", "Cq دیر"),
          causes: [T("Low starting template", "template اولیه کم"), T("Poor reaction efficiency", "کارایی پایین واکنش"), T("Inhibitors in the sample", "مهارکننده در نمونه")],
          checks: [T("Check the amplification efficiency from a dilution series", "کارایی تکثیر را از سری رقت چک کن"), T("Dilute the cDNA and re-test", "cDNA را رقیق کن و دوباره تست کن")],
          next: T("If efficiency is below 90%, redesign the assay before trusting quantification.", "اگر کارایی زیر ۹۰٪ بود، پیش از اعتماد به کمی‌سازی assay را دوباره طراحی کن.") },
        { title: T("Multiple melt peaks", "چند پیک Melt"),
          causes: [T("Primer-dimers", "Primer-dimer"), T("Nonspecific product", "محصول غیراختصاصی"), T("Genomic DNA contamination", "آلودگی DNA ژنومی")],
          checks: [T("Run the product on a gel to confirm a single band", "محصول را روی ژل اجرا کن تا یک باند تأیید شود"), T("Redesign primers to span an exon junction", "primerها را طوری بازطراحی کن که روی محل اتصال اگزون باشند")],
          next: T("Treat samples with DNase and redesign primers if genomic DNA is confirmed.", "اگر آلودگی DNA ژنومی تأیید شد، نمونه‌ها را با DNase تیمار و primerها را بازطراحی کن.") },
        { title: T("Poor replicate agreement", "توافق ضعیف Replicateها"),
          causes: [T("Pipetting variation", "تغییرپذیری پیپتینگ"), T("Bubbles in wells", "حباب در well"), T("Uneven mixing", "اختلاط ناهمگون")],
          checks: [T("Check technical replicate spread (should be within ~0.3 Cq)", "پراکندگی technical replicate را چک کن (باید در حدود ۰٫۳ سیکل باشد)")],
          next: T("Re-pipette carefully, spin the plate before running, and repeat.", "با دقت بیشتری پیپت کن، پلیت را قبل از اجرا سانتریفیوژ کن و تکرار کن.") },
        { title: T("Unexpected expression direction", "جهت بیان غیرمنتظره"),
          causes: [T("Wrong reference gene for this condition", "ژن مرجع نامناسب برای این شرایط"), T("Normalisation error", "خطای نرمال‌سازی"), T("Biological variability", "تغییرپذیری بیولوژیک")],
          checks: [T("Re-validate the reference gene's stability under this treatment", "پایداری ژن مرجع را زیر این تیمار دوباره اعتبارسنجی کن")],
          next: T("Test a second reference gene and repeat the comparison.", "یک ژن مرجع دوم را تست و مقایسه را تکرار کن.") },
        { title: T("Reference gene problem", "مشکل ژن مرجع"),
          causes: [T("Reference gene itself changes with treatment", "ژن مرجع خودش با تیمار تغییر می‌کند")],
          checks: [T("Compare candidate reference genes across all conditions before choosing one", "ژن‌های مرجع کاندید را بین همه‌ی شرایط پیش از انتخاب مقایسه کن")],
          next: T("Switch to a validated stable reference gene for this cell type or condition.", "به یک ژن مرجع پایدار و اعتبارسنجی‌شده برای این نوع سلول یا شرایط تغییر بده.") }
      ] },

    gel: {
      title: T("Gel Electrophoresis", "الکتروفورز ژل"), technique: "gel",
      problems: [
        { title: T("No band", "بدون باند"), causes: [T("No DNA loaded or too little", "بدون DNA یا مقدار خیلی کم"), T("DNA ran off the gel", "خروج DNA از ژل")],
          checks: [T("Confirm sample was actually loaded (check the loading dye front)", "بررسی کن نمونه واقعاً بارگذاری شده (جلوی رنگ بارگذاری را ببین)")],
          next: T("Reload with a confirmed, quantified sample and reduce run time.", "با نمونه‌ی تأییدشده و کمّی‌شده دوباره بارگذاری کن و زمان اجرا را کم کن.") },
        { title: T("Smear", "اسمییر"), causes: [T("Degraded DNA", "DNA تخریب‌شده"), T("Overloading", "بارگذاری زیاد")],
          checks: [T("Check sample age and storage conditions", "قدمت و شرایط نگهداری نمونه را چک کن")],
          next: T("Use fresher sample and load less DNA per well.", "از نمونه‌ی تازه‌تر استفاده کن و DNA کمتری در هر well بریز.") },
        { title: T("Weak band", "باند ضعیف"), causes: [T("Low DNA concentration", "غلظت پایین DNA"), T("Weak stain", "رنگ‌آمیزی ضعیف")],
          checks: [T("Requantify the sample", "نمونه را دوباره کمّی کن")], next: T("Load more sample or increase staining/imaging time.", "نمونه‌ی بیشتری بارگذاری کن یا زمان رنگ‌آمیزی/تصویربرداری را افزایش بده.") },
        { title: T("Wrong size", "اندازه‌ی اشتباه"), causes: [T("Wrong DNA form (supercoiled vs linear)", "شکل اشتباه DNA (supercoiled در برابر خطی)"), T("Wrong ladder used", "ladder اشتباه")],
          checks: [T("Linearise the sample with a restriction digest to compare fairly", "نمونه را با هضم آنزیمی خطی کن تا مقایسه منصفانه باشد")],
          next: T("Re-run with a matched ladder and a linearised control.", "با ladder مناسب و کنترل خطی‌شده دوباره اجرا کن.") }
      ] },

    western: {
      title: T("Western Blot", "وسترن بلات"), technique: "western",
      problems: [
        { title: T("No signal", "بدون سیگنال"),
          causes: [T("Antibody not binding (wrong species/denatured epitope)", "عدم اتصال آنتی‌بادی (گونه‌ی اشتباه یا اپی‌توپ دناتوره‌شده)"), T("Transfer failure", "شکست انتقال"), T("Too little protein loaded", "بارگذاری کم پروتئین")],
          checks: [T("Check the Ponceau stain for even transfer", "رنگ‌آمیزی Ponceau را برای انتقال یکنواخت چک کن"), T("Confirm antibody is validated for your species and application", "مطمئن شو آنتی‌بادی برای گونه و کاربرد تو اعتبارسنجی شده")],
          next: T("Re-transfer and confirm with a housekeeping-protein blot first.", "دوباره transfer کن و اول با بلات یک پروتئین housekeeping تأیید کن.") },
        { title: T("High background", "پس‌زمینه‌ی بالا"),
          causes: [T("Insufficient blocking", "block ناکافی"), T("Antibody concentration too high", "غلظت زیاد آنتی‌بادی"), T("Inadequate washing", "شست‌وشوی ناکافی")],
          checks: [T("Increase blocking time or blocking-agent concentration", "زمان block یا غلظت ماده‌ی block را افزایش بده"), T("Titrate the primary and secondary antibody dilutions", "رقت آنتی‌بادی اولیه و ثانویه را تیتر کن")],
          next: T("Add extra wash steps and dilute antibodies further before re-probing.", "مراحل شست‌وشوی بیشتری اضافه کن و آنتی‌بادی‌ها را رقیق‌تر کن و دوباره پروب کن.") },
        { title: T("Multiple bands", "چند باند"),
          causes: [T("Antibody cross-reactivity", "Cross-reactivity آنتی‌بادی"), T("Protein isoforms or degradation products", "ایزوفرم یا محصولات تخریب پروتئین"), T("Post-translational modification shifting size", "تغییر اندازه به‌دلیل تغییرات پس‌ترجمه‌ای")],
          checks: [T("Compare band pattern with the antibody datasheet", "الگوی باند را با datasheet آنتی‌بادی مقایسه کن"), T("Run a knockdown/knockout control if available", "در صورت وجود، کنترل knockdown/knockout اجرا کن")],
          next: T("Validate specificity with a genetic control before interpreting extra bands.", "پیش از تفسیر باندهای اضافه، اختصاصیت را با کنترل ژنتیکی اعتبارسنجی کن.") }
      ] },

    elisa: {
      title: T("ELISA", "ELISA"), technique: "elisa",
      problems: [
        { title: T("Flat or absent standard curve", "منحنی استاندارد صاف یا غایب"),
          causes: [T("Reagent or substrate expired", "انقضای معرف یا سوبسترا"), T("Coating step failed", "شکست مرحله‌ی coating")],
          checks: [T("Confirm reagent expiry and storage", "انقضا و نگهداری معرف را بررسی کن")],
          next: T("Repeat with fresh reagents and confirm coating concentration.", "با معرف تازه تکرار کن و غلظت coating را تأیید کن.") },
        { title: T("High background across all wells", "پس‌زمینه‌ی بالا در همه‌ی well‌ها"),
          causes: [T("Inadequate washing", "شست‌وشوی ناکافی"), T("Cross-reactive antibody", "آنتی‌بادی cross-reactive")],
          checks: [T("Increase number of wash cycles", "تعداد چرخه‌ی شست‌وشو را افزایش بده")],
          next: T("Add washes and re-titrate antibody concentrations.", "شست‌وشو اضافه کن و غلظت آنتی‌بادی را دوباره تیتر کن.") },
        { title: T("Samples outside the standard curve range", "نمونه‌های خارج از محدوده‌ی منحنی استاندارد"),
          causes: [T("Sample concentration too high or too low for the assay range", "غلظت نمونه بالاتر یا پایین‌تر از بازه‌ی assay")],
          checks: [T("Check where each sample falls relative to the curve", "موقعیت هر نمونه نسبت به منحنی را بررسی کن")],
          next: T("Dilute or concentrate samples to bring them inside the validated range.", "نمونه‌ها را رقیق یا غلیظ کن تا داخل بازه‌ی معتبر بیفتند.") }
      ] },

    if: {
      title: T("Immunofluorescence", "ایمونوفلورسانس"), technique: "if",
      problems: [
        { title: T("No signal", "بدون سیگنال"), causes: [T("Antibody incompatible with fixation method", "ناسازگاری آنتی‌بادی با روش fixation"), T("Insufficient permeabilisation", "Permeabilisation ناکافی")],
          checks: [T("Try an alternative fixation (PFA vs methanol)", "fixation جایگزین را امتحان کن (PFA در برابر متانول)")],
          next: T("Re-stain with adjusted fixation/permeabilisation conditions.", "با شرایط fixation/permeabilisation تنظیم‌شده دوباره رنگ‌آمیزی کن.") },
        { title: T("High background / autofluorescence", "پس‌زمینه‌ی بالا / خودفلورسانس"), causes: [T("Insufficient blocking", "Block ناکافی"), T("Cell type with high native autofluorescence", "نوع سلولی با خودفلورسانس بالا")],
          checks: [T("Include a secondary-only control", "کنترل فقط ثانویه اضافه کن")], next: T("Extend blocking and, if needed, use a spectral autofluorescence-reduction step.", "Block را طولانی‌تر کن و در صورت نیاز از مرحله‌ی کاهش خودفلورسانس طیفی استفاده کن.") },
        { title: T("Unexpected localisation", "لوکالیزاسیون غیرمنتظره"), causes: [T("Overexpression artefact", "Artefact ناشی از overexpression"), T("Cross-reactive antibody", "آنتی‌بادی cross-reactive")],
          checks: [T("Confirm with a biological negative control", "با کنترل منفی بیولوژیک تأیید کن")], next: T("Repeat at endogenous expression levels before concluding a new localisation.", "پیش از نتیجه‌گیری درباره‌ی لوکالیزاسیون جدید، در سطح بیان endogenous تکرار کن.") }
      ] },

    flow: {
      title: T("Flow Cytometry", "فلوسایتومتری"), technique: "flow",
      problems: [
        { title: T("Compensation problems", "مشکلات Compensation"), causes: [T("Missing or poor single-stain controls", "نبود یا ضعف کنترل‌های تک‌رنگ"), T("Too many overlapping fluorochromes", "هم‌پوشانی زیاد فلوروکروم‌ها")],
          checks: [T("Re-run single-stained compensation controls", "کنترل‌های compensation تک‌رنگ را دوباره اجرا کن")], next: T("Recalculate compensation from fresh single-stain controls.", "compensation را از کنترل‌های تک‌رنگ تازه دوباره محاسبه کن.") },
        { title: T("Gating uncertainty", "عدم قطعیت در Gating"), causes: [T("No FMO controls", "نبود کنترل FMO"), T("Inconsistent gating across samples", "gating ناهمسان بین نمونه‌ها")],
          checks: [T("Add FMO controls and fix the gating hierarchy for all samples", "کنترل FMO اضافه کن و سلسله‌مراتب gating را برای همه‌ی نمونه‌ها ثابت کن")], next: T("Redefine gates from controls, then apply identically to every sample.", "Gateها را از کنترل‌ها بازتعریف و یکسان روی همه‌ی نمونه‌ها اعمال کن.") },
        { title: T("High background / debris", "پس‌زمینه‌ی بالا / Debris"), causes: [T("Poor sample prep", "آماده‌سازی ضعیف نمونه"), T("Dead cells binding nonspecifically", "اتصال غیراختصاصی سلول‌های مرده")],
          checks: [T("Add a viability dye and gate it out", "رنگ زنده‌بودن اضافه کن و آن را gate کن")], next: T("Filter the sample again and exclude dead cells before analysis.", "نمونه را دوباره فیلتر کن و پیش از تحلیل سلول‌های مرده را حذف کن.") },
        { title: T("Unexpected population", "جمعیت غیرمنتظره"), causes: [T("Doublets counted as one event", "شمارش doublet به‌عنوان یک event"), T("Nonspecific antibody binding", "اتصال غیراختصاصی آنتی‌بادی")],
          checks: [T("Add a doublet-discrimination gate (FSC-H vs FSC-A)", "gate تشخیص doublet اضافه کن (FSC-H در برابر FSC-A)")], next: T("Re-gate excluding doublets and repeat with an isotype control.", "با حذف doublet دوباره gate کن و با کنترل isotype تکرار کن.") }
      ] },

    crispr: {
      title: T("CRISPR-Cas", "CRISPR-Cas"), technique: "crispr",
      problems: [
        { title: T("No detectable editing", "بدون ویرایش قابل‌تشخیص"), causes: [T("Poor guide efficiency", "کارایی پایین guide"), T("Delivery failure", "شکست Delivery")],
          checks: [T("Confirm delivery efficiency with a reporter or marker", "کارایی Delivery را با یک reporter یا marker تأیید کن")], next: T("Test alternative guides and confirm delivery before repeating the edit.", "guideهای جایگزین را تست کن و پیش از تکرار ویرایش، Delivery را تأیید کن.") },
        { title: T("Mixed / mosaic population", "جمعیت مخلوط / موزاییک"), causes: [T("Bulk editing without clonal selection", "ویرایش bulk بدون انتخاب کلونال")],
          checks: [T("Sequence multiple individual clones", "چند کلون جداگانه را sequencing کن")], next: T("Isolate and genotype single-cell clones before drawing conclusions.", "پیش از نتیجه‌گیری، کلون‌های تک‌سلولی جدا و ژنوتایپ کن.") },
        { title: T("Phenotype without confirmed genotype", "فنوتیپ بدون ژنوتایپ تأییدشده"), causes: [T("Off-target effect", "اثر Off-target"), T("Clonal variation unrelated to the edit", "تغییرپذیری کلونال بی‌ربط به ویرایش")],
          checks: [T("Use multiple independent guides targeting the same gene", "چند guide مستقل روی همان ژن استفاده کن")], next: T("Confirm with a rescue experiment before attributing the phenotype to the edit.", "پیش از نسبت‌دادن فنوتیپ به ویرایش، با آزمایش rescue تأیید کن.") }
      ] },

    bioinformatics: {
      title: T("Bioinformatics", "بیوانفورماتیک"), technique: null,
      problems: [
        { title: T("No BLAST hit", "بدون نتیجه‌ی BLAST"), causes: [T("Wrong database selected", "انتخاب دیتابیس اشتباه"), T("Sequence too short or low complexity", "توالی خیلی کوتاه یا کم‌پیچیدگی"), T("Sequencing errors in the query", "خطای sequencing در query")],
          checks: [T("Confirm you searched the right database (nr, refseq, species-specific)", "مطمئن شو دیتابیس درست را جست‌وجو کرده‌ای (nr، refseq، یا اختصاصی گونه)"), T("Try a less stringent E-value threshold", "آستانه‌ی E-value کمتر سخت‌گیرانه را امتحان کن")],
          next: T("Try a different BLAST program (blastx for a nucleotide query) or a related database.", "برنامه‌ی BLAST دیگری امتحان کن (مثلاً blastx برای query نوکلئوتیدی) یا دیتابیس مرتبط دیگری بزن.") },
        { title: T("Low similarity", "شباهت کم"), causes: [T("Distant homolog only", "فقط هومولوگ دور"), T("Query includes a low-complexity or disordered region", "وجود ناحیه‌ی کم‌پیچیدگی یا disordered در query")],
          checks: [T("Check the alignment coverage, not just percent identity", "پوشش alignment را چک کن، نه فقط درصد identity")],
          next: T("Treat the hit as a distant lead, not a confirmed identity, and check domains separately.", "این نتیجه را به‌عنوان یک سرنخ دور در نظر بگیر، نه هویت قطعی، و دامنه‌ها را جدا بررسی کن.") },
        { title: T("No domain found", "بدون دامنه‌ی یافت‌شده"), causes: [T("Novel or poorly characterised protein family", "خانواده‌ی پروتئینی جدید یا کم‌شناخته‌شده"), T("Fragment sequence missing the domain region", "توالی fragment که ناحیه‌ی دامنه را ندارد")],
          checks: [T("Try more than one domain database (InterPro combines several)", "بیش از یک دیتابیس دامنه را امتحان کن (InterPro چند تا را ترکیب می‌کند)")],
          next: T("Report the absence explicitly as a limitation rather than assuming no function.", "نبود دامنه را صریحاً به‌عنوان یک محدودیت گزارش کن، نه اینکه نتیجه بگیری عملکردی وجود ندارد.") },
        { title: T("Conflicting annotations", "annotationهای متناقض"), causes: [T("Different databases updated at different times", "به‌روزرسانی دیتابیس‌های مختلف در زمان‌های متفاوت"), T("Automatic vs curated annotation disagreement", "اختلاف annotation خودکار و annotation دستی")],
          checks: [T("Prefer manually reviewed/curated entries (e.g. Swiss-Prot over TrEMBL)", "به رکوردهای دستی/curated اولویت بده (مثلاً Swiss-Prot به‌جای TrEMBL)")],
          next: T("Report both annotations and state which is better supported and why.", "هر دو annotation را گزارش کن و بگو کدام و به چه دلیل شواهد بیشتری دارد.") },
        { title: T("No structure available", "بدون ساختار موجود"), causes: [T("No experimental structure solved yet", "هنوز ساختار تجربی حل نشده"), T("Target too large or disordered for reliable prediction", "هدف خیلی بزرگ یا disordered برای پیش‌بینی قابل‌اعتماد")],
          checks: [T("Check AlphaFold DB for a predicted model and its confidence (pLDDT)", "AlphaFold DB را برای مدل پیش‌بینی‌شده و اعتماد آن (pLDDT) بررسی کن")],
          next: T("Use a predicted structure only with its confidence score reported, or work from domains and homology instead.", "مدل پیش‌بینی‌شده را فقط همراه با امتیاز اعتمادش استفاده کن، یا از دامنه‌ها و هومولوژی به‌جای آن کار کن.") }
      ] }
  };

  /* ---------------------------------------------------------
     TOOLS — mirrors tools.html, gives Research Finder / KB
     something to cross-link to (id = the id on tools.html).
  --------------------------------------------------------- */
  const tools = {
    "ncbi": T("NCBI", "NCBI"), "blast": T("BLAST", "BLAST"), "uniprot": T("UniProt", "UniProt"),
    "rcsb-pdb": T("RCSB PDB", "RCSB PDB"), "alphafold-db": T("AlphaFold DB", "AlphaFold DB"),
    "pubchem": T("PubChem", "PubChem"), "chembl": T("ChEMBL", "ChEMBL"), "pubmed": T("PubMed", "PubMed"),
    "interpro": T("InterPro", "InterPro"), "clustal-omega": T("Clustal Omega", "Clustal Omega"),
    "mafft": T("MAFFT", "MAFFT"), "vmd": T("VMD", "VMD"), "pymol": T("PyMOL", "PyMOL"),
    "graphpad-prism": T("GraphPad Prism", "GraphPad Prism"), "r": T("R", "R"), "python": T("Python", "Python"),
    "ncbi-gene": T("NCBI Gene", "NCBI Gene"), "ensembl": T("Ensembl", "Ensembl"), "ucsc": T("UCSC Genome Browser", "UCSC Genome Browser"),
    "gnomad": T("gnomAD", "gnomAD"), "clinvar": T("ClinVar", "ClinVar"), "gtex": T("GTEx", "GTEx"),
    "hpa": T("Human Protein Atlas", "Human Protein Atlas"), "string": T("STRING", "STRING"),
    "reactome": T("Reactome", "Reactome"),
    "primer-blast": T("Primer-BLAST", "Primer-BLAST"), "oligoanalyzer": T("OligoAnalyzer", "OligoAnalyzer"), "openbabel": T("Open Babel", "Open Babel"),
    "swissadme": T("SwissADME", "SwissADME"), "autodock-vina": T("AutoDock Vina", "AutoDock Vina"), "swiss-model": T("SWISS-MODEL", "SWISS-MODEL"),
    "colabfold": T("ColabFold", "ColabFold"), "molprobity": T("MolProbity", "MolProbity"), "consensus": T("Consensus", "Consensus"), "omim": T("OMIM", "OMIM"), "gwas-catalog": T("GWAS Catalog", "GWAS Catalog")
  };

  /* ---------------------------------------------------------
     CASE STUDIES — deep-link into case-studies.html's filter
  --------------------------------------------------------- */
  const caseStudies = {
    gfp: { title: T("Exploring GFP structure", "بررسی ساختار GFP"), filter: "structure" },
    imatinib: { title: T("Investigating Imatinib", "بررسی Imatinib"), filter: "drug" },
    protein: { title: T("From sequence to protein function", "از توالی تا عملکرد پروتئین"), filter: "protein" },
    unknown: { title: T("Exploring an unknown protein", "بررسی یک پروتئین ناشناخته"), filter: "sequence" },
    paper: { title: T("Dissecting a scientific paper", "کالبدشکافی یک مقاله‌ی علمی"), filter: "literature" },
    phylogeny: { title: T("Tracing evolutionary relationships", "ردیابی روابط تکاملی"), filter: "phylogeny" },
    drug: { title: T("Protein–ligand interaction analysis", "تحلیل برهم‌کنش پروتئین-لیگاند"), filter: "drug" },
    sequence: { title: T("Conservation and functional sites", "حفاظت‌شدگی و جایگاه‌های عملکردی"), filter: "sequence" }
  };

  /* ---------------------------------------------------------
     HELPERS used by Research Finder / Problem Search / pages
  --------------------------------------------------------- */
  function workflowsForInput(inputKey) {
    return Object.entries(workflows).filter(([, w]) => (w.input || []).includes(inputKey)).map(([k]) => k);
  }

  function searchProblems(query) {
    const q = (query || "").toLowerCase().trim();
    if (!q) return [];
    const words = q.split(/\s+/).filter(Boolean);
    const hits = [];
    Object.entries(troubleshooting).forEach(([catKey, cat]) => {
      cat.problems.forEach((p) => {
        const hay = [cat.title.en, cat.title.fa, p.title.en, p.title.fa,
          ...p.causes.map((c) => c.en + " " + c.fa)].join(" ").toLowerCase();
        const score = words.filter((w) => hay.includes(w)).length;
        if (score > 0) hits.push({ score, category: catKey, problem: p });
      });
    });
    return hits.sort((a, b) => b.score - a.score);
  }

  /* ---------------------------------------------------------
     RESEARCH OUTPUT TEMPLATES — downloadable Word/PDF pairs.
     Single source of truth for both research-outputs.html
     (hand-written rich cards) and workspace.html (quick list).
  --------------------------------------------------------- */
  const templates = [
    { key: "protein", title: T("Protein Analysis Record", "پرونده‌ی تحلیل پروتئین"), link: "protein.html" },
    { key: "gene", title: T("Gene Research Record", "پرونده‌ی تحقیق روی ژن"), link: "gene-research.html" },
    { key: "sequence", title: T("Sequence Analysis Record", "پرونده‌ی تحلیل توالی"), link: "sequence.html" },
    { key: "drug", title: T("Drug Research Record", "پرونده‌ی تحقیق روی دارو"), link: "drug.html" },
    { key: "paper", title: T("Paper Reading Record", "پرونده‌ی خواندن مقاله"), link: "paper.html" },
    { key: "phylogeny", title: T("Phylogenetic Analysis Record", "پرونده‌ی تحلیل فیلوژنتیک"), link: "phylogenetics.html" },
    { key: "data-analysis", title: T("Data Analysis Record", "پرونده‌ی تحلیل داده"), link: "data-analysis.html" },
    { key: "experimental-design", title: T("Experimental Design Record", "پرونده‌ی طراحی آزمایش"), link: "experimental-design.html" },
    { key: "general", title: T("General Research Note", "یادداشت پژوهشی عمومی"), link: "research-outputs.html" }
  ];

  return { workflows, techniques, troubleshooting, tools, caseStudies, templates, workflowsForInput, searchProblems, T };
})();
