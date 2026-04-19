/**
 * Rukn Navbar - Web Component
 * 100% Vanilla JavaScript - No frameworks, no dependencies
 * SEO-Friendly: Uses semantic HTML5 nav element with proper ARIA labels
 * 
 * Usage:
 *   <rukn-navbar current="home"></rukn-navbar>
 *   <rukn-navbar current="components" search></rukn-navbar>
 *   <rukn-navbar logo-src="path/to/logo.svg" brand-text="My Brand" brand-href="/"></rukn-navbar>
 * 
 * Attributes:
 *   current        - Active page (home|foundation|components)
 *   search         - Show search bar (boolean attribute)
 *   logo-src       - Path to custom logo image/SVG (default: uses inline Rukn logo)
 *   logo-alt       - Alt text for logo (default: "Rukn Design System Logo")
 *   brand-text     - Brand name text (default: "Rukn")
 *   brand-href     - Brand link URL (default: "index.html")
 *   brand-title    - Brand link title attribute (default: "Rukn Design System - Homepage")
 *   show-brand-text - Show brand text next to logo (default: false, logo-only mode)
 *   logo-only      - Alias for show-brand-text="false" (logo-only mode)
 *   logo-wide      - In logo-only mode, stretch logo to match logo+text width (boolean attribute)
 *   text-only      - Show only text, no logo (boolean attribute)
 */

const RUKN_LANGUAGE_STORAGE_KEY = 'rukn-language';
const RUKN_DARK_MODE_STORAGE_KEY = 'rukn-dark-mode';
const RUKN_SUPPORTED_LANGUAGES = ['en', 'ar', 'ur'];
const RUKN_RTL_LANGUAGES = ['ar', 'ur'];

// Native language names (always shown in their own language)
const RUKN_NATIVE_LANGUAGE_NAMES = {
  en: 'English',
  ar: 'العربية',
  ur: 'اردو'
};

const DEFAULT_TRANSLATIONS = {
  en: {
    'language.en': 'English',
    'language.ar': 'Arabic',
    'language.ur': 'Urdu',
    'nav.home': 'Home',
    'nav.foundation': 'Foundation',
    'nav.components': 'Components',
    'nav.pricing': 'Pricing',
    'nav.roadmap': 'Roadmap',
    'nav.about': 'About',
    'nav.github': 'GitHub',
    'nav.darkMode': 'Dark Mode',
    'nav.lightMode': 'Light Mode',
    'index.hero.name': '<strong>Rukn</strong><span aria-hidden="true">•</span><span class="arabic-text">رُكن</span><span aria-hidden="true">•</span><span class="urdu-text">رکن</span>',
    'index.hero.heading.primary': 'The design system',
    'index.hero.heading.secondary': 'built for Arabic.',
    'index.hero.message': 'Zero-dependency Web Components with native RTL, Arabic typography, and Urdu Nastaliq — production-ready on day one.',
    'index.hero.subtext': 'Open source. MIT licensed. Yours to own, extend, and ship.',
    'index.hero.cta.primary': 'Explore Components',
    'index.hero.cta.secondary': 'View on GitHub',
    'index.hero.cta.demo': 'See Demo',
    'index.stats.tokens': 'Design Tokens',
    'index.stats.components': 'Components',
    'index.stats.dependencies': 'Dependencies',
    'index.stats.customizable': 'Customizable',
    'index.section.pricing.title': 'Pricing',
    'index.section.pricing.plan': 'Free',
    'index.section.pricing.subtitle': 'Open source forever',
    'index.section.pricing.body': 'Building the world\'s most modern, open-source design system. MIT licensed, free forever.',
    'index.section.pricing.cta.primary': 'Start Building',
    'foundation.page.title': 'Foundation',
    'foundation.page.subtitle': 'Design tokens, typography, spacing, and layout systems that power Rukn',
    'foundation.badge.tokens': '150+ Design Tokens',
    'foundation.badge.compliant': 'W3C Compliant',
    'foundation.badge.layout': 'Layout Systems',
    'foundation.colors.title': 'Colors',
    'foundation.colors.description': 'Semantic color tokens for consistent theming',
    'components.page.title': 'UI Components',
    'components.page.subtitle': 'Production-ready components with glass morphism and Rukn Motion',
    'components.badge.count': '20+ Components',
    'components.badge.morphism': 'Glass Morphism',
    'components.badge.copy': 'Copy & Paste',
    'components.buttons.title': 'Buttons',
    'components.buttons.description': '7 variants with multiple sizes and states',
    'footer.brand': 'Rukn Design System',
    'footer.built': 'Built with ❤️ for designers and developers everywhere',
    'footer.license': 'MIT Licensed • Open Source Forever • © {year} Rukn Design System',
    'footer.nav.home': 'Home',
    'footer.nav.foundation': 'Foundation',
    'footer.nav.components': 'Components',
    'footer.nav.pricing': 'Pricing',
    'footer.nav.roadmap': 'Roadmap',
    'footer.nav.about': 'About',
    'footer.nav.linkedin': 'LinkedIn',
    'footer.nav.github': 'GitHub',
    'sidebar.foundation.title': 'Foundation',
    'sidebar.foundation.colors': 'Colors',
    'sidebar.foundation.typography': 'Typography',
    'sidebar.foundation.spacing': 'Spacing',
    'sidebar.foundation.sizes': 'Sizes',
    'sidebar.foundation.radius': 'Border Radius',
    'sidebar.foundation.surfaces': 'Surfaces',
    'sidebar.foundation.shadows': 'Shadows',
    'sidebar.foundation.borders': 'Border Widths',
    'sidebar.foundation.motion': 'Rukn Motion',
    'sidebar.foundation.layouts': 'Layouts',
    'sidebar.foundation.container': 'Container',
    'sidebar.foundation.grid': 'Grid System',
    'sidebar.foundation.flexbox': 'Flexbox',
    'sidebar.foundation.responsive': 'Responsive',
    'sidebar.foundation.viewComponents': 'View Components',
    'sidebar.foundation.backHome': 'Back to Home',
    'sidebar.components.title': 'UI Components',
    'sidebar.components.buttons': 'Buttons',
    'sidebar.components.inputs': 'Inputs',
    'sidebar.components.checkbox': 'Checkbox',
    'sidebar.components.radio': 'Radio Group',
    'sidebar.components.switch': 'Switch',
    'sidebar.components.slider': 'Slider',
    'sidebar.components.formfield': 'Form Field',
    'sidebar.components.iconPlaceholder': 'Icon Placeholders',
    'sidebar.components.card': 'Card',
    'sidebar.components.badge': 'Badges',
    'sidebar.components.modal': 'Modal',
    'sidebar.components.drawer': 'Drawer',
    'sidebar.components.navbar': 'Navbar',
    'sidebar.components.feedback': 'Feedback',
    'sidebar.components.tooltip': 'Tooltip',
    'sidebar.components.alert': 'Alert',
    'sidebar.components.toast': 'Toast',
    'sidebar.components.progress': 'Progress',
    'sidebar.components.spinner': 'Spinner',
    'sidebar.components.effects': 'Effects',
    'sidebar.components.glass': 'Glass Morphism',
    'sidebar.components.viewFoundation': 'View Foundation',
    'sidebar.components.backHome': 'Back to Home',
    'sidebar.toggle': 'Toggle sidebar',
    'component.alert.close': 'Close',
    'component.modal.close': 'Close',
    'component.button.loading': 'Loading...',
    'component.input.placeholder': 'Enter text',
    'component.textarea.placeholder': 'Enter message'
  },
  ar: {
    'language.en': 'الإنجليزية',
    'language.ar': 'العربية',
    'language.ur': 'الأردية',
    'nav.home': 'الرئيسية',
    'nav.foundation': 'الأساس',
    'nav.components': 'المكوّنات',
    'nav.pricing': 'التسعير',
    'nav.roadmap': 'خارطة الطريق',
    'nav.about': 'من نحن',
    'nav.github': 'GitHub',
    'nav.darkMode': 'الوضع الداكن',
    'nav.lightMode': 'الوضع الفاتح',
    'index.hero.name': '<strong>ركن</strong><span aria-hidden="true">•</span><span class="arabic-text">رُكن</span><span aria-hidden="true">•</span><span class="urdu-text">رکن</span>',
    'index.hero.heading.primary': 'نظام التصميم',
    'index.hero.heading.secondary': 'المبني للعربية.',
    'index.hero.message': 'مكوّنات ويب بلا تبعيات — دعم أصيل للغة العربية والنص من اليمين إلى اليسار وخط النستعليق الأردي، جاهزة للإنتاج منذ اليوم الأول.',
    'index.hero.subtext': 'مفتوح المصدر. ترخيص MIT. ملكك تمامًا — طوّره، وسّعه، وأطلقه.',
    'index.hero.cta.primary': 'استكشف المكوّنات',
    'index.hero.cta.secondary': 'عرض على GitHub',
    'index.hero.cta.demo': 'شاهد العرض',
    'index.stats.tokens': 'رموز التصميم',
    'index.stats.components': 'المكوّنات',
    'index.stats.dependencies': 'بدون تبعيات',
    'index.stats.customizable': 'قابل للتخصيص بالكامل',
    'index.section.pricing.title': 'التسعير',
    'index.section.pricing.plan': 'مجاني',
    'index.section.pricing.subtitle': 'مفتوح المصدر إلى الأبد',
    'index.section.pricing.body': 'نبني أحدث منظومة تصميم مفتوحة المصدر في العالم. ترخيص MIT، مجانية إلى الأبد.',
    'index.section.pricing.cta.primary': 'ابدأ البناء',
    'foundation.page.title': 'الأساس',
    'foundation.page.subtitle': 'رموز التصميم، الطباعة، المسافات، وأنظمة التخطيط التي تدعم ركن',
    'foundation.badge.tokens': 'أكثر من 150 رمز تصميم',
    'foundation.badge.compliant': 'متوافق مع W3C',
    'foundation.badge.layout': 'أنظمة التخطيط',
    'foundation.colors.title': 'الألوان',
    'foundation.colors.description': 'رموز لونية دلالية لثيمات متناسقة',
    'components.page.title': 'مكوّنات واجهة المستخدم',
    'components.page.subtitle': 'مكوّنات جاهزة للإنتاج بزجاج مورفي وحركة ركن',
    'components.badge.count': 'أكثر من 20 مكوّن',
    'components.badge.morphism': 'زجاج مورفي',
    'components.badge.copy': 'انسخ والصق',
    'components.buttons.title': 'الأزرار',
    'components.buttons.description': '7 أنواع متعددة الأحجام والحالات',
    'footer.brand': 'نظام تصميم ركن',
    'footer.built': 'مبني بـ ❤️ للمصممين والمطورين في كل مكان',
    'footer.license': 'ترخيص MIT • مفتوح المصدر إلى الأبد • © {year} نظام تصميم ركن',
    'footer.nav.home': 'الرئيسية',
    'footer.nav.foundation': 'الأساس',
    'footer.nav.components': 'المكوّنات',
    'footer.nav.pricing': 'التسعير',
    'footer.nav.roadmap': 'خارطة الطريق',
    'footer.nav.about': 'من نحن',
    'footer.nav.linkedin': 'LinkedIn',
    'footer.nav.github': 'GitHub',
    'sidebar.foundation.title': 'الأساس',
    'sidebar.foundation.colors': 'الألوان',
    'sidebar.foundation.typography': 'الطباعة',
    'sidebar.foundation.spacing': 'المسافات',
    'sidebar.foundation.sizes': 'الأحجام',
    'sidebar.foundation.radius': 'نصف قطر الحدود',
    'sidebar.foundation.surfaces': 'الأسطح',
    'sidebar.foundation.shadows': 'الظلال',
    'sidebar.foundation.borders': 'عرض الحدود',
    'sidebar.foundation.motion': 'حركة ركن',
    'sidebar.foundation.layouts': 'التخطيطات',
    'sidebar.foundation.container': 'الحاوية',
    'sidebar.foundation.grid': 'نظام الشبكة',
    'sidebar.foundation.flexbox': 'Flexbox',
    'sidebar.foundation.responsive': 'متجاوب',
    'sidebar.foundation.viewComponents': 'عرض المكوّنات',
    'sidebar.foundation.backHome': 'العودة للرئيسية',
    'sidebar.components.title': 'مكوّنات واجهة المستخدم',
    'sidebar.components.buttons': 'الأزرار',
    'sidebar.components.inputs': 'الحقول',
    'sidebar.components.checkbox': 'مربع الاختيار',
    'sidebar.components.radio': 'مجموعة الراديو',
    'sidebar.components.switch': 'المفتاح',
    'sidebar.components.slider': 'المنزلق',
    'sidebar.components.formfield': 'حقل النموذج',
    'sidebar.components.iconPlaceholder': 'رموز العناصر النائبة',
    'sidebar.components.card': 'البطاقة',
    'sidebar.components.badge': 'الشارات',
    'sidebar.components.modal': 'النافذة المنبثقة',
    'sidebar.components.drawer': 'الدرج',
    'sidebar.components.navbar': 'شريط التنقل',
    'sidebar.components.feedback': 'التعليقات',
    'sidebar.components.tooltip': 'تلميح',
    'sidebar.components.alert': 'تنبيه',
    'sidebar.components.toast': 'إشعار',
    'sidebar.components.progress': 'التقدم',
    'sidebar.components.spinner': 'الدوار',
    'sidebar.components.effects': 'التأثيرات',
    'sidebar.components.glass': 'زجاج مورفي',
    'sidebar.components.viewFoundation': 'عرض الأساس',
    'sidebar.components.backHome': 'العودة للرئيسية',
    'sidebar.toggle': 'تبديل الشريط الجانبي',
    'component.alert.close': 'إغلاق',
    'component.modal.close': 'إغلاق',
    'component.button.loading': 'جاري التحميل...',
    'component.input.placeholder': 'أدخل النص',
    'component.textarea.placeholder': 'أدخل الرسالة',
    'fileManager.title': 'مدير الملفات',
    'fileManager.close': 'إغلاق مدير الملفات',
    'fileManager.save': 'حفظ الحالي',
    'fileManager.savedFiles': 'الملفات المحفوظة',
    'fileManager.noFiles': 'لا توجد ملفات محفوظة بعد',
    'fileManager.load': 'تحميل',
    'fileManager.delete': 'حذف'
  },
  ur: {
    'language.en': 'انگریزی',
    'language.ar': 'عربی',
    'language.ur': 'اردو',
    'nav.home': 'ہوم',
    'nav.foundation': 'بنیادیں',
    'nav.components': 'اجزاء',
    'nav.pricing': 'قیمتیں',
    'nav.roadmap': 'روڈ میپ',
    'nav.about': 'ہمارے بارے میں',
    'nav.github': 'گٹ ہب',
    'nav.darkMode': 'ڈارک موڈ',
    'nav.lightMode': 'لائٹ موڈ',
    'index.hero.name': '<strong>Rukn</strong><span aria-hidden="true">•</span><span class="arabic-text">رُكن</span><span aria-hidden="true">•</span><span class="urdu-text">رکن</span>',
    'index.hero.heading.primary': 'ڈیزائن سسٹم',
    'index.hero.heading.secondary': 'عربی کے لیے تیار۔',
    'index.hero.message': 'بغیر کسی انحصار کے ویب کمپوننٹس — مقامی RTL، عربی خطاطی، اور اردو نستعلیق کے ساتھ، پہلے دن سے پروڈکشن کے لیے تیار۔',
    'index.hero.subtext': 'اوپن سورس۔ MIT لائسنس۔ مکمل طور پر آپ کی ملکیت — بڑھائیں، پھیلائیں، اور شپ کریں۔',
    'index.hero.cta.primary': 'اجزاء دیکھیں',
    'index.hero.cta.secondary': 'GitHub پر دیکھیں',
    'index.hero.cta.demo': 'ڈیمو دیکھیں',
    'index.stats.tokens': 'ڈیزائن ٹوکنز',
    'index.stats.components': 'اجزاء',
    'index.stats.dependencies': 'انحصارات',
    'index.stats.customizable': 'مکمل طور پر حسبِ ضرورت',
    'index.section.pricing.title': 'قیمتیں',
    'index.section.pricing.plan': 'مفت',
    'index.section.pricing.subtitle': 'ہمیشہ کے لیے اوپن سورس',
    'index.section.pricing.body': 'دنیا کا جدید ترین اوپن سورس ڈیزائن سسٹم۔ MIT لائسنس، ہمیشہ مفت۔',
    'index.section.pricing.cta.primary': 'تعمیر شروع کریں',
    'foundation.page.title': 'بنیاد',
    'foundation.page.subtitle': 'ڈیزائن ٹوکنز، ٹائپوگرافی، اسپیسنگ اور لے آؤٹ سسٹمز جو رکن کو طاقت دیتے ہیں',
    'foundation.badge.tokens': '150+ ڈیزائن ٹوکنز',
    'foundation.badge.compliant': 'W3C کے مطابق',
    'foundation.badge.layout': 'لے آؤٹ سسٹمز',
    'foundation.colors.title': 'رنگ',
    'foundation.colors.description': 'سیمینٹک کلر ٹوکنز جو تھیم کو مستقل رکھتے ہیں',
    'components.page.title': 'یو آئی اجزاء',
    'components.page.subtitle': 'پروڈکشن کے لیے تیار اجزاء، گلاس مورفزم اور رکن موشن کے ساتھ',
    'components.badge.count': '20+ اجزاء',
    'components.badge.morphism': 'گلاس مورفزم',
    'components.badge.copy': 'کاپی اور پیسٹ',
    'components.buttons.title': 'بٹن',
    'components.buttons.description': '7 اقسام مختلف سائز اور حالتوں کے ساتھ',
    'footer.brand': 'رکن ڈیزائن سسٹم',
    'footer.built': 'ڈیزائنرز اور ڈویلپرز کے لیے ❤️ سے بنایا گیا',
    'footer.license': 'MIT لائسنس • ہمیشہ کے لیے اوپن سورس • © {year} رکن ڈیزائن سسٹم',
    'footer.nav.home': 'ہوم',
    'footer.nav.foundation': 'بنیادیں',
    'footer.nav.components': 'اجزاء',
    'footer.nav.pricing': 'قیمتیں',
    'footer.nav.roadmap': 'روڈ میپ',
    'footer.nav.about': 'ہمارے بارے میں',
    'footer.nav.linkedin': 'LinkedIn',
    'footer.nav.github': 'گٹ ہب',
    'sidebar.foundation.title': 'بنیاد',
    'sidebar.foundation.colors': 'رنگ',
    'sidebar.foundation.typography': 'ٹائپوگرافی',
    'sidebar.foundation.spacing': 'اسپیسنگ',
    'sidebar.foundation.sizes': 'سائز',
    'sidebar.foundation.radius': 'بارڈر ریڈیئس',
    'sidebar.foundation.surfaces': 'سطحیں',
    'sidebar.foundation.shadows': 'سایے',
    'sidebar.foundation.borders': 'بارڈر کی چوڑائی',
    'sidebar.foundation.motion': 'رکن موشن',
    'sidebar.foundation.layouts': 'لے آؤٹس',
    'sidebar.foundation.container': 'کنٹینر',
    'sidebar.foundation.grid': 'گرڈ سسٹم',
    'sidebar.foundation.flexbox': 'Flexbox',
    'sidebar.foundation.responsive': 'ریسپانسیو',
    'sidebar.foundation.viewComponents': 'اجزاء دیکھیں',
    'sidebar.foundation.backHome': 'ہوم پر واپس',
    'sidebar.components.title': 'یو آئی اجزاء',
    'sidebar.components.buttons': 'بٹن',
    'sidebar.components.inputs': 'ان پٹس',
    'sidebar.components.checkbox': 'چیک باکس',
    'sidebar.components.radio': 'ریڈیو گروپ',
    'sidebar.components.switch': 'سوئچ',
    'sidebar.components.slider': 'سلائیڈر',
    'sidebar.components.formfield': 'فارم فیلڈ',
    'sidebar.components.iconPlaceholder': 'آئیکن پلیس ہولڈرز',
    'sidebar.components.card': 'کارڈ',
    'sidebar.components.badge': 'بیجز',
    'sidebar.components.modal': 'موڈل',
    'sidebar.components.drawer': 'ڈرائر',
    'sidebar.components.navbar': 'نیویگیشن بار',
    'sidebar.components.feedback': 'فیڈ بیک',
    'sidebar.components.tooltip': 'ٹول ٹپ',
    'sidebar.components.alert': 'الرٹ',
    'sidebar.components.toast': 'ٹوسٹ',
    'sidebar.components.progress': 'پروگریس',
    'sidebar.components.spinner': 'اسپنر',
    'sidebar.components.effects': 'ایفیکٹس',
    'sidebar.components.glass': 'گلاس مورفزم',
    'sidebar.components.viewFoundation': 'بنیاد دیکھیں',
    'sidebar.components.backHome': 'ہوم پر واپس',
    'sidebar.toggle': 'سائیڈ بار کو ٹوگل کریں',
    'component.alert.close': 'بند کریں',
    'component.modal.close': 'بند کریں',
    'component.button.loading': 'لوڈ ہو رہا ہے...',
    'component.input.placeholder': 'متن درج کریں',
    'component.textarea.placeholder': 'پیغام درج کریں'
  }
};

if (typeof window !== 'undefined') {
  if (!window.ruknTranslations) {
    window.ruknTranslations = {};
  }
  Object.keys(DEFAULT_TRANSLATIONS).forEach((lang) => {
    window.ruknTranslations[lang] = {
      ...DEFAULT_TRANSLATIONS[lang],
      ...(window.ruknTranslations[lang] || {})
    };
  });
}

class RuknNavbar extends HTMLElement {
  connectedCallback() {
    // Auto-detect current page from URL if not provided
    let current = this.getAttribute('current') || '';
    if (!current) {
      const path = window.location.pathname;
      const filename = path.split('/').pop() || 'index.html';
      if (filename === 'index.html' || filename === '' || filename.endsWith('/')) {
        current = 'home';
      } else if (filename === 'foundation.html') {
        current = 'foundation';
      } else if (filename === 'components.html') {
        current = 'components';
      }
      // Set the attribute for consistency
      if (current) {
        this.setAttribute('current', current);
      }
    }
    const hasSearch = this.hasAttribute('search');
    
    // Customization attributes
    const logoSrc = this.getAttribute('logo-src');
    const logoAlt = this.getAttribute('logo-alt') || 'Rukn Design System Logo';
    const brandText = this.getAttribute('brand-text') || 'Rukn';
    const brandHref = this.getAttribute('brand-href') || 'index.html';
    const brandTitle = this.getAttribute('brand-title') || 'Rukn Design System - Homepage';
    
    // Display mode: logo-only (default), logo+text, or text-only
    const textOnly = this.hasAttribute('text-only');
    const showBrandText = this.hasAttribute('show-brand-text') || this.hasAttribute('logo-text');
    const logoOnly = !showBrandText && !textOnly; // Default to logo-only
    const logoWide = this.hasAttribute('logo-wide'); // Wide/stretched logo in logo-only mode
    
    // SEO: Set semantic role
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Main navigation');
    
    const dropdownId = `navDropdown-${this._uid}`;
    const toggleId = `navToggle-${this._uid}`;
    const languageSelectIdDesktop = `navLanguage-${this._uid}`;
    const languageSelectIdMobile = `navLanguageMobile-${this._uid}`;

    // Determine logo size and class based on display mode
    let logoSize, logoClass;
    if (logoOnly && logoWide) {
      // Wide logo - stretched to match logo+text width
      logoSize = 'auto';
      logoClass = 'ds-navbar-logo ds-navbar-logo-wide';
    } else if (logoOnly) {
      // Compact logo-only - 32px
      logoSize = '32';
      logoClass = 'ds-navbar-logo ds-navbar-logo-large';
    } else {
      // Logo with text - 24px
      logoSize = '24';
      logoClass = 'ds-navbar-logo';
    }
    
    // Default Rukn logo SVG (inline) - Simplified version
    // For wide logo, use height only and let width be auto
    const logoSvgWidth = logoWide && logoOnly ? '' : `width="${logoSize}"`;
    const logoSvgHeight = logoWide && logoOnly ? 'height="32"' : `height="${logoSize}"`;
    const defaultLogoSvg = `<svg width="${logoWide && logoOnly ? 'auto' : logoSize}" ${logoSvgHeight} viewBox="0 0 662 182" fill="none" xmlns="http://www.w3.org/2000/svg" class="${logoClass}" aria-hidden="true">
      <path d="M161.055 143.174C161.035 110.939 161.015 79.0921 160.994 47.2456C160.99 40.9316 161.671 40.4115 169.842 40.4181C182.507 40.4283 195.172 40.4319 207.838 40.4266C217.143 40.4226 217.613 40.7805 217.619 48.1848C217.635 67.9918 217.465 87.8001 217.711 107.605C217.901 122.936 238.938 132.441 256.007 124.934C264.207 121.328 268.997 115.671 269.031 108.139C269.125 87.8145 269.063 67.4897 269.068 47.165C269.069 41.218 270.059 40.4451 277.691 40.4437C291.189 40.4411 304.688 40.4329 318.187 40.4567C324.364 40.4676 325.581 41.3706 325.583 46.0882C325.604 89.4565 325.605 132.825 325.588 176.193C325.586 180.549 324.147 181.708 319.006 181.692C305.009 181.649 291.012 181.597 277.015 181.53C269.976 181.496 269.018 180.739 269.02 175.149C269.023 161.815 269.085 148.481 269.046 135.147C269.042 133.684 269.729 132.053 268.106 130.703C265.915 131.323 266.029 132.897 265.479 134.178C262.426 141.289 259.969 148.574 255.365 155.236C243.65 172.186 224.763 180.28 200.654 181.417C190.026 181.919 179.33 181.545 168.664 181.549C161.965 181.552 161.074 180.894 161.061 175.797C161.034 165.052 161.055 154.307 161.055 143.174Z" fill="currentColor"/>
      <path d="M553.575 85.6817C553.81 89.9707 553.08 93.9317 554.163 98.0692C556.478 97.0889 556.544 95.686 557.098 94.5278C561.974 84.3459 566.485 74.0374 572.595 64.2543C582.073 49.0785 598.484 41.6725 619.6 40.5835C631.378 39.9761 643.248 40.4848 655.076 40.4005C659.748 40.3672 661.653 42.0517 661.649 45.6083C661.608 89.3512 661.601 133.094 661.675 176.837C661.681 180.379 659.441 181.869 655.322 181.853C640.335 181.796 625.348 181.657 610.362 181.488C606.716 181.448 605.644 179.615 605.661 177.05C605.77 160.486 605.874 143.922 605.871 127.359C605.87 123.485 605.617 119.6 605.188 115.74C604.028 105.302 595.428 98.8531 581.422 97.75C570.615 96.899 558.17 103.571 554.95 111.96C553.944 114.579 553.545 117.253 553.552 119.997C553.6 138.374 553.584 156.752 553.589 175.129C553.59 180.738 552.3 181.716 545.263 181.712C531.606 181.703 517.95 181.73 504.293 181.771C498.953 181.787 497.133 180.219 497.136 175.29C497.151 148.371 497.209 121.452 497.216 94.5338C497.22 78.6156 497.139 62.6974 497.13 46.7792C497.127 41.3878 498.296 40.4873 505.297 40.4711C518.791 40.4397 532.286 40.4379 545.78 40.4506C551.777 40.4562 553.459 41.7449 553.483 46.4696C553.547 59.4112 553.548 72.3531 553.575 85.6817Z" fill="currentColor"/>
      <path d="M69.5052 75.9005C71.7677 70.2902 73.8713 64.9485 77.5616 60.1327C87.4494 47.2288 102.559 41.206 121.462 40.5487C129.447 40.2711 137.46 40.5279 145.457 40.4044C149.868 40.3364 151.783 41.6852 151.724 45.2333C151.559 55.2002 151.802 65.1712 151.632 75.138C151.479 84.0183 146.322 91.0907 137.374 96.3837C128.773 101.471 118.922 103.931 108.023 103.889C101.707 103.865 95.3616 103.357 89.0696 104.237C69.9269 106.914 56.8944 118.683 56.6809 133.823C56.4856 147.674 56.6345 161.528 56.6099 175.38C56.6005 180.663 55.5329 181.543 48.8295 181.559C34.8305 181.591 20.8312 181.583 6.83226 181.548C0.766294 181.532 0.016477 180.914 0.014738 176.052C-0.000765047 132.812 -0.00396952 89.5711 0.00480448 46.3306C0.00584148 41.1906 0.984281 40.4216 7.49066 40.4153C21.3231 40.4018 35.1557 40.4044 48.988 40.4382C55.2909 40.4536 56.5833 41.4585 56.5917 46.3981C56.6229 64.7818 56.6095 83.1655 56.6128 101.549C56.6131 103.34 56.6129 105.13 57.0548 106.97C62.4747 96.9901 65.2583 86.4312 69.5052 75.9005Z" fill="currentColor"/>
      <path d="M334.915 170.35C334.928 115.754 334.943 61.5432 334.957 7.33282C334.959 0.368908 335.422 0.00142914 344.194 0.00315913C357.352 0.00576692 370.509 -0.0148108 383.667 0.0239737C389.554 0.0413272 390.622 0.89489 390.629 5.52999C390.652 22.867 390.674 40.204 390.62 57.5409C390.554 78.9014 378.073 94.8387 355.179 106.171C353.355 107.074 351.431 107.854 349.564 108.704C347.847 109.486 346.142 110.284 344.355 111.111C345.103 112.8 347.167 112.902 348.684 113.497C376.275 124.307 390.35 141.65 390.591 165.696C390.63 169.578 390.611 173.459 390.578 177.34C390.553 180.188 388.712 181.602 384.994 181.592C370.171 181.552 355.348 181.53 340.526 181.525C336.535 181.524 334.771 180.007 334.91 176.947C335.003 174.879 334.92 172.807 334.915 170.35Z" fill="currentColor"/>
      <path d="M447.322 40.4877C459.81 40.4781 471.802 40.448 483.794 40.4709C489.668 40.4821 491.272 42.1962 488.685 46.2221C480.062 59.6431 471.935 73.3126 461.45 85.9188C450.722 98.8177 434.227 105.3 415.329 108.405C410.017 109.277 404.613 109.811 398.499 110.596C407.667 112.854 416.479 113.914 424.884 116.225C441.964 120.92 455.049 129.28 464.092 141.359C472.377 152.425 480.331 163.644 488.27 174.863C491.857 179.931 490.049 181.983 482.647 181.905C468.173 181.754 453.696 181.523 439.224 181.641C434.227 181.681 431.115 180.339 428.844 176.961C414.735 155.977 399.673 135.402 384.425 114.91C382.645 112.518 382.449 110.413 384.3 108.032C400.65 86.9854 415.467 65.2632 431.085 43.894C432.835 41.4999 435.287 40.3698 438.832 40.4874C441.492 40.5756 444.161 40.4947 447.322 40.4877Z" fill="currentColor"/>
    </svg>`;

    // Render logo - use custom logo if provided, otherwise use default SVG
    let logoHtml = '';
    if (!textOnly) {
      if (logoSrc) {
        // Custom logo image
        const imgWidth = logoWide && logoOnly ? '' : `width="${logoSize}"`;
        const imgHeight = logoWide && logoOnly ? 'height="32"' : `height="${logoSize}"`;
        logoHtml = `<img src="${logoSrc}" alt="${logoAlt}" class="${logoClass}" ${imgWidth} ${imgHeight} aria-hidden="true">`;
      } else {
        logoHtml = defaultLogoSvg;
      }
    }
    
    // Render brand text
    const brandTextHtml = (showBrandText || textOnly) 
      ? `<span class="ds-navbar-brand-text">${brandText}</span>`
      : '';

    // Brand class based on mode
    let brandClass = 'ds-navbar-brand';
    if (logoOnly && logoWide) {
      brandClass += ' ds-navbar-brand-logo-only ds-navbar-brand-logo-wide';
    } else if (logoOnly) {
      brandClass += ' ds-navbar-brand-logo-only';
    } else if (textOnly) {
      brandClass += ' ds-navbar-brand-text-only';
    }
    
    this.innerHTML = `
      <nav class="ds-navbar ds-navbar-full" id="navbar-${this._uid}" role="navigation" aria-label="Primary">
        <div class="ds-navbar-container" style="gap: var(--r-space-4);">
          <a href="${brandHref}" class="${brandClass}" title="${brandTitle}" aria-label="${brandText} Home">
            ${logoHtml}
            ${brandTextHtml}
          </a>
          
          ${hasSearch ? `
          <div style="flex: 1; max-width: 600px; position: relative;" role="search">
            <label for="navSearch" class="sr-only">Search documentation</label>
            <i data-lucide="search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: hsl(var(--foreground) / 0.5); font-size: 16px; pointer-events: none;" aria-hidden="true"></i>
            <input 
              type="search" 
              id="navSearch" 
              name="search"
              class="ds-input" 
              placeholder="Quick search..."
              aria-label="Search documentation"
              style="padding: var(--r-space-2) var(--r-space-3) var(--r-space-2) 40px; font-size: var(--r-font-size-sm); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); height: 36px;"
            >
          </div>
          ` : ''}
          
          <nav class="ds-navbar-nav" role="navigation" aria-label="Main menu">
            <div class="ds-navbar-menu">
              <a href="index.html" class="btn-ghost btn-sm ${current === 'home' ? 'active' : ''}" data-i18n="nav.home" ${current === 'home' ? 'aria-current="page"' : ''} title="Home - Rukn Design System">Home</a>
              <a href="foundation.html" class="btn-ghost btn-sm ${current === 'foundation' ? 'active' : ''}" data-i18n="nav.foundation" ${current === 'foundation' ? 'aria-current="page"' : ''} title="Foundation - Design Tokens & System">Foundation</a>
              <a href="components.html" class="btn-ghost btn-sm ${current === 'components' ? 'active' : ''}" data-i18n="nav.components" ${current === 'components' ? 'aria-current="page"' : ''} title="Components - UI Component Library">Components</a>
              <a href="index.html#pricing" class="btn-ghost btn-sm" data-i18n="nav.pricing" title="Pricing - Free & Open Source">Pricing</a>
              <a href="index.html#roadmap" class="btn-ghost btn-sm" data-i18n="nav.roadmap" title="Roadmap - Future Plans">Roadmap</a>
              <a href="index.html#about" class="btn-ghost btn-sm" data-i18n="nav.about" title="About - Our Mission">About</a>
              <a href="https://github.com/mfaizanatiq/RuknDesignSystem" class="btn-primary btn-sm" target="_blank" rel="noopener noreferrer" title="View on GitHub - Open Source Repository" aria-label="View Rukn Design System on GitHub">
                  <i data-lucide="github" style="margin-right: 4px;" aria-hidden="true"></i>
                <span data-i18n="nav.github">GitHub</span>
              </a>
            </div>
            
            <button class="ds-navbar-hamburger" id="${toggleId}" aria-label="Toggle menu" aria-controls="${dropdownId}" aria-expanded="false" aria-haspopup="true">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>

          <div class="ds-navbar-controls" style="display: flex; align-items: center; gap: var(--r-space-2);">
            <!-- Dark Mode Toggle -->
            <div class="ds-theme-toggle" role="group" aria-label="Toggle theme">
              <label class="ds-theme-toggle-wrapper" for="themeToggle-${this._uid}" style="display: flex; align-items: center; gap: var(--r-space-2); cursor: pointer;">
                <input 
                  type="checkbox" 
                  class="ds-switch" 
                  id="themeToggle-${this._uid}"
                  aria-label="Toggle dark mode"
                  style="margin: 0;"
                >
                <span class="ds-theme-toggle-icon" aria-hidden="true" style="font-size: 18px; display: flex; align-items: center;">
                  <i data-lucide="sun" data-theme-icon="light" style="display: none;"></i>
                  <i data-lucide="moon" data-theme-icon="dark"></i>
                </span>
              </label>
            </div>
            
            <!-- Language Switch -->
            <div class="ds-language-switch ds-language-switch-desktop" role="group" aria-label="Select language">
            <label class="sr-only" for="${languageSelectIdDesktop}">Language</label>
            <select class="ds-language-select sr-only" data-device="desktop" id="${languageSelectIdDesktop}" tabindex="-1" aria-hidden="true">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
            </select>
            <div class="ds-dropdown" data-language-dropdown data-device="desktop">
              <button class="ds-dropdown-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                <span class="ds-dropdown-label">English</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <ul class="ds-dropdown-menu" role="listbox" tabindex="-1">
                <li class="ds-dropdown-option" role="option" data-value="en" tabindex="-1">English</li>
                <li class="ds-dropdown-option" role="option" data-value="ar" tabindex="-1">العربية</li>
                <li class="ds-dropdown-option" role="option" data-value="ur" tabindex="-1">اردو</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </nav>
      
      <div class="ds-navbar-mobile-dropdown" id="${dropdownId}" role="menu" aria-label="Mobile navigation menu" hidden aria-hidden="true">
        <div class="ds-navbar-menu">
          <a href="index.html" class="btn-ghost btn-sm ${current === 'home' ? 'active' : ''}" role="menuitem" ${current === 'home' ? 'aria-current="page"' : ''}><i data-lucide="home" aria-hidden="true"></i> <span data-i18n="nav.home">Home</span></a>
          <a href="foundation.html" class="btn-ghost btn-sm ${current === 'foundation' ? 'active' : ''}" role="menuitem" ${current === 'foundation' ? 'aria-current="page"' : ''}><i data-lucide="box" aria-hidden="true"></i> <span data-i18n="nav.foundation">Foundation</span></a>
          <a href="components.html" class="btn-ghost btn-sm ${current === 'components' ? 'active' : ''}" role="menuitem" ${current === 'components' ? 'aria-current="page"' : ''}><i data-lucide="layers" aria-hidden="true"></i> <span data-i18n="nav.components">Components</span></a>
          <a href="index.html#pricing" class="btn-ghost btn-sm" role="menuitem"><i data-lucide="dollar-sign" aria-hidden="true"></i> <span data-i18n="nav.pricing">Pricing</span></a>
          <a href="index.html#roadmap" class="btn-ghost btn-sm" role="menuitem"><i data-lucide="map" aria-hidden="true"></i> <span data-i18n="nav.roadmap">Roadmap</span></a>
          <a href="index.html#about" class="btn-ghost btn-sm" role="menuitem"><i data-lucide="info" aria-hidden="true"></i> <span data-i18n="nav.about">About</span></a>
          <a href="https://github.com/mfaizanatiq/RuknDesignSystem" class="btn-primary btn-sm" target="_blank" rel="noopener noreferrer" role="menuitem" aria-label="View on GitHub">
            <i data-lucide="github" aria-hidden="true"></i> <span data-i18n="nav.github">GitHub</span>
          </a>
        </div>
        <div class="ds-navbar-controls-mobile" style="display: flex; flex-direction: column; gap: var(--r-space-3); padding: var(--r-space-4); border-top: 1px solid hsl(var(--border));">
          <!-- Dark Mode Toggle Mobile -->
          <div class="ds-theme-toggle" role="group" aria-label="Toggle theme">
            <label class="ds-theme-toggle-wrapper" for="themeToggleMobile-${this._uid}" style="display: flex; align-items: center; gap: var(--r-space-2); cursor: pointer; justify-content: space-between;">
              <span style="display: flex; align-items: center; gap: var(--r-space-2);">
                <span class="ds-theme-toggle-icon" aria-hidden="true" style="font-size: 18px; display: flex; align-items: center;">
                  <i data-lucide="sun" data-theme-icon="light" style="display: none;"></i>
                  <i data-lucide="moon" data-theme-icon="dark"></i>
                </span>
                <span data-i18n="nav.darkMode">Dark Mode</span>
              </span>
              <input 
                type="checkbox" 
                class="ds-switch" 
                id="themeToggleMobile-${this._uid}"
                aria-label="Toggle dark mode"
                style="margin: 0;"
              >
            </label>
          </div>
          
          <!-- Language Switch Mobile -->
          <div class="ds-language-switch ds-language-switch-mobile" role="group" aria-label="Select language">
            <label class="sr-only" for="${languageSelectIdMobile}">Language</label>
            <select class="ds-language-select sr-only" data-device="mobile" id="${languageSelectIdMobile}" tabindex="-1" aria-hidden="true">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
            </select>
            <div class="ds-dropdown" data-language-dropdown data-device="mobile">
              <button class="ds-dropdown-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                <span class="ds-dropdown-label">English</span>
                <i data-lucide="chevron-down" aria-hidden="true"></i>
              </button>
              <ul class="ds-dropdown-menu" role="listbox" tabindex="-1">
                <li class="ds-dropdown-option" role="option" data-value="en" tabindex="-1">English</li>
                <li class="ds-dropdown-option" role="option" data-value="ar" tabindex="-1">العربية</li>
                <li class="ds-dropdown-option" role="option" data-value="ur" tabindex="-1">اردو</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="ds-navbar-spacer" aria-hidden="true"></div>
    `;
    
    // Initialize mobile menu
    this._initMobileMenu();
    
    // Initialize scroll behavior
    this._initScrollBehavior();

    // Initialize language switch
    this._initLanguageSwitch();
    
    // Initialize dark mode toggle
    this._initDarkModeToggle();

    if (typeof lucide !== 'undefined') lucide.createIcons({ attrs: { 'stroke-width': 1 } });
  }
  
  _initMobileMenu() {
    const toggle = this.querySelector(`#navToggle-${this._uid}`);
    const dropdown = this.querySelector(`#navDropdown-${this._uid}`);
    
    if (toggle && dropdown) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        dropdown.classList.toggle('open');
      });
    }
  }
  
  _initScrollBehavior() {
    const navbar = this.querySelector(`#navbar-${this._uid}`);
    if (!navbar) {
      return;
    }
    
    let ticking = false;
    const scrollThreshold = 50;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Always visible and sticky, just enhance when scrolled
      if (scrollTop > scrollThreshold) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      ticking = false;
    };
    
    // Initial call to set correct state
    handleScroll();
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    this._cleanupScroll = () => {
      window.removeEventListener('scroll', onScroll);
    };
    
  }
  
  _initLanguageSwitch() {
    const selects = this.querySelectorAll('.ds-language-select');
    const dropdowns = this.querySelectorAll('[data-language-dropdown]');
    if (!selects.length && !dropdowns.length) {
      return;
    }

    const sanitizeLanguage = (value) => {
      if (!value) return 'en';
      const lower = value.toLowerCase();
      const match = RUKN_SUPPORTED_LANGUAGES.find((code) => lower.startsWith(code));
      return match || 'en';
    };

    const closeAllDropdowns = () => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.ds-dropdown-trigger');
        if (trigger) {
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    };

    const handleDocumentClick = (event) => {
      if (!this.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    if (this._cleanupLanguageDropdowns) {
      this._cleanupLanguageDropdowns();
    }
    document.addEventListener('click', handleDocumentClick);
    this._cleanupLanguageDropdowns = () => {
      document.removeEventListener('click', handleDocumentClick);
    };

    const applyLanguage = (lang, persist = true) => {
      const normalized = sanitizeLanguage(lang);
      const isRTL = RUKN_RTL_LANGUAGES.includes(normalized);

      document.documentElement.lang = normalized;
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

      if (document.body) {
        document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        document.body.setAttribute('data-language', normalized);
      }

      this.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

      selects.forEach((select) => {
        if (select.value !== normalized) {
          select.value = normalized;
        }
      });

      this._applyTranslations(normalized);
      this._setDropdownSelection(normalized);
      this._updateLayoutForLanguage(normalized);

      if (persist) {
        try {
          window.localStorage.setItem(RUKN_LANGUAGE_STORAGE_KEY, normalized);
        } catch {
          // localStorage unavailable — preference not persisted
        }
      }

      document.dispatchEvent(new CustomEvent('rukn:languagechange', {
        detail: { language: normalized }
      }));
    };

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector('.ds-dropdown-trigger');
      const options = dropdown.querySelectorAll('.ds-dropdown-option');

      if (trigger) {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          const isOpen = dropdown.classList.contains('open');
          closeAllDropdowns();
          if (!isOpen) {
            dropdown.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            if (options.length) options[0].focus({ preventScroll: true });
          }
        });

        trigger.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            trigger.click();
          }
        });
      }

      options.forEach((option) => {
        option.addEventListener('click', (event) => {
          event.preventDefault();
          const value = option.dataset.value;
          closeAllDropdowns();
          applyLanguage(value, true);
          trigger?.focus();
        });

        option.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            applyLanguage(option.dataset.value, true);
            closeAllDropdowns();
            trigger?.focus();
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            closeAllDropdowns();
            trigger?.focus();
          }
        });
      });
    });

    selects.forEach((select) => {
      select.addEventListener('change', (event) => {
        applyLanguage(event.target.value, true);
      });
    });

    let initialLanguage = 'en';

    try {
      const stored = window.localStorage.getItem(RUKN_LANGUAGE_STORAGE_KEY);
      if (stored) {
        initialLanguage = sanitizeLanguage(stored);
      } else {
        const currentLang = document.documentElement.lang;
        initialLanguage = sanitizeLanguage(currentLang);
      }
    } catch {
      // localStorage unavailable — fall back to document language
    }

    applyLanguage(initialLanguage, false);
    this._setDropdownSelection(initialLanguage);
  }

  _applyTranslations(language) {
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : DEFAULT_TRANSLATIONS;
    const fallback = translations.en || DEFAULT_TRANSLATIONS.en || {};

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('placeholder', value);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('title', value);
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (!key) return;
      const value = translations[language]?.[key] ?? fallback[key];
      if (value !== undefined) {
        el.setAttribute('aria-label', value);
      }
    });
  }

  _setDropdownSelection(language) {
    const dropdowns = this.querySelectorAll('[data-language-dropdown]');
    dropdowns.forEach((dropdown) => {
      const label = dropdown.querySelector('.ds-dropdown-label');
      const options = dropdown.querySelectorAll('.ds-dropdown-option');
      
      // Always show each language option in its native language
      options.forEach((option) => {
        const value = option.dataset.value;
        // Use native language name, not translated
        const optionLabel = RUKN_NATIVE_LANGUAGE_NAMES[value] || value;
        option.textContent = optionLabel;
        const isActive = value === language;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      
      // Show current selected language in its native form
      if (label) {
        label.textContent = RUKN_NATIVE_LANGUAGE_NAMES[language] || language.toUpperCase();
      }
    });
  }

  _getTranslation(key, language) {
    const translations = (typeof window !== 'undefined' && window.ruknTranslations) ? window.ruknTranslations : DEFAULT_TRANSLATIONS;
    const fallback = translations.en || DEFAULT_TRANSLATIONS.en || {};
    return translations[language]?.[key] ?? fallback[key] ?? null;
  }

  _updateLayoutForLanguage(language) {
    const isRTL = RUKN_RTL_LANGUAGES.includes(language);
    const navbar = this.querySelector('.ds-navbar-container');
    const mobileDropdown = this.querySelector('.ds-navbar-mobile-dropdown');
    const docsLayouts = document.querySelectorAll('.docs-layout');
    const sidebars = document.querySelectorAll('.sidebar');
    const mainContents = document.querySelectorAll('.main-content');

    if (navbar) {
      navbar.style.flexDirection = isRTL ? 'row-reverse' : '';
    }

    if (mobileDropdown) {
      mobileDropdown.style.textAlign = isRTL ? 'right' : '';
    }

    docsLayouts.forEach((layout) => {
      layout.style.flexDirection = isRTL ? 'row-reverse' : '';
    });

    sidebars.forEach((sidebar) => {
      sidebar.style.left = isRTL ? 'auto' : '';
      sidebar.style.right = isRTL ? 'var(--r-space-4)' : '';
    });

    mainContents.forEach((main) => {
      main.style.marginLeft = isRTL ? '' : '';
      main.style.marginRight = isRTL ? 'calc(280px + var(--r-space-8))' : '';
    });
  }
  
  _initDarkModeToggle() {
    const desktopToggle = this.querySelector(`#themeToggle-${this._uid}`);
    const mobileToggle = this.querySelector(`#themeToggleMobile-${this._uid}`);
    
    // Get initial dark mode state
    const isDark = this._getDarkModeState();
    this._setDarkMode(isDark, false); // Set initial state without persisting
    
    // Sync both toggles
    if (desktopToggle) desktopToggle.checked = isDark;
    if (mobileToggle) mobileToggle.checked = isDark;
    
    // Desktop toggle handler
    if (desktopToggle) {
      desktopToggle.addEventListener('change', (e) => {
        this._setDarkMode(e.target.checked, true);
        if (mobileToggle) mobileToggle.checked = e.target.checked;
      });
    }
    
    // Mobile toggle handler
    if (mobileToggle) {
      mobileToggle.addEventListener('change', (e) => {
        this._setDarkMode(e.target.checked, true);
        if (desktopToggle) desktopToggle.checked = e.target.checked;
      });
    }
    
    // Update icon visibility
    this._updateThemeIcons(isDark);
    
    // Listen for external dark mode changes
    this._themeObserver = new MutationObserver(() => {
      const currentIsDark = document.documentElement.classList.contains('dark');
      if (desktopToggle) desktopToggle.checked = currentIsDark;
      if (mobileToggle) mobileToggle.checked = currentIsDark;
      this._updateThemeIcons(currentIsDark);
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  _getDarkModeState() {
    // Check localStorage first
    try {
      const stored = localStorage.getItem(RUKN_DARK_MODE_STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
    } catch {
      // localStorage unavailable — fall back to CSS class state
    }
    
    // Fallback to current HTML class
    return document.documentElement.classList.contains('dark');
  }
  
  _setDarkMode(isDark, persist = true) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (persist) {
      try {
        localStorage.setItem(RUKN_DARK_MODE_STORAGE_KEY, isDark.toString());
      } catch {
        // localStorage unavailable — preference not persisted
      }
    }
    
    this._updateThemeIcons(isDark);
  }
  
  _updateThemeIcons(isDark) {
    const icons = this.querySelectorAll('[data-theme-icon]');
    icons.forEach(icon => {
      if (icon.getAttribute('data-theme-icon') === 'light') {
        icon.style.display = isDark ? 'flex' : 'none';
      } else if (icon.getAttribute('data-theme-icon') === 'dark') {
        icon.style.display = isDark ? 'none' : 'flex';
      }
    });
  }
  
  disconnectedCallback() {
    // Clean up scroll listener when component is removed
    if (this._cleanupScroll) {
      this._cleanupScroll();
    }
    if (this._cleanupLanguageDropdowns) {
      this._cleanupLanguageDropdowns();
    }
    this._themeObserver?.disconnect();
  }
  
  // Generate unique ID for this instance
  get _uid() {
    if (!this.__uid) {
      this.__uid = Math.random().toString(36).substr(2, 9);
    }
    return this.__uid;
  }
}

// Register custom element (native browser API)
customElements.define('rukn-navbar', RuknNavbar);

