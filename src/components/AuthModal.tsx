"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Phone, ShieldCheck, ArrowRight } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, t } = useApp();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      setError("Please enter a valid phone number (e.g. 750 123 4567)");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otp.join("");
    if (entered.length < 4) {
      setError("Please enter the 4-digit verification code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(`+964 ${phone}`);
      // Reset
      setStep("phone");
      setPhone("");
      setOtp(["", "", "", ""]);
    }, 500);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1a2536] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 text-gray-900 dark:text-white">
        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            {step === "phone" ? <Phone className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {step === "phone" ? t("verifyPhone") : t("enterOtp")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
            {step === "phone" ? t("authSubtitle") : `${t("otpSubtitle")} +964 ${phone}`}
          </p>
        </div>

        {/* Form */}
        {step === "phone" ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                {t("phoneNumber")}
              </label>
              <div className="flex rounded-xl border border-gray-300 dark:border-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition">
                <div className="flex items-center gap-1.5 px-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700 font-mono text-sm font-semibold select-none">
                  <span>🇮🇶</span>
                  <span>+964</span>
                </div>
                <input
                  type="tel"
                  autoFocus
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="750 123 4567"
                  className="w-full px-3.5 py-3 text-sm bg-transparent outline-none font-mono"
                />
              </div>
              {error && <p className="text-xs text-rose-500 mt-1.5">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{loading ? "Sending..." : t("requestCode")}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-bold bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              ))}
            </div>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              Demo Code: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">1234</span>
            </p>

            {error && <p className="text-xs text-center text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{loading ? "Verifying..." : t("verify")}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-xs text-center text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              Change phone number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
