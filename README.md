# 🔍 دليل أدوات التحقيق الجنائي الرقمي | Digital Forensics Tools Guide

## 📋 وصف المشروع

موقع إلكتروني شامل ومتخصص لأدوات التحقيق الجنائي الرقمي، يوفر دليلاً كاملاً من المبتدأ إلى الاحتراف. يتميز الموقع بتصميم مظلم جذاب مع تأثيرات بصرية متقدمة وواجهة سهلة الاستخدام.

## ✨ الميزات الرئيسية

### 🎯 الميزات المُنجزة حالياً

- ✅ **تصميم مظلم جذاب**: واجهة احترافية بألوان سايبر مع تأثيرات بصرية متقدمة
- ✅ **قاعدة بيانات شاملة**: أكثر من 20 أداة جنائية مع التفاصيل الكاملة
- ✅ **8 تصنيفات رئيسية**: تحليل الحاسوب، الأجهزة المحمولة، الشبكات، الذاكرة، السحابة، البلوك تشين، البرمجيات الخبيثة، البريد الإلكتروني
- ✅ **بحث متقدم**: فهرسة ذكية، اقتراحات تلقائية، تاريخ البحث، بحث صوتي (متاح للمتصفحات المدعومة)
- ✅ **فلترة ذكية**: حسب الفئة، نوع الترخيص، المنصة، مستوى الصعوبة
- ✅ **تصميم متجاوب**: يعمل بكفاءة على جميع الأجهزة والشاشات
- ✅ **تأثيرات تفاعلية**: رسوم متحركة متقدمة، تأثيرات الـ parallax، تأثيرات السايبر
- ✅ **تحسين الأداء**: تحميل محسن، ضغط الصور، تحسين الرسوم المتحركة حسب أداء الجهاز
- ✅ **إمكانية الوصول**: دعم قارئات الشاشة، تقليل الحركة للمستخدمين الذين يحتاجون ذلك

### 🏗️ الميزات قيد التطوير

- 🔄 **SEO محسن**: بيانات وصفية، خريطة الموقع، تحسين محركات البحث
- 📱 **صفحات فرعية**: صفحة مخصصة لكل تصنيف مع أدوات متخصصة
- 📚 **دليل التعلم الشامل**: مسارات تعليمية تفاعلية من المبتدأ للخبير
- 🎓 **موارد تعليمية**: كتب، دورات، شهادات، مجتمعات

## 🛠️ التقنيات المستخدمة

### Frontend
- **HTML5**: بنية دلالية محسنة
- **CSS3**: 
  - متغيرات CSS لسهولة التخصيص
  - Grid و Flexbox للتخطيطات المرنة
  - رسوم متحركة متقدمة
  - تصميم متجاوب
- **JavaScript (ES6+)**:
  - فئات حديثة للتنظيم
  - Intersection Observer API
  - Local Storage للتخزين المحلي
  - Web Speech API للبحث الصوتي

### Libraries & APIs
- **Font Awesome 6**: الأيقونات
- **Google Fonts**: خطوط Cairo و Roboto Mono
- **Unsplash API**: الصور عالية الجودة

### أدوات التطوير
- **Git**: إدارة النسخ
- **ESLint**: جودة الكود
- **Prettier**: تنسيق الكود

## 📁 هيكل المشروع

```
digital-forensics-guide/
├── index.html              # الصفحة الرئيسية
├── css/
│   ├── style.css          # الأنماط الأساسية
│   ├── components.css     # أنماط المكونات
│   ├── animations.css     # الرسوم المتحركة
│   └── responsive.css     # التصميم المتجاوب
├── js/
│   ├── main.js           # الوظائف الرئيسية
│   ├── data.js           # قاعدة البيانات
│   ├── search.js         # وظائف البحث المتقدم
│   └── animations.js     # تحكم الرسوم المتحركة
├── assets/
│   ├── images/           # الصور
│   └── icons/            # الأيقونات
└── README.md             # وثائق المشروع
```

## 🚀 دليل التشغيل

### المتطلبات الأساسية
- متصفح حديث يدعم ES6+
- خادم ويب محلي (اختياري للتطوير)

### التشغيل المحلي
1. **استنساخ المشروع**:
```bash
git clone https://github.com/your-username/digital-forensics-guide.git
cd digital-forensics-guide
```

2. **تشغيل الموقع**:
   - افتح `index.html` في المتصفح مباشرة
   - أو استخدم خادم محلي:
```bash
# باستخدام Python
python -m http.server 8000

# باستخدام Node.js
npx http-server

# باستخدام PHP
php -S localhost:8000
```

3. **فتح المتصفح**:
```
http://localhost:8000
```

## 🎨 التخصيص

### تغيير الألوان
```css
:root {
    --primary-bg: #0a0a0a;        /* خلفية رئيسية */
    --cyber-green: #00ff88;       /* أخضر سايبر */
    --cyber-blue: #00d4ff;        /* أزرق سايبر */
    --cyber-purple: #8b5cf6;      /* بنفسجي سايبر */
}
```

### إضافة أدوات جديدة
قم بتحديث ملف `js/data.js`:
```javascript
const forensicsTools = [
    {
        id: 'new-tool',
        name: 'اسم الأداة',
        category: 'computer-forensics',
        type: 'مجاني',
        platforms: ['Windows', 'Linux'],
        description: 'وصف الأداة...',
        features: ['ميزة 1', 'ميزة 2'],
        downloadUrl: 'https://example.com',
        // ... باقي الخصائص
    }
];
```

## 📊 إحصائيات المشروع

| المكون | العدد | الحالة |
|--------|-------|--------|
| **الأدوات** | 20+ | ✅ مكتمل |
| **التصنيفات** | 8 | ✅ مكتمل |
| **صفحات CSS** | 4 | ✅ مكتمل |
| **ملفات JS** | 4 | ✅ مكتمل |
| **الميزات التفاعلية** | 15+ | ✅ مكتمل |
| **دعم اللغات** | العربية/الإنجليزية | ✅ مكتمل |

## 🔗 الروابط والموارد

### الأدوات المميزة
- **[Autopsy](https://www.sleuthkit.org/autopsy/)** - منصة شاملة مفتوحة المصدر
- **[Wireshark](https://www.wireshark.org/)** - محلل بروتوكولات الشبكة
- **[Volatility](https://www.volatilityfoundation.org/)** - تحليل الذاكرة العشوائية
- **[Cellebrite UFED](https://cellebrite.com/)** - استخراج بيانات الأجهزة المحمولة

### موارد تعليمية
- **SANS Institute** - تدريب احترافي متقدم
- **EC-Council** - شهادات CHFI
- **GIAC** - شهادات GCFA و GNFA

## 🤝 المساهمة

نرحب بمساهماتكم لتطوير الموقع:

1. **Fork المشروع**
2. **إنشاء فرع جديد**:
```bash
git checkout -b feature/amazing-feature
```
3. **إضافة التغييرات**:
```bash
git commit -m 'Add some amazing feature'
```
4. **رفع الفرع**:
```bash
git push origin feature/amazing-feature
```
5. **فتح Pull Request**

### إرشادات المساهمة
- اتبع نمط الكود الحالي
- أضف تعليقات توضيحية
- اختبر التغييرات على أجهزة مختلفة
- تأكد من دعم إمكانية الوصول

## 🐛 الأخطاء والاقتراحات

لديك مشكلة أو اقتراح؟ 
- **فتح Issue** على GitHub
- **التواصل عبر** البريد الإلكتروني
- **انضمام للمجتمع** على Discord/Telegram

## 📈 خارطة الطريق المستقبلية

### 🎯 الإصدار 2.0 (Q2 2024)
- [ ] نظام إدارة المحتوى
- [ ] تقييمات وتعليقات المستخدمين
- [ ] نظام إشعارات للتحديثات
- [ ] دعم لغات إضافية

### 🎯 الإصدار 3.0 (Q4 2024)
- [ ] تطبيق محمول مصاحب
- [ ] ورش عمل تفاعلية
- [ ] شراكات مع مقدمي التدريب
- [ ] منصة مجتمع متكاملة

## 📄 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE) - راجع ملف الترخيص للتفاصيل.

## 🙏 شكر وتقدير

- **SANS Institute** - للموارد التعليمية القيمة
- **مجتمع الأمن السيبراني العربي** - للدعم والمشاركة
- **المطورين مفتوحي المصدر** - للأدوات الرائعة
- **Unsplash** - للصور عالية الجودة

## 📞 التواصل

- **الموقع**: [digital-forensics-guide.com](https://digital-forensics-guide.com)
- **البريد**: contact@digital-forensics-guide.com
- **Twitter**: [@ForensicsGuide](https://twitter.com/ForensicsGuide)
- **LinkedIn**: [Digital Forensics Guide](https://linkedin.com/company/digital-forensics-guide)

---

<div align="center">

**صُنع بـ ❤️ للمجتمع العربي للأمن السيبراني**

[![GitHub Stars](https://img.shields.io/github/stars/username/digital-forensics-guide?style=social)](https://github.com/username/digital-forensics-guide)
[![GitHub Forks](https://img.shields.io/github/forks/username/digital-forensics-guide?style=social)](https://github.com/username/digital-forensics-guide)
[![GitHub Issues](https://img.shields.io/github/issues/username/digital-forensics-guide)](https://github.com/username/digital-forensics-guide/issues)

</div>