"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import locationsData from "@/data/locations.json";
import filterDataRaw from "@/data/filterData.json";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const { lang, currency, t } = useApp();

  // Filter States
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [fromYear, setFromYear] = useState<string>("");
  const [toYear, setToYear] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minMileage, setMinMileage] = useState<string>("");
  const [maxMileage, setMaxMileage] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");

  // Dropdown toggles
  const [cityModalOpen, setCityModalOpen] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [mileageDropdownOpen, setMileageDropdownOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Popular Top Brands with logos matching iQ Cars
  const topBrands = [
    { name: "Toyota", logo: "https://cdn.iqcars.io/img/BrandAttachments/1692609856905.7356_Toyota.png" },
    { name: "Mercedes-Benz", logo: "https://cdn.iqcars.io/img/BrandAttachments/1598260856554.4385_Mercedes-Benz" },
    { name: "Kia", logo: "https://cdn.iqcars.io/img/BrandAttachments/1691318753979.1956_Kia.png" },
    { name: "BMW", logo: "https://iqcars-assets.iqcars.io/images/icons/golden_badge.svg" },
    { name: "Hyundai", logo: "https://iqcars-assets.iqcars.io/images/icons/golden_badge.svg" },
    { name: "Jetour", logo: "https://cdn.iqcars.io/img/BrandAttachments/1766908020446.826_Jetour.png" },
    { name: "HAVAL", logo: "https://cdn.iqcars.io/img/BrandAttachments/1747313417133.7363_Haval.png" },
    { name: "Mazda", logo: "https://cdn.iqcars.io/img/BrandAttachments/1786366979335.2837_Mazda.png" },
    { name: "OMODA", logo: "https://cdn.iqcars.io/img/BrandAttachments/1775725925776.4033_OMODA.png" },
    { name: "JAECOO", logo: "https://cdn.iqcars.io/img/BrandAttachments/1775725935530.6582_JAECOO.png" },
    { name: "GAC", logo: "https://cdn.iqcars.io/img/BrandAttachments/1784108103562.2473_GAC.png" },
    { name: "TANK", logo: "https://cdn.iqcars.io/img/BrandAttachments/1747315387629.3057_GWM%20TANK.png" },
    { name: "Volkswagen", logo: "https://cdn.iqcars.io/img/BrandAttachments/1728388293639.9167_Volkswagen.png" },
    { name: "Chevrolet", logo: "https://iqcars-assets.iqcars.io/images/icons/golden_badge.svg" },
    { name: "Ford", logo: "https://iqcars-assets.iqcars.io/images/icons/golden_badge.svg" },
  ];

  // Available models based on selected brand
  const availableModels = useMemo(() => {
    if (!selectedBrand) return [];
    const brandObj = (filterDataRaw as any)?.Brands?.find(
      (b: any) => b.BrandNameen.toLowerCase() === selectedBrand.toLowerCase()
    );
    return brandObj?.Models || [];
  }, [selectedBrand]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedGovernorate) params.set("city", selectedGovernorate);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedModel) params.set("model", selectedModel);
    if (fromYear) params.set("minYear", fromYear);
    if (toYear) params.set("maxYear", toYear);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minMileage) params.set("minMileage", minMileage);
    if (maxMileage) params.set("maxMileage", maxMileage);
    if (condition) params.set("condition", condition);
    if (transmission) params.set("transmission", transmission);
    if (fuel) params.set("fuel", fuel);

    router.push(`/search?${params.toString()}`);
  };

  const getGovernorateName = (g: any) => {
    if (lang === "ar") return g.ParentLocationNamear || g.ParentLocationNameen;
    if (lang === "ku") return g.ParentLocationNameku || g.ParentLocationNameen;
    return g.ParentLocationNameen;
  };

  return (
    <div className="relative w-full">
      {/* Search Box Card */}
      <div className="bg-white dark:bg-[#1a2536] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-4 sm:p-6 text-gray-900 dark:text-white">
        {/* Top Controls: City Selector & Advanced Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          {/* City Selector Button */}
          <button
            onClick={() => setCityModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-semibold transition"
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>
              {selectedGovernorate ? selectedGovernorate : t("selectCity")}
            </span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Advanced Search Toggle */}
          <button
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t("advancedSearch")}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${advancedOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Brand Logos Carousel */}
        <div className="py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => {
                setSelectedBrand("");
                setSelectedModel("");
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                selectedBrand === ""
                  ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
              }`}
            >
              All Brands
            </button>
            {topBrands.map((b) => (
              <button
                key={b.name}
                onClick={() => {
                  setSelectedBrand(selectedBrand === b.name ? "" : b.name);
                  setSelectedModel("");
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                  selectedBrand === b.name
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400"
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
        </div>

        {/* Primary Filter Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Model Selector */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
              {t("model")}
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:bg-gray-50 dark:disabled:bg-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">{selectedBrand ? "All Models" : "Select Brand First"}</option>
              {availableModels.map((m: any) => (
                <option key={m.ID} value={m.ModelNameen}>
                  {lang === "ar"
                    ? m.ModelNamear || m.ModelNameen
                    : lang === "ku"
                    ? m.ModelNameku || m.ModelNameen
                    : m.ModelNameen}
                </option>
              ))}
            </select>
          </div>

          {/* Year Range */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
              {t("year")}
            </label>
            <div className="flex gap-1.5">
              <select
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                className="w-1/2 px-2 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">From</option>
                {[2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                className="w-1/2 px-2 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">To</option>
                {[2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005, 2000].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mileage */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
              {t("mileage")}
            </label>
            <div className="flex gap-1.5">
              <input
                type="number"
                placeholder="Min km"
                value={minMileage}
                onChange={(e) => setMinMileage(e.target.value)}
                className="w-1/2 px-2.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="number"
                placeholder="Max km"
                value={maxMileage}
                onChange={(e) => setMaxMileage(e.target.value)}
                className="w-1/2 px-2.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Price */}
          <div className="relative">
            <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
              {t("price")} ({currency === "USD" ? "$" : "د.ع"})
            </label>
            <div className="flex gap-1.5">
              <input
                type="number"
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 px-2.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="number"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 px-2.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Expandable Advanced Filters */}
        {advancedOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in duration-200">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {t("condition")}
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Conditions</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {t("transmission")}
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {t("fuel")}
              </label>
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Fuel Types</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="EV">Electric (EV)</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
          </div>
        )}

        {/* Search Submit Button */}
        <div className="mt-5">
          <button
            onClick={handleSearch}
            className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <Search className="w-5 h-5" />
            <span>{t("showCars").replace("{n}", "61,681")}</span>
          </button>
        </div>
      </div>

      {/* City Selector Modal */}
      {cityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1a2536] rounded-2xl shadow-2xl p-6 max-h-[85vh] flex flex-col border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <span>{t("selectCity")}</span>
              </h3>
              <button
                onClick={() => setCityModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3">
              <button
                onClick={() => {
                  setSelectedGovernorate("");
                  setCityModalOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-4 py-2.5 rounded-xl font-bold text-sm transition flex items-center justify-between ${
                  selectedGovernorate === ""
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{t("allIraq")}</span>
                {selectedGovernorate === "" && <Check className="w-4 h-4 text-emerald-500" />}
              </button>
            </div>

            <div className="overflow-y-auto space-y-1 flex-1 pr-1">
              {(locationsData as any[]).map((gov) => {
                const name = getGovernorateName(gov);
                const isSelected = selectedGovernorate === gov.ParentLocationNameen;
                return (
                  <button
                    key={gov.ID}
                    onClick={() => {
                      setSelectedGovernorate(gov.ParentLocationNameen);
                      setCityModalOpen(false);
                    }}
                    className={`w-full text-left rtl:text-right px-4 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                      isSelected
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span>{name}</span>
                    <span className="text-xs text-gray-400">
                      {gov.Locations?.length || 0} cities
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
