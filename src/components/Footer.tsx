"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-[#121924] text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Brand Info & Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <span className="text-2xl font-black text-white tracking-tight flex items-center">
                <span className="text-emerald-400 font-extrabold text-3xl">iQ</span>
                <span className="ml-1">CARS</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1 inline-block"></span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The Largest Online Car Marketplace in Iraq. Connecting millions of car buyers,
              sellers, and certified showrooms across all Iraqi governorates.
            </p>
            <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <Link href="/search?condition=New" className="hover:text-emerald-400 transition">
                {t("newCars")}
              </Link>
              <Link href="/search?condition=Used" className="hover:text-emerald-400 transition">
                {t("usedCars")}
              </Link>
              <Link href="/guide" className="hover:text-emerald-400 transition">
                {t("guide")}
              </Link>
              <Link href="/compare-cars" className="hover:text-emerald-400 transition">
                {t("compare")}
              </Link>
              <Link href="/ev-map" className="hover:text-emerald-400 transition">
                {t("evMap")}
              </Link>
              <Link href="/news" className="hover:text-emerald-400 transition">
                {t("news")}
              </Link>
              <Link href="/about" className="hover:text-emerald-400 transition">
                {t("aboutUs")}
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide">{t("contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:6896"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-emerald-400 transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Hotline</div>
                    <span className="font-semibold text-white">6896</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@iqcars.net"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-emerald-400 transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium">info@iqcars.net</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-400 pt-1">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Blue Tower, 4th floor, Office 407, Baghdad, Iraq</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Italian City 1, Building 130 Erbil, Iraq</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide">{t("followUs")}</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="https://www.facebook.com/IQCarsApp"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <span>Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/iqcars.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@iqcars.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <span>TikTok</span>
              </a>
              <a
                href="https://www.threads.com/@iqcars.app"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <span>Threads</span>
              </a>
              <a
                href="https://www.linkedin.com/company/iq-cars"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <span>LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/IQCarsApp"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition"
              >
                <span>X / Twitter</span>
              </a>
            </div>
          </div>

          {/* App Downloads */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide">{t("getTheApp")}</h3>
            <p className="text-xs text-gray-400">
              Download the official iQ Cars app for iOS and Android.
            </p>
            <div className="space-y-2">
              <a
                href="https://apps.apple.com/us/app/id1534713494"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-2 bg-white/5 hover:bg-white/10 border border-gray-700 rounded-lg text-white transition"
              >
                <div className="text-left rtl:text-right">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("downloadOn")}</div>
                  <div className="text-xs font-bold">{t("appStore")}</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.redfoxpro.iqcars"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-2 bg-white/5 hover:bg-white/10 border border-gray-700 rounded-lg text-white transition"
              >
                <div className="text-left rtl:text-right">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("getItOn")}</div>
                  <div className="text-xs font-bold">{t("googlePlay")}</div>
                </div>
              </a>
              <a
                href="https://appgallery.huawei.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-3 py-2 bg-white/5 hover:bg-white/10 border border-gray-700 rounded-lg text-white transition"
              >
                <div className="text-left rtl:text-right">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider">{t("exploreItOn")}</div>
                  <div className="text-xs font-bold">{t("appGallery")}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition">
              {t("privacyPolicy")}
            </Link>
            <Link href="/term-and-conditions" className="hover:text-gray-300 transition">
              {t("termsCondition")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
