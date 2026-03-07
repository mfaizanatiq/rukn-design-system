# Why Every Design System Gets Arabic Wrong

*And what building one from scratch taught me about the 400 million users we keep ignoring.*

---

There are over 1,200 design systems on GitHub. I've studied dozens of them — Material, Ant, Chakra, Radix, shadcn, Mantine, Primer, Carbon, Fluent. They're brilliant, well-engineered, and they all share one blind spot:

**They treat right-to-left as an afterthought.**

I know because I tried using them for Arabic projects. And I know because I eventually gave up and built my own.

## The "just add dir=rtl" myth

Every design system's RTL documentation says the same thing:

> "Just add `dir="rtl"` to your HTML element."

And it works — for about 30 seconds. Until you notice:

1. **Icons point the wrong way.** A "forward" arrow still points right in an RTL layout. That's backwards for Arabic readers. Some systems flip them, most don't.

2. **Spacing collapses.** `margin-left: 1rem` doesn't become `margin-right` unless you've used CSS logical properties. Most component libraries still use physical properties internally.

3. **Fonts fall back to Noto Sans.** Arabic text renders in a generic font that was designed for Latin characters with Arabic glyphs bolted on. The letter connections look wrong. The diacritics float in the wrong place.

4. **Urdu just breaks.** Nastaliq script — the correct script for Urdu — needs roughly 1.75x the line height of Latin text. Drop Urdu into a card component designed for English and the text clips, overflows, or collides with borders.

5. **Number formatting is ignored.** Arabic-speaking users expect Eastern Arabic numerals (٠١٢٣) in some contexts and Western numerals (0123) in others. No design system ships `Intl.NumberFormat` examples.

These aren't edge cases. Arabic is the 5th most spoken language on Earth. Urdu is the 10th. Combined, that's over 400 million native speakers.

## What "RTL-first" actually means

When I started building Rukn, I made a decision: **Arabic and Urdu would be the default, not the exception.**

That meant:

### 1. Ship Arabic and Urdu fonts as first-class tokens

Instead of one `--font-body` token, Rukn ships three:

```css
--r-font-body: 'Space Grotesk', sans-serif;
--r-font-arabic: 'IBM Plex Sans Arabic', sans-serif;
--r-font-urdu: 'Noto Nastaliq Urdu', serif;
```

And they activate automatically:

```css
:lang(ar) { font-family: var(--r-font-arabic); }
:lang(ur) { font-family: var(--r-font-urdu); line-height: 1.75; }
```

No configuration. Set `lang="ar"` on your HTML and every component renders in IBM Plex Sans Arabic.

### 2. Design spacing for Nastaliq, not just Latin

Nastaliq script (used in Urdu) has long descenders and stacked diacritics. A line height of 1.5 — standard for English — clips the bottom of Urdu text.

Rukn ships Urdu-specific tokens:

```css
--r-line-height-urdu-base: 1.75;
--r-line-height-urdu-heading: 1.5;
```

These activate via `:lang(ur)` and affect every component that contains text.

### 3. Use CSS logical properties everywhere

Every spacing value in Rukn uses `margin-inline-start` instead of `margin-left`, `padding-inline-end` instead of `padding-right`, `inset-inline-start` instead of `left`.

This means a card with `padding-inline-start: 1rem` applies padding on the right side in RTL and left side in LTR — automatically.

### 4. Build language awareness into Web Components

Rukn's navbar doesn't just flip direction. It ships with complete translations:

```javascript
const translations = {
  en: { 'nav.home': 'Home', 'nav.components': 'Components' },
  ar: { 'nav.home': 'الرئيسية', 'nav.components': 'المكونات' },
  ur: { 'nav.home': 'ہوم', 'nav.components': 'اجزاء' }
};
```

Change the language and every component updates. The entire page flips direction. The fonts switch. The line heights adjust. One event:

```javascript
document.dispatchEvent(new CustomEvent('rukn:languagechange', {
  detail: { language: 'ar' }
}));
```

## The real test: building a bookstore

Theory is easy. I needed to prove this worked in a real application.

So I built Maktaba — a bilingual Arabic/English bookstore. Product cards with Arabic titles. Prices in Saudi Riyals with proper Arabic numeral formatting. A shopping cart that switches between "سلة التسوق" and "Shopping Cart" when you toggle the language.

The entire demo uses zero custom CSS for RTL. No `[dir="rtl"] .card { padding-right: 1rem; }` overrides. No `html[lang="ar"] .price { direction: ltr; }` hacks.

It just works.

## What I learned

Building a design system for Arabic taught me things no LTR-first system could:

**Logical properties aren't optional.** They're the correct way to write CSS. Physical properties (`left`, `right`, `margin-left`) are a legacy of assuming English. Logical properties work for every language and every direction.

**Typography tokens need dimension.** One `--font-body` token is not enough. Different scripts have different metrics. A system that treats typography as one-dimensional will always break on the second language.

**Components should know what language they're speaking.** A button that says "Submit" should know that in Arabic it says "إرسال" and the text is longer. A navbar that says "Home" should know that in Urdu it says "ہوم" and the font needs more vertical space.

**RTL is a design philosophy, not a CSS property.** You can't bolt it on. You have to build with it from the first line of code.

## Try it

Rukn is open source, MIT licensed, zero dependencies.

- **GitHub:** [github.com/mfaizanatiq/RuknDesignSystem](https://github.com/mfaizanatiq/RuknDesignSystem)
- **Live Demo:** [Maktaba Bookstore](https://github.com/mfaizanatiq/RuknDesignSystem/blob/master/demo/maktaba.html)
- **RTL Guide:** [docs/RTL_GUIDE.md](https://github.com/mfaizanatiq/RuknDesignSystem/blob/master/docs/RTL_GUIDE.md)

If you're building for Arabic, Urdu, or any RTL language — or if you just believe the web should work for everyone — I'd love your contributions. Translations, RTL improvements, and bug reports are all welcome.

---

*M Faizan Atiq is a designer and developer building tools for multilingual web applications. Rukn (رُكن) means "pillar" in Arabic and Urdu.*
