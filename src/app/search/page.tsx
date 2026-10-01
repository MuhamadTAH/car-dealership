"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import locationsData from "@/data/locations.json";
import filterDataRaw from "@/data/filterData.json";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  X,
  Grid,
  List,
  RotateCcw,
  MapPin,
  Check,
  Search,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, currency, t } = useApp();

  // URL parameters or local state
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [model, setModel] = useState(searchParams.get("model") || "");
  const [condition, setCondition] = useState(searchParams.get("condition") || "");
  const [minYear, setMinYear] = useState(searchParams.get("minYear") || "");
  const [maxYear, setMaxYear] = useState(searchParams.get("maxYear") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [fuel, setFuel] = useState(searchParams.get("fuel") || "");
  const [transmission, setTransmission] = useState(searchParams.get("transmission") || "");
  const [sellerType, setSellerType] = useState(searchParams.get("sellerType") || "");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  const allCars = carsDataRaw as Car[];

  // Filter cars
  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      if (city) {
        const carCity = car.Location?.LocationNameen || "";
        if (!carCity.toLowerCase().includes(city.toLowerCase())) return false;
      }
      if (brand) {
        const carBrand = car.Brand?.BrandNameen || "";
        if (carBrand.toLowerCase() !== brand.toLowerCase()) return false;
      }
      if (model) {
        const carModel = car.Model?.ModelNameen || "";
        if (!carModel.toLowerCase().includes(model.toLowerCase())) return false;
      }
      if (condition) {
        const carCond = car.CarCondition?.CarConditionNameen || "";
        if (carCond.toLowerCase() !== condition.toLowerCase()) return false;
      }
      if (minYear && car.Year?.YearName) {
        if (parseInt(car.Year.YearName) < parseInt(minYear)) return false;
      }
      if (maxYear && car.Year?.YearName) {
        if (parseInt(car.Year.YearName) > parseInt(maxYear)) return false;
      }
      if (minPrice) {
        if (car.Price < parseInt(minPrice)) return false;
      }
      if (maxPrice) {
        if (car.Price > parseInt(maxPrice)) return false;
      }
      if (fuel && car.CarFuels) {
        const hasFuel = car.CarFuels.some((f) =>
          f.FuelNameen.toLowerCase().includes(fuel.toLowerCase())
        );
        if (!hasFuel) return false;
      }
      if (sellerType) {
        const label = car.CarLabel?.LabelTitleen || "";
        if (sellerType === "Private" && !label.includes("Private")) return false;
        if (sellerType === "Showroom" && label.includes("Private")) return false;
      }
      return true;
    });
  }, [allCars, city, brand, model, condition, minYear, maxYear, minPrice, maxPrice, fuel, sellerType]);

  // Sort cars
  const sortedCars = useMemo(() => {
    const list = [...filteredCars];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.Price - b.Price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.Price - a.Price);
    } else if (sortBy === "year-new") {
      list.sort((a, b) => parseInt(b.Year?.YearName || "0") - parseInt(a.Year?.YearName || "0"));
    } else if (sortBy === "mileage-low") {
      list.sort((a, b) => a.VisitedKm - b.VisitedKm);
    }
    return list;
  }, [filteredCars, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedCars.length / pageSize) || 1;
  const paginatedCars = sortedCars.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setCity("");
    setBrand("");
    setModel("");
    setCondition("");
    setMinYear("");
    setMaxYear("");
    setMinPrice("");
    setMaxPrice("");
    setFuel("");
    setTransmission("");
    setSellerType("");
    setCurrentPage(1);
    router.push("/search");
  };

  const activeFiltersCount = [
    city,
    brand,
    model,
    condition,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    fuel,
    sellerType,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Cars for Sale in Iraq
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing <span className="font-bold text-emerald-600 dark:text-emerald-400">{sortedCars.length}</span> of 61,681 cars for sale in Iraq
          </p>
        </div>

        {/* Controls: Mobile Filter Button, Sort Dropdown, View Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1a2536] border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-xl">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-900 dark:text-white font-semibold outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest</option>
              <option value="mileage-low">Mileage: Lowest</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "grid"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition ${
                viewMode === "list"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Active Filters:
          </span>
          {city && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              City: {city}
              <button onClick={() => setCity("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {brand && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Brand: {brand}
              <button onClick={() => setBrand("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {model && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Model: {model}
              <button onClick={() => setModel("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          {condition && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {condition}
              <button onClick={() => setCondition("")}><X className="w-3 h-3" /></button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            Clear all
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar Filters + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                <span>Filter Vehicles</span>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-500 hover:text-rose-600 font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Governorate / City
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Iraq</option>
                {(locationsData as any[]).map((g) => (
                  <option key={g.ID} value={g.ParentLocationNameen}>
                    {g.ParentLocationNameen}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Toggle */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Condition
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setCondition("")}
                  className={`py-1.5 rounded-lg transition ${
                    condition === ""
                      ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setCondition("New")}
                  className={`py-1.5 rounded-lg transition ${
                    condition === "New"
                      ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setCondition("Used")}
                  className={`py-1.5 rounded-lg transition ${
                    condition === "Used"
                      ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Used
                </button>
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Brand
              </label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setModel("");
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">All Brands</option>
                {((filterDataRaw as any)?.Brands || []).map((b: any) => (
                  <option key={b.ID} value={b.BrandNameen}>
                    {b.BrandNameen}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Price ({currency === "USD" ? "$" : "د.ع"})
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                />
              </div>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Year
              </label>
              <div className="flex gap-2">
                <select
                  value={minYear}
                  onChange={(e) => setMinYear(e.target.value)}
                  className="w-1/2 px-2 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                >
                  <option value="">From</option>
                  {[2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <select
                  value={maxYear}
                  onChange={(e) => setMaxYear(e.target.value)}
                  className="w-1/2 px-2 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                >
                  <option value="">To</option>
                  {[2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2010, 2005].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Fuel
              </label>
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
              >
                <option value="">All Fuels</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="EV">Electric (EV)</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            {/* Seller Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Seller Type
              </label>
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
              >
                <option value="">All Sellers</option>
                <option value="Private">Private Sellers</option>
                <option value="Showroom">Official Showrooms</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results Content */}
        <main className="lg:col-span-3">
          {paginatedCars.length === 0 ? (
            <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                No vehicles matched your search
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Try widening your price range, selecting another governorate, or clearing selected filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow transition"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <>
              {/* Cards Grid / List */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "space-y-4"
                }
              >
                {paginatedCars.map((car) => (
                  <CarCard key={car.ID} car={car} />
                ))}
              </div>

              {/* Full Pagination Controls matching iQ Cars */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-1.5 sm:gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-2 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Prev
                  </button>

                  {Array.from({ length: Math.min(totalPages, 7) }, (_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-9 h-9 text-xs font-bold rounded-xl border transition ${
                          isActive
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                            : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {totalPages > 7 && (
                    <>
                      <span className="px-1 text-gray-400">...</span>
                      <button
                        onClick={() => {
                          setCurrentPage(totalPages);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-9 h-9 text-xs font-bold rounded-xl border transition ${
                          currentPage === totalPages
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                            : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-2 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Filter Slideover Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm ml-auto rtl:mr-auto rtl:ml-0 bg-white dark:bg-[#1a2536] h-full shadow-2xl p-6 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                <span>Filters</span>
              </h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold mb-1">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <option value="">All Iraq</option>
                {(locationsData as any[]).map((g) => (
                  <option key={g.ID} value={g.ParentLocationNameen}>
                    {g.ParentLocationNameen}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-bold mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <option value="">All Brands</option>
                {((filterDataRaw as any)?.Brands || []).map((b: any) => (
                  <option key={b.ID} value={b.BrandNameen}>
                    {b.BrandNameen}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold mb-1">Price Range ($)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/2 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
