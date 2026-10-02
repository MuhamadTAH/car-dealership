"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { ShieldCheck, FileCheck, Award, Coins } from "lucide-react";

export default function WhyBuyFromUs() {
  const { t } = useApp();

  const pillars = [
    {
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
      title: t("trustInspection"),
      desc: t("trustInspectionDesc"),
    },
    {
      icon: FileCheck,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-600 dark:text-blue-400",
      title: t("trustTransfer"),
      desc: t("trustTransferDesc"),
    },
    {
      icon: Award,
      color: "from-purple-500 to-violet-600",
      bgLight: "bg-purple-50 dark:bg-purple-950/30",
      textColor: "text-purple-600 dark:text-purple-400",
      title: t("trustWarranty"),
      desc: t("trustWarrantyDesc"),
    },
    {
      icon: Coins,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      textColor: "text-amber-600 dark:text-amber-400",
      title: t("trustQist"),
      desc: t("trustQistDesc"),
    },
  ];

  return (
    <section className="my-12 py-10 px-6 sm:px-10 rounded-3xl bg-gradient-to-b from-gray-50 to-gray-100/70 dark:from-[#16202e] dark:to-[#111927] border border-gray-200/80 dark:border-gray-800/80 shadow-sm relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t("officialDealership")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("whyBuyFromUs")}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          {t("whySubtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#1a2536] border border-gray-200/70 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${p.color} text-white shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span>Certified Standard</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
