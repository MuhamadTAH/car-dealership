"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

export default function FaqSection() {
  const { lang, t } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqs = [
    {
      qEn: "How does the Qist (Installment) program work and what documents are required?",
      qAr: "كيف يعمل نظام الأقساط (قسط) وما هي المستمسكات والشروط المطلوبة؟",
      qKu: "سیستەمی قیست چۆن کاردەکات و چ بەڵگەنامە و مەرجێک پێویستە؟",
      aEn: "Our direct dealership Qist program allows eligible vehicles to be financed over 12, 24, or 36 months with down payments starting from 20% to 30%. Required documents include an Iraqi National Unified Card (البطاقة الوطنية), residential card, and proof of income or authorized guarantor.",
      aAr: "يتيح برنامج تمويل الوكالة المباشر تقسيط السيارات المؤهلة لمدة 12 أو 24 أو 36 شهراً بدفعة أولى تبدأ من 20% إلى 30%. المستمسكات المطلوبة هي البطاقة الوطنية الموحدة، بطاقة السكن، وتأييد راتب أو كفيل معتمد.",
      aKu: "پرۆگرامی قیستی ڕاستەوخۆی بریکاری فەرمی ڕێگە دەدات ئۆتۆمبێلە دیاریکراوەکان بۆ ماوەی 12، 24، یان 36 مانگ قیست بکرێن بە پێشەکی لە 20% بۆ 30%. بەڵگەنامە پێویستەکان بریتین لە کارتی نیشتمانی، کارتی زانیاری، و پشتگیری مووچە یان کەفیلی باوەڕپێکراو.",
    },
    {
      qEn: "Can I pay in Iraqi Dinars (IQD) instead of US Dollars (USD)?",
      qAr: "هل يمكنني الدفع بالدينار العراقي بدلاً من الدولار الأمريكي؟",
      qKu: "ئایا دەتوانم بە دیناری عێراقی پارە بدەم لەبری دۆلار؟",
      aEn: "Yes! While vehicle prices are pegged to USD, we accept full and partial payments in Iraqi Dinars (IQD) calculated at the transparent daily market exchange rate on the day of payment.",
      aAr: "نعم بكل تأكيد! على الرغم من تسعير السيارات بالدولار الأمريكي، فإننا نقبل الدفع بالدينار العراقي (IQD) وفق سعر الصرف اليومي المباشر وبشفافية تامة عند تثبيت العقد.",
      aKu: "بەڵێ بێگومان! هەرچەندە نرخەکان بە دۆلار دیاریکراون، بەڵام دەتوانیت بە دیناری عێراقی پارە بدەیت بەپێی نرخی ڕۆژانەی بازاڕی دراو بە شەفافی تەواو لە کاتی گرێبەستدا.",
    },
    {
      qEn: "How does vehicle plate registration and transfer work across governorates?",
      qAr: "كيف يتم تسجيل وتحويل اللوحات ونقل الملكية بين المحافظات؟",
      qKu: "گواستنەوەی تابلۆ و مەلەفی فەرمی لە نێوان پارێزگاکاندا چۆن ڕایی دەکرێت؟",
      aEn: "We manage all official paperwork through traffic directorates for Baghdad, Erbil, Sulaymaniyah, Basra, and all Iraqi governorates, ensuring you receive a 100% legally clean title and transfer in your name.",
      aAr: "نقوم بإنجاز كافة الإجراءات القانونية عبر مديريات المرور العامة لمحافظات بغداد، أربيل، السليمانية، البصرة وكافة المحافظات لضمان نقل الملكية باسمك بصورة قانونية ورسمية كاملة.",
      aKu: "هەموو مامەڵە فەرمییەکان لە ڕێگەی بەڕێوەبەرایەتییەکانی هاتووچۆ بۆ هەولێر، سلێمانی، دهۆک، بەغداد و بەسرە ڕایی دەکەین تا دڵنیابینەوە لە گواستنەوەی فەرمی بە ناوی خۆتەوە بە شێوەیەکی 100% یاسایی.",
    },
    {
      qEn: "Can I inspect the vehicle in person or bring my own mechanic?",
      qAr: "هل يمكنني فحص السيارة بنفسي أو إحضار ميكانيكي خاص بي؟",
      qKu: "ئایا دەتوانم خۆم ئۆتۆمبێلەکە بپشکنم یان وەستای خۆم بهێنم؟",
      aEn: "Absolutely. We encourage prospective buyers to inspect any vehicle in person at our showroom. Additionally, every vehicle includes a verified multi-point chassis, engine, and paint inspection report.",
      aAr: "بالتأكيد. نرحب بحضورك لمعاينة وفحص أي سيارة في صالة العرض مع الفني أو الميكانيكي الخاص بك. كما ترفق كل سيارة بتقرير فحص فني شامل يوضح حالة الشاصي والمحرك والبدي.",
      aKu: "بێگومان. بەخێرهاتنت دەکەین بۆ سەردانی پێشانگا و پشکنینی ئۆتۆمبێل لەگەڵ وەستای تایبەتی خۆت. هەروەها هەموو ئۆتۆمبێلەکان خاوەنی ڕاپۆرتی پشکنینی فەرمین بۆ شاسی، مەکینە و بۆیاغ.",
    },
    {
      qEn: "Do you offer inter-city delivery to my home address in Iraq?",
      qAr: "هل تتوفر خدمة توصيل وشحن السيارة إلى باب المنزل في محافظات العراق؟",
      qKu: "ئایا خزمەتگوزاری گواستنەوە و گەیاندنی ئۆتۆمبێل بۆ پارێزگاکانی تر بەردەستە؟",
      aEn: "Yes, we provide secure enclosed transporter shipping directly to your doorstep in Baghdad, Basra, Najaf, Karbala, Kirkuk, Duhok, and all other cities across Iraq.",
      aAr: "نعم، نوفر خدمة نقل آمن عبر ناقلات سيارات مخصصة إلى باب منزلك في بغداد، البصرة، النجف، كربلاء، كركوك، دهوك وكافة مدن العراق.",
      aKu: "بەڵێ، خزمەتگوزاری گواستنەوەی پارێزراو دابین دەکەین بۆ بەردەم ماڵەکەت لە بەغداد، بەسرە، کەرکووک، نەجەف، کەربەلا، دهۆک و هەموو شارەکانی عێراق.",
    },
  ];

  return (
    <section className="my-14 max-w-4xl mx-auto px-4">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQ • {lang === "ar" ? "الأسئلة الشائعة" : lang === "ku" ? "پرسیارە باوەکان" : "Help"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          {t("faqTitle")}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          {t("faqSubtitle")}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          const question = lang === "ar" ? f.qAr : lang === "ku" ? f.qKu : f.qEn;
          const answer = lang === "ar" ? f.aAr : lang === "ku" ? f.aKu : f.aEn;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white dark:bg-[#1a2536] border-emerald-500/50 shadow-md"
                  : "bg-gray-50/70 dark:bg-[#16202e] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full py-4 px-6 text-left rtl:text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 dark:text-white"
              >
                <span>{question}</span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/80">
                  {answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions? WhatsApp Card */}
      <div className="mt-8 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
        <div>
          <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
            {lang === "ar"
              ? "هل لديك أسئلة إضافية حول سيارة معينة أو خطة أقساط؟"
              : lang === "ku"
              ? "پرسیاری زیاترت هەیە دەربارەی ئۆتۆمبێلێک یان قیست؟"
              : "Have more questions about a specific car or installment plan?"}
          </h4>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
            {lang === "ar"
              ? "فريق المبيعات جاهز للرد الفوري ومساعدتك في اختيار السيارة الأنسب."
              : lang === "ku"
              ? "تیمی فرۆشتن ئامادەیە بۆ وەڵامدانەوەی خێرا و هاوکاریت."
              : "Our sales advisors are available directly on WhatsApp to assist you."}
          </p>
        </div>

        <a
          href={`https://wa.me/9647501002030?text=${encodeURIComponent(
            lang === "ar"
              ? "مرحباً، لدي استفسار إضافي بخصوص سيارات المعرض ونظام الأقساط."
              : lang === "ku"
              ? "سڵاو، پرسیارێکم هەبوو دەربارەی ئۆتۆمبێلەکان و سیستەمی قیست."
              : "Hello, I have additional questions about vehicles and Qist financing."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>{lang === "ar" ? "تواصل عبر واتساب" : lang === "ku" ? "نامە لە واتسئەپ بنێرە" : "Chat on WhatsApp"}</span>
        </a>
      </div>
    </section>
  );
}
