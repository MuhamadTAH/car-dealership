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

  // Similar cars in showroom
  const similarCars = allCars
    .filter((c) => c.ID !== car.ID && (c.BrandId === car.BrandId || c.Price < car.Price + 10000))
    .slice(0, 4);

  // Specifications
  const specs = [
    { label: t("trim"), value: trim },
    { label: t("condition"), value: car.CarCondition?.CarConditionNameen || "Used" },
    { label: t("paintParts"), value: t("cleanTitle") },
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
    </div>
  );
}
