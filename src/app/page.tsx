"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import { Car } from "@/lib/types";
import { isQistAvailable } from "@/lib/qist";
import QistCalculator from "@/components/QistCalculator";
import FaqSection from "@/components/FaqSection";
import QuickViewModal from "@/components/QuickViewModal";
import ShowroomsSection from "@/components/ShowroomsSection";
import BrandModelGrid from "@/components/BrandModelGrid";
import CarCard from "@/components/CarCard";
import Seller360StudioModal from "@/components/Seller360StudioModal";
import { getCar360Config } from "@/lib/car360";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Car as CarIcon,
  Search,
  Coins,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function HomePage() {
  const { lang, t } = useApp();
  const allCars = carsDataRaw as Car[];

  // Quick View Modal state
  const [quickViewCar, setQuickViewCar] = useState<Car | null>(null);
  const [quickViewTab, setQuickViewTab] = useState<"photos" | "360">("photos");
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Live Instant Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterPill, setActiveFilterPill] = useState("all");
  const [displayCount, setDisplayCount] = useState(16);

  // Filter cars client-side in real-time
  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const brand = (car.Brand?.BrandNameen || "").toLowerCase();
        const model = (car.Model?.ModelNameen || "").toLowerCase();
        const year = (car.Year?.YearName || "").toLowerCase();
        const trim = (car.ModelSFX?.SFXName || "").toLowerCase();
        const loc = (car.Location?.LocationNameen || "").toLowerCase();
        if (
          !brand.includes(q) &&
          !model.includes(q) &&
          !year.includes(q) &&
          !trim.includes(q) &&
          !loc.includes(q)
        ) {
          return false;
        }
      }

      // Filter Pill
      if (activeFilterPill === "qist") {
        if (!isQistAvailable(car.ID)) return false;
      } else if (activeFilterPill === "suv") {
        const model = (car.Model?.ModelNameen || "").toLowerCase();
        const sfx = (car.ModelSFX?.SFXName || "").toLowerCase();
        const isSuv =
          model.includes("suv") ||
          model.includes("cherokee") ||
          model.includes("tucson") ||
          model.includes("sportage") ||
          model.includes("yukon") ||
          model.includes("highlander") ||
          sfx.includes("suv") ||
          sfx.includes("4wd") ||
          sfx.includes("awd");
        if (!isSuv) return false;
      } else if (activeFilterPill === "sedan") {
        const model = (car.Model?.ModelNameen || "").toLowerCase();
        const isSedan =
          model.includes("camry") ||
          model.includes("elantra") ||
          model.includes("sonata") ||
          model.includes("arteon") ||
          model.includes("accord") ||
          model.includes("civic") ||
          model.includes("series");
        if (!isSedan) return false;
      } else if (activeFilterPill === "under20") {
        if (car.Price >= 20000) return false;
      } else if (activeFilterPill === "20to35") {
        if (car.Price < 20000 || car.Price > 35000) return false;
      } else if (activeFilterPill === "over35") {
        if (car.Price <= 35000) return false;
      } else if (activeFilterPill === "360") {
        if (!getCar360Config(car.ID, car)?.available) return false;
      } else if (activeFilterPill === "new") {
        if (car.CarCondition?.CarConditionNameen !== "New" && car.VisitedKm > 100) return false;
      }

      return true;
    });
  }, [allCars, searchQuery, activeFilterPill]);

  const visibleCars = filteredCars.slice(0, displayCount);

  // Filter Pill buttons definition
  const pills = [
    { id: "all", label: t("allCarsPill") },
    { id: "360", label: `🔄 ${t("filter360Pill")}`, isHighlight: true },
    { id: "qist", label: `💎 ${t("qistAvailablePill")} (قیست)`, isHighlight: true },
    { id: "under20", label: "< $20,000" },
    { id: "20to35", label: "$20k – $35k" },
    { id: "over35", label: "$35k+" },
    { id: "suv", label: "SUV & 4x4" },
    { id: "sedan", label: "Sedan" },
    { id: "new", label: t("brandNew") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#16202e] text-white pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Banner Promo Link */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-700/50 relative bg-gradient-to-r from-emerald-950/60 to-slate-900/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-center md:text-left rtl:md:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Certified Dealership</span>
              </div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="text-sm sm:text-base text-gray-300">
                {t("heroSubtitle")}
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
              <Link
                href="/search"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition transform hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Browse All Cars</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* "Available Dealership Inventory" Section with Instant Search & Filter Bar */}
        <section className="mb-14" id="available-cars">
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CarIcon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                    {t("buyFromIraq")}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  100% Inspected official dealership stock across Baghdad, Erbil, Sulaymaniyah, Basra & Duhok
                </p>
              </div>

              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t("showingCars").replace("{count}", String(filteredCars.length))}
              </div>
            </div>

            {/* Instant Search Bar & Filter Pills Container */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#16202e] border border-gray-200/80 dark:border-gray-800 space-y-3 shadow-sm">
              {/* Real-time search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-10 pr-10 rtl:pr-10 rtl:pl-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {pills.map((p) => {
                  const isSelected = activeFilterPill === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveFilterPill(p.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isSelected
                          ? p.id === "qist"
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                            : "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : p.id === "qist"
                          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 hover:bg-amber-100"
                          : "bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-400"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          {visibleCars.length === 0 ? (
            <div className="text-center py-12 p-8 rounded-2xl bg-gray-50 dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 space-y-3">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {t("noCarsFound")}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilterPill("all");
                }}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleCars.map((car) => (
                <CarCard
                  key={car.ID}
                  car={car}
                  onQuickView={(c, tab) => {
                    setQuickViewCar(c);
                    setQuickViewTab(tab || "photos");
                  }}
                />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {displayCount < filteredCars.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setDisplayCount((prev) => prev + 16)}
                className="px-8 py-3.5 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm transition transform hover:-translate-y-0.5"
              >
                {t("showMoreCars").replace("{n}", String(filteredCars.length - displayCount))}
              </button>
            </div>
          )}
        </section>

        {/* Qist (Installments / قیست) Calculator Section */}
        <QistCalculator allCars={allCars} />

        {/* Popular Showrooms Section */}
        <ShowroomsSection />

        {/* Daily Buyer Questions (FAQ Accordion) */}
        <FaqSection />

        {/* Popular Brands & Models Directory */}
        <BrandModelGrid />
      </div>

      {/* Floating Dealership Hotline & WhatsApp Action */}
      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex flex-col gap-2.5 items-end rtl:items-start">
        {/* Hotline 6896 button */}
        <a
          href="tel:6896"
          className="flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#16202e] text-white shadow-xl hover:bg-black transition border border-gray-700/80 text-xs font-bold group"
          title="Call Hotline: 6896"
        >
          <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">6896</span>
        </a>

        {/* WhatsApp Floating Chat */}
        <a
          href={`https://wa.me/9647501002030?text=${encodeURIComponent(
            lang === "ar"
              ? "مرحباً، أود الاستفسار عن سيارات المعرض المتاحة لديكم وخيارات الأقساط (قسط)."
              : lang === "ku"
              ? "سڵاو، دەمەوێت پرسیار بکەم دەربارەی ئۆتۆمبێلەکان و سیستەمی قیست."
              : "Hello, I would like to inquire about available vehicles and Qist financing."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-600/40 transition transform hover:scale-105 font-bold text-xs group"
          title="Chat with Dealership on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline">
            {lang === "ar" ? "تواصل واتساب" : lang === "ku" ? "واتسئەپ" : "WhatsApp"}
          </span>
        </a>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        car={quickViewCar}
        onClose={() => setQuickViewCar(null)}
        initialTab={quickViewTab}
        onOpenSellerStudio={() => setIsStudioOpen(true)}
      />

      {/* Seller 360 Studio Modal */}
      <Seller360StudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        cars={allCars}
        initialCar={quickViewCar}
      />
    </div>
  );
}
