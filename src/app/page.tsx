"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import { Car } from "@/lib/types";
import HeroSearch from "@/components/HeroSearch";
import PopularCarsCarousel from "@/components/PopularCarsCarousel";
import QuickCategoryBanners from "@/components/QuickCategoryBanners";
import CategoriesSection from "@/components/CategoriesSection";
import ShowroomsSection from "@/components/ShowroomsSection";
import BrandModelGrid from "@/components/BrandModelGrid";
import CarCard from "@/components/CarCard";
import { Sparkles, ArrowRight, ShieldCheck, Car as CarIcon } from "lucide-react";

export default function HomePage() {
  const { lang, t } = useApp();
  const allCars = carsDataRaw as Car[];

  // Visible cars in the "Buy cars from Iraq" grid
  const [displayCount, setDisplayCount] = useState(16);
  const visibleCars = allCars.slice(0, displayCount);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#16202e] text-white pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Banner Promo Link */}
          <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-700/50 relative bg-gradient-to-r from-emerald-950/60 to-slate-900/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-center md:text-left rtl:md:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Iraq&apos;s #1 Marketplace</span>
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

          {/* Hero Search Box */}
          <HeroSearch />
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Quick Category Action Cards */}
        <QuickCategoryBanners />

        {/* Popular Featured Cars Carousel */}
        <PopularCarsCarousel cars={allCars} />

        {/* Categories Section */}
        <CategoriesSection />

        {/* "Buy cars from Iraq" Listings Grid */}
        <section className="my-14">
          <div className="flex items-center justify-between mb-6">
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
                Verified listings added across Baghdad, Erbil, Sulaymaniyah, Basra & Duhok
              </p>
            </div>

            <Link
              href="/search"
              className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View all 61,681</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleCars.map((car) => (
              <CarCard key={car.ID} car={car} />
            ))}
          </div>

          {/* Load More Button */}
          {displayCount < allCars.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setDisplayCount((prev) => prev + 16)}
                className="px-8 py-3.5 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold text-sm rounded-xl border border-gray-300 dark:border-gray-700 shadow-sm transition transform hover:-translate-y-0.5"
              >
                {t("showMoreCars").replace("{n}", String(allCars.length - displayCount))}
              </button>
            </div>
          )}
        </section>

        {/* Popular Showrooms Section */}
        <ShowroomsSection />

        {/* Popular Brands & Models Directory */}
        <BrandModelGrid />
      </div>
    </div>
  );
}
