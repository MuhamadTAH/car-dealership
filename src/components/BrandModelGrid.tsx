"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function BrandModelGrid() {
  const { t } = useApp();

  const brands = [
    {
      name: "Toyota",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1692609856905.7356_Toyota.png",
      models: ["Land Cruiser", "Highlander", "Camry", "RAV4", "Sequoia", "Corolla Cross", "Corolla", "Hilux", "GR Corolla"]
    },
    {
      name: "Mercedes-Benz",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260856554.4385_Mercedes-Benz",
      models: ["S-Class", "G-Class", "E-Class", "GLB", "GLA"]
    },
    {
      name: "BMW",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260896743.1196_BMW",
      models: ["7-Series", "X5", "5-Series", "2-Series"]
    },
    {
      name: "Land Rover",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260861653.8472_Land Rover",
      models: ["Range Rover Vogue", "Defender", "Range Rover Sport"]
    },
    {
      name: "Jeep",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260913313.6658_Jeep",
      models: ["Grand Cherokee", "Wrangler", "Renegade"]
    },
    {
      name: "Dodge",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1689687384588.3416_Dodge.png",
      models: ["Challenger", "Charger", "Durango", "Journey"]
    },
    {
      name: "Ford",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1728388004823.3416_Ford.png",
      models: ["Mustang", "F-150", "F-150 Raptor", "Fusion", "Maverick", "Escape"]
    },
    {
      name: "Kia",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1691318753979.1956_Kia.png",
      models: ["Sportage", "Sorento", "K5", "Carnival", "Seltos", "Cerato"]
    },
    {
      name: "Hyundai",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260917025.2678_Hyundai",
      models: ["Palisade", "Santa Fe", "Tucson", "Sonata", "Elantra", "Kona"]
    },
    {
      name: "GMC",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260920688.86_GMC",
      models: ["Yukon", "Acadia"]
    },
    {
      name: "Chevrolet",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260885500.0466_Chevrolet",
      models: ["Tahoe", "Malibu"]
    },
    {
      name: "Lexus",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260860741.1309_Lexus",
      models: ["LX"]
    },
    {
      name: "BYD",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1758524118749.2576_BYD.png",
      models: ["QIN L DM-i", "Seal 6", "SONG PLUS", "Destroyer 05"]
    },
    {
      name: "Volkswagen",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1728388293639.9167_Volkswagen.png",
      models: ["Arteon", "Jetta"]
    }
  ];

  const [activeBrand, setActiveBrand] = useState(brands[0].name);
  const currentBrand = brands.find((b) => b.name === activeBrand) || brands[0];

  return (
    <section className="my-14 py-10 px-6 sm:px-8 bg-gray-50 dark:bg-[#151f2e] rounded-3xl border border-gray-200/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("popularBrands")}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t("popularBrandsSub")}
          </p>
        </div>

        {/* Brand Logos Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10">
          {brands.map((b) => (
            <button
              key={b.name}
              onClick={() => setActiveBrand(b.name)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeBrand === b.name
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105"
                  : "bg-white dark:bg-[#1e2a3b] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
              }`}
            >
              <img
                src={b.logo}
                alt={b.name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span>{b.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Brand Popular Models Links */}
        <div className="bg-white dark:bg-[#1a2536] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={currentBrand.logo}
                alt={currentBrand.name}
                className="w-8 h-8 object-contain"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {currentBrand.name} Models
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("popularModelsSub")}
                </p>
              </div>
            </div>
            <Link
              href={`/search?brand=${currentBrand.name}`}
              className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              All {currentBrand.name} Cars →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentBrand.models.map((m) => (
              <Link
                key={m}
                href={`/search?brand=${currentBrand.name}&model=${m}`}
                className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-gray-100 dark:border-gray-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 transition group"
              >
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {currentBrand.name}
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {m}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
