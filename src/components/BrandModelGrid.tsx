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
      models: ["Hilux", "Corolla", "Land Cruiser", "Camry", "Crown", "RAV4", "Land Cruiser Prado", "Corolla Cross", "Urban Cruiser", "Yaris"]
    },
    {
      name: "Mercedes-Benz",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260856554.4385_Mercedes-Benz",
      models: ["E-Class", "C-Class", "S-Class", "G-Class", "CLS", "CLA", "GLE", "GLS", "GLC", "AMG GT"]
    },
    {
      name: "Kia",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1691318753979.1956_Kia.png",
      models: ["Sorento", "Sportage", "K4", "Tasman", "K3", "Cerato", "Forte", "Sonet", "K5"]
    },
    {
      name: "Jetour",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1766908020446.826_Jetour.png",
      models: ["T2", "G700", "T1", "X90 PLUS", "Dashing", "X70 Plus", "X70", "L6"]
    },
    {
      name: "HAVAL",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1747313417133.7363_Haval.png",
      models: ["H6", "H6 GT", "H7", "V7", "H9", "JOLION", "JOLION Pro", "Dargo"]
    },
    {
      name: "Mazda",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1786366979335.2837_Mazda.png",
      models: ["3", "CX-50", "CX-5", "CX-30", "6", "CX-9", "CX-90", "MX-5"]
    },
    {
      name: "OMODA",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1775725925776.4033_OMODA.png",
      models: ["C5", "C7"]
    },
    {
      name: "JAECOO",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1775725935530.6582_JAECOO.png",
      models: ["J5", "J7", "J8"]
    },
    {
      name: "GAC",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1784108103562.2473_GAC.png",
      models: ["GS4 Max", "EMKOO", "GS8", "GS8 TRAVELLER", "Aion ES", "Empow", "GS5", "GS3"]
    },
    {
      name: "TANK",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1747315387629.3057_GWM%20TANK.png",
      models: ["300", "500", "700"]
    },
    {
      name: "Volkswagen",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1728388293639.9167_Volkswagen.png",
      models: ["Jetta", "Atlas", "Golf", "Passat", "Tiguan", "Atlas Cross Sport", "Arteon", "Taos", "Golf R"]
    },
    {
      name: "Soueast",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1766328188727.498_Soueast.png",
      models: ["S09", "S07", "S06", "S08", "DX5", "DX8S"]
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
