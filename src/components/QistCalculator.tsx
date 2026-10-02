"use client";

import React, { useState, useMemo } from "react";
import { Car } from "@/lib/types";
import { useApp } from "@/context/AppContext";
import { formatPrice } from "@/lib/utils";
import { getCarQist, calculateQistDetails } from "@/lib/qist";
import {
  Coins,
  Calculator,
  Calendar,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Percent,
  Clock,
  ArrowRight,
} from "lucide-react";

interface QistCalculatorProps {
  car?: Car;
  allCars?: Car[];
  onSelectCar?: (car: Car) => void;
}

export default function QistCalculator({
  car,
  allCars = [],
  onSelectCar,
}: QistCalculatorProps) {
  const { lang, currency, exchangeRate, t } = useApp();

  // If a list of cars is provided and no car is selected yet, pick the first Qist-eligible car
  const qistEligibleCars = useMemo(() => {
    return allCars.filter((c) => Boolean(getCarQist(c.ID)));
  }, [allCars]);

  const [selectedCar, setSelectedCar] = useState<Car | null>(car || qistEligibleCars[0] || null);

  // Sync if car prop changes
  React.useEffect(() => {
    if (car) setSelectedCar(car);
  }, [car]);

  const activeCar = car || selectedCar;
  const qistPlan = activeCar ? getCarQist(activeCar.ID) : null;

  // Term and Down payment state
  const allowedMonths = qistPlan?.allowedMonths || [12];
  const minDownPercent = qistPlan?.minDownPaymentPercent || 20;

  const [selectedMonths, setSelectedMonths] = useState<number>(allowedMonths[allowedMonths.length - 1] || 12);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(minDownPercent);

  // Update selection if activeCar changes
  React.useEffect(() => {
    if (qistPlan) {
      setSelectedMonths(qistPlan.allowedMonths[qistPlan.allowedMonths.length - 1] || 12);
      setDownPaymentPercent(qistPlan.minDownPaymentPercent);
    }
  }, [activeCar?.ID]);

  const brandName = activeCar
    ? lang === "ar"
      ? activeCar.Brand?.BrandNamear || activeCar.Brand?.BrandNameen
      : lang === "ku"
      ? activeCar.Brand?.BrandNameku || activeCar.Brand?.BrandNameen
      : activeCar.Brand?.BrandNameen
    : "Vehicle";

  const modelName = activeCar
    ? lang === "ar"
      ? activeCar.Model?.ModelNamear || activeCar.Model?.ModelNameen
      : lang === "ku"
      ? activeCar.Model?.ModelNameku || activeCar.Model?.ModelNameen
      : activeCar.Model?.ModelNameen
    : "";

  const carYear = activeCar?.Year?.YearName || "2024";
  const fullCarTitle = activeCar ? `${brandName} ${modelName} ${carYear}` : "";

  // Perform calculation
  const carPriceUsd = activeCar ? activeCar.Price : 25000;
  const calc = useMemo(() => {
    return calculateQistDetails(carPriceUsd, downPaymentPercent, selectedMonths, exchangeRate);
  }, [carPriceUsd, downPaymentPercent, selectedMonths, exchangeRate]);

  // Pre-filled WhatsApp application message
  const downPaymentDisplay = formatPrice(calc.downPaymentUsd, "USD");
  const monthlyDisplay = formatPrice(calc.monthlyUsd, "USD");
  const qistInquiryMessage = activeCar
    ? lang === "ar"
      ? `مرحباً، أود التقديم على نظام الأقساط (قسط) لسيارة ${fullCarTitle} (المعرف: #${activeCar.ID}) بدفعة أولى ${downPaymentDisplay} على مدة ${selectedMonths} شهراً (القسط المتوقع: ${monthlyDisplay}/شهرياً). ما هي المستمسكات المطلوبة؟`
      : lang === "ku"
      ? `سڵاو، دەمەوێت داواکاری قیست پێشکەش بکەم بۆ ئۆتۆمبێلی ${fullCarTitle} (ژمارە: #${activeCar.ID}) بە پێشەکی ${downPaymentDisplay} بۆ ماوەی ${selectedMonths} مانگ (قیستی مانگانە: ${monthlyDisplay}). مەرج و بەڵگەنامەکان چین؟`
      : `Hello, I would like to apply for Qist on the ${fullCarTitle} (ID: #${activeCar.ID}) with a down payment of ${downPaymentDisplay} over ${selectedMonths} months (Estimated monthly: ${monthlyDisplay}). What documents are required?`
    : "";

  const cleanPhone = (activeCar?.PhoneNumber || "+9647501002030").replace(/[^\d+]/g, "").replace("+", "") || "9647501002030";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(qistInquiryMessage)}`;

  const todayFormatted = new Date().toLocaleDateString(lang === "ar" ? "ar-IQ" : lang === "ku" ? "ckb-IQ" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="my-12 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#16202e] border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Coins className="w-3.5 h-3.5" />
              <span>{t("qistTitle")} • قیست</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {t("qistTitle")} (قیست / قسط)
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {qistPlan ? t("qistAvailableDesc") : t("qistSubtitle") || "Estimate monthly payments with transparent daily exchange rates."}
            </p>
          </div>

          {/* Real-time Exchange Rate Widget */}
          <div className="flex-shrink-0 bg-gray-50 dark:bg-[#1f2b3e] rounded-2xl p-3.5 border border-gray-200 dark:border-gray-700/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  $1 USD = {exchangeRate.toLocaleString()} IQD
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[10px] text-gray-400 block font-mono">
                {t("dailyExchangeRate")} • {todayFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* If no car has Qist or activeCar does not support Qist */}
        {activeCar && !qistPlan ? (
          <div className="p-8 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t("cashOnly")}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              {t("qistNotAvailable")}
            </p>
            <p className="text-xs text-gray-500">
              Only select certified models are eligible for our direct dealership installment program.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Car Selection & Adjustments (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Optional: Car Selector (if in standalone homepage mode) */}
              {!car && qistEligibleCars.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Select Qist-Eligible Vehicle
                  </label>
                  <select
                    value={activeCar?.ID || ""}
                    onChange={(e) => {
                      const found = qistEligibleCars.find((c) => String(c.ID) === e.target.value);
                      if (found) setSelectedCar(found);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1a2536] text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {qistEligibleCars.map((c) => (
                      <option key={c.ID} value={c.ID}>
                        {c.Brand?.BrandNameen} {c.Model?.ModelNameen} {c.Year?.YearName} — {formatPrice(c.Price, "USD")}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Active Vehicle Summary Banner */}
              {activeCar && (
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#1f2b3e] border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
                      {fullCarTitle}
                    </h3>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      {formatPrice(calc.priceUsd, "USD")} ≈ {calc.priceIqd.toLocaleString()} د.ع
                    </span>
                  </div>
                  <div className="text-right rtl:text-left">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-white uppercase tracking-wider">
                      {t("qistBadge")}
                    </span>
                  </div>
                </div>
              )}

              {/* Down Payment Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-amber-500" />
                    <span>{t("downPayment")} ({downPaymentPercent}%)</span>
                  </label>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatPrice(calc.downPaymentUsd, "USD")} ({calc.downPaymentIqd.toLocaleString()} د.ع)
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[20, 25, 30, 50].map((pct) => {
                    const isDisabled = pct < minDownPercent;
                    const isSelected = downPaymentPercent === pct;
                    return (
                      <button
                        key={pct}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => setDownPaymentPercent(pct)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
                          isSelected
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                            : isDisabled
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed opacity-50"
                            : "bg-gray-50 dark:bg-[#1f2b3e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-amber-400"
                        }`}
                      >
                        <span>{pct}%</span>
                        <span className="text-[10px] font-normal opacity-80">
                          ${((carPriceUsd * pct) / 100).toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {minDownPercent > 20 && (
                  <span className="text-[11px] text-gray-500 block">
                    * Minimum required down payment for this vehicle is {minDownPercent}%.
                  </span>
                )}
              </div>

              {/* Allowed Duration / Months Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{t("monthsDuration")} ({selectedMonths} {t("months")})</span>
                  </label>
                  <span className="text-xs text-gray-500">
                    Max allowed: {allowedMonths[allowedMonths.length - 1]} {t("months")}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {allowedMonths.map((m) => {
                    const isSelected = selectedMonths === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setSelectedMonths(m)}
                        className={`py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                            : "bg-gray-50 dark:bg-[#1f2b3e] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-amber-400"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{m} {t("months")}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Calculation Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-amber-50/70 to-orange-50/50 dark:from-[#1e2a3c] dark:to-[#172232] rounded-3xl p-6 sm:p-8 border border-amber-200/80 dark:border-amber-900/40 shadow-lg space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider">
                  {t("monthlyPayment")}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                  ${calc.monthlyUsd.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">/ mo</span>
                </div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  ≈ {calc.monthlyIqd.toLocaleString()} د.ع / {lang === "ar" ? "شهرياً" : lang === "ku" ? "مانگانە" : "month"}
                </div>
              </div>

              {/* Financial Breakdown Table */}
              <div className="space-y-3 pt-4 border-t border-amber-200/60 dark:border-gray-700 text-xs">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Vehicle Total Price:</span>
                  <span className="font-bold text-gray-900 dark:text-white font-mono">
                    ${calc.priceUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Down Payment ({calc.downPaymentPercent}%):</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400 font-mono">
                    -${calc.downPaymentUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Financed Balance:</span>
                  <span className="font-bold text-gray-900 dark:text-white font-mono">
                    ${calc.financedAmountUsd.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                  <span>Exchange Rate Applied:</span>
                  <span className="font-mono text-gray-700 dark:text-gray-300">
                    1 USD = {exchangeRate} IQD
                  </span>
                </div>
              </div>

              {/* Apply via WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{t("applyQistWhatsApp")}</span>
                </a>
                <span className="text-[10px] text-gray-400 text-center block mt-2">
                  Pre-fills your exact Qist calculation details ready to send on WhatsApp
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
