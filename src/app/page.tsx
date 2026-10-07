"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import { Car } from "@/lib/types";
import { getInventoryCars } from "@/sanity/queries";
import { isSanityConfigured } from "@/sanity/client";
import FaqSection from "@/components/FaqSection";
import VisitShowroomSection from "@/components/VisitShowroomSection";
import QuickViewModal from "@/components/QuickViewModal";
import BrandModelGrid from "@/components/BrandModelGrid";
import CarCard from "@/components/CarCard";
import { Phone, MessageCircle } from "lucide-react";

export default function HomePage() {
  const { lang, t } = useApp();
  const [allCars, setAllCars] = useState<Car[]>(carsDataRaw as Car[]);

  useEffect(() => {
    if (isSanityConfigured) {
      getInventoryCars().then((data) => {
        if (data && data.length > 0) {
          setAllCars(data);
        }
      });
    }
  }, []);

  // Quick View Modal state
  const [quickViewCar, setQuickViewCar] = useState<Car | null>(null);
  const [quickViewTab, setQuickViewTab] = useState<"photos" | "360">("photos");
  const [displayCount, setDisplayCount] = useState(16);

  const visibleCars = allCars.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-[#16202e]">
      {/* Seamless Dealership Showroom Hero (Completely unobstructed, pure luxury visual) */}
      <div className="relative text-white overflow-hidden">
        {/* Dealership Showroom Background Image with Seamless Multi-Stage Bleed */}
        <div
          className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] bg-cover bg-center flex flex-col justify-end"
          style={{ backgroundImage: `url('/images/dealership-hero.jpg')` }}
        >
          {/* Top subtle vignette so the sticky navbar integrates seamlessly */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#16202e] via-[#16202e]/60 to-transparent pointer-events-none" />

          {/* Seamless bottom fade: smoothly bleeds directly into the car inventory floor with zero dividing lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#16202e]/30 via-60% to-[#16202e] pointer-events-none" />
        </div>
      </div>

      {/* Main Container - seamlessly continues the dark dealership canvas with no line separating */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <section className="mb-14" id="available-cars">
          {/* Vehicle Listings Grid (3 cars per row on laptop & desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Load More Button */}
          {displayCount < allCars.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setDisplayCount((prev) => prev + 15)}
                className="px-8 py-3.5 bg-[#1a2536] hover:bg-[#223046] text-white font-bold text-sm rounded-xl border border-gray-700/80 shadow-md transition transform hover:-translate-y-0.5"
              >
                {t("showMoreCars").replace("{n}", String(allCars.length - displayCount))}
              </button>
            </div>
          )}
        </section>

        {/* Visit Our Flagship Showrooms (Baghdad & Erbil) */}
        <VisitShowroomSection />

        {/* Daily Buyer Questions (FAQ Accordion) */}
        <FaqSection />

        {/* Available Dealership Brands Directory */}
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
      />
    </div>
  );
}
