"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import showroomsData from "@/data/showrooms.json";
import carsDataRaw from "@/data/cars.json";
import { Showroom, Car } from "@/lib/types";
import CarCard from "@/components/CarCard";
import {
  Building2,
  MapPin,
  Car as CarIcon,
  Phone,
  MessageCircle,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function ShowroomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { lang, t } = useApp();
  const showrooms = showroomsData as Showroom[];
  const allCars = carsDataRaw as Car[];

  const showroom =
    showrooms.find(
      (s) =>
        s.slug.toLowerCase() === resolvedParams.slug.toLowerCase() ||
        s.id.toLowerCase() === resolvedParams.slug.toLowerCase()
    ) || showrooms[0];

  const [activeTab, setActiveTab] = useState<"inventory" | "about">("inventory");

  // Showroom cars (filter by brand or city)
  const showroomCars = allCars
    .filter((c) => c.Brand?.BrandNameen?.toLowerCase() === showroom.brand.toLowerCase())
    .slice(0, 16);

  const finalCars = showroomCars.length > 0 ? showroomCars : allCars.slice(0, 12);

  const getName = () => {
    if (lang === "ar") return showroom.nameAr || showroom.name;
    if (lang === "ku") return showroom.nameKu || showroom.name;
    return showroom.name;
  };

  const getCity = () => {
    if (lang === "ar") return showroom.cityAr || showroom.city;
    if (lang === "ku") return showroom.cityKu || showroom.city;
    return showroom.city;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Showroom Header Banner Card */}
      <div className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-md mb-8">
        {/* Cover Photo */}
        <div className="relative h-48 sm:h-64 bg-gray-900 overflow-hidden">
          <img
            src={showroom.cover}
            alt={showroom.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Badge */}
          <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Award className="w-4 h-4" />
            <span>{showroom.badge}</span>
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            {/* Logo + Titles */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white dark:bg-[#1e2a3b] p-2 shadow-xl border-2 border-white dark:border-gray-700 flex-shrink-0 overflow-hidden">
                <img
                  src={showroom.logo}
                  alt={showroom.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  {getName()}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{getCity()}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CarIcon className="w-4 h-4" />
                    <span>{finalCars.length} Available Vehicles</span>
                  </div>
                  <span>•</span>
                  <span>Authorized for {showroom.brand}</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href={`tel:${showroom.phone}`}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom</span>
              </a>
              <a
                href={`https://wa.me/${showroom.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setActiveTab("inventory")}
              className={`pb-2 text-sm font-bold border-b-2 transition ${
                activeTab === "inventory"
                  ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              Cars for Sale ({finalCars.length})
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-2 text-sm font-bold border-b-2 transition ${
                activeTab === "about"
                  ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              About Dealership
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "inventory" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {finalCars.map((car) => (
              <CarCard key={car.ID} car={car} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6 max-w-3xl">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              About {getName()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {showroom.about}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Address</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  {showroom.address}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Working Hours</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  Saturday - Thursday: 09:00 AM - 08:00 PM (Friday Closed)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Certification</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  Official Manufacturer Warranty & Certified Service Bay Facilities
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
