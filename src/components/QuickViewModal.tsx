"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Car } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getCarImageUrl, formatPrice, formatMileage } from "@/lib/utils";
import { getCarQist } from "@/lib/qist";
import {
  X,
  MapPin,
  Gauge,
  Phone,
  MessageCircle,
  Coins,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface QuickViewModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function QuickViewModal({ car, onClose }: QuickViewModalProps) {
  const { lang, currency, t } = useApp();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (car) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [car, onClose]);

  if (!car) return null;

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
  const qistPlan = getCarQist(car.ID);

  const attachments = car.Attachments && car.Attachments.length > 0 ? car.Attachments : [{ Url: "" }];
  const currentPhoto = attachments[activePhotoIdx] || attachments[0];
  const mainImgSrc = getCarImageUrl(currentPhoto.DetailUrl || currentPhoto.CardUrl || currentPhoto.Url);

  const locationSlug = (car.Location?.LocationNameen || "iraq").toLowerCase().replace(/\s+/g, "-");
  const brandSlug = (car.Brand?.BrandNameen || "car").toLowerCase().replace(/\s+/g, "-");
  const modelSlug = (car.Model?.ModelNameen || "model").toLowerCase().replace(/\s+/g, "-");
  const detailUrl = `/car/${locationSlug}/${brandSlug}/${modelSlug}/${car.ID}`;

  // Dealership contact info
  const rawPhone = car.PhoneNumber || "+964 750 100 2030";
  const cleanPhone = rawPhone.replace(/[^\d+]/g, "");
  const whatsappNumber = cleanPhone.replace("+", "") || "9647501002030";

  // Pre-filled WhatsApp inquiry message
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#1a2536] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#16202e]/50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              {t("officialDealership")}
            </span>
            <span className="text-xs text-gray-500 font-mono">ID: #{car.ID}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery Column */}
            <div className="space-y-3">
              <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={mainImgSrc}
                  alt={`${brandName} ${modelName}`}
                  className="w-full h-full object-cover"
                />
                {attachments.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
                    <button
                      onClick={() =>
                        setActivePhotoIdx((prev) => (prev === 0 ? attachments.length - 1 : prev - 1))
                      }
                      className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                    >
                      <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                    </button>
                    <button
                      onClick={() =>
                        setActivePhotoIdx((prev) => (prev === attachments.length - 1 ? 0 : prev + 1))
                      }
                      className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
                    >
                      <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 rtl:left-2 rtl:right-auto px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  {activePhotoIdx + 1} / {attachments.length}
                </div>
              </div>

              {/* Thumbnails */}
              {attachments.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {attachments.map((att, idx) => (
                    <button
                      key={att.ID || idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
                        activePhotoIdx === idx ? "border-emerald-500 scale-95" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={getCarImageUrl(att.CardUrl || att.DetailUrl || att.Url)}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Car Details Column */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                    {brandName} {modelName} {year}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((cityName || "Iraq") + " Iraq")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{cityName || "Iraq"}</span>
                    </a>
                    {trim && (
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
                        {trim}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold block">
                      {t("price")}
                    </span>
                    <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                      {formatPrice(car.Price, currency)}
                    </span>
                  </div>
                  {currency === "USD" && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      ≈ {formatPrice(car.Price, "IQD")}
                    </span>
                  )}
                </div>

                {/* Qist Status Banner */}
                {qistPlan ? (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                    <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <div>
                      <span className="font-bold block">{t("qistBadge")}</span>
                      <span className="text-[11px] text-amber-700 dark:text-amber-300">
                        {t("downPayment")}: {qistPlan.minDownPaymentPercent}% • {t("monthsDuration")}: {qistPlan.allowedMonths.join(", ")} {t("months")}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    <span>{t("qistNotAvailable")}</span>
                  </div>
                )}

                {/* Key Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                    <span className="text-gray-400 text-[10px] block uppercase font-bold">{t("mileage")}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {formatMileage(car.VisitedKm, car.Milage?.MilageNameen || "km")}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                    <span className="text-gray-400 text-[10px] block uppercase font-bold">{t("fuel")}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {car.CarFuels?.[0]?.FuelNameen || "Gasoline"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                    <span className="text-gray-400 text-[10px] block uppercase font-bold">{t("transmission")}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {car.Transmission?.TransmissionNameen || "Automatic"}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
                    <span className="text-gray-400 text-[10px] block uppercase font-bold">{t("condition")}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {car.CarCondition?.CarConditionNameen || "Used"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Phone FIRST, WhatsApp SECOND */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* 1. Phone Button (FIRST) */}
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-sm transition shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t("callNow")}</span>
                  </a>

                  {/* 2. WhatsApp Button (SECOND with pre-filled message) */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{t("whatsapp")}</span>
                  </a>
                </div>

                {/* View Full Details Link */}
                <Link
                  href={detailUrl}
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>{t("viewDetails")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
