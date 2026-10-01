"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { getCarImageUrl, formatPrice, formatMileage } from "@/lib/utils";
import { MapPin, Heart, Gauge, Sparkles, Scale } from "lucide-react";

export default function CarCard({ car }: { car: Car }) {
  const { lang, currency, isFavorite, toggleFavorite, addToCompare, compareList } = useApp();
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
  const favorited = isFavorite(car.ID);
  const isCompared = compareList.some((c) => c.ID === car.ID);

  const locationSlug = (car.Location?.LocationNameen || "iraq").toLowerCase().replace(/\s+/g, "-");
  const brandSlug = (car.Brand?.BrandNameen || "car").toLowerCase().replace(/\s+/g, "-");
  const modelSlug = (car.Model?.ModelNameen || "model").toLowerCase().replace(/\s+/g, "-");
  const detailUrl = `/car/${locationSlug}/${brandSlug}/${modelSlug}/${car.ID}`;

  return (
    <div className="group relative bg-white dark:bg-[#1a2536] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
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

        {/* Seller / Condition Badge */}
        {car.CarLabel?.LabelTitleen && (
          <div
            className="absolute top-2.5 left-2.5 rtl:right-2.5 rtl:left-auto px-2.5 py-1 rounded-full text-[11px] font-semibold text-white shadow-sm flex items-center gap-1 backdrop-blur-md"
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

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(car.ID);
          }}
          className="absolute top-2.5 right-2.5 rtl:left-2.5 rtl:right-auto w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-sm"
          title="Save car"
        >
          <Heart
            className={`w-4 h-4 transition ${
              favorited ? "fill-rose-500 text-rose-500 scale-110" : "text-white"
            }`}
          />
        </button>

        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCompare(car);
          }}
          className={`absolute bottom-2.5 right-2.5 rtl:left-2.5 rtl:right-auto px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 transition backdrop-blur-sm ${
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
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link href={detailUrl} className="block">
            <h3 className="font-bold text-gray-900 dark:text-white text-base hover:text-emerald-600 dark:hover:text-emerald-400 line-clamp-1 transition">
              {brandName} {modelName} {year}
            </h3>
          </Link>

          {/* Quick Specs & Trim */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
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

        {/* Bottom row: City and Price */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>{cityName || "Iraq"}</span>
          </div>

          <div className="text-right rtl:text-left">
            <div className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
              {formatPrice(car.Price, currency)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
