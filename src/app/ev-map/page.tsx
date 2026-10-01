"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import evStationsRaw from "@/data/evStations.json";
import { EVStation } from "@/lib/types";
import {
  Zap,
  MapPin,
  Clock,
  Navigation,
  Phone,
  CheckCircle,
  Filter,
  Sparkles,
  Info,
} from "lucide-react";

export default function EVMapPage() {
  const { lang, t } = useApp();
  const stations = evStationsRaw as EVStation[];

  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedStation, setSelectedStation] = useState<EVStation>(stations[0]);

  const filteredStations = stations.filter((s) => {
    if (selectedCity !== "All" && s.city !== selectedCity) return false;
    return true;
  });

  const getName = (s: EVStation) => {
    if (lang === "ar") return s.nameAr || s.name;
    if (lang === "ku") return s.nameKu || s.name;
    return s.name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-cyan-500" />
          <span>Electric Mobility Iraq</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("evMapTitle")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
          {t("evMapSubtitle")}
        </p>
      </div>

      {/* City Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {["All", "Baghdad", "Erbil", "Sulaymaniyah", "Basra", "Duhok"].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCity(c)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              selectedCity === c
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                : "bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400"
            }`}
          >
            {c === "All" ? t("allIraq") : c}
          </button>
        ))}
      </div>

      {/* Main Grid: Interactive Map Visualizer + Stations List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-2 bg-[#162232] rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          {/* Map Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{filteredStations.length} Active Stations Online</span>
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Fast Charging Network (DC & AC)
            </div>
          </div>

          {/* Stylized Iraq Map Layout Representation */}
          <div className="relative w-full h-80 my-4 flex items-center justify-center">
            {/* Ambient Map Contours */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <svg viewBox="0 0 500 500" className="w-full h-full stroke-cyan-500 fill-none" strokeWidth="2">
                <path d="M 120 80 Q 200 40 320 60 Q 420 120 440 220 Q 400 350 360 420 Q 250 460 180 400 Q 100 300 80 200 Z" />
                <path d="M 200 100 Q 280 200 350 400" strokeDasharray="4 4" />
                <circle cx="250" cy="240" r="140" strokeDasharray="6 6" />
              </svg>
            </div>

            {/* Interactive Pins on Map */}
            {filteredStations.map((st) => {
              const isSelected = selectedStation.id === st.id;
              // Map simulated coordinates onto container
              const topPercent =
                st.city === "Duhok"
                  ? "18%"
                  : st.city === "Erbil"
                  ? "26%"
                  : st.city === "Sulaymaniyah"
                  ? "34%"
                  : st.city === "Baghdad"
                  ? "55%"
                  : "82%";
              const leftPercent =
                st.city === "Duhok"
                  ? "32%"
                  : st.city === "Erbil"
                  ? "46%"
                  : st.city === "Sulaymaniyah"
                  ? "62%"
                  : st.city === "Baghdad"
                  ? "50%"
                  : "74%";

              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  style={{ top: topPercent, left: leftPercent }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                    isSelected ? "scale-125 z-30" : "hover:scale-110"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition ${
                      isSelected
                        ? "bg-cyan-500 text-white ring-4 ring-cyan-500/40"
                        : "bg-[#1f2e42] text-cyan-400 border border-cyan-500/50 hover:bg-cyan-600 hover:text-white"
                    }`}
                  >
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-none">
                    {st.name} ({st.powerKw} kW)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Station Banner inside Map */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold uppercase">
                  {selectedStation.status}
                </span>
                <span className="text-cyan-400 font-bold text-xs">
                  {selectedStation.powerKw} kW Ultra-Fast Charger
                </span>
              </div>
              <h3 className="font-bold text-base mt-1">{getName(selectedStation)}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{selectedStation.address}</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedStation.lat},${selectedStation.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t("directions")}</span>
              </a>
              <a
                href={`tel:${selectedStation.phone}`}
                className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
                title="Call station"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stations List Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="font-bold">Available Hubs</span>
            <span>{filteredStations.length} hubs found</span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredStations.map((st) => {
              const isSelected = selectedStation.id === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white dark:bg-[#1a2536] border-cyan-500 shadow-md ring-2 ring-cyan-500/20"
                      : "bg-white dark:bg-[#1a2536] border-gray-200 dark:border-gray-800 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{st.powerKw} kW</span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span>{st.portsCount} Ports</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mt-1">
                        {getName(st)}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                      {st.status}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="line-clamp-1">{st.address}</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{st.hours}</span>
                    </div>
                    <div className="font-semibold text-gray-700 dark:text-gray-300">
                      {st.fee}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
