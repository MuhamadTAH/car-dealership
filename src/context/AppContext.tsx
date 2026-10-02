"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Currency, Language, Car } from "@/lib/types";

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  compareList: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (carId: number) => void;
  clearCompare: () => void;
  exchangeRate: number;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    newCars: "New Cars",
    usedCars: "Used Cars",
    guide: "Guide",
    compare: "Compare",
    news: "News",
    sell: "Sell",
    signInUp: "Sign in / Sign up",
    myFavorites: "Saved Cars",
    
    // Hero
    heroTitle: "Buy and Sell your car on the most trusted car marketplace in Iraq",
    heroSubtitle: "The best deal for buying and selling your car online anywhere in Iraq",
    selectCity: "Iraq - Select city",
    allIraq: "All Iraq",
    advancedSearch: "Advanced Search",
    brand: "Brand",
    model: "Model",
    year: "Year",
    yearRange: "From Year - To Year",
    mileage: "Mileage",
    minMax: "Min — Max",
    price: "Price",
    showCars: "Show {n} Cars",
    
    // Sections
    popularCars: "Popular Cars for Sale",
    exploreLatest: "Explore latest models",
    greatDeals: "Great deals on quality used cars",
    listInMinutes: "List your car in minutes",
    ecoFriendly: "Eco-friendly electric options",
    compareSideBySide: "Compare cars side by side",
    buyFromIraq: "Buy cars from Iraq",
    showMoreCars: "Show {n} more",
    categories: "Categories",
    popularShowrooms: "Popular Showrooms",
    popularBrands: "The most popular car brands in Iraq",
    popularBrandsSub: "Browse through the most popular car brands in Iraq",
    popularModels: "Find the most popular car models",
    popularModelsSub: "Browse the most popular car models in Iraq",
    availableCars: "Available cars",
    officialDealership: "Official Dealership",
    brandNew: "Brand New",

    // Detail Page
    showPhone: "Show Phone Number",
    whatsapp: "WhatsApp",
    share: "Share",
    save: "Save",
    specifications: "Specifications",
    detailsBySeller: "More details by Seller",
    similarCars: "Similar cars for sale in Iraq",
    trim: "Trim",
    condition: "Condition",
    fuel: "Fuel",
    transmission: "Transmission",
    cylinders: "Cylinders",
    engine: "Engine",
    seatNumber: "Seat Number",
    seatMaterial: "Seat Material",
    color: "Color",
    plate: "Plate",
    importCountry: "Import Country",
    paintParts: "Paint Parts",
    cleanTitle: "Clean Title",

    // Compare
    startComparison: "Start comparison",
    chooseTwoCars: "Choose two cars to compare side-by-side.",
    addCarToCompare: "Select a vehicle to compare",
    seeComparison: "See comparison",
    remove: "Remove",

    // Sell
    sellTitle: "Sell your car - iQ Cars",
    sellStepsSubtitle: "List your vehicle on Iraq's premier automotive platform in simple steps",
    listCarNow: "List Your Car Online",

    // Footer
    contact: "Contact",
    followUs: "Follow us",
    getTheApp: "Get the app",
    downloadOn: "Download on",
    appStore: "App Store",
    getItOn: "Get it on",
    googlePlay: "Google Play",
    exploreItOn: "Explore it on",
    appGallery: "App Gallery",
    copyright: "Copyright © 2026 Al Kindi Company for Digital Marketing PJSC",
    privacyPolicy: "Privacy Policy",
    termsCondition: "Terms and Condition",
    aboutUs: "About us",

    // Dealership Landing Page & Qist Additions
    hotline: "Hotline: 6896",
    callNow: "Call",
    quickView: "Quick View",
    close: "Close",
    viewDetails: "View Full Details",
    qistTitle: "Qist Installments",
    qistBadge: "Qist Available",
    qistAvailablePill: "Qist Available",
    qistNotAvailable: "Cash payment only (Qist not available for this car)",
    qistAvailableDesc: "Available for installment plan with official dealership financing",
    downPayment: "Down Payment",
    monthsDuration: "Duration",
    months: "months",
    monthlyPayment: "Estimated Monthly",
    applyQistWhatsApp: "Apply for Qist via WhatsApp",
    dailyExchangeRate: "Daily Market Exchange Rate",
    rateDisclaimer: "Live daily market rate: $1 = {rate} IQD",
    cashOnly: "Cash Only",
    whyBuyFromUs: "Why Buy From Our Dealership?",
    whySubtitle: "Supreme certified vehicles, 100% technical inspection, verified legal ownership, and flexible Qist installment plans.",
    trustInspection: "100% Comprehensive Inspection",
    trustInspectionDesc: "Chassis, engine, transmission, and body paint thoroughly checked with certified technical reports.",
    trustTransfer: "Instant Plate & Title Transfer",
    trustTransferDesc: "Guaranteed paperwork and legal plate transfer across Baghdad, Erbil, Sulaymaniyah, Basra, and all 19 governorates.",
    trustWarranty: "Official Warranty & Service",
    trustWarrantyDesc: "Comprehensive manufacturer and dealership warranty backed by authorized certified service centers.",
    trustQist: "Flexible Qist (Installments)",
    trustQistDesc: "Fast and transparent installment solutions with minimal documentation and customizable terms.",
    allCarsPill: "All Vehicles",
    searchPlaceholder: "Search make, model, year, or trim...",
    showingCars: "Showing {count} vehicles",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about buying, financing, and delivery with our dealership.",
  },
  ar: {
    // Navigation
    newCars: "سيارات جديدة",
    usedCars: "سيارات مستعملة",
    guide: "دليل الشراء",
    compare: "مقارنة",
    news: "الأخبار",
    sell: "بيع سيارتك",
    signInUp: "تسجيل الدخول / إنشاء حساب",
    myFavorites: "المفضلة",

    // Hero
    heroTitle: "بيع واشترِ سيارتك على منصة السيارات الأكثر ثقة في العراق",
    heroSubtitle: "أفضل العروض لبيع وشراء السيارات عبر الإنترنت في أي مكان في العراق",
    selectCity: "العراق - اختر المدينة",
    allIraq: "كل العراق",
    advancedSearch: "البحث المتقدم",
    brand: "الماركة",
    model: "الموديل",
    year: "السنة",
    yearRange: "من سنة - إلى سنة",
    mileage: "المسافة المقطوعة",
    minMax: "الحد الأدنى — الحد الأقصى",
    price: "السعر",
    showCars: "عرض {n} سيارة",

    // Sections
    popularCars: "سيارات مميزة للبيع",
    exploreLatest: "استكشف أحدث الموديلات",
    greatDeals: "عروض متميزة على السيارات المستعملة",
    listInMinutes: "اعرض سيارتك للبيع في دقائق",
    ecoFriendly: "خيارات السيارات الكهربائية الصديقة للبيئة",
    compareSideBySide: "قارن بين السيارات جنباً إلى جنب",
    buyFromIraq: "شراء سيارات من العراق",
    showMoreCars: "عرض {n} المزيد",
    categories: "الفئات",
    popularShowrooms: "معارض السيارات الشهيرة",
    popularBrands: "أشهر ماركات السيارات في العراق",
    popularBrandsSub: "تصفح أشهر ماركات السيارات في جميع أنحاء العراق",
    popularModels: "الموديلات الأكثر طلباً",
    popularModelsSub: "تصفح موديلات السيارات الأكثر رواجاً في العراق",
    availableCars: "سيارة متوفرة",
    officialDealership: "وكيل رسمي",
    brandNew: "جديدة تماماً",

    // Detail Page
    showPhone: "إظهار رقم الهاتف",
    whatsapp: "واتساب",
    share: "مشاركة",
    save: "حفظ",
    specifications: "المواصفات الفنية",
    detailsBySeller: "تفاصيل إضافية من البائع",
    similarCars: "سيارات مشابهة للبيع في العراق",
    trim: "الفئة / الطراز",
    condition: "الحالة",
    fuel: "الوقود",
    transmission: "ناقل الحركة",
    cylinders: "السلندرات",
    engine: "حجم المحرك",
    seatNumber: "عدد المقاعد",
    seatMaterial: "نوع الفرش",
    color: "اللون",
    plate: "اللوحة",
    importCountry: "دولة الاستيراد",
    paintParts: "حالة الطلاء والصبغ",
    cleanTitle: "بدون صبغ / كلين تايتل",

    // Compare
    startComparison: "بدء المقارنة",
    chooseTwoCars: "اختر سيارتين للمقارنة جنباً إلى جنب.",
    addCarToCompare: "اختر سيارة لإضافتها للمقارنة",
    seeComparison: "عرض المقارنة",
    remove: "إزالة",

    // Sell
    sellTitle: "بيع سيارتك - آي كيو كارز",
    sellStepsSubtitle: "اعرض سيارتك للبيع على المنصة الأولى للسيارات في العراق بخطوات بسيطة",
    listCarNow: "أضف سيارتك الآن",

    // Footer
    contact: "اتصل بنا",
    followUs: "تابعنا على",
    getTheApp: "حمل التطبيق",
    downloadOn: "تحميل من",
    appStore: "آب ستور",
    getItOn: "احصل عليه من",
    googlePlay: "جوجل بلاي",
    exploreItOn: "استكشفه على",
    appGallery: "آب غاليري",
    copyright: "جميع الحقوق محفوظة © 2026 شركة الكندي للتسويق الرقمي",
    privacyPolicy: "سياسة الخصوصية",
    termsCondition: "الشروط والأحكام",
    aboutUs: "من نحن",

    // Dealership Landing Page & Qist Additions
    hotline: "الخط الساخن: 6896",
    callNow: "اتصال",
    quickView: "معاينة سريعة",
    close: "إغلاق",
    viewDetails: "التفاصيل الكاملة",
    qistTitle: "نظام الأقساط (قسط)",
    qistBadge: "متوفر بالأقساط",
    qistAvailablePill: "متوفر بالأقساط",
    qistNotAvailable: "دفع نقدي فقط (نظام الأقساط غير متوفر لهذه السيارة)",
    qistAvailableDesc: "متاح بنظام الأقساط الميسرة عبر تمويل الوكالة المعتمد",
    downPayment: "الدفعة الأولى (المقدمة)",
    monthsDuration: "مدة الأقساط",
    months: "شهراً",
    monthlyPayment: "القسط الشهري التقديري",
    applyQistWhatsApp: "تقديم طلب أقساط عبر واتساب",
    dailyExchangeRate: "سعر صرف السوق اليومي",
    rateDisclaimer: "وفق سعر الصرف المباشر: 1 دولار = {rate} دينار عراقي",
    cashOnly: "كاش فقط",
    whyBuyFromUs: "لماذا تشتري من وكالتنا الرسمية؟",
    whySubtitle: "سيارات معتمدة ومفحوصة بالكامل، أسعار شفافة، تحويل ملكية فوري، وخيارات أقساط ميسرة.",
    trustInspection: "فحص فني شامل 100%",
    trustInspectionDesc: "فحص دقيق للشاصي، المحرك، الجير، والبدي مع تقرير فني رسمي معتمد.",
    trustTransfer: "تسجيل وتحويل لوحات فوري",
    trustTransferDesc: "إنجاز المعاملات القانونية وتحويل اللوحات رسمياً في بغداد، أربيل، السليمانية، البصرة وكافة المحافظات.",
    trustWarranty: "ضمان الوكالة المعتمد",
    trustWarrantyDesc: "ضمان رسمي شامل مع خدمات ما بعد البيع في مراكز الصيانة المعتمدة.",
    trustQist: "تسهيلات أقساط مرنة (قسط)",
    trustQistDesc: "خطط أقساط ميسرة تناسب ميزانيتك بشروط واضحة ومستمسكات ميسرة وبدون تعقيدات.",
    allCarsPill: "جميع السيارات",
    searchPlaceholder: "ابحث بالماركة، الموديل، السنة، أو الفئة...",
    showingCars: "عرض {count} سيارة",
    faqTitle: "الأسئلة الأكثر شيوعاً",
    faqSubtitle: "كل ما تحتاج معرفته عن شراء السيارات، أنظمة الأقساط، والتحويل القانوني.",
  },
  ku: {
    // Navigation
    newCars: "ئۆتۆمبێلی نوێ",
    usedCars: "ئۆتۆمبێلی بەکارهاتوو",
    guide: "ڕێبەری کڕین",
    compare: "بەراوردکردن",
    news: "هەواڵەکان",
    sell: "ئۆتۆمبێلەکەت بفرۆشە",
    signInUp: "چوونەژوورەوە / تۆمارکردن",
    myFavorites: "دڵخوازەکان",

    // Hero
    heroTitle: "ئۆتۆمبێلەکەت بفرۆشە و بکڕە لە باوەڕپێکراوترین بازاڕی ئۆتۆمبێل لە عێراق",
    heroSubtitle: "باشترین دەرفەت بۆ کڕین و فرۆشتنی ئۆتۆمبێل لە هەر شوێنێکی عێراق",
    selectCity: "عێراق - شار هەڵبژێرە",
    allIraq: "هەموو عێراق",
    advancedSearch: "گەڕانی پێشکەوتوو",
    brand: "براند",
    model: "مۆدێل",
    year: "ساڵ",
    yearRange: "لە ساڵی - بۆ ساڵی",
    mileage: "ڕۆیشتوو",
    minMax: "کەمترین — زۆرترین",
    price: "نرخ",
    showCars: "پیشاندانی {n} ئۆتۆمبێل",

    // Sections
    popularCars: "ئۆتۆمبێلە باوەکان بۆ فرۆشتن",
    exploreLatest: "نوێترین مۆدێلەکان ببینە",
    greatDeals: "دەرفەتی باش بۆ ئۆتۆمبێلی بەکارهاتوو",
    listInMinutes: "ئۆتۆمبێلەکەت بە چەند خولەکێک دابنێ",
    ecoFriendly: "بژاردەی کارەبایی ژینگەدۆست",
    compareSideBySide: "ئۆتۆمبێلەکان بەراورد بکە",
    buyFromIraq: "کڕینی ئۆتۆمبێل لە عێراق",
    showMoreCars: "پیشاندانی {n} زیاتر",
    categories: "بەشەکان",
    popularShowrooms: "پیشانگاکانی ئۆتۆمبێل",
    popularBrands: "باوترین براندەکانی ئۆتۆمبێل لە عێراق",
    popularBrandsSub: "باوترین براندەکانی ئۆتۆمبێل لە سەرانسەری عێراق ببینە",
    popularModels: "باوترین مۆدێلەکان",
    popularModelsSub: "باوترین مۆدێلەکانی ئۆتۆمبێل لە عێراق ببینە",
    availableCars: "ئۆتۆمبێلی بەردەست",
    officialDealership: "بریکاری فەرمی",
    brandNew: "نوێی سفر",

    // Detail Page
    showPhone: "پیشاندانی ژمارەی مۆبایل",
    whatsapp: "واتسئەپ",
    share: "هاوبەشکردن",
    save: "پاشەکەوتکردن",
    specifications: "تایبەتمەندییەکان",
    detailsBySeller: "زانیاری زیاتر لەلایەن فرۆشیارەوە",
    similarCars: "ئۆتۆمبێلی هاوشێوە بۆ فرۆشتن لە عێراق",
    trim: "جۆر / پۆل",
    condition: "بارودۆخ",
    fuel: "سووتەمەنی",
    transmission: "گێڕ",
    cylinders: "پستۆن",
    engine: "قەبارەی بزوێنەر",
    seatNumber: "ژمارەی کورسی",
    seatMaterial: "ماددەی کورسی",
    color: "ڕەنگ",
    plate: "تابلۆ",
    importCountry: "وڵاتی هاوردەکردن",
    paintParts: "بۆیاخ و لێدراوی",
    cleanTitle: "بێ بۆیاخ / کلین تایتڵ",

    // Compare
    startComparison: "دەستپێکردنی بەراوردکردن",
    chooseTwoCars: "دوو ئۆتۆمبێل هەڵبژێرە بۆ بەراوردکردن.",
    addCarToCompare: "ئۆتۆمبێلێک زیادبکە بۆ بەراورد",
    seeComparison: "بینینی بەراوردکاری",
    remove: "سڕینەوە",

    // Sell
    sellTitle: "ئۆتۆمبێلەکەت بفرۆشە - ئای کیو کارز",
    sellStepsSubtitle: "ئۆتۆمبێلەکەت لە یەکەمین پلاتفۆرمی عێراق دابنێ بە هەنگاوی ئاسان",
    listCarNow: "ئێستا ئۆتۆمبێلەکەت دابنێ",

    // Footer
    contact: "پەیوەندی",
    followUs: "فۆڵۆمان بکەن",
    getTheApp: "ئەپڵیکەیشن دابەزێنە",
    downloadOn: "داگرتن لە",
    appStore: "ئەپ ستۆر",
    getItOn: "بەدەستی بهێنە لە",
    googlePlay: "گووگڵ پلەی",
    exploreItOn: "بیدۆزەرەوە لە",
    appGallery: "ئەپ گەلەری",
    copyright: "مافی بڵاوکردنەوە پارێزراوە © 2026 کۆمپانیای ئەلکندی بۆ بەبازاڕکردنی دیجیتاڵی",
    privacyPolicy: "یاسای پاراستنی نهێنی",
    termsCondition: "مەرج و یاساکان",
    aboutUs: "دەربارەی ئێمە",

    // Dealership Landing Page & Qist Additions
    hotline: "هێڵی گەرم: 6896",
    callNow: "پەیوەندی",
    quickView: "بینینی خێرا",
    close: "داخستن",
    viewDetails: "زانیاری تەواو",
    qistTitle: "سیستەمی قیست",
    qistBadge: "قیست بەردەستە",
    qistAvailablePill: "قیست بەردەستە",
    qistNotAvailable: "تەنها پارەی نەقد (قیست بۆ ئەم ئۆتۆمبێلە بەردەست نییە)",
    qistAvailableDesc: "بەردەستە بە قیستی ئاسان لە ڕێگەی بریکاری فەرمی",
    downPayment: "پێشەکی",
    monthsDuration: "ماوەی قیست",
    months: "مانگ",
    monthlyPayment: "قیستی مانگانەی مەزەندەکراو",
    applyQistWhatsApp: "داواکاری قیست لە ڕێگەی واتسئەپ",
    dailyExchangeRate: "نرخی رۆژانەی بازاڕی دراو",
    rateDisclaimer: "بەپێی نرخی ڕۆژانەی بازاڕ: 1 دۆلار = {rate} دیناری عێراقی",
    cashOnly: "تەنها نەقد",
    whyBuyFromUs: "بۆچی لە بریکاری فەرمی ئێمە دەکڕیت؟",
    whySubtitle: "ئۆتۆمبێلی پشکنراو و باوەڕپێکراو، نرخی دادپەروەرانە، گواستنەوەی تابلۆ دەستبەجێ، و سیستەمی قیستی ئاسان.",
    trustInspection: "پشکنینی 100% گشتگیر",
    trustInspectionDesc: "پشکنینی تەواوی شاسی، مەکینە، گێڕ، و بۆیاغ لەگەڵ ڕاپۆرتی فەرمی پەسەندکراو.",
    trustTransfer: "گواستنەوەی تابلۆ و مەلەفی فەرمی",
    trustTransferDesc: "ڕایی کردنی دەستبەجێی کارەکانی هاتووچۆ و تابلۆ لە هەولێر، سلێمانی، دهۆک، بەغداد و هەموو پارێزگاکان.",
    trustWarranty: "گەرەنتی فەرمی بریکار",
    trustWarrantyDesc: "گەرەنتی فەرمی کارگە و بریکار لەگەڵ خزمەتگوزاری چاککردنەوە لە سەنتەرە متمانەپێکراوەکان.",
    trustQist: "ئاسانکاری قیست",
    trustQistDesc: "سیستەمی قیستی مانگانەی گونجاو بەبێ مەرجی قورس و بە شەفافی تەواو.",
    allCarsPill: "هەموو ئۆتۆمبێلەکان",
    searchPlaceholder: "بگەڕێ بەپێی براند، مۆدێل، ساڵ، یان جۆر...",
    showingCars: "پیشاندانی {count} ئۆتۆمبێل",
    faqTitle: "پرسیارە باوەکان",
    faqSubtitle: "هەموو ئەو زانیارییانەی پێویستت پێیە دەربارەی کڕین، قیست، و ڕێکارەکانی گواستنەوە.",
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [compareList, setCompareList] = useState<Car[]>([]);

  useEffect(() => {
    // Load persisted settings
    const savedLang = localStorage.getItem("iqcars_lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "ar" || savedLang === "ku")) {
      setLangState(savedLang);
      document.documentElement.dir = savedLang === "en" ? "ltr" : "rtl";
      document.documentElement.lang = savedLang;
    }

    const savedCur = localStorage.getItem("iqcars_currency") as Currency;
    if (savedCur && (savedCur === "USD" || savedCur === "IQD")) {
      setCurrencyState(savedCur);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("iqcars_lang", newLang);
    document.documentElement.dir = newLang === "en" ? "ltr" : "rtl";
    document.documentElement.lang = newLang;
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("iqcars_currency", c);
  };

  const addToCompare = (car: Car) => {
    setCompareList((prev) => {
      if (prev.some((c) => c.ID === car.ID)) return prev;
      if (prev.length >= 2) return [prev[1], car];
      return [...prev, car];
    });
  };

  const removeFromCompare = (carId: number) => {
    setCompareList((prev) => prev.filter((c) => c.ID !== carId));
  };

  const clearCompare = () => setCompareList([]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        currency,
        setCurrency,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        exchangeRate: 1530,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
