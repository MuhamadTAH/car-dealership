"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 min-h-screen space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-500 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Terms and Conditions</h1>
        <p className="text-xs text-gray-400">Effective: October 2026</p>
      </div>

      <div className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">1. User Agreement</h2>
          <p>
            By accessing iQ Cars website or mobile applications, you agree to comply with all applicable laws in the Republic of Iraq and Kurdistan Regional Government regarding automotive commerce and consumer safety.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">2. Vehicle Standards & Inspection</h2>
          <p>
            All vehicles listed in our showroom undergo rigorous 100% technical, mechanical, chassis, and electronic diagnostic inspections. Genuine mileage, accident history, and title documentation are verified before being presented to clients.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">3. Dealership Purchases & Financing</h2>
          <p>
            Vehicle purchases, official plate and title registration (Muror), manufacturer warranties, and Qist installment contracts are executed directly through authorized dealership representatives across our official showroom branches in Baghdad, Erbil, Sulaymaniyah, Basra, and Duhok.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">4. Governing Law</h2>
          <p>
            These terms are governed by the commercial laws of Iraq under the legal entity Al Kindi Company for Digital Marketing PJSC.
          </p>
        </section>
      </div>
    </div>
  );
}
