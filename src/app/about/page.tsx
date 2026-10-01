"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  Building2,
  Users,
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Car,
} from "lucide-react";

export default function AboutPage() {
  const { t } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>About iQ Cars</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          The Largest Online Car Marketplace in Iraq
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          Owned and operated by Al Kindi Company for Digital Marketing PJSC. Connecting millions of automotive enthusiasts, private sellers, and official certified showrooms across all Iraqi governorates.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">60K+</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Active Listings</div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">19</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Governorates Covered</div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-amber-500">150+</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Verified Showrooms</div>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a2536] border border-gray-200 dark:border-gray-800 text-center shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">2M+</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">Monthly Visitors</div>
        </div>
      </div>

      {/* Mission & Story */}
      <div className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 shadow-sm space-y-6">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">Our Mission</h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          iQ Cars was founded with a singular objective: to bring total transparency, security, and digital efficiency to automotive trading in Iraq. Before iQ Cars, car buying relied heavily on physical open markets (Ma&apos;arid) with fragmented pricing and lack of verified inspection histories.
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          Today, whether you are shopping for a brand new luxury Mercedes-Benz in Erbil, a reliable Toyota Land Cruiser in Baghdad, or selling your personal car in Basra, iQ Cars provides instant access, direct verified contact, and advanced pricing tools.
        </p>
      </div>

      {/* Official Headquarters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Baghdad Office</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Blue Tower, 4th floor, Office 407, Al-Harthiya, Baghdad, Iraq
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-gray-800">
            Phone: <span className="font-semibold text-white">6896</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2536] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Erbil Office</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Italian City 1, Building 130, 100 Meter Road, Erbil, Kurdistan Region, Iraq
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-100 dark:border-gray-800">
            Email: <span className="font-semibold text-white">info@iqcars.net</span>
          </div>
        </div>
      </div>
    </div>
  );
}
