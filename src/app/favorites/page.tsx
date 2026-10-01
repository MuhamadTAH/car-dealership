"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import carsDataRaw from "@/data/cars.json";
import { Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import { Heart, Trash2, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, t } = useApp();
  const allCars = carsDataRaw as Car[];

  const favoritedCars = allCars.filter((c) => favorites.includes(c.ID));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Saved Inventory</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("myFavorites")} ({favoritedCars.length})
          </h1>
        </div>

        {favoritedCars.length > 0 && (
          <button
            onClick={() => {
              favorites.forEach((id) => toggleFavorite(id));
            }}
            className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {favoritedCars.length === 0 ? (
        <div className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            No Saved Cars Yet
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Click the heart icon on any vehicle card across the marketplace to save it here for quick access and price tracking.
          </p>
          <div className="pt-2">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition"
            >
              <span>Explore Cars</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {favoritedCars.map((car) => (
            <CarCard key={car.ID} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
