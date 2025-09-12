# 🔍 دليل شامل لأدوات التحقيق الجنائي الرقمي (Digital Forensics Toolkit)
# الموقع :

>  **https://digitalforensicstools711.netlify.app**

> 🌐 **مصدر مرجعي متكامل - محدث حتى 2025**  
> ✅ يشمل: أدوات مجانية/تجارية، توزيعات، أجهزة، تقنيات مستقبلية، ومعايير دولية  
> 💡 مصمم للمبتدئين، المحترفين، المؤسسات، والباحثين

---

##  التصنيف الرئيسي للأدوات

### 1️⃣ حسب الترخيص

#### 🆓 الأدوات المجانية والمفتوحة المصدر (FOSS)
| الأداة | الوظيفة الرئيسية |
|-------|------------------|
| **Autopsy** | منصة متكاملة للتحقيق الجنائي بواجهة رسومية (مبنية على The Sleuth Kit) |
| **The Sleuth Kit (TSK)** | مجموعة أدوات سطر أوامر لتحليل أقراص التخزين (NTFS, FAT, EXT, etc.) |
| **SIFT Workstation** | توزيعة لينكس من SANS متخصصة في التحقيق الجنائي (تحتوي على 300+ أداة) |
| **Volatility Framework** | تحليل الذاكرة العشوائية (RAM) لأنظمة Windows, Linux, macOS |
| **Wireshark** | محلل بروتوكولات الشبكة الأكثر استخدامًا عالميًا |
| **Bulk Extractor** | استخراج البيانات من الأقراص (عناوين البريد، URLs، ملفات PDF، إلخ) |
| **Digital Forensics Framework (DFF)** | إطار عمل مفتوح المصدر لتحليل الأدلة الرقمية |
| **Guymager** | واجهة رسومية لإنشاء صور الأقراص (AFF4, E01, RAW) |
| **dd / dcfldd** | نسخ الأقراص بسرعات عالية مع تحقق من التكامل (dcfldd محسّنة للتحقيق) |
| **PhotoRec** | استعادة الملفات المحذوفة من أي نظام ملفات |
| **TestDisk** | استعادة أقسام الأقراص التالفة أو المحذوفة |
| **ExifTool** | قراءة وتحرير البيانات الوصفية (Metadata) لكل أنواع الملفات |
| **Binwalk** | تحليل ملفات البرامج الثابتة (Firmware) واستخراج المحتوى المضمن |
| **file** | تحديد نوع الملفات بناءً على "magic bytes" |
| **Hex Editor Neo / HxD** | محررات سداسية عشرية لتحليل الملفات الثنائية |
| **NetworkMiner** | استخراج الملفات، الصور، كلمات المرور من حركة مرور الشبكة |
| **Snort** | نظام كشف التسلل (IDS) وتحليل حزم الشبكة |
| **tcpdump** | التقاط حزم الشبكة عبر سطر الأوامر |
| **Nmap** | استكشاف الشبكات، فحص المنافذ، وتحديد الأنظمة |
| **Netstat** | عرض الاتصالات الشبكية النشطة |
| **Arkime (Moloch)** | تخزين وفهرسة وتحليل كامل لحركة الشبكة |
| **LiME** | جمع صورة ذاكرة RAM لأنظمة Linux |
| **Rekall** | إطار عمل بديل لـ Volatility، مدعوم بـ Google |
| **DB Browser for SQLite** | تحليل قواعد بيانات SQLite (مستخدمة في الهواتف والمتصفحات) |
| **YARA** | كشف البرمجيات الخبيثة باستخدام قواعد معرفة |
| **Sigma Rules** | قواعد كشف التهديدات في السجلات (Logs) |
| **Andriller** | تحليل أجهزة Android مفتوحة المصدر |
| **OpenSSL** | تحليل وتوليد التشفير الرقمي (TLS, SSL, Certificates) |
| **Maltego** | تحليل الروابط والعلاقات بين الكيانات (أرقام، بريد، نطاقات، إلخ) |
| **Gephi** | تصور الشبكات المعقدة (اجتماعية، بيانية، شبكية) |
| **FFmpeg** | معالجة وتحويل ملفات الفيديو والصوت للتحليل |
| **VLC Media Player** | تشغيل وتحليل الفيديوهات المشبوهة (دعم التنسيقات المتعددة) |
| **Chainalysis Reactor** *(نسخة مجانية محدودة)* | تحليل معاملات البلوك تشين (BTC, ETH) |
| **Bitquery Coinpath API** | تحليل مسارات المعاملات في الوقت الحقيقي |

#### 💰 الأدوات التجارية (Commercial)
| الأداة | الوظيفة الرئيسية |
|--------|------------------|
| **EnCase Forensic** | المعيار الذهبي للتحقيق الجنائي (دعم قانوني عالمي) |
| **FTK (Forensic Toolkit)** | من AccessData – تحليل شامل للأقراص، الذاكرة، البريد، المتصفحات |
| **X-Ways Forensics** | أداة قوية وسريعة، ممتازة للتحقيق المتعمق (بدون تثبيت) |
| **Magnet Axiom** | منصة متكاملة للبيانات من الأجهزة، السحابة، وسائل التواصل |
| **Cellebrite UFED** | الأداة الرائدة لاستخراج البيانات من الهواتف (iOS, Android, IoT) |
| **Oxygen Forensic Detective** | تحليل متقدم للهواتف، السحابة، وسائل التواصل، التطبيقات |
| **MSAB XRY** | استخراج آمن وقانوني للبيانات المحمولة (مع دعم لـ WhatsApp, Signal) |
| **Magnet GrayKey** | فتح وتحليل أجهزة iOS وAndroid دون الحاجة لفك التشفير |
| **Hancom MD-NEXT** | تحليل مخصص للأجهزة الآسيوية (Samsung, Huawei, Xiaomi) |
| **MOBILedit Forensic** | استخراج وتحليل بيانات الهواتف مع دعم كبير للرسائل |
| **MailXaminer** | تحليل صناديق البريد الإلكتروني (PST, OST, EML, MSG) |
| **Aid4Mail** | تحويل وتحليل البريد الإلكتروني بين تنسيقات مختلفة |
| **Kernel Email Forensics** | استعادة رسائل البريد المحذوفة من Outlook وExchange |
| **Digital Detective NetAnalysis** | تحليل ملفات متصفحات الإنترنت وسجلات النظام |
| **Browser History Examiner** | تحليل تفصيلي لتاريخ المتصفحات (Chrome, Firefox, Edge, Safari) |
| **Web Historian** | تحليل شامل لأنشطة التصفح مع خريطة زمنية |
| **ChromeAnalysis Plus** | تحليل متخصص لمتصفح Chrome (سجلات، إشارات، تواريخ) |
| **SQL Server Forensic Toolkit** | تحليل قواعد بيانات SQL Server (سجلات، تغييرات، عمليات) |
| **Oracle Database Forensics** | أدوات فحص قواعد بيانات Oracle للتحقيق الجنائي |
| **Amped FIVE** | تحسين الصور والفيديوهات الجنائية (إضاءة، توضيح، تثبيت) |
| **Belkasoft X** | تحليل شامل للأجهزة، الذاكرة، السحابة، البلوك تشين |
| **Nuix Investigate** | تحليل بيانات ضخمة بالذكاء الاصطناعي (بريد، مستندات، وسائل التواصل) |
| **IBM i2 Analyst’s Notebook** | تحليل العلاقات والشبكات باستخدام الذكاء الاصطناعي |
| **Magnet AI** | ميزات ذكاء اصطناعي مدمجة في Magnet Axiom لاكتشاف الأنماط |
| **Magnet Axiom Cloud** | استخراج وتحليل بيانات السحابة (Microsoft 365, Google Workspace, iCloud) |
| **Oxygen Forensic Cloud Extractor** | استخراج مباشر من خدمات السحابة (WhatsApp Web, Telegram, etc.) |
| **Cellebrite Cloud Analyzer** | تحليل بيانات التخزين السحابي من الأجهزة المحمولة |
| **Chainalysis** | الرائد العالمي في تتبع العملات المشفرة (BTC, ETH, Monero) |
| **Elliptic** | تحليل مخاطر العملات المشفرة وغسيل الأموال |
| **CipherTrace** | تتبع المعاملات المشبوهة في البلوك تشين |
| **Crystal Blockchain** | تحليل البلوك تشين من Bitfury (دعم DeFi وNFTs) |
| **TRM Labs** | إدارة مخاطر العملات المشفرة للشركات والحكومات |
| **Vehicle System Forensic Toolkit** | تحليل أنظمة السيارات الذكية (ECU, Infotainment) |
| **Berla iVe** | استخراج بيانات أنظمة الترفيه في السيارات |
| **Oxygen Forensic Vehicle** | تحليل السيارات الذكية (Tesla, BMW, Ford) |
| **X1 Social Discovery** | تحليل شامل لوسائل التواصل الاجتماعي (Facebook, Instagram, TikTok, Discord) |
| **Pagefreezer** | أرشفة وحفظ أدلة وسائل التواصل الاجتماعي قانونيًا |
| **ArchiveSocial** | أرشفة تفاعلية لمنصات التواصل (مقبولة في المحاكم) |
| **Skopenow** | البحث في وسائل التواصل الاجتماعي (الحسابات، المشاركات، الجغرافيا) |
| **Palantir Gotham** | تحليل بيانات ضخمة للأمن القومي والجريمة المنظمة |
| **Apache Spark / Hadoop** | معالجة بيانات ضخمة للتحقيق الجنائي (للفرق المتقدمة) |
| **Elastic Stack (ELK)** | تحليل السجلات في الزمن الحقيقي (Logs, SIEM) |
| **Hashcat** | فك تشفير كلمات المرور بسرعة هائلة (GPU-optimized) |
| **John the Ripper** | كسر كلمات المرور (مدعوم بقواعد قوية) |
| **Ophcrack** | كسر كلمات مرور Windows باستخدام طاولات قوس قزح |
| **L0phtCrack** | تحليل كلمات مرور Windows (قديم لكنه موثوق) |
| **Cain & Abel** | استعادة كلمات المرور وتحليل شبكات Windows (قديم لكنه تعليمي) |
| **Tableau Forensic Bridges** | موانع كتابة احترافية (Hardware Write Blockers) |
| **CRU WiebeTech** | موانع كتابة USB/SATA موثوقة عالميًا |
| **Digital Intelligence** | موانع كتابة متقدمة مع دعم SATA/USB/NVMe |
| **LogiCube Forensic Falcon** | أدوات تكرار جنائية متعددة المنافذ |
| **Cellebrite UFED Touch** | جهاز استخراج محمول للهواتف (محمول وسهل الاستخدام) |
| **MSAB XRY Hardware** | معدات استخراج محمولة للهواتف (مع دعم التشفير) |
| **DeeperForensics / FaceForensics++ / Deepware Scanner** | كشف Deepfakes والفيديوهات المزيفة |
| **Microsoft Video Authenticator** | أداة رسمية من مايكروسوفت لكشف التلاعب الإعلامي |
| **VR Forensics Tools** | أدوات تجريبية لتحليل البيئات الافتراضية (Meta Horizon, VRChat) |
| **Game Forensics Toolkit** | تحليل بيانات الألعاب (Steam, Discord, Fortnite, GTA) |

---

### 2️⃣ حسب نوع البيانات المحللة

#### 🖥️ تحليل الحاسوب (Computer Forensics)
- Autopsy + The Sleuth Kit  
- FTK Imager  
- X-Ways Forensics  
- OSForensics  
- CAINE Linux  
- Paladin (Ubuntu-based)  
- SIFT Workstation  
- DEFT Linux  
- Parrot Security OS  
- BlackArch  

####  تحليل الذاكرة (Memory Forensics)
- Volatility Framework  
- Rekall  
- Magnet DumpIt  
- WindowsSCOPE  
- LiME  
- MemProcFS (متقدم)  

#### 🌐 تحليل الشبكة (Network Forensics)
- Wireshark  
- NetworkMiner  
- Snort  
- tcpdump  
- Nmap  
- Netstat  
- Arkime (Moloch)  
- Zeek (Bro) 
- Suricata 

#### 📱 تحليل الأجهزة المحمولة (Mobile Forensics)
- Cellebrite UFED  
- Oxygen Forensic Detective  
- MSAB XRY  
- Magnet GrayKey  
- Hancom MD-NEXT  
- MOBILedit Forensic  
- Andriller  
- iPhone Backup Extractor 
- iMazing Forensic   

#### 📧 تحليل البريد الإلكتروني (Email Forensics)
- MailXaminer  
- Aid4Mail  
- Kernel Email Forensics  
- Digital Detective NetAnalysis  
- X1 Social Discovery  

#### 🌐 تحليل المتصفحات (Browser Forensics)
- Browser History Examiner  
- Browser History Viewer  
- Web Historian  
- ChromeAnalysis Plus  
- Firefox Forensics Toolkit 

#### 💾 تحليل قواعد البيانات (Database Forensics)
- DB Browser for SQLite  
- SQL Server Forensic Toolkit  
- Oracle Database Forensics  
- MongoDB Forensics 
- Redis Forensics 

#### 🗃️ تحليل البيانات الوصفية (Metadata)
- ExifTool  
- Metadata Anonymisation Toolkit (MAT) 

#### 🔓 تحليل كلمات المرور (Password Analysis)
- Hashcat  
- John the Ripper  
- Ophcrack  
- L0phtCrack  
- Cain & Abel  
- KeyFinder  
- DecryptTools 

#### 📂 استعادة البيانات (Data Recovery)
- PhotoRec  
- TestDisk  
- Recuva  
- R-Studio  
- Disk Drill  
- foremost  
- scalpel 

#### 🕵️‍♂️ تحليل الصور والفيديو (Image/Video Forensics)
- Amped FIVE  
- VLC  
- FFmpeg  
- StegSolve  
- StegDetect   
- ImageJ  

#### ☁️ التحقيق السحابي (Cloud Forensics)
- Magnet Axiom Cloud  
- Oxygen Forensic Cloud Extractor  
- Cellebrite Cloud Analyzer  
- MSAB Cloud Analytics  
- AWS Forensics Toolkit  
- Azure Forensics Toolkit 
- Google Cloud Forensics  

#### 🤖 تحليل إنترنت الأشياء (IoT Forensics)
- IoT Detective  
- UFED Physical Analyzer  
- Autopsy IoT Modules  
- Raspberry Pi Forensics Toolkit  
- Smart Home Device Analyzer  

#### ⚙️ تحليل السيارات والأنظمة الذكية (Vehicle Forensics)
- Vehicle System Forensic Toolkit  
- Berla iVe  
- Oxygen Forensic Vehicle  
- OBD-II Forensics

#### 🧩 تحليل البلوك تشين والعملات المشفرة (Blockchain Forensics)
- Chainalysis  
- Elliptic  
- CipherTrace  
- Crystal Blockchain  
- TRM Labs  
- Bitquery Coinpath API  
- MyCrypto / Etherscan 

#### 🎮 تحليل الألعاب والعوالم الافتراضية (Game & Metaverse Forensics)
- Game Forensics Toolkit  
- Steam Analysis Tools  
- Discord Investigation  
- VR Forensics Tools  
- NFT Investigation Toolkit  

#### 📊 تحليل وسائل التواصل الاجتماعي (Social Media Forensics)
- X1 Social Discovery  
- Pagefreezer  
- ArchiveSocial  
- Skopenow  
- Facebook/Meta Inspector  
- Instagram Data Grabber 
- TikTok Forensics Tool 

#### 🛡️ مكافحة تقنيات مضادة للتحقيق (Anti-Forensics Countermeasures)
- StegDetect  
- StegSolve  
- PhotoRec / TestDisk (للاستعادة)  
- Rekall / MemProcFS  
- DecryptTools  
- KeyFinder  
- DBAN  
- Eraser  
- Tor / I2P / VPN Detection Tools 
- Monero / Zcash Tracing Tools  

#### 🧠 تحليل الذكاء الاصطناعي والتعلم الآلي (AI/ML in DFIR)
- Magnet AI  
- Nuix Investigate  
- IBM i2 Analyst’s Notebook  
- BelkaGPT (Belkasoft X)  
- Deepware Scanner  
- Microsoft Video Authenticator  
- DeeperForensics  
- FaceForensics++  

#### 📦 أدوات البيانات الضخمة (Big Data Analytics)
- Apache Spark  
- Hadoop Ecosystem  
- Elastic Stack (ELK)  
- Palantir Gotham  
- Gephi  
- NetworkX (Python)  
- Cytoscape  

####  أدوات التخصص المتقدمة
- **MITRE ATT&CK Framework** – تحليل تكتيكات المهاجمين  
- **YARA Rules** – كشف البرمجيات الخبيثة  
- **Sigma Rules** – كشف التهديدات في السجلات  
- **Zeek (Bro)** – تحليل شبكة متقدم  
- **Suricata** – IDS/IPS مفتوح المصدر  
- **RedisInsight** – تحليل قواعد بيانات Redis  
- **MongoDB Compass** – تحليل قواعد بيانات MongoDB  
- **iPhone Backup Extractor** – استخراج بيانات iOS من النسخ الاحتياطية  
- **iMazing Forensic** – استخراج بيانات iPhone بدون فك تشفير  
- **OBD-II Forensics** – استخراج بيانات من وحدة التحكم في السيارة  
- **MyCrypto / Etherscan** – تحليل معاملات Ethereum  
- **Monero Traceability Tools** – تتبع Monero (مثل Monero Research Lab tools)  
- **VR Forensics Toolkit** – أدوات تجريبية لتحليل البيئات الافتراضية  
- **NFT Investigation Toolkit** – تتبع الملكية الرقمية للرموز غير القابلة للاستبدال  
- **Discord Investigation Suite** – تحليل الخوادم، الرسائل، الملفات، المستخدمين  

---

### 3️⃣ التوزيعات المتخصصة (Live Forensics Distributions)

| التوزيعة | الميزة الرئيسية |
|----------|----------------|
| **Kali Linux** | أشهر توزيعة اختبار أمني، تحتوي على 600+ أداة |
| **SIFT Workstation** | من SANS – مخصصة للتحقيق الجنائي، محدثة باستمرار |
| **CAINE** | Computer Aided Investigative Environment – واجهة مستخدم سهلة |
| **DEFT Linux** | Digital Evidence & Forensics Toolkit – موجه للشرطة الإيطالية |
| **Parrot Security OS** | دمج بين الأمن والتحقيق الجنائي مع واجهة مستخدم حديثة |
| **BlackArch** | توزيعة مبنية على Arch Linux، بها أكثر من 2800 أداة أمنية |
| **FTK Imager Live** | نسخة قابلة للتشغيل من USB (للمستخدمين التجاريين) |
| **Ubuntu Forensics Edition** | نسخة مخصصة من أوبنتو للتحقيق (غير رسمية لكن شائعة) |

---

### 4️⃣ أدوات الأجهزة (Hardware Tools)

| الأداة | الوظيفة |
|--------|---------|
| **Tableau Forensic Bridges** | موانع كتابة احترافية (SATA, USB, NVMe) |
| **CRU WiebeTech** | موثوقة عالميًا، مقبولة في المحاكم |
| **Digital Intelligence** | دعم متقدم للـ NVMe وSSD |
| **LogiCube Forensic Falcon** | جهاز تكرار جنائي متعدد المنافذ |
| **Cellebrite UFED Touch** | جهاز استخراج محمول للهواتف |
| **MSAB XRY Hardware** | معدات استخراج محمولة للهواتف الذكية |
| **Oxygen Forensic Detective Hardware** | أجهزة مخصصة لاستخراج البيانات من الهواتف |

---

### 5️⃣ أدوات التحليل المتقدم (Advanced & Emerging)

| المجال | الأدوات |
|--------|---------|
| **الذكاء الاصطناعي** | Magnet AI, Nuix, IBM i2, BelkaGPT |
| **البلوك تشين** | Chainalysis, Elliptic, Crystal Blockchain |
| **إنترنت الأشياء (IoT)** | IoT Detective, Autopsy IoT Modules |
| **السيارات الذكية** | Berla iVe, Oxygen Forensic Vehicle |
| **السحابة** | Magnet Axiom Cloud, Oxygen Cloud Extractor |
| **وسائل التواصل** | X1 Social Discovery, Pagefreezer, ArchiveSocial |
| **Deepfakes** | Deepware Scanner, FaceForensics++, Microsoft Video Authenticator |
| **الواقع الافتراضي** | VR Forensics Tools (تجريبية) |
| **الألعاب والمتاهات الرقمية** | Game Forensics Toolkit, Discord Investigation |
| **البيانات الضخمة** | Apache Spark, Palantir Gotham, ELK Stack |
| **الحوسبة الكمية** | Qiskit (للتحضير لما بعد الكمية) — *مجال ناشئ* |

---

##  معايير الاختيار والاعتماد

### ✅ عند اختيار الأدوات، اسأل:
| السؤال | التوجيه |
|--------|---------|
| **نوع القضية؟** | جنائية؟ مدنية؟ داخلية؟ |
| **نوع الجهاز؟** | حاسوب؟ هاتف؟ خادم؟ سيارة؟ سحابة؟ |
| **الميزانية؟** | مجاني أم تجاري؟ |
| **مستوى الخبرة؟** | مبتدئ؟ محترف؟ فريق؟ |
| **القبول القانوني؟** | هل الأداة مقبولة في المحاكم؟ (EnCase, FTK, Cellebrite غالبًا نعم) |
| **التحديثات والدعم؟** | هل الشركة لا تزال تطور الأداة؟ |
| **التوافق مع المعايير؟** | ISO/IEC 27037, NIST SP 800-86 |

---

## 📜 معايير الجودة والاعتماد الدولي

| المعيار | الوصف |
|---------|-------|
| **ISO/IEC 27037** | إرشادات جمع وتحليل الأدلة الرقمية |
| **NIST SP 800-86** | دليل التحقيق الجنائي الرقمي (المعيار الأمريكي) |
| **ACPO Guidelines (UK)** | مبادئ الشرطة البريطانية للتحقيق الرقمي |
| **RFC 3227** | إرشادات جمع وأرشفة الأدلة الإلكترونية |
| **SANS GIAC Certifications** | GCFA, GNFA, GCTI |
| **EnCE (EnCase Certified Examiner)** | شهادة رسمية من Guidance Software |
| **CCFE (Certified Computer Forensics Examiner)** | معتمد من IACIS |
| **CHFI (Computer Hacking Forensic Investigator)** | معتمد من EC-Council |

---

## 🎯 التوصيات العملية

### 👶 للمبتدئين
- ابدأ بـ **SIFT Workstation** أو **Kali Linux**
- تعلّم **Autopsy** و **The Sleuth Kit**
- اتقن **Wireshark** لتحليل الشبكات
- استخدم **Volatility** لتحليل الذاكرة
- تدرّب على **ExifTool** و **dd/dcfldd**
- احصل على شهادة **CHFI** أو **GCFA**

### 🧑 للمتخصصين
- استثمر في **EnCase**, **FTK**, أو **X-Ways Forensics**
- احصل على **Cellebrite UFED** للأجهزة المحمولة
- استخدم **Magnet Axiom** للحلول المتكاملة
- تخصص في مجال واحد: **الهواتف، السحابة، البلوك تشين، أو الذكاء الاصطناعي**
- تعلّم **Python** و **SQL** للتحليل التلقائي

### 🏢 للمؤسسات
- بِنْ فريقًا متكاملًا: محققون، مبرمجون، خبراء سحابة، قانونيون
- استثمر في أدوات تجارية موثوقة + ترخيص دائم
- طوّر مختبر تدريبي باستخدام **VirtualBox/VMware**
- اربط التحقيق مع أنظمة **SIEM** و **SOAR**
- شارك في مؤتمرات مثل: **DFRWS, EnFuse, SANS DFIR Summit**

---

##  اتجاهات المستقبل (2025–2030)

| الاتجاه | التوقعات |
|--------|-----------|
| **التحقيق التلقائي الكامل (Fully Automated DFIR)** | تحليل ذاتي للبيانات دون تدخل بشري |
| **التحليل التنبؤي للجرائم** | توقع الجرائم قبل حدوثها باستخدام الذكاء الاصطناعي |
| **التكامل بين الأمن والتحقيق** | منصات واحدة للحماية والتحقيق (EDR + DFIR) |
| **الذكاء الاصطناعي الكمي** | استخدام الحواسيب الكمية لفك التشفير المعقد |
| **التحقيق في الواقع الافتراضي (VR/AR)** | جمع أدلة من بيئات Meta Horizon، Oculus |
| **التحقيق في NFTs وMetaverse** | تتبع الملكية الرقمية، التداول، والاحتيال |
| **التحقيق في الذكاء الاصطناعي نفسه** | هل تم استخدام AI في ارتكاب الجريمة؟ (مثل Deepfake or Generative Fraud) |
| **التحديات:** | التشفير الكمومي، العملات المشفرة المجهولة، الأجهزة المدمجة، غياب التشريعات العالمية |

---

## 📌 ملاحظات مهمة

- ✅ جميع الأدوات المذكورة مُختبرة ومقبولة في التحقيقات الرسمية.
- 🚫 لا تستخدم أدوات غير معتمدة في التحقيقات القضائية (مثل Cain & Abel أو HxD في المحاكم).
- 🔒 دائماً استخدم **Write Blockers** أثناء جمع الأدلة.
- 📚 اقرأ دليل **NIST SP 800-86** كمرجع أساسي.
- 💬 استخدم **GitHub** و **Reddit (/r/DigitalForensics)** للبقاء محدثًا.

---

## 🌐 مصادر مفيدة

- [NIST Digital Forensics Resources](https://www.nist.gov/itl/applied-cybersecurity/digital-forensics)
- [SANS Digital Forensics and Incident Response](https://www.sans.org/cyber-security-courses/digital-forensics/)
- [Digital Forensics Framework (DFF)](https://github.com/DigitalForensicsFramework/DFF)
- [Volatility Foundation](https://volatilityfoundation.org/)
- [Chainalysis Academy](https://www.chainalysis.com/academy/)
- [Magnet Forensics Blog](https://www.magnetforensics.com/blog/)

---

> 💡 **ملاحظة أخيرة**: هذا الدليل مُحدث حتى **أبريل 2025**.  
 

