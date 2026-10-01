"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Car, Tag, Zap, Scale, ChevronRight } from "lucide-react";

export default function QuickCategoryBanners() {
  const { t } = useApp();

  const banners = [
    {
      href: "/search?condition=New",
      title: t("newCars"),
      desc: t("exploreLatest"),
      icon: Car,
      color: "from-blue-600 to-indigo-700",
    },
    {
      href: "/search?condition=Used",
      title: t("usedCars"),
      desc: t("greatDeals"),
      icon: Tag,
      color: "from-emerald-600 to-teal-700",
    },
    {
      href: "/search?fuel=EV",
      title: "Electric Cars",
      desc: t("ecoFriendly"),
      icon: Zap,
      color: "from-cyan-600 to-blue-700",
    },
    {
      href: "/compare-cars",
      title: t("compare"),
      desc: t("compareSideBySide"),
      icon: Scale,
      color: "from-violet-600 to-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-8">
      {banners.map((b) => {
        const Icon = b.icon;
        return (
          <Link
            key={b.href}
            href={b.href}
            className={`group relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${b.color} text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between`}
          >
            <div className="space-y-1 z-10 pr-2">
              <h4 className="font-bold text-base leading-tight tracking-tight">{b.title}</h4>
              <p className="text-xs text-white/80 line-clamp-1 leading-snug">{b.desc}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 z-10 group-hover:scale-110 transition-transform">
              <Icon className="w-5 h-5 text-white" />
            </div>
            {/* Background ambient pattern */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full pointer-events-none"></div>
          </Link>
        );
      })}
    </div>
  );
}
