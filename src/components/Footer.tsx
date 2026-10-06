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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
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
              Official Authorized Automotive Dealership in Iraq. Certified premium vehicle sales,
              comprehensive technical inspections, manufacturer warranty, and flexible Qist financing.
            </p>
            <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <Link href="/search?condition=New" className="hover:text-emerald-400 transition">
                {t("newCars")}
              </Link>
              <Link href="/search?condition=Used" className="hover:text-emerald-400 transition">
                {t("usedCars")}
              </Link>
              <Link href="/compare-cars" className="hover:text-emerald-400 transition">
                {t("compare")}
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
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/IQCarsApp"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#1877F2] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/iqcars.app"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@iqcars.app"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                title="TikTok"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-sm border border-transparent hover:border-gray-700"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.34 6.34 0 0 0 1.87-4.49V8.8a8.28 8.28 0 0 0 4.9 1.62V6.98c-.34-.07-.68-.17-1-.29z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com/IQCarsApp"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                title="X (Twitter)"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-black text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-sm border border-transparent hover:border-gray-700"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/iq-cars"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#0A66C2] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF0000] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
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
