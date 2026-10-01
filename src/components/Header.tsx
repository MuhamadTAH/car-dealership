"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Car,
  Globe,
  PlusCircle,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LogOut,
  SlidersHorizontal,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const {
    lang,
    setLang,
    currency,
    setCurrency,
    favorites,
    user,
    openAuthModal,
    logout,
    compareList,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { href: "/search?condition=New", label: t("newCars") },
    { href: "/search?condition=Used", label: t("usedCars") },
    { href: "/guide", label: t("guide") },
    {
      href: "/compare-cars",
      label: t("compare"),
      badge: compareList.length > 0 ? compareList.length : null,
    },
    { href: "/ev-map", label: t("evMap"), isNew: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#16202e] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              {/* iQ Cars Official Logo */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white flex items-center">
                  <span className="text-emerald-400 font-extrabold text-3xl">iQ</span>
                  <span className="ml-1">CARS</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 ml-1 inline-block animate-pulse"></span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href.includes("condition=") && pathname.includes("/search"));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-emerald-400 bg-white/10"
                        : "text-gray-200 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isNew && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500 text-white tracking-wider">
                        New
                      </span>
                    )}
                    {link.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-500 text-white">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {/* Sell Car Button */}
            <Link
              href="/sell-car"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t("sell")}</span>
            </Link>

            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setCurrencyMenuOpen(!currencyMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-gray-600 hover:border-gray-400 bg-white/5 text-gray-200 hover:text-white transition"
              >
                <span>{currency === "USD" ? "$ USD" : "د.ع IQD"}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              {currencyMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-28 bg-[#1e2a3b] border border-gray-700 rounded-lg shadow-xl py-1 z-50"
                  onClick={() => setCurrencyMenuOpen(false)}
                >
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`w-full text-left rtl:text-right px-3 py-1.5 text-xs hover:bg-white/10 ${
                      currency === "USD" ? "text-emerald-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    $ USD Dollar
                  </button>
                  <button
                    onClick={() => setCurrency("IQD")}
                    className={`w-full text-left rtl:text-right px-3 py-1.5 text-xs hover:bg-white/10 ${
                      currency === "IQD" ? "text-emerald-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    د.ع Iraqi Dinar
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md border border-gray-600 hover:border-gray-400 bg-white/5 text-gray-200 hover:text-white transition"
              >
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span>{lang === "en" ? "EN" : lang === "ar" ? "عربي" : "کوردی"}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              {langMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-[#1e2a3b] border border-gray-700 rounded-lg shadow-xl py-1 z-50"
                  onClick={() => setLangMenuOpen(false)}
                >
                  <button
                    onClick={() => setLang("en")}
                    className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 ${
                      lang === "en" ? "text-emerald-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    <span>English</span>
                    <span>EN</span>
                  </button>
                  <button
                    onClick={() => setLang("ar")}
                    className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 ${
                      lang === "ar" ? "text-emerald-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    <span>العربية</span>
                    <span>عربي</span>
                  </button>
                  <button
                    onClick={() => setLang("ku")}
                    className={`w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 ${
                      lang === "ku" ? "text-emerald-400 font-bold" : "text-gray-300"
                    }`}
                  >
                    <span>کوردی</span>
                    <span>KU</span>
                  </button>
                </div>
              )}
            </div>

            {/* Saved Favorites Icon */}
            <Link
              href="/favorites"
              className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition"
              title={t("myFavorites")}
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Auth Button or User Badge */}
            {user?.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-xs font-medium text-white transition"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                  <span className="font-mono text-gray-200">{user.phone}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-[#1e2a3b] border border-gray-700 rounded-lg shadow-xl py-1 z-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-gray-700 text-xs text-gray-400">
                      {t("signedInAs")}
                      <div className="font-semibold text-white mt-0.5">{user.phone}</div>
                    </div>
                    <Link
                      href="/favorites"
                      className="block px-3 py-2 text-xs text-gray-200 hover:bg-white/10"
                    >
                      {t("myFavorites")} ({favorites.length})
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left rtl:text-right px-3 py-2 text-xs text-rose-400 hover:bg-white/10 flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t("logout")}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500/80 hover:border-emerald-400 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs font-semibold rounded-lg transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t("signInUp")}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : lang === "ar" ? "ku" : "en")}
              className="p-1.5 text-xs font-bold text-gray-200 border border-gray-600 rounded bg-white/5"
            >
              {lang === "en" ? "عربي" : lang === "ar" ? "کوردی" : "EN"}
            </button>
            <Link
              href="/favorites"
              className="relative p-1.5 text-gray-300 hover:text-white"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a2536] border-t border-gray-700 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-gray-700">
            <Link
              href="/sell-car"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t("sell")}</span>
            </Link>
            {user?.isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-gray-700 text-rose-300 font-semibold rounded-lg text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("logout")}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  openAuthModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 border border-emerald-500 text-emerald-400 font-semibold rounded-lg text-sm"
              >
                <User className="w-4 h-4" />
                <span>{t("signInUp")}</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-base font-medium text-gray-200 hover:bg-white/5 rounded-md"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="px-2 py-0.5 text-xs font-bold uppercase rounded-full bg-emerald-500 text-white">
                    New
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
            <span>Currency:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency("USD")}
                className={`px-2 py-1 rounded ${
                  currency === "USD" ? "bg-emerald-600 text-white font-bold" : "bg-gray-700"
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency("IQD")}
                className={`px-2 py-1 rounded ${
                  currency === "IQD" ? "bg-emerald-600 text-white font-bold" : "bg-gray-700"
                }`}
              >
                د.ع IQD
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
