"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import locationsData from "@/data/locations.json";
import filterDataRaw from "@/data/filterData.json";
import {
  PlusCircle,
  Smartphone,
  ShieldCheck,
  Camera,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Car,
  Sparkles,
} from "lucide-react";

export default function SellCarPage() {
  const { lang, currency, user, openAuthModal, t } = useApp();

  // Wizard state
  const [activeTab, setActiveTab] = useState<"guide" | "wizard">("wizard");
  const [wizardStep, setWizardStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2024");
  const [mileage, setMileage] = useState("");
  const [condition, setCondition] = useState("Used");
  const [city, setCity] = useState("Baghdad");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState(user?.phone || "");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const stepsGuide = [
    {
      step: 1,
      title: "Download iQ Cars App",
      desc: "Get the official mobile app to take advantage of AI vehicle camera scanning and real-time push notifications.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step1.png",
    },
    {
      step: 2,
      title: "Register with your mobile number",
      desc: "Sign in using your Iraqi phone number (+964) with instant SMS verification to secure your listing account.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step2.png",
    },
    {
      step: 3,
      title: "List your car for sale with AI empowered tool",
      desc: "Simply photograph your vehicle. Our computer vision AI automatically detects the brand, year, color, and trim.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step3.png",
    },
    {
      step: 4,
      title: "Check if everything is OK and confirm",
      desc: "Review your technical specifications, governorate location, asking price, and contact preferences.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step4.png",
    },
    {
      step: 5,
      title: "Select the package for your listing & pay",
      desc: "Choose from standard free ads or boost your visibility with VIP Featured placement reaching 500,000+ buyers.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step5.png",
    },
    {
      step: 6,
      title: "Receive calls and messages",
      desc: "Direct phone calls and WhatsApp messages arrive straight to your phone with zero intermediary fees.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step6.png",
    },
    {
      step: 7,
      title: "Meet in a safe space and sign sales agreement",
      desc: "Finalize the vehicle handover and legal traffic transfer (Muror) at official registration offices.",
      img: "https://iqcars-assets.iqcars.io/images/sell-car/en/step7.png",
    },
  ];

  const brands = ((filterDataRaw as any)?.Brands || []).slice(0, 40);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.isLoggedIn && !phone) {
      openAuthModal();
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Fast & Easy Car Selling</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("sellTitle")}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {t("sellStepsSubtitle")}
        </p>

        {/* Tab Toggle */}
        <div className="inline-flex p-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold mt-4">
          <button
            onClick={() => setActiveTab("wizard")}
            className={`px-5 py-2.5 rounded-lg transition ${
              activeTab === "wizard"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            List Online Now
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-5 py-2.5 rounded-lg transition ${
              activeTab === "guide"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            7-Step Selling Guide
          </button>
        </div>
      </div>

      {activeTab === "wizard" ? (
        /* Online Car Listing Wizard */
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10 shadow-lg">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Your Listing is Live!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Congratulations, your <span className="font-bold text-gray-900 dark:text-white">{brand} {model} {year}</span> has been published to 60,000+ car shoppers in Iraq.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link
                  href="/search"
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-500 transition"
                >
                  View in Marketplace
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setWizardStep(1);
                  }}
                  className="px-6 py-2.5 border border-gray-300 dark:border-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  List Another Car
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stepper indicator */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    {wizardStep}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {wizardStep === 1
                      ? "Vehicle Information"
                      : wizardStep === 2
                      ? "Specifications & Location"
                      : "Price & Contact"}
                  </span>
                </div>
                <span className="text-xs font-semibold text-gray-400">Step {wizardStep} of 3</span>
              </div>

              {wizardStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Brand *
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select Brand</option>
                      {brands.map((b: any) => (
                        <option key={b.ID} value={b.BrandNameen}>
                          {b.BrandNameen}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Model *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Land Cruiser, Yukon, Camry, Sportage"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        Year *
                      </label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {[2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2010].map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        Mileage (km) *
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 45000"
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        required
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!brand || !model || !mileage}
                    onClick={() => setWizardStep(2)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Next: Details & Location</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        Condition
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                      >
                        <option value="Used">Used</option>
                        <option value="New">Brand New</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        Governorate
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                      >
                        {(locationsData as any[]).map((g) => (
                          <option key={g.ID} value={g.ParentLocationNameen}>
                            {g.ParentLocationNameen}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Seller Description & Features
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Clean title, leather seats, sunroof, clean maintenance history..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="w-1/3 py-3.5 border border-gray-300 dark:border-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="w-2/3 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
                    >
                      <span>Next: Price & Publish</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Asking Price ($ USD) *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 font-bold">
                        $
                      </div>
                      <input
                        type="number"
                        placeholder="e.g. 24500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full pl-8 pr-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+964 750 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/60 text-xs space-y-1">
                    <div className="font-bold text-gray-900 dark:text-white">Listing Summary:</div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {brand} {model} {year} • {city} • {condition} • ${Number(price || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="w-1/3 py-3.5 border border-gray-300 dark:border-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Publish Vehicle Now</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      ) : (
        /* 7 Step Visual Guide from Live iQ Cars */
        <div className="max-w-4xl mx-auto space-y-12">
          {stepsGuide.map((item) => (
            <div
              key={item.step}
              className="bg-white dark:bg-[#1a2536] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex-1 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-black">
                  <span>STEP</span>
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

                {item.step === 1 && (
                  <div className="flex gap-2 pt-2">
                    <a
                      href="https://apps.apple.com/us/app/id1534713494"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-black text-white text-xs font-bold rounded-lg shadow"
                    >
                      App Store
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.redfoxpro.iqcars"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Google Play
                    </a>
                  </div>
                )}
              </div>

              <div className="w-full md:w-72 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
