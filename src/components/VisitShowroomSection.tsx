"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Sparkles, Building2 } from "lucide-react";

export default function VisitShowroomSection() {
  const { lang, t } = useApp();

  const content = {
    en: {
      badge: "Exclusive Showroom Experience",
      title: "Visit Our Showrooms",
      subtitle: "Experience luxury and certified automotive engineering in person at our flagship locations in Baghdad and Erbil.",
      workingHoursTitle: "Showroom Working Hours",
      satThu: "Saturday – Thursday",
      satThuHours: "9:00 AM – 9:00 PM",
      friday: "Friday",
      fridayHours: "2:00 PM – 9:00 PM",
      baghdadTitle: "Baghdad Flagship Showroom",
      baghdadAddr: "Blue Tower, Al-Harthiya / Exhibition Street, Baghdad, Iraq",
      baghdadFeatures: ["Executive VIP Lounge", "Full Indoor Display Floor", "Dedicated Consultation Bay"],
      erbilTitle: "Erbil Prime Showroom",
      erbilAddr: "Italian City 1, 100m Airport Road / Gulan Street, Erbil, Iraq",
      erbilFeatures: ["Architectural Glass Facade", "Indoor Vehicle Delivery Bay", "VIP Client Hospitality"],
      openMaps: "Open in Google Maps",
      callShowroom: "Call Showroom",
      bookVisit: "Schedule Showroom Appointment",
    },
    ar: {
      badge: "تجربة صالة عرض استثنائية",
      title: "تفضل بزيارة معارضنا الرسمية",
      subtitle: "استمتع بمشاهدة نخبة السيارات المعتمدة والفاخرة عن قرب في صالات عرضنا المجهزة في بغداد وأربيل.",
      workingHoursTitle: "أوقات دوام صالة العرض",
      satThu: "السبت – الخميس",
      satThuHours: "9:00 صباحاً – 9:00 مساءً",
      friday: "الجمعة",
      fridayHours: "2:00 ظهراً – 9:00 مساءً",
      baghdadTitle: "صالة عرض بغداد الرئيسية",
      baghdadAddr: "البرج الأزرق، الحارثية / شارع المعارض، بغداد، العراق",
      baghdadFeatures: ["صالة استقبال كبار الشخصيات VIP", "طابق عرض داخلي متكامل", "استشارات فنية ومبيعات خاصة"],
      erbilTitle: "صالة عرض أربيل الكبرى",
      erbilAddr: "المدينة الإيطالية 1، طريق المطار 100م / شارع كولان، أربيل، العراق",
      erbilFeatures: ["واجهة زجاجية معمارية حديثة", "منطقة تسليم السيارات الرسمية", "ضيافة تنفيذية فاخرة"],
      openMaps: "الاتجاهات على خرائط Google",
      callShowroom: "اتصال بالمعرض",
      bookVisit: "حجز موعد زيارة عبر واتساب",
    },
    ku: {
      badge: "ئەزموونی تایبەتی پێشانگا",
      title: "سەردانی پێشانگا فەرمییەکانمان بکەن",
      subtitle: "نوێترین ئۆتۆمبێلە باوەڕپێکراوەکان و لوکس لە نزیکەوە ببینە لە لقە سەرەکییەکانمان لە بەغداد و هەولێر.",
      workingHoursTitle: "کاتی کارکردنی پێشانگا",
      satThu: "شەممە – پێنجشەممە",
      satThuHours: "9:00 بەیانی – 9:00 ئێوارە",
      friday: "هەینی",
      fridayHours: "2:00 پاشنیوەڕۆ – 9:00 ئێوارە",
      baghdadTitle: "پێشانگای سەرەکی بەغداد",
      baghdadAddr: "تاوەری شین، حارسیە / شەقامی پێشانگاکان، بەغداد، عێراق",
      baghdadFeatures: ["هۆڵی تایبەتی میوانداری VIP", "نهۆمی فراوانی پیشاندانی ئۆتۆمبێل", "ڕاوێژکاری تایبەتی کڕین"],
      erbilTitle: "پێشانگای سەرەکی هەولێر",
      erbilAddr: "شاری ئیتاڵی 1، ڕێگای فڕۆکەخانە 100م / شەقامی گوڵان، هەولێر، عێراق",
      erbilFeatures: ["دیمەنی شوشەیی سەردەمیانە", "شوێنی ڕادەستکردنی فەرمی ئۆتۆمبێل", "میوانداری شاهانە"],
      openMaps: "ڕێڕەو لە نەخشەی Google",
      callShowroom: "پەیوەندی بە پێشانگا",
      bookVisit: "دیاریکردنی کاتی سەردان لە واتسئەپ",
    },
  };

  const text = content[lang] || content.en;

  return (
    <section className="my-16 py-12 px-4 sm:px-8 bg-gradient-to-b from-[#182333] to-[#121a26] rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{text.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {text.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        {/* Working Hours Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1b2738]/80 border border-gray-700/60 max-w-3xl mx-auto backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span>{text.workingHoursTitle}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
              <div className="bg-black/30 px-3 py-1.5 rounded-xl border border-gray-700/50">
                <span className="text-gray-400">{text.satThu}: </span>
                <span className="font-bold text-white">{text.satThuHours}</span>
              </div>
              <div className="bg-black/30 px-3 py-1.5 rounded-xl border border-gray-700/50">
                <span className="text-gray-400">{text.friday}: </span>
                <span className="font-bold text-white">{text.fridayHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Showrooms Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Baghdad Showroom */}
          <div className="group bg-[#16202e] rounded-3xl border border-gray-800 hover:border-emerald-500/50 overflow-hidden shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
              <img
                src="/images/showroom-baghdad.jpg"
                alt={text.baghdadTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16202e] via-transparent to-black/20" />
              <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Baghdad Branch</span>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white">
                  {text.baghdadTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{text.baghdadAddr}</span>
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {text.baghdadFeatures.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-medium text-gray-300"
                    >
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-gray-800/80">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Al-Harthiya+Baghdad+Iraq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{text.openMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="tel:6896"
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-gray-700/60"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{text.callShowroom} (6896)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Erbil Showroom */}
          <div className="group bg-[#16202e] rounded-3xl border border-gray-800 hover:border-emerald-500/50 overflow-hidden shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-900">
              <img
                src="/images/showroom-erbil.jpg"
                alt={text.erbilTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16202e] via-transparent to-black/20" />
              <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Erbil Branch</span>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white">
                  {text.erbilTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{text.erbilAddr}</span>
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {text.erbilFeatures.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-medium text-gray-300"
                    >
                      • {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-gray-800/80">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Italian+City+1+Erbil+Iraq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-600/20"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{text.openMaps}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="tel:6896"
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-gray-700/60"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{text.callShowroom} (6896)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp VIP Showroom Appointment Bar */}
        <div className="text-center pt-2">
          <a
            href={`https://wa.me/9647501002030?text=${encodeURIComponent(
              lang === "ar"
                ? "مرحباً، أود حجز موعد لزيارة صالة العرض والاطلاع على السيارات المتاحة لديكم."
                : lang === "ku"
                ? "سڵاو، دەمەوێت کاتێک دابنێم بۆ سەردانیکردنی پێشانگا و بینینی ئۆتۆمبێلە بەردەستەکان."
                : "Hello, I would like to schedule an appointment to visit your showroom."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{text.bookVisit}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
