import { Car, Car360Config, Car360Hotspot } from "./types";

export const DEFAULT_360_HOTSPOTS: Car360Hotspot[] = [
  {
    id: "headlights",
    angle: 0,
    titleEn: "Bi-LED Matrix Headlights & Dynamic Grille",
    titleAr: "مصابيح أمامية Bi-LED ذكية وشبك ديناميكي",
    titleKu: "لایتەکانی پێشەوەی زیرەکی Bi-LED و دەمەوانەی دینامیکی",
    descriptionEn: "Adaptive high-beam assist with integrated daytime running lights and active aero shutter grille.",
    descriptionAr: "إضاءة متكيفة عالية الدقة مع مصابيح نهارية وشبك تبريد هوائي ذكي.",
    descriptionKu: "ڕووناکی زیرەکی بەرز لەگەڵ لایتی ڕۆژ و دەمەوانەی بەهێزی ساردکەرەوە.",
    xPercent: 50,
    yPercent: 55,
  },
  {
    id: "wheels",
    angle: 90,
    titleEn: "Diamond-Cut Alloy Wheels & Ventilated Disc Brakes",
    titleAr: "جنوط ألمنيوم مقصوصة بالألماس وفرامل مهواة",
    titleKu: "ویلەکانی ئەلەمنیۆمی تایبەت و برێکی دیسکی ساردکەرەوە",
    descriptionEn: "Precision engineered lightweight alloy wheels paired with high-durability all-season performance tires.",
    descriptionAr: "جنوط رياضية خفيفة الوزن مع إطارات عالية الأداء لجميع الفصول ونظام فرامل متطور.",
    descriptionKu: "ویلی سووک و بەهێز لەگەڵ تایەی چوار وەرزی نایاب و سیستەمی برێکی پێشکەوتوو.",
    xPercent: 62,
    yPercent: 72,
  },
  {
    id: "exhaust",
    angle: 180,
    titleEn: "LED Tail Lamp Bar & Hands-Free Smart Tailgate",
    titleAr: "شريط إضاءة خلفي متصل وصندوق أمتعة كهربائي ذكي",
    titleKu: "لایتی پشتەوەی یەکگرتوو و سندوقی کارەبایی زیرەک",
    descriptionEn: "Full-width signature LED taillights, integrated rear backup camera, and proximity-sensor smart tailgate.",
    descriptionAr: "إضاءة خلفية بانورامية كاملة، كاميرا رجوع مدمجة، وصندوق يفتح بمستشعر الحركة.",
    descriptionKu: "لایتی تەواوی پانی LED، کامێرای پشتەوەی ڕوون و سندوقی زیرەک بە هەستەوەر.",
    xPercent: 50,
    yPercent: 52,
  },
  {
    id: "mirrors",
    angle: 270,
    titleEn: "Aero Power Folding Mirrors & Smart Entry",
    titleAr: "مرايا كهربائية ديناميكية ودخول ذكي بدون مفتاح",
    titleKu: "ئاوێنەی کارەبایی دەنووشتێتەوە و چوونەژوورەوەی بێ کلیل",
    descriptionEn: "Heated side mirrors with blind-spot warning indicators and touch-sensitive smart keyless access.",
    descriptionAr: "مرايا مدفأة مع كشف النقطة العمياء ومقابض أبواب بمستشعر دخول ذكي.",
    descriptionKu: "ئاوێنەی گەرمکەرەوە بە ئاگادارکەرەوەی خاڵی کوێر و دەسکی دەرگای هەستەوەر.",
    xPercent: 38,
    yPercent: 48,
  },
];

export const SAMPLE_360_PRESETS = [
  {
    id: "suv",
    nameEn: "Luxury SUV (Toyota Land Cruiser / BMW X5 / Tucson)",
    nameAr: "دفع رباعي فاخر (لاند كروزر / بي إم دبليو X5 / توسان)",
    nameKu: "ئۆتۆمبێلی گەورەی SUV (لاندکروزەر / بی ئێم دەبڵیو X5 / توسان)",
    videoUrl: "/videos/360/suv-360.mp4",
    framesPattern: "/cars360/suv/frame_%03d.webp",
    totalFrames: 72,
    durationSeconds: 3.0,
  },
  {
    id: "sedan",
    nameEn: "Executive Sedan (Toyota Camry / BMW 7-Series / Mercedes)",
    nameAr: "سيدان تنفيذية (تويوتا كامري / الفئة السابعة / مرسيدس)",
    nameKu: "سێدانی ناوازە (تۆیۆتا کامری / سیریەس 7 / مێرسیدس)",
    videoUrl: "/videos/360/sedan-360.mp4",
    framesPattern: "/cars360/sedan/frame_%03d.webp",
    totalFrames: 72,
    durationSeconds: 3.0,
  },
  {
    id: "sport",
    nameEn: "Sport Coupe & GT Performance",
    nameAr: "كوبيه رياضية وأداء عالي",
    nameKu: "کۆپێی وەرزشی و خێرایی بەرز",
    videoUrl: "/videos/360/sport-360.mp4",
    framesPattern: "/cars360/sport/frame_%03d.webp",
    totalFrames: 72,
    durationSeconds: 3.0,
  },
];

// Determine if car is eligible for 360 or has custom seller 360
export function getCar360Config(carId: number, car?: Car | null): Car360Config | null {
  // Check localStorage for custom seller uploaded video if in browser
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(`car_360_${carId}`);
      if (stored) {
        const parsed = JSON.parse(stored) as Car360Config;
        if (parsed.available) return parsed;
      }
    } catch (e) {
      // Ignore storage error
    }
  }

  // Pre-configured 360 available for select popular cars or brands
  // In our catalog: BMW, Toyota, Mercedes, Hyundai, Kia, etc.
  const brandName = (car?.Brand?.BrandNameen || "").toLowerCase();
  const modelName = (car?.Model?.ModelNameen || "").toLowerCase();

  // If car is an SUV or CrossOver
  const isSUV = modelName.includes("tucson") || modelName.includes("land cruiser") || modelName.includes("prado") || modelName.includes("x5") || modelName.includes("sportage") || modelName.includes("rav4");
  const isSport = modelName.includes("gt") || modelName.includes("coupe") || modelName.includes("m4") || modelName.includes("amg");

  // Pick suitable preset
  const preset = isSport ? SAMPLE_360_PRESETS[2] : isSUV ? SAMPLE_360_PRESETS[0] : SAMPLE_360_PRESETS[1];

  // We enable 360 for high-interest cars (cars with even IDs or specific popular models)
  const is360EnabledByDefault = carId % 2 === 0 || isSUV || brandName.includes("bmw") || brandName.includes("toyota") || brandName.includes("mercedes") || brandName.includes("hyundai");

  if (!is360EnabledByDefault) {
    return null;
  }

  return {
    available: true,
    type: "video",
    videoUrl: preset.videoUrl,
    framesPattern: preset.framesPattern,
    totalFrames: preset.totalFrames,
    direction: "cw",
    startAngle: 0,
    durationSeconds: preset.durationSeconds,
    hotspots: DEFAULT_360_HOTSPOTS,
  };
}

export function saveCustomCar360(carId: number, config: Car360Config): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`car_360_${carId}`, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent("car-360-updated", { detail: { carId, config } }));
  } catch (e) {
    console.error("Failed to save 360 configuration:", e);
  }
}
