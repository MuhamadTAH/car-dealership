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
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    newCars: "New Cars",
    usedCars: "Used Cars",
    guide: "Guide",
    compare: "Compare",
    evMap: "EV Map",
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
    privateSeller: "Private Seller",
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

    // EV Map
    evMapTitle: "EV Charging Stations Map in Iraq",
    evMapSubtitle: "Find electric vehicle charging stations across Baghdad, Erbil, Sulaymaniyah, Basra & more.",
    chargingStations: "Charging Stations",
    directions: "Get Directions",
    available: "Available",
    power: "Power",
    plugs: "Connectors",

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

    // Auth
    verifyPhone: "Verify your phone",
    authSubtitle: "Enter your phone number to continue and unlock all features.",
    phoneNumber: "Phone Number",
    requestCode: "Request code",
    enterOtp: "Enter Verification Code",
    otpSubtitle: "Enter the 4-digit code sent to",
    verify: "Verify and Continue",
    signedInAs: "Signed in as",
    logout: "Log out"
  },
  ar: {
    // Navigation
    newCars: "سيارات جديدة",
    usedCars: "سيارات مستعملة",
    guide: "دليل الشراء",
    compare: "مقارنة",
    evMap: "خريطة الشحن",
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
    privateSeller: "بائع خاص",
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

    // EV Map
    evMapTitle: "خريطة محطات شحن السيارات الكهربائية في العراق",
    evMapSubtitle: "ابحث عن محطات شحن السيارات الكهربائية في بغداد، أربيل، السليمانية، البصرة والمزيد.",
    chargingStations: "محطات الشحن",
    directions: "الاتجاهات",
    available: "متاح",
    power: "القدرة",
    plugs: "أنواع القوابس",

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

    // Auth
    verifyPhone: "تأكيد رقم الهاتف",
    authSubtitle: "أدخل رقم هاتفك للمتابعة والوصول إلى كافة الميزات.",
    phoneNumber: "رقم الهاتف",
    requestCode: "طلب الرمز",
    enterOtp: "أدخل رمز التحقق",
    otpSubtitle: "أدخل الرمز المكون من 4 أرقام المرسل إلى",
    verify: "تأكيد ومتابعة",
    signedInAs: "تم تسجيل الدخول كـ",
    logout: "تسجيل الخروج"
  },
  ku: {
    // Navigation
    newCars: "ئۆتۆمبێلی نوێ",
    usedCars: "ئۆتۆمبێلی بەکارهاتوو",
    guide: "ڕێبەری کڕین",
    compare: "بەراوردکردن",
    evMap: "نەخشەی کارەبایی",
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
    privateSeller: "فرۆشیاری تایبەت",
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

    // EV Map
    evMapTitle: "نەخشەی وێستگەکانی شەحنکردنەوەی کارەبایی لە عێراق",
    evMapSubtitle: "وێستگەکانی شەحنکردنەوەی ئۆتۆمبێلی کارەبایی بدۆزەرەوە لە بەغداد، هەولێر، سلێمانی و بەسرە.",
    chargingStations: "وێستگەکانی شەحن",
    directions: "ڕێڕەو",
    available: "بەردەستە",
    power: "توانا",
    plugs: "جۆری وایەر",

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

    // Auth
    verifyPhone: "تەئکیدکردنەوەی ژمارەی مۆبایل",
    authSubtitle: "ژمارەی مۆبایلەکەت بنووسە بۆ بەردەوامبوون و بینینی هەموو تایبەتمەندییەکان.",
    phoneNumber: "ژمارەی مۆبایل",
    requestCode: "داواکردنی کۆد",
    enterOtp: "کۆدی پشتڕاستکردنەوە بنووسە",
    otpSubtitle: "کۆدی 4 ژمارەیی بنووسە کە نێردراوە بۆ",
    verify: "پشتڕاستکردنەوە",
    signedInAs: "چوونەژوورەوە وەک",
    logout: "دەرچوون"
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
