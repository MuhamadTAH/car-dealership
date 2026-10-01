"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import newsRaw from "@/data/news.json";
import { NewsArticle } from "@/lib/types";
import { Newspaper, Calendar, ArrowRight, Tag } from "lucide-react";

export default function NewsPage() {
  const { lang, t } = useApp();
  const articles = newsRaw as NewsArticle[];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Interviews", "Dealerships", "New Launches", "Electric & Hybrid"];

  const filtered = articles.filter((a) => {
    if (selectedCategory !== "All" && a.category !== selectedCategory) return false;
    return true;
  });

  const featured = articles[0];

  const getTitle = (a: NewsArticle) => {
    if (lang === "ar") return a.titleAr || a.title;
    if (lang === "ku") return a.titleKu || a.title;
    return a.title;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Page Title */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Newspaper className="w-3.5 h-3.5" />
          <span>Automotive News Iraq</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Latest Automotive News & Releases
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Stay up to date with new car launches, verified dealership interviews, and market analyses in Iraq.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Big Article Banner */}
      {featured && selectedCategory === "All" && (
        <Link
          href={`/news/${featured.slug}`}
          className="group block relative rounded-3xl overflow-hidden mb-12 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 aspect-[21/9] min-h-[300px] bg-black"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs w-max mb-3">
              {featured.category}
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white leading-tight max-w-3xl">
              {getTitle(featured)}
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/70 mt-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featured.date}</span>
              </div>
              <span>•</span>
              <span>iQ Cars Editorial</span>
            </div>
          </div>
        </Link>
      )}

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <Link
            key={art.id}
            href={`/news/${art.slug}`}
            className="group bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col transform hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                {art.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{art.date}</span>
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 transition leading-snug">
                  {getTitle(art)}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
