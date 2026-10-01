"use client";

import React, { useRef } from "react";
import { Car } from "@/lib/types";
import CarCard from "./CarCard";
import { useApp } from "@/context/AppContext";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

export default function PopularCarsCarousel({ cars }: { cars: Car[] }) {
  const { t } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("popularCars")}
          </h2>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center transition shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center transition shadow-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x"
      >
        {cars.slice(0, 12).map((car) => (
          <div key={car.ID} className="w-[280px] sm:w-[320px] flex-shrink-0 snap-start">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </section>
  );
}
