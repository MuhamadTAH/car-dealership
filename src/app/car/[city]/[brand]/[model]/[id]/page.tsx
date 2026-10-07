"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import { Car } from "@/lib/types";
import { getCarImageUrl, formatPrice, formatMileage } from "@/lib/utils";
import CarCard from "@/components/CarCard";
import {
  Gauge,
  Cpu,
  Layers,
  Phone,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Building2,
  ArrowLeft,
  Scale,
  ShieldCheck,
  FileText,
  X,
  Maximize2,
  Check,
  ExternalLink,
} from "lucide-react";

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ city: string; brand: string; model: string; id: string }>;
}) {
  const resolvedParams = use(params);
  const carId = parseInt(resolvedParams.id);
  const { lang, currency, addToCompare, t } = useApp();

  const allCars = carsDataRaw as Car[];
  const car = allCars.find((c) => c.ID === carId) || allCars[0];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);

  const attachments = car.Attachments && car.Attachments.length > 0 ? car.Attachments : [
    {
      CarId: car.ID,
      Sort: 0,
      ID: 1,
      Url: "/img/CarAttachments\\1790869670478.2737zn.jpg"
    }
  ];

  const currentPhoto = getCarImageUrl(
    attachments[activePhotoIdx]?.DetailUrl || attachments[activePhotoIdx]?.Url
  );

  const brandName =
    lang === "ar"
      ? car.Brand?.BrandNamear || car.Brand?.BrandNameen
      : lang === "ku"
      ? car.Brand?.BrandNameku || car.Brand?.BrandNameen
      : car.Brand?.BrandNameen;

  const modelName =
    lang === "ar"
      ? car.Model?.ModelNamear || car.Model?.ModelNameen
      : lang === "ku"
      ? car.Model?.ModelNameku || car.Model?.ModelNameen
      : car.Model?.ModelNameen;

  const year = car.Year?.YearName || "2025";
  const trim = car.ModelSFX?.SFXName || "Standard";

  const conditionRaw = (car.CarCondition?.CarConditionNameen || "").toLowerCase();
  const isNew = conditionRaw === "new" || car.VisitedKm === 0;

  const inspectionReportSrc = car.inspectionReportImage || "/images/sample-inspection-report.jpg";
  const tiktokUrl = car.tiktokUrl || "https://www.tiktok.com/@iqcars.dealership";
  const youtubeUrl = car.youtubeUrl || "https://www.youtube.com/@iqcars";

  // Similar cars in showroom
  const similarCars = allCars
    .filter((c) => c.ID !== car.ID && (c.BrandId === car.BrandId || c.Price < car.Price + 10000))
    .slice(0, 4);

  // Specifications
  const specs = [
    { label: t("trim"), value: trim },
    {
      label: t("condition"),
      value: isNew
        ? lang === "ar"
          ? "جديد زيرو (0 كم)"
          : lang === "ku"
          ? "نوێ سفر (0 کم)"
          : "Brand New (0 km)"
        : lang === "ar"
        ? "مستعمل معتمد"
        : lang === "ku"
        ? "بەکارهاتووی باوەڕپێکراو"
        : "Certified Pre-Owned",
    },
    {
      label: t("paintParts"),
      value: isNew
        ? lang === "ar"
          ? "طلاء مصنع 100% أصلي"
          : lang === "ku"
          ? "بۆیاغی شەریکە 100%"
          : "100% Original Factory Paint"
        : car.paintCondition ||
          (lang === "ar"
            ? "صبغ وكالة 100% (بێ بۆیاغ)"
            : lang === "ku"
            ? "100% بێ بۆیاغ"
            : "100% Original Paint"),
    },
    { label: t("fuel"), value: car.CarFuels?.[0]?.FuelNameen || "Gasoline" },
    { label: t("importCountry"), value: car.ImportCountry?.ImportCountryNameen || "GCC / Regional" },
    { label: t("plate"), value: "Private / خصوصي" },
    { label: t("engine"), value: car.Engine?.EngineNameen ? `${car.Engine.EngineNameen}L` : "5.3L" },
    { label: t("cylinders"), value: car.Cylinder?.CylinderNameen || "8 cylinder" },
    { label: t("transmission"), value: "Automatic" },
    { label: t("seatNumber"), value: "7" },
    { label: t("seatMaterial"), value: "Leather" },
    { label: t("color"), value: "Black" },
  ];

  // Features checklist
  const features = [
    "Rear Camera",
    "Front Camera",
    "Camera 360",
    "Electric Tailgate",
    "Hill Holder",
    "Parking Sensors",
    "Seat Heating",
    "Keyless Entry",
    "Cruise Control",
    "Electric Side Mirrors",
    "Power Windows",
    "Rain Sensor",
    "Touch Screen",
    "Blind Spot Monitor",
    "Smart Key System",
    "Automatic Temperature Control",
    "Start-Stop System",
    "Emergency Brake Assist",
    "Electric Seats",
    "8 Airbags",
    "LED Headlights",
    "Alarm System",
    "Traction Control",
    "Digital Cockpit",
    "Apple CarPlay & Android Auto",
    "Remote Start",
    "ABS Brakes",
    "Wireless Smartphone Charger",
  ];

  const handlePhoneClick = () => {
    setPhoneRevealed(true);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sellerPhone = car.PhoneNumber || "+964 750 312 9988";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      {/* Back button breadcrumb */}
      <div className="mb-4">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>Back to car listings</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Photo Gallery + Specs + Amenities */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Photo Gallery Card (Clean without 360 switcher or corner badges) */}
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="relative aspect-[16/10] bg-black/90 overflow-hidden flex items-center justify-center">
              <img
                src={currentPhoto}
                alt={`${brandName} ${modelName}`}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next Arrows */}
              {attachments.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActivePhotoIdx((prev) =>
                        prev === 0 ? attachments.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() =>
                      setActivePhotoIdx((prev) =>
                        prev === attachments.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Photo Counter */}
              <div className="absolute bottom-4 right-4 rtl:left-4 rtl:right-auto px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-white bg-black/60 backdrop-blur-sm">
                {activePhotoIdx + 1} / {attachments.length}
              </div>
            </div>

            {/* Thumbnail Filmstrip */}
            {attachments.length > 1 && (
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 flex gap-2 overflow-x-auto scrollbar-none">
                {attachments.map((att, idx) => (
                  <button
                    key={att.ID || idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                      activePhotoIdx === idx
                        ? "border-emerald-500 scale-95 shadow"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getCarImageUrl(att.DetailUrl || att.Url)}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header (No location, no upload date) */}
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {brandName} {modelName} {year}
                </h1>
                {trim && (
                  <div className="mt-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold inline-block">
                      {trim}
                    </span>
                  </div>
                )}
              </div>

              {/* Price Banner */}
              <div className="text-left sm:text-right rtl:sm:text-left">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {formatPrice(car.Price, currency)}
                </div>
                {currency === "USD" && (
                  <div className="text-xs font-semibold text-gray-400 mt-0.5">
                    ≈ {formatPrice(car.Price, "IQD")}
                  </div>
                )}
              </div>
            </div>

            {/* Highlighted Specification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <div className="text-[11px] text-gray-400">{t("mileage")}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 flex items-center gap-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{formatMileage(car.VisitedKm, car.Milage?.MilageNameen || "km")}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <div className="text-[11px] text-gray-400">{t("trim")}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                  {trim}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <div className="text-[11px] text-gray-400">{t("engine")}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-blue-500" />
                  <span>{car.Engine?.EngineNameen || "5.3"}L</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                <div className="text-[11px] text-gray-400">{t("cylinders")}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                  {car.Cylinder?.CylinderNameen || "8 cylinder"}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Strip: Video Walkarounds & Physical Inspection Sheet */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. TikTok Walkaround Button */}
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-black hover:bg-neutral-900 border border-neutral-800 text-white shadow-sm transition transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center border border-neutral-700/80 group-hover:border-emerald-500/50 transition">
                  {/* TikTok Icon */}
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.84-4.49V8.8a8.28 8.28 0 0 0 4.88 1.58V6.93a4.84 4.84 0 0 1-.95-.24z" />
                  </svg>
                </div>
                <div className="text-left rtl:text-right">
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                    {lang === "ar" ? "فحص تيك توك" : lang === "ku" ? "ڤیدیۆی تیک تۆک" : "TikTok Walkaround"}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {lang === "ar" ? "مشاهدة الفيديو الميداني" : lang === "ku" ? "سەیرکردنی ڤیدیۆ لە پێشانگا" : "Watch video review"}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition" />
            </a>

            {/* 2. YouTube Video Review Button */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#1b2536] hover:bg-[#222f44] border border-gray-700/80 text-white shadow-sm transition transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30 group-hover:border-red-500 transition">
                  {/* YouTube Icon */}
                  <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div className="text-left rtl:text-right">
                  <div className="text-xs font-bold text-white group-hover:text-red-400 transition">
                    {lang === "ar" ? "مراجعة يوتيوب" : lang === "ku" ? "سەیرکردنی یوتیوب" : "YouTube Review"}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {lang === "ar" ? "فيديو تفصيلي بدقة 4K" : lang === "ku" ? "ڤیدیۆی وردی 4K" : "Full 4K vehicle walkaround"}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition" />
            </a>

            {/* 3. Physical Technical Inspection Sheet Button (Opens Lightbox Modal) */}
            <button
              onClick={() => setShowInspectionModal(true)}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-700/60 text-white shadow-sm transition transform hover:-translate-y-0.5 text-left rtl:text-right"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 group-hover:scale-105 transition">
                  <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>{lang === "ar" ? "تقرير الفحص الفني" : lang === "ku" ? "ڕاپۆرتی پشکنین" : "Technical Inspection Sheet"}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-emerald-200/80">
                    {lang === "ar" ? "فحص الهزة والشاصي (مرفق)" : lang === "ku" ? "پشکنینی شاسی و هەزە" : "Physical test sheet attached"}
                  </div>
                </div>
              </div>
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition" />
            </button>
          </div>

          {/* Condition Specific Section: Official Warranty (New) OR Certified Guarantees (Used) */}
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            {isNew ? (
              // NEW CAR: Brand New 0 KM + Official Manufacturer Warranty
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {lang === "ar" ? "سيارة جديدة كلياً (زيرو 0 كم)" : lang === "ku" ? "ئۆتۆمبێلی نوێی سفر (0 کم)" : "Brand New Vehicle (0 km)"}
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        {lang === "ar" ? "ضمان رسمي معتمد من الوكالة" : lang === "ku" ? "گرەنتی فەرمی بریکار" : "Official Dealership Manufacturer Warranty"}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {lang === "ar" ? "سفر زيرو • 0 كم" : lang === "ku" ? "سفر • 0 کم" : "Brand New • 0 km"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "ar" ? "ضمان الوكيل الرسمي" : lang === "ku" ? "گرەنتی بریکاری فەرمی" : "Official Factory Warranty"}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                      {car.warranty || (lang === "ar" ? "3 سنوات أو 100,000 كم يشمل المحرك والناقل" : lang === "ku" ? "3 ساڵ یان 100,000 کم گرەنتی مەکینە و گێڕ" : "3 Years / 100,000 KM powertrain & electrical coverage")}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "ar" ? "طلاء المصنع الأصلي" : lang === "ku" ? "بۆیاغی کارگە 100%" : "Original Factory Paint"}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                      {lang === "ar" ? "100% طلاء مصنعي بدون أي خدوش أو تعديل" : lang === "ku" ? "100% بۆیاغی شەریکە بەبێ هیچ شوختێک" : "100% original untouched factory paint from assembly line"}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "ar" ? "أوراق جمركية رسمية" : lang === "ku" ? "بەڵگەنامەی گومرگی فەرمی" : "Official Customs Entry"}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                      {lang === "ar" ? "مطابق للمواصفات الخليجية وجاهز للتسجيل الفوري" : lang === "ku" ? "مواصفاتی کەنداو و ئامادەی ڕەقەمکردنی دەستبەجێ" : "GCC regional specifications, immediate title registration ready"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // USED CAR: Certified Pre-Owned Condition & Technical Inspection Guarantees
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/30">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        {lang === "ar" ? "فحص وضمان الوكيل للسيارات المستعملة" : lang === "ku" ? "پشکنین و دەستەبەری بریکار بۆ ئۆتۆمبێلی بەکارهاتوو" : "Official Certified Pre-Owned Vehicle"}
                      </h3>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        {lang === "ar" ? "مفحوصة بالكامل مع ورقة الفحص الفني الرسمية" : lang === "ku" ? "بە تەواوی پشکنراوە لەگەڵ پەڕەی پشکنینی فەرمی" : "150-Point Technical Diagnostic Inspection Passed"}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {lang === "ar" ? "مستعمل معتمد" : lang === "ku" ? "باوەڕپێکراو" : "Certified Pre-Owned"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Guarantee 1: Original Paint */}
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "ar" ? "حالة الصبغ والبدن" : lang === "ku" ? "ڕەوشی بۆیاغ و لاشە" : "Paint & Body Condition"}</span>
                    </div>
                    <div className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {car.paintCondition || (lang === "ar" ? "صبغ وكالة 100% (بێ بۆیاغ)" : lang === "ku" ? "100% بێ بۆیاغ" : "100% Original Factory Paint")}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {lang === "ar" ? "فحص سماكة الدهان بالجهاز الإلكتروني معتمد" : lang === "ku" ? "پشکنینی ئەستووری بۆیاغ بە ئامێری ئەلیکترۆنی" : "Electronic paint depth meter scan verified"}
                    </p>
                  </div>

                  {/* Guarantee 2: Clean Chassis */}
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "ar" ? "سلامة الشاصي والهيكل" : lang === "ku" ? "سەلامەتی شاسی و هەیکەل" : "Chassis & Frame Integrity"}</span>
                    </div>
                    <div className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {car.chassisCondition || (lang === "ar" ? "شاصي سليم 100% بدون أي صدمات" : lang === "ku" ? "شاسی 100% بێ لێدران و ساغ" : "100% Clean Intact Chassis")}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {lang === "ar" ? "فحص الهزة ومحاذاة الشاصي خالي من التعديل" : lang === "ku" ? "پشکنینی هەزە و هاوتەریبی شاسی بە تەواوی ڕێکە" : "Structural frame alignment & suspension laser tested"}
                    </p>
                  </div>

                  {/* Guarantee 3: Engine & Gearbox */}
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{lang === "ar" ? "المحرك وناقل الحركة" : lang === "ku" ? "مەکینە و گێڕ" : "Drivetrain & OBD-II Scan"}</span>
                    </div>
                    <div className="mt-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {lang === "ar" ? "محرك وجير بحالة ممتازة وبشرط الفحص" : lang === "ku" ? "مەکینە و گێڕ بە شەرت" : "Engine & Transmission 100% Tested"}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {lang === "ar" ? "فحص الكمبيوتر خالي من الأعطال والأكواد" : lang === "ku" ? "پشکنینی کۆمپیوتەر خاوێنە و بێ کۆدە" : "Full OBD-II diagnostic scan, zero error codes"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Technical Specifications Grid */}
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-500" />
              <span>{t("specifications")}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-2">
              {specs.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-sm"
                >
                  <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features and Amenities Checklist */}
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Features & Amenities</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dealership Description */}
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {t("detailsBySeller")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {car.Description ||
                `${brandName} ${modelName} ${year} ${trim} in pristine condition. Zero paint accidents, genuine mileage, full manufacturer maintenance history, clean GCC title. All inspections welcomed. Contact for viewing and serious inquiries.`}
            </p>
          </div>
        </div>

        {/* Right Sidebar: Dealership Contact Card + Action Buttons (No location, no installments/cash-only) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  iQ Cars Dealership
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {lang === "ar" ? "قسم المبيعات والاستفسارات" : lang === "ku" ? "بەشی فرۆشتن و پرسیارەکان" : "Sales & Inquiries"}
                </p>
              </div>
            </div>

            {/* Call / Phone Button */}
            <div>
              {phoneRevealed ? (
                <a
                  href={`tel:${sellerPhone}`}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span className="font-mono text-base">{sellerPhone}</span>
                </a>
              ) : (
                <button
                  onClick={handlePhoneClick}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t("showPhone")}</span>
                </button>
              )}
            </div>

            {/* WhatsApp Chat Button */}
            <a
              href={`https://wa.me/${sellerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                lang === "ar"
                  ? `مرحباً، أود الاستفسار عن سيارة ${brandName} ${modelName} ${year} (رقم الإعلان: #${car.ID}) المعروضة بسعر ${formatPrice(car.Price, "USD")}. هل ما زالت متوفرة؟`
                  : lang === "ku"
                  ? `سڵاو، پرسیارم هەبوو دەربارەی ئۆتۆمبێلی ${brandName} ${modelName} ${year} (ژمارە: #${car.ID}) بە نرخی ${formatPrice(car.Price, "USD")}. ئایا بەردەستە لە پێشانگا؟`
                  : `Hello, I am interested in the ${brandName} ${modelName} ${year} (ID: #${car.ID}) listed for ${formatPrice(car.Price, "USD")}. Is it still available at the dealership?`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("whatsapp")}</span>
            </a>

            {/* Auxiliary actions: Share, Compare */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={handleShare}
                className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1.5 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Copied!" : t("share")}</span>
              </button>

              <button
                onClick={() => addToCompare(car)}
                className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1.5 transition"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            </div>

            {/* Quick Media & Inspection Actions in Sidebar */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <button
                onClick={() => setShowInspectionModal(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <FileText className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>{lang === "ar" ? "ورقة الفحص الفني (الهزة)" : lang === "ku" ? "پەڕەی پشکنینی هەزە" : "View Inspection Sheet Photo"}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-black hover:bg-neutral-900 text-white border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.84-4.49V8.8a8.28 8.28 0 0 0 4.88 1.58V6.93a4.84 4.84 0 0 1-.95-.24z" />
                  </svg>
                  <span>TikTok</span>
                </a>

                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-500 dark:text-red-400 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-red-500" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Cars Section */}
      {similarCars.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            {t("similarCars")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similarCars.map((c) => (
              <CarCard key={c.ID} car={c} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal for Official Technical Inspection Sheet */}
      {showInspectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowInspectionModal(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-[#16202e] rounded-3xl shadow-2xl overflow-hidden border border-gray-700 z-10 flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#1a2536]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {lang === "ar"
                      ? "شهادة وتقرير الفحص الفني المعتمد"
                      : lang === "ku"
                      ? "بڕوانامە و ڕاپۆرتی فەرمی پشکنینی هونەری"
                      : "Official Vehicle Technical Inspection Certificate"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {brandName} {modelName} {year} • {isNew ? (lang === "ar" ? "جديد زيرو (0 كم)" : lang === "ku" ? "نوێ سفر (0 کم)" : "Brand New (0 km)") : (lang === "ar" ? "مستعمل معتمد" : lang === "ku" ? "باوەڕپێکراو" : "Certified Pre-Owned")}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowInspectionModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {/* Verification Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#1a2536] border border-gray-700/80 text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">{lang === "ar" ? "فحص الشاصي" : lang === "ku" ? "پشکنینی شاسی" : "Chassis & Frame"}</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 inline-block">PASSED 100%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a2536] border border-gray-700/80 text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">{lang === "ar" ? "المحرك والجير" : lang === "ku" ? "مەکینە و گێڕ" : "Drivetrain"}</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 inline-block">PASSED 100%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a2536] border border-gray-700/80 text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">{lang === "ar" ? "فحص الكمبيوتر" : lang === "ku" ? "پشکنینی کۆمپیوتەر" : "OBD-II Scan"}</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 inline-block">0 FAULT CODES</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a2536] border border-gray-700/80 text-center">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">{lang === "ar" ? "حالة الملكية" : lang === "ku" ? "ڕەوشی سەردەستی" : "Title Status"}</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5 inline-block">CLEAN TITLE</span>
                </div>
              </div>

              {/* Inspection Sheet Photo */}
              <div className="relative rounded-2xl bg-black/60 border border-gray-700 overflow-hidden flex items-center justify-center p-2">
                <img
                  src={inspectionReportSrc}
                  alt="Vehicle Technical Inspection Certificate"
                  className="max-h-[60vh] w-auto object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Footer Note & Direct Link */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-gray-400">
                <p>
                  {lang === "ar"
                    ? "تم تصوير وثيقة الفحص الفني المعتمدة مباشرة لضمان الشفافية والمصداقية التامة."
                    : lang === "ku"
                    ? "وێنەی بەڵگەنامەی فەرمی پشکنین ڕاستەوخۆ دانراوە بۆ دڵنیایی و شەفافیەتی تەواو."
                    : "Official technical certificate photographed on-site to ensure complete transparency."}
                </p>
                <a
                  href={inspectionReportSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <span>{lang === "ar" ? "فتح الصورة بحجم كامل" : lang === "ku" ? "کردنەوە بە قەبارەی تەواو" : "Open Original Full Size"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
