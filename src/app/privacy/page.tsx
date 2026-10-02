"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Privacy</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-gray-400">Last updated: October 2026</p>
      </div>

      <div className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">1. Information We Collect</h2>
          <p>
            When you register, sell a car, or contact sellers on iQ Cars, we collect information including your mobile phone number, vehicle specifications, images, and approximate location within Iraqi governorates.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">2. How We Use Information</h2>
          <p>
            We use your data to facilitate vehicle buying and selling, verify seller authenticity via SMS one-time passwords (+964), connect buyers with dealerships, prevent fraudulent duplicate vehicle listings, and enhance marketplace search relevance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">3. Phone Number Privacy</h2>
          <p>
            Official dealership phone numbers are directly accessible to prospective car buyers. We do not sell or rent contact phone numbers to third-party telemarketers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">4. Contacting Data Protection</h2>
          <p>
            For data inquiries or removal requests, please contact our privacy compliance team at <span className="text-emerald-500 font-semibold">info@iqcars.net</span> or call our Iraqi customer hotline at <span className="text-emerald-500 font-semibold">6896</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
