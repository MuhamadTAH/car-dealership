"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getCarImageUrl, formatPrice, formatMileage } from "@/lib/utils";
import { getCarQist } from "@/lib/qist";
import { MapPin, Gauge, Scale, Phone, MessageCircle, Eye, Coins } from "lucide-react";

export default function CarCard({
  car,
  onQuickView,
}: {
  car: Car;
  onQuickView?: (car: Car) => void;
}) {
  const { lang, currency, addToCompare, compareList, t } = useApp();
  const [imgError, setImgError] = useState(false);

  const rawImg = car.Attachments?.[0]?.DetailUrl || car.Attachments?.[0]?.CardUrl || car.Attachments?.[0]?.Url;
  const imgSrc = imgError ? "https://iqcars-assets.iqcars.io/images/banner.jpg" : getCarImageUrl(rawImg);

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

  const cityName =
    lang === "ar"
      ? car.Location?.LocationNamear || car.Location?.LocationNameen
      : lang === "ku"
      ? car.Location?.LocationNameku || car.Location?.LocationNameen
      : car.Location?.LocationNameen;

  const year = car.Year?.YearName || "2024";
  const trim = car.ModelSFX?.SFXName || "";
  const isCompared = compareList.some((c) => c.ID === car.ID);
  const qistPlan = getCarQist(car.ID);

  const locationSlug = (car.Location?.LocationNameen || "iraq").toLowerCase().replace(/\s+/g, "-");
  const brandSlug = (car.Brand?.BrandNameen || "car").toLowerCase().replace(/\s+/g, "-");
  const modelSlug = (car.Model?.ModelNameen || "model").toLowerCase().replace(/\s+/g, "-");
  const detailUrl = `/car/${locationSlug}/${brandSlug}/${modelSlug}/${car.ID}`;

  // Dealership contact info
  const rawPhone = car.PhoneNumber || "+964 750 100 2030";
  const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
  const whatsappNumber = cleanPhone.replace("+", "") || "9647501002030";

  // Pre-filled WhatsApp inquiry message (ready in the chat bar without auto-sending)
  const fullCarTitle = `${brandName} ${modelName} ${year}`;
  const priceDisplay = formatPrice(car.Price, "USD");
  const inquiryMessage =
    lang === "ar"
      ? `مرحباً، أود الاستفسار عن سيارة ${fullCarTitle} (المعرف: #${car.ID}) المعروضة بسعر ${priceDisplay}. هل ما زالت متوفرة في المعرض؟`
      : lang === "ku"
      ? `سڵاو، پرسیارم هەبوو دەربارەی ئۆتۆمبێلی ${fullCarTitle} (ژمارە: #${car.ID}) بە نرخی ${priceDisplay}. ئایا بەردەستە لە پێشانگا؟`
      : `Hello, I am interested in the ${fullCarTitle} (ID: #${car.ID}) listed for ${priceDisplay}. Is it still available at the dealership?`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiryMessage)}`;

  return (
    <div className="group relative bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Link href={detailUrl} className="block w-full h-full">
          <img
            src={imgSrc}
            alt={`${brandName} ${modelName} ${year}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 rtl:right-2.5 rtl:left-auto flex flex-col gap-1.5 z-10">
          {/* Official Dealership Badge */}
          {car.CarLabel?.LabelTitleen && (
            <div
              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm flex items-center gap-1 backdrop-blur-md"
              style={{
                backgroundColor: car.CarLabel.BackgroundColor || "#10b981",
              }}
            >
              <span>
                {lang === "ar"
                  ? car.CarLabel.LabelTitlear || car.CarLabel.LabelTitleen
                  : lang === "ku"
                  ? car.CarLabel.LabelTitleku || car.CarLabel.LabelTitleen
                  : car.CarLabel.LabelTitleen}
              </span>
            </div>
          )}

          {/* Qist (Installments) Badge if available */}
          {qistPlan && (
            <div className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 backdrop-blur-md animate-pulse">
              <Coins className="w-3 h-3" />
              <span>{t("qistBadge")}</span>
            </div>
          )}
        </div>

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(car);
            }}
            className="absolute top-2.5 right-2.5 rtl:left-2.5 rtl:right-auto px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 dark:bg-[#16202e]/90 text-gray-800 dark:text-gray-100 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md backdrop-blur-sm flex items-center gap-1 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 z-10"
            title={t("quickView")}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t("quickView")}</span>
          </button>
        )}

        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCompare(car);
          }}
          className={`absolute bottom-2.5 right-2.5 rtl:left-2.5 rtl:right-auto px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition backdrop-blur-sm z-10 ${
            isCompared
              ? "bg-blue-600 text-white"
              : "bg-black/50 hover:bg-black/70 text-white"
          }`}
          title="Add to compare"
        >
          <Scale className="w-3 h-3" />
          <span>{isCompared ? "Compared" : "Compare"}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Title */}
          <Link href={detailUrl} className="block">
            <h3 className="font-bold text-gray-900 dark:text-white text-base hover:text-emerald-600 dark:hover:text-emerald-400 line-clamp-1 transition">
              {brandName} {modelName} {year}
            </h3>
          </Link>

          {/* Quick Specs & Trim */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 px-2 py-0.5 rounded">
              <Gauge className="w-3 h-3 text-gray-400" />
              <span>{formatMileage(car.VisitedKm, car.Milage?.MilageNameen || "km")}</span>
            </div>
            {trim && (
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium px-2 py-0.5 rounded text-[11px]">
                {trim}
              </span>
            )}
            {car.Engine?.EngineNameen && (
              <span className="bg-gray-100 dark:bg-gray-800/80 px-2 py-0.5 rounded text-[11px]">
                {car.Engine.EngineNameen}L
              </span>
            )}
          </div>
        </div>

        {/* Location & Price */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((cityName || "Iraq") + " Iraq")}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-emerald-500 hover:underline transition group/loc"
            title={`View ${cityName || "Iraq"} on Google Maps`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 group-hover/loc:scale-110 transition-transform" />
            <span className="truncate max-w-[110px]">{cityName || "Iraq"}</span>
          </a>

          <div className="text-right rtl:text-left">
            <div className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
              {formatPrice(car.Price, currency)}
            </div>
            {qistPlan && (
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                {t("qistBadge")}
              </div>
            )}
          </div>
        </div>

        {/* Action Row: Phone Number FIRST, WhatsApp Message SECOND */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* 1. Phone Button (FIRST) */}
          <a
            href={`tel:${cleanPhone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-bold transition shadow-sm"
            title={`Call: ${rawPhone}`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t("callNow")}</span>
          </a>

          {/* 2. WhatsApp Button (SECOND with pre-filled message) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm hover:shadow-md"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>{t("whatsapp")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
