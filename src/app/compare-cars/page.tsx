"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import { Car } from "@/lib/types";
import { getCarImageUrl, formatPrice, formatMileage } from "@/lib/utils";
import {
  Scale,
  Plus,
  X,
  Check,
  Minus,
  Sparkles,
  ArrowRight,
  Gauge,
  Cpu,
  Layers,
} from "lucide-react";

export default function CompareCarsPage() {
  const { lang, currency, compareList, addToCompare, removeFromCompare, clearCompare, t } =
    useApp();
  const allCars = carsDataRaw as Car[];

  const [car1, setCar1] = useState<Car | null>(compareList[0] || allCars[0]);
  const [car2, setCar2] = useState<Car | null>(compareList[1] || allCars[1]);
  const [selectModalSlot, setSelectModalSlot] = useState<1 | 2 | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightDiff, setHighlightDiff] = useState(false);

  const availableCars = allCars.filter((c) => {
    const title = `${c.Brand?.BrandNameen} ${c.Model?.ModelNameen} ${c.Year?.YearName}`.toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  const getTitle = (c: Car) => {
    const brand =
      lang === "ar"
        ? c.Brand?.BrandNamear || c.Brand?.BrandNameen
        : lang === "ku"
        ? c.Brand?.BrandNameku || c.Brand?.BrandNameen
        : c.Brand?.BrandNameen;
    const model =
      lang === "ar"
        ? c.Model?.ModelNamear || c.Model?.ModelNameen
        : lang === "ku"
        ? c.Model?.ModelNameku || c.Model?.ModelNameen
        : c.Model?.ModelNameen;
    return `${brand} ${model} ${c.Year?.YearName || ""}`;
  };

  const getCarUrl = (c: Car) => {
    const locationSlug = (c.Location?.LocationNameen || "iraq").toLowerCase().replace(/\s+/g, "-");
    const brandSlug = (c.Brand?.BrandNameen || "car").toLowerCase().replace(/\s+/g, "-");
    const modelSlug = (c.Model?.ModelNameen || "model").toLowerCase().replace(/\s+/g, "-");
    return `/car/${locationSlug}/${brandSlug}/${modelSlug}/${c.ID}`;
  };

  const comparisonRows = [
    {
      label: "Price",
      val1: car1 ? formatPrice(car1.Price, currency) : "-",
      val2: car2 ? formatPrice(car2.Price, currency) : "-",
      isDiff: car1?.Price !== car2?.Price,
    },
    {
      label: "Year",
      val1: car1?.Year?.YearName || "-",
      val2: car2?.Year?.YearName || "-",
      isDiff: car1?.Year?.YearName !== car2?.Year?.YearName,
    },
    {
      label: "Mileage",
      val1: car1 ? formatMileage(car1.VisitedKm, car1.Milage?.MilageNameen || "km") : "-",
      val2: car2 ? formatMileage(car2.VisitedKm, car2.Milage?.MilageNameen || "km") : "-",
      isDiff: car1?.VisitedKm !== car2?.VisitedKm,
    },
    {
      label: "Condition",
      val1: car1?.CarCondition?.CarConditionNameen || "Used",
      val2: car2?.CarCondition?.CarConditionNameen || "Used",
      isDiff: car1?.CarCondition?.CarConditionNameen !== car2?.CarCondition?.CarConditionNameen,
    },
    {
      label: "Engine Size",
      val1: car1?.Engine?.EngineNameen ? `${car1.Engine.EngineNameen}L` : "5.3L",
      val2: car2?.Engine?.EngineNameen ? `${car2.Engine.EngineNameen}L` : "2.0L",
      isDiff: car1?.Engine?.EngineNameen !== car2?.Engine?.EngineNameen,
    },
    {
      label: "Cylinders",
      val1: car1?.Cylinder?.CylinderNameen || "8 cylinder",
      val2: car2?.Cylinder?.CylinderNameen || "4 cylinder",
      isDiff: car1?.Cylinder?.CylinderNameen !== car2?.Cylinder?.CylinderNameen,
    },
    {
      label: "Fuel",
      val1: car1?.CarFuels?.[0]?.FuelNameen || "Gasoline",
      val2: car2?.CarFuels?.[0]?.FuelNameen || "Gasoline",
      isDiff: car1?.CarFuels?.[0]?.FuelNameen !== car2?.CarFuels?.[0]?.FuelNameen,
    },
    {
      label: "Transmission",
      val1: "Automatic",
      val2: "Automatic",
      isDiff: false,
    },
    {
      label: "Trim / SFX",
      val1: car1?.ModelSFX?.SFXName || "Standard",
      val2: car2?.ModelSFX?.SFXName || "Standard",
      isDiff: car1?.ModelSFX?.SFXName !== car2?.ModelSFX?.SFXName,
    },
    {
      label: "City / Governorate",
      val1: car1?.Location?.LocationNameen || "Baghdad",
      val2: car2?.Location?.LocationNameen || "Erbil",
      isDiff: car1?.Location?.LocationNameen !== car2?.Location?.LocationNameen,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          <span>Compare Cars Side by Side</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("startComparison")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("chooseTwoCars")}
        </p>
      </div>

      {/* Comparison Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        {/* Slot 1 */}
        <div className="bg-white dark:bg-[#1a2536] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-5 shadow-sm relative flex flex-col items-center justify-center min-h-[300px]">
          {car1 ? (
            <div className="w-full text-center space-y-4">
              <button
                onClick={() => setCar1(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 hover:text-rose-500 text-gray-400 transition"
                title="Remove"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mx-auto max-w-[280px]">
                <img
                  src={getCarImageUrl(car1.Attachments?.[0]?.DetailUrl || car1.Attachments?.[0]?.Url)}
                  alt={getTitle(car1)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {getTitle(car1)}
                </h3>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatPrice(car1.Price, currency)}
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setSelectModalSlot(1)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Change Car
                </button>
                <Link
                  href={getCarUrl(car1)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-500 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setSelectModalSlot(1)}
              className="flex flex-col items-center gap-3 p-6 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Plus className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm">Select Vehicle 1</span>
            </button>
          )}
        </div>

        {/* Slot 2 */}
        <div className="bg-white dark:bg-[#1a2536] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-5 shadow-sm relative flex flex-col items-center justify-center min-h-[300px]">
          {car2 ? (
            <div className="w-full text-center space-y-4">
              <button
                onClick={() => setCar2(null)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-rose-50 hover:text-rose-500 text-gray-400 transition"
                title="Remove"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mx-auto max-w-[280px]">
                <img
                  src={getCarImageUrl(car2.Attachments?.[0]?.DetailUrl || car2.Attachments?.[0]?.Url)}
                  alt={getTitle(car2)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {getTitle(car2)}
                </h3>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                  {formatPrice(car2.Price, currency)}
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setSelectModalSlot(2)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Change Car
                </button>
                <Link
                  href={getCarUrl(car2)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-500 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setSelectModalSlot(2)}
              className="flex flex-col items-center gap-3 p-6 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Plus className="w-7 h-7" />
              </div>
              <span className="font-bold text-sm">Select Vehicle 2</span>
            </button>
          )}
        </div>
      </div>

      {/* Difference Highlight Toggle */}
      {car1 && car2 && (
        <div className="max-w-4xl mx-auto flex items-center justify-between pb-4">
          <button
            onClick={() => setHighlightDiff(!highlightDiff)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              highlightDiff
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-white dark:bg-[#1a2536] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Highlight Differences</span>
          </button>

          <button
            onClick={() => {
              const temp = car1;
              setCar1(car2);
              setCar2(temp);
            }}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Swap Positions ⇄
          </button>
        </div>
      )}

      {/* Side-by-Side Detailed Specs Table */}
      {car1 && car2 && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-12">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 font-bold text-sm text-gray-900 dark:text-white">
            Technical Specification Comparison
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 p-4 text-xs sm:text-sm transition ${
                  highlightDiff && row.isDiff
                    ? "bg-amber-50/60 dark:bg-amber-950/20 font-semibold"
                    : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                }`}
              >
                <div className="text-gray-500 dark:text-gray-400 font-medium">
                  {row.label}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white pr-4">
                  {row.val1}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white pl-4 border-l border-gray-100 dark:border-gray-800">
                  {row.val2}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle Picker Modal */}
      {selectModalSlot !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1a2536] rounded-2xl shadow-2xl p-6 max-h-[85vh] flex flex-col border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-lg">
                Choose Vehicle for Slot {selectModalSlot}
              </h3>
              <button
                onClick={() => setSelectModalSlot(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="py-3">
              <input
                type="text"
                placeholder="Search by brand, model, year (e.g. Toyota, BMW)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* List */}
            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {availableCars.map((c) => (
                <button
                  key={c.ID}
                  onClick={() => {
                    if (selectModalSlot === 1) setCar1(c);
                    if (selectModalSlot === 2) setCar2(c);
                    setSelectModalSlot(null);
                  }}
                  className="w-full text-left rtl:text-right p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={getCarImageUrl(c.Attachments?.[0]?.CardUrl || c.Attachments?.[0]?.Url)}
                      alt="thumbnail"
                      className="w-14 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        {getTitle(c)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {c.Location?.LocationNameen} • {formatMileage(c.VisitedKm)}
                      </div>
                    </div>
                  </div>
                  <div className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                    {formatPrice(c.Price, currency)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
