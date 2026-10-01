"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import guidesData from "@/data/guides.json";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";

export default function CategoriesSection() {
  const { lang, t } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const categories = (guidesData as any).categories || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const getTitle = (c: any) => {
    if (lang === "ar") return c.titleAr || c.title;
    if (lang === "ku") return c.titleKu || c.title;
    return c.title;
  };

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("categories")}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center transition shadow-sm"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center transition shadow-sm"
            aria-label="Next category"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x"
      >
        {categories.map((c: any) => (
          <Link
            key={c.id}
            href={`/search?category=${c.id}`}
            className="group relative w-[180px] sm:w-[220px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg flex-shrink-0 snap-start border border-gray-200 dark:border-gray-800 transition transform hover:-translate-y-1"
          >
            <img
              src={c.img}
              alt={c.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-base leading-tight drop-shadow-sm">
                {getTitle(c)}
              </h3>
              <p className="text-xs text-white/70 mt-0.5">{c.count} cars</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
