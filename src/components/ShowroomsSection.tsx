"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import showroomsData from "@/data/showrooms.json";
import { ChevronLeft, ChevronRight, Building2, MapPin, CheckCircle, Car } from "lucide-react";

export default function ShowroomsSection() {
  const { lang, t } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const showrooms = showroomsData as any[];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const getName = (s: any) => {
    if (lang === "ar") return s.nameAr || s.name;
    if (lang === "ku") return s.nameKu || s.name;
    return s.name;
  };

  const getCity = (s: any) => {
    if (lang === "ar") return s.cityAr || s.city;
    if (lang === "ku") return s.cityKu || s.city;
    return s.city;
  };

  const getBadge = (s: any) => {
    if (lang === "ar") return s.badgeAr || s.badge;
    if (lang === "ku") return s.badgeKu || s.badge;
    return s.badge;
  };

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("popularShowrooms")}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center transition shadow-sm"
            aria-label="Previous showroom"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center transition shadow-sm"
            aria-label="Next showroom"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x"
      >
        {showrooms.map((s) => (
          <Link
            key={s.id}
            href={`/showroom/${s.slug}`}
            className="group w-[260px] sm:w-[290px] flex-shrink-0 snap-start bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Showroom Cover */}
            <div className="relative h-32 bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <img
                src={s.cover}
                alt={s.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 rtl:right-2.5 rtl:left-auto px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <span>★</span>
                <span>{getBadge(s)}</span>
              </div>
            </div>

            {/* Content & Logo */}
            <div className="p-4 flex-1 flex flex-col justify-between relative">
              {/* Overlapping Logo */}
              <div className="absolute -top-7 right-4 rtl:left-4 rtl:right-auto w-12 h-12 rounded-xl bg-white dark:bg-[#1e2a3b] p-1 shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1 transition pr-14 rtl:pr-0 rtl:pl-14">
                  {getName(s)}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{getCity(s)}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  {s.brand}
                </span>
                <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  <Car className="w-3 h-3" />
                  <span>{s.carCount} {t("availableCars")}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
