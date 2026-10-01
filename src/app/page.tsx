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
import { Sparkles, ArrowRight, Smartphone, ShieldCheck, Car as CarIcon } from "lucide-react";

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

        {/* Mobile App Download Card Banner */}
        <section className="my-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#16202e] to-[#1e2f47] text-white p-8 sm:p-12 shadow-xl border border-gray-700/60">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Available on iOS & Android</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Get the iQ Cars App on Your Phone
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Receive instant alerts on price drops, message verified sellers in real-time,
              and list your car with AI vehicle inspection right from your camera.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://apps.apple.com/us/app/id1534713494"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white text-gray-900 font-bold text-xs rounded-xl shadow hover:bg-gray-100 transition"
              >
                App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.redfoxpro.iqcars"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white text-gray-900 font-bold text-xs rounded-xl shadow hover:bg-gray-100 transition"
              >
                Google Play
              </a>
              <a
                href="https://appgallery.huawei.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white text-gray-900 font-bold text-xs rounded-xl shadow hover:bg-gray-100 transition"
              >
                AppGallery
              </a>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Smartphone className="w-96 h-96 text-white" />
          </div>
        </section>
      </div>
    </div>
  );
}
