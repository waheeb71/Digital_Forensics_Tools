// ===== DIGITAL FORENSICS TOOLS DATABASE =====

// Categories Data
const categories = [
    {
        id: 'computer-forensics',
        name: 'تحليل الحاسوب',
        nameEn: 'Computer Forensics',
        description: 'أدوات تحليل أنظمة الحاسوب والأقراص الصلبة واستعادة البيانات',
        icon: 'fas fa-desktop',
        color: '#00ff88',
        toolsCount: 15,
        difficulty: 'متوسط',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop'
    },
    {
        id: 'mobile-forensics',
        name: 'تحليل الأجهزة المحمولة',
        nameEn: 'Mobile Forensics',
        description: 'أدوات استخراج وتحليل بيانات الهواتف الذكية والأجهزة اللوحية',
        icon: 'fas fa-mobile-alt',
        color: '#00d4ff',
        toolsCount: 12,
        difficulty: 'متقدم',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop'
    },
    {
        id: 'network-forensics',
        name: 'تحليل الشبكات',
        nameEn: 'Network Forensics',
        description: 'أدوات مراقبة وتحليل حركة البيانات الشبكية وكشف التهديدات',
        icon: 'fas fa-network-wired',
        color: '#8b5cf6',
        toolsCount: 18,
        difficulty: 'متقدم',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop'
    },
    {
        id: 'memory-forensics',
        name: 'تحليل الذاكرة',
        nameEn: 'Memory Forensics',
        description: 'أدوات تحليل الذاكرة العشوائية واستخراج البيانات المؤقتة',
        icon: 'fas fa-memory',
        color: '#ff4757',
        toolsCount: 8,
        difficulty: 'متقدم',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop'
    },
    {
        id: 'cloud-forensics',
        name: 'الحوسبة السحابية',
        nameEn: 'Cloud Forensics',
        description: 'أدوات تحليل البيانات والخدمات السحابية المختلفة',
        icon: 'fas fa-cloud',
        color: '#ffa502',
        toolsCount: 10,
        difficulty: 'متقدم',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop'
    },
    {
        id: 'blockchain-forensics',
        name: 'تحليل البلوك تشين',
        nameEn: 'Blockchain Forensics',
        description: 'أدوات تتبع وتحليل معاملات العملات المشفرة والبلوك تشين',
        icon: 'fas fa-link',
        color: '#2ed573',
        toolsCount: 7,
        difficulty: 'متخصص',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop'
    },
    {
        id: 'malware-analysis',
        name: 'تحليل البرمجيات الخبيثة',
        nameEn: 'Malware Analysis',
        description: 'أدوات فحص وتحليل الفيروسات والبرمجيات الضارة',
        icon: 'fas fa-virus',
        color: '#ff3742',
        toolsCount: 14,
        difficulty: 'متخصص',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop'
    },
    {
        id: 'email-forensics',
        name: 'تحليل البريد الإلكتروني',
        nameEn: 'Email Forensics',
        description: 'أدوات فحص وتحليل رسائل البريد الإلكتروني والمراسلات',
        icon: 'fas fa-envelope',
        color: '#5352ed',
        toolsCount: 6,
        difficulty: 'مبتدئ',
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=250&fit=crop'
    }
];

// Tools Database
const forensicsTools = [
    // Computer Forensics Tools
    {
        id: 'autopsy',
        name: 'Autopsy',
        category: 'computer-forensics',
        type: 'مفتوح المصدر',
        platforms: ['Windows', 'Linux', 'macOS'],
        description: 'منصة شاملة للتحقيق الجنائي الرقمي مع واجهة رسومية سهلة الاستخدام',
        features: [
            'تحليل الأقراص الصلبة والصور الجنائية',
            'استعادة الملفات المحذوفة',
            'تحليل سجلات النظام',
            'فحص البيانات الوصفية',
            'تحليل الجدول الزمني للأحداث'
        ],
        downloadUrl: 'https://www.sleuthkit.org/autopsy/',
        officialUrl: 'https://www.sleuthkit.org/autopsy/',
        documentation: 'https://sleuthkit.org/autopsy/docs/',
        price: 'مجاني',
        rating: 4.8,
        downloads: '500K+',
        lastUpdate: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        tags: ['تحليل الأقراص', 'واجهة رسومية', 'استعادة البيانات'],
        difficulty: 'مبتدئ',
        tutorial: 'https://www.youtube.com/watch?v=autopsy-tutorial'
    },
    {
        id: 'sleuthkit',
        name: 'The Sleuth Kit',
        category: 'computer-forensics',
        type: 'مفتوح المصدر',
        platforms: ['Linux', 'Windows', 'macOS'],
        description: 'مجموعة أدوات سطر أوامر لتحليل أقراص التخزين وأنظمة الملفات',
        features: [
            'تحليل أنظمة ملفات مختلفة (NTFS, FAT, EXT)',
            'استخراج الملفات من الأقراص التالفة',
            'تحليل المجلدات والملفات المخفية',
            'فحص البيانات الخام للقرص'
        ],
        downloadUrl: 'https://github.com/sleuthkit/sleuthkit',
        officialUrl: 'https://www.sleuthkit.org/',
        documentation: 'https://wiki.sleuthkit.org/',
        price: 'مجاني',
        rating: 4.6,
        downloads: '300K+',
        lastUpdate: '2024-02-01',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop',
        tags: ['سطر الأوامر', 'تحليل متقدم', 'أنظمة ملفات'],
        difficulty: 'متقدم',
        tutorial: 'https://www.youtube.com/watch?v=sleuthkit-tutorial'
    },
    {
        id: 'ftk-imager',
        name: 'FTK Imager',
        category: 'computer-forensics',
        type: 'مجاني',
        platforms: ['Windows'],
        description: 'أداة مجانية لإنشاء صور جنائية من الأقراص والأجهزة التخزينية',
        features: [
            'إنشاء صور جنائية bit-by-bit',
            'فحص وتصفح محتويات الأقراص',
            'حساب hash values للتحقق من سلامة البيانات',
            'دعم تنسيقات متعددة للصور الجنائية'
        ],
        downloadUrl: 'https://accessdata.com/product-download/ftk-imager-version-4-7-1',
        officialUrl: 'https://accessdata.com/products-services/forensic-toolkit-ftk/ftk-imager',
        documentation: 'https://accessdata.com/support',
        price: 'مجاني',
        rating: 4.7,
        downloads: '1M+',
        lastUpdate: '2023-11-20',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        tags: ['نسخ احتياطي', 'صور جنائية', 'تحقق سلامة'],
        difficulty: 'مبتدئ',
        tutorial: 'https://www.youtube.com/watch?v=ftk-imager-tutorial'
    },
    {
        id: 'x-ways-forensics',
        name: 'X-Ways Forensics',
        category: 'computer-forensics',
        type: 'تجاري',
        platforms: ['Windows'],
        description: 'أداة قوية ومتطورة للتحقيق الجنائي الرقمي مع إمكانيات تحليل متقدمة',
        features: [
            'تحليل سريع للأقراص الكبيرة',
            'استعادة البيانات المتقدمة',
            'تحليل الذاكرة العشوائية',
            'فحص السجلات والأحداث',
            'تحليل البيانات المشفرة'
        ],
        downloadUrl: 'https://www.x-ways.net/winhex/',
        officialUrl: 'https://www.x-ways.net/forensics/',
        documentation: 'https://www.x-ways.net/winhex/manual.pdf',
        price: '$1,250',
        rating: 4.9,
        downloads: '50K+',
        lastUpdate: '2024-01-30',
        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
        tags: ['تحليل متقدم', 'سرعة عالية', 'احترافي'],
        difficulty: 'متخصص',
        tutorial: 'https://www.youtube.com/watch?v=xways-tutorial'
    },
    {
        id: 'encase',
        name: 'EnCase Forensic',
        category: 'computer-forensics',
        type: 'تجاري',
        platforms: ['Windows'],
        description: 'المعيار الذهبي في صناعة التحقيق الجنائي الرقمي',
        features: [
            'تحليل شامل للأدلة الرقمية',
            'دعم أكثر من 25 نظام ملفات',
            'تحليل البريد الإلكتروني والويب',
            'إنشاء تقارير مفصلة',
            'شهادات قانونية معتمدة'
        ],
        downloadUrl: 'https://www.opentext.com/products/encase-forensic',
        officialUrl: 'https://www.opentext.com/products/encase-forensic',
        documentation: 'https://www.opentext.com/support',
        price: '$4,000+',
        rating: 4.8,
        downloads: '100K+',
        lastUpdate: '2024-02-15',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        tags: ['معيار صناعي', 'شهادات قانونية', 'تقارير متقدمة'],
        difficulty: 'متخصص',
        tutorial: 'https://www.youtube.com/watch?v=encase-tutorial'
    },

    // Mobile Forensics Tools
    {
        id: 'cellebrite-ufed',
        name: 'Cellebrite UFED',
        category: 'mobile-forensics',
        type: 'تجاري',
        platforms: ['Windows', 'Hardware'],
        description: 'الأداة الرائدة عالمياً لاستخراج وتحليل بيانات الأجهزة المحمولة',
        features: [
            'استخراج بيانات من آلاف الأجهزة',
            'كسر قفل الأجهزة المحمية',
            'استخراج البيانات المحذوفة',
            'تحليل التطبيقات والمحادثات',
            'دعم iOS و Android'
        ],
        downloadUrl: 'https://cellebrite.com/en/ufed/',
        officialUrl: 'https://cellebrite.com/',
        documentation: 'https://cellebrite.com/en/support/',
        price: '$15,000+',
        rating: 4.9,
        downloads: '10K+',
        lastUpdate: '2024-02-10',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop',
        tags: ['هواتف ذكية', 'استخراج بيانات', 'كسر حماية'],
        difficulty: 'متخصص',
        tutorial: 'https://www.youtube.com/watch?v=cellebrite-tutorial'
    },
    {
        id: 'oxygen-forensic',
        name: 'Oxygen Forensic Detective',
        category: 'mobile-forensics',
        type: 'تجاري',
        platforms: ['Windows'],
        description: 'أداة تحليل متقدمة للأجهزة المحمولة والسحابة',
        features: [
            'تحليل أجهزة iOS و Android',
            'استخراج بيانات الخدمات السحابية',
            'تحليل الصور والفيديوهات',
            'كشف البيانات المخفية',
            'تحليل شبكات التواصل الاجتماعي'
        ],
        downloadUrl: 'https://www.oxygen-forensic.com/',
        officialUrl: 'https://www.oxygen-forensic.com/',
        documentation: 'https://www.oxygen-forensic.com/support',
        price: '$3,000+',
        rating: 4.7,
        downloads: '25K+',
        lastUpdate: '2024-01-25',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
        tags: ['تحليل متقدم', 'خدمات سحابية', 'وسائل اجتماعية'],
        difficulty: 'متقدم',
        tutorial: 'https://www.youtube.com/watch?v=oxygen-tutorial'
    },

    // Network Forensics Tools
    {
        id: 'wireshark',
        name: 'Wireshark',
        category: 'network-forensics',
        type: 'مفتوح المصدر',
        platforms: ['Windows', 'Linux', 'macOS'],
        description: 'محلل بروتوكولات الشبكة الأكثر شعبية واستخداماً في العالم',
        features: [
            'تحليل أكثر من 3000 بروتوكول شبكة',
            'التقاط البيانات في الوقت الفعلي',
            'فلترة متقدمة للبيانات',
            'تحليل الأمان وكشف التهديدات',
            'واجهة رسومية سهلة الاستخدام'
        ],
        downloadUrl: 'https://www.wireshark.org/download.html',
        officialUrl: 'https://www.wireshark.org/',
        documentation: 'https://www.wireshark.org/docs/',
        price: 'مجاني',
        rating: 4.8,
        downloads: '10M+',
        lastUpdate: '2024-02-05',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
        tags: ['تحليل شبكات', 'بروتوكولات', 'أمان'],
        difficulty: 'متوسط',
        tutorial: 'https://www.youtube.com/watch?v=wireshark-tutorial'
    },
    {
        id: 'networkminer',
        name: 'NetworkMiner',
        category: 'network-forensics',
        type: 'مجاني/تجاري',
        platforms: ['Windows', 'Linux'],
        description: 'أداة تحليل شبكي للطب الشرعي الرقمي مع إمكانيات استخراج الملفات',
        features: [
            'استخراج الملفات من حركة الشبكة',
            'تحليل نقاط النهاية والمضيفين',
            'كشف نظم التشغيل تلقائياً',
            'تحليل البيانات الوصفية',
            'دعم ملفات PCAP'
        ],
        downloadUrl: 'https://www.netresec.com/?page=NetworkMiner',
        officialUrl: 'https://www.netresec.com/',
        documentation: 'https://www.netresec.com/?page=Blog',
        price: 'مجاني/€1,690',
        rating: 4.6,
        downloads: '200K+',
        lastUpdate: '2024-01-20',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
        tags: ['استخراج ملفات', 'تحليل مضيفين', 'PCAP'],
        difficulty: 'متوسط',
        tutorial: 'https://www.youtube.com/watch?v=networkminer-tutorial'
    },

    // Memory Forensics Tools
    {
        id: 'volatility',
        name: 'Volatility Framework',
        category: 'memory-forensics',
        type: 'مفتوح المصدر',
        platforms: ['Windows', 'Linux', 'macOS'],
        description: 'إطار العمل الرائد لتحليل الذاكرة العشوائية والتحقيق الجنائي المتقدم',
        features: [
            'تحليل ذاكرة Windows, Linux, macOS',
            'استخراج العمليات والشبكات النشطة',
            'كشف الروت كيت والبرمجيات الخبيثة',
            'تحليل السجلات والمفاتيح',
            'دعم أكثر من 100 أمر متخصص'
        ],
        downloadUrl: 'https://github.com/volatilityfoundation/volatility3',
        officialUrl: 'https://www.volatilityfoundation.org/',
        documentation: 'https://volatility3.readthedocs.io/',
        price: 'مجاني',
        rating: 4.9,
        downloads: '500K+',
        lastUpdate: '2024-02-01',
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop',
        tags: ['تحليل ذاكرة', 'كشف rootkit', 'تحليل متقدم'],
        difficulty: 'متخصص',
        tutorial: 'https://www.youtube.com/watch?v=volatility-tutorial'
    },

    // Cloud Forensics Tools
    {
        id: 'magnet-axiom-cloud',
        name: 'Magnet AXIOM Cloud',
        category: 'cloud-forensics',
        type: 'تجاري',
        platforms: ['Windows', 'Web'],
        description: 'منصة متكاملة لتحليل البيانات السحابية والرقمية',
        features: [
            'تحليل بيانات Google, Microsoft, iCloud',
            'استخراج رسائل البريد الإلكتروني',
            'تحليل ملفات التخزين السحابي',
            'دعم OAuth للوصول الآمن',
            'تقارير مفصلة وتصور البيانات'
        ],
        downloadUrl: 'https://www.magnetforensics.com/products/magnet-axiom/',
        officialUrl: 'https://www.magnetforensics.com/',
        documentation: 'https://www.magnetforensics.com/support/',
        price: '$5,000+',
        rating: 4.7,
        downloads: '15K+',
        lastUpdate: '2024-02-08',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
        tags: ['سحابة', 'بيانات متكاملة', 'تقارير'],
        difficulty: 'متقدم',
        tutorial: 'https://www.youtube.com/watch?v=axiom-cloud-tutorial'
    },

    // Blockchain Forensics Tools
    {
        id: 'chainalysis',
        name: 'Chainalysis',
        category: 'blockchain-forensics',
        type: 'تجاري',
        platforms: ['Web', 'API'],
        description: 'المنصة الرائدة لتحليل معاملات العملات المشفرة وتتبع الأموال',
        features: [
            'تتبع معاملات Bitcoin و Ethereum',
            'تحليل مخاطر العناوين',
            'كشف غسيل الأموال',
            'تحليل الأسواق المظلمة',
            'تقارير امتثال تنظيمية'
        ],
        downloadUrl: 'https://www.chainalysis.com/',
        officialUrl: 'https://www.chainalysis.com/',
        documentation: 'https://support.chainalysis.com/',
        price: '$16,000+/سنوياً',
        rating: 4.8,
        downloads: '5K+',
        lastUpdate: '2024-02-12',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
        tags: ['عملات مشفرة', 'تتبع أموال', 'امتثال'],
        difficulty: 'متخصص',
        tutorial: 'https://www.youtube.com/watch?v=chainalysis-tutorial'
    },

    // Email Forensics Tools
    {
        id: 'mailxaminer',
        name: 'MailXaminer',
        category: 'email-forensics',
        type: 'تجاري',
        platforms: ['Windows'],
        description: 'أداة متقدمة لتحليل وفحص رسائل البريد الإلكتروني من مختلف المنصات',
        features: [
            'دعم أكثر من 20 تنسيق بريد إلكتروني',
            'استعادة الرسائل المحذوفة',
            'تحليل البيانات الوصفية للرسائل',
            'بحث متقدم ومرشحات',
            'إنشاء تقارير تفصيلية'
        ],
        downloadUrl: 'https://www.mailxaminer.com/',
        officialUrl: 'https://www.mailxaminer.com/',
        documentation: 'https://www.mailxaminer.com/support/',
        price: '$399',
        rating: 4.5,
        downloads: '30K+',
        lastUpdate: '2024-01-18',
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=250&fit=crop',
        tags: ['بريد إلكتروني', 'استعادة رسائل', 'تحليل metadata'],
        difficulty: 'مبتدئ',
        tutorial: 'https://www.youtube.com/watch?v=mailxaminer-tutorial'
    }
];

// Operating Systems Data
const operatingSystems = [
    {
        id: 'sift',
        name: 'SIFT Workstation',
        type: 'توزيعة Linux متخصصة',
        description: 'توزيعة أوبنتو متخصصة في التحقيق الجنائي الرقمي من SANS',
        features: [
            'أكثر من 300 أداة جنائية مثبتة مسبقاً',
            'بيئة تطوير متكاملة',
            'دعم تحليل الذاكرة والشبكات',
            'واجهة رسومية سهلة الاستخدام'
        ],
        downloadUrl: 'https://www.sans.org/tools/sift-workstation/',
        price: 'مجاني',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=250&fit=crop'
    },
    {
        id: 'kali-linux',
        name: 'Kali Linux',
        type: 'توزيعة Linux أمنية',
        description: 'التوزيعة الأكثر شهرة لاختبار الاختراق والتحقيق الجنائي',
        features: [
            'أكثر من 600 أداة أمنية',
            'دعم ARM architecture',
            'تحديثات أمنية مستمرة',
            'بيئة عمل متكاملة للأمان السيبراني'
        ],
        downloadUrl: 'https://www.kali.org/get-kali/',
        price: 'مجاني',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop'
    },
    {
        id: 'caine',
        name: 'CAINE Linux',
        type: 'بيئة تحقيق جنائي',
        description: 'Computer Aided Investigative Environment - بيئة متكاملة للتحقيق',
        features: [
            'واجهة سهلة للمبتدئين',
            'أدوات تحليل متقدمة',
            'دعم الأقراص المشفرة',
            'إمكانيات الشبكة المباشرة'
        ],
        downloadUrl: 'https://www.caine-live.net/',
        price: 'مجاني',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop'
    }
];

// Learning Resources
const learningResources = [
    {
        category: 'كتب ومراجع',
        icon: 'fas fa-book',
        items: [
            {
                title: 'Digital Forensics with Open Source Tools',
                author: 'Cory Altheide',
                description: 'دليل شامل لاستخدام الأدوات مفتوحة المصدر في التحقيق الجنائي',
                url: '#',
                rating: 4.6
            },
            {
                title: 'The Art of Memory Forensics',
                author: 'Michael Ligh',
                description: 'الكتاب الأساسي لتعلم تحليل الذاكرة باستخدام Volatility',
                url: '#',
                rating: 4.8
            },
            {
                title: 'Network Forensics: Tracking Hackers',
                author: 'Sherri Davidoff',
                description: 'تعلم تقنيات تتبع المهاجمين عبر الشبكات',
                url: '#',
                rating: 4.5
            }
        ]
    },
    {
        category: 'دورات تدريبية',
        icon: 'fas fa-video',
        items: [
            {
                title: 'SANS FOR508: Advanced Incident Response',
                provider: 'SANS Institute',
                description: 'دورة متقدمة في الاستجابة للحوادث والتحقيق الجنائي',
                url: '#',
                duration: '6 أيام',
                rating: 4.9
            },
            {
                title: 'Computer Forensics Fundamentals',
                provider: 'Cybrary',
                description: 'أساسيات التحقيق الجنائي الرقمي للمبتدئين',
                url: '#',
                duration: '8 ساعات',
                rating: 4.4
            },
            {
                title: 'Mobile Device Security and Forensics',
                provider: 'Udemy',
                description: 'تعلم تحليل الأجهزة المحمولة والأمان',
                url: '#',
                duration: '12 ساعة',
                rating: 4.3
            }
        ]
    },
    {
        category: 'شهادات احترافية',
        icon: 'fas fa-certificate',
        items: [
            {
                title: 'CHFI - Computer Hacking Forensic Investigator',
                provider: 'EC-Council',
                description: 'شهادة معترف بها عالمياً في التحقيق الجنائي الرقمي',
                url: '#',
                difficulty: 'متوسط',
                rating: 4.7
            },
            {
                title: 'GCFA - GIAC Certified Forensic Analyst',
                provider: 'SANS/GIAC',
                description: 'شهادة متقدمة في تحليل الأدلة الرقمية',
                url: '#',
                difficulty: 'متقدم',
                rating: 4.9
            },
            {
                title: 'EnCE - EnCase Certified Examiner',
                provider: 'Guidance Software',
                description: 'شهادة متخصصة في استخدام أداة EnCase',
                url: '#',
                difficulty: 'متقدم',
                rating: 4.8
            }
        ]
    }
];

// Statistics and Counters
const siteStats = {
    totalTools: forensicsTools.length,
    totalCategories: categories.length,
    totalResources: learningResources.reduce((acc, cat) => acc + cat.items.length, 0),
    lastUpdated: '2024-02-15'
};

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        categories,
        forensicsTools,
        operatingSystems,
        learningResources,
        siteStats
    };
}