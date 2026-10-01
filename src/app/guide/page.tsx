"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import guidesRaw from "@/data/guides.json";
import CategoriesSection from "@/components/CategoriesSection";
import BrandModelGrid from "@/components/BrandModelGrid";
import {
  BookOpen,
  Play,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

export default function GuidePage() {
  const { lang, t } = useApp();
  const guides = guidesRaw as any;
  const videos = guides.videos || [];
  const latestModels = guides.latestModels || [];

  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Header */}
      <div className="max-w-3xl mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Vehicle Buying Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Car Buying Guide Iraq
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          Explore the latest car models in Iraq, compare features and prices, and discover cars by category to make the best choice for your needs.
        </p>
      </div>

      {/* Video Reviews Carousel */}
      <section className="my-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Play className="w-5 h-5 text-emerald-500 fill-emerald-500" />
            <span>Video Reviews & Test Drives</span>
          </h2>
          <span className="text-xs text-gray-400">Curated by iQ Cars Experts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid: any) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group cursor-pointer bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  {vid.duration}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-emerald-500 line-clamp-2 transition leading-snug">
                  {vid.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span>{vid.author}</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    Watch Review →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest 2026/2027 Models Spotlight */}
      <section className="my-14">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Latest 2026 & 2027 Models in Iraq</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            New vehicle arrivals featuring modern powertrains and enhanced infotainment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {latestModels.map((m: any) => (
            <div
              key={m.id}
              className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 flex items-center justify-center overflow-hidden mb-4">
                  <img
                    src={m.image}
                    alt={`${m.brand} ${m.model}`}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {m.brand} • {m.year}
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mt-0.5">
                  {m.brand} {m.model}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {m.specs}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">Estimated Price:</div>
                  <div className="font-black text-sm text-gray-900 dark:text-white">
                    {m.priceEst}
                  </div>
                </div>
                <Link
                  href={`/search?brand=${m.brand}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold transition"
                >
                  Find Available
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Directory */}
      <CategoriesSection />

      {/* Iraq Car Buying Tips & Checklist */}
      <section className="my-14 bg-gradient-to-br from-emerald-900/10 to-slate-900/20 rounded-3xl p-6 sm:p-10 border border-emerald-500/20">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">
          Buyer Checklist for Iraqi Car Shoppers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Verify Clean Title vs Salvage</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              When buying US imported cars, verify the VIN report (Carfax / AutoCheck) to ensure
              airbags did not deploy and flood damage was not recorded before Iraqi customs clearance.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>Governorate Plate Registration</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Ensure official traffic directorate ownership transfer (Muror) in Baghdad, Erbil, or
              Basra. Verify that all outstanding fines, inspection fees, and customs duties are paid.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500" />
              <span>Climate & Fuel Compatibility</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Select vehicles with high-capacity air conditioning compressors and engines compatible
              with regular and improved octane gasoline widely distributed at Iraqi filling stations.
            </p>
          </div>
        </div>
      </section>

      {/* Brands and Models */}
      <BrandModelGrid />

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <h3 className="font-bold text-sm">{activeVideo.title}</h3>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-gray-400 hover:text-white font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative aspect-[16/9] flex items-center justify-center bg-gray-950">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center space-y-3 p-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <div className="text-white font-bold text-base">{activeVideo.title}</div>
                <p className="text-xs text-gray-300 max-w-md">
                  Official test drive review by iQ Cars automotive journalists in Iraq.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
