import { Currency, Language } from "./types";

export const USD_TO_IQD_RATE = 1530;

export function getCarImageUrl(rawUrl?: string): string {
  if (!rawUrl) {
    return "https://iqcars-assets.iqcars.io/images/banner.jpg";
  }
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }
  const cleanPath = rawUrl.replace(/\\/g, "/");
  const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  return `https://cdn.iqcars.io${normalized}`;
}

export function formatPrice(usdPrice: number, currency: Currency = "USD"): string {
  if (!usdPrice || isNaN(usdPrice)) return "$0";
  if (currency === "IQD") {
    const iqd = Math.round(usdPrice * USD_TO_IQD_RATE);
    return `${iqd.toLocaleString()} د.ع`;
  }
  return `$${usdPrice.toLocaleString()}`;
}

export function formatMileage(visited: number, unit: string = "km"): string {
  if (visited === undefined || visited === null || isNaN(visited)) return `0 ${unit}`;
  return `${visited.toLocaleString()} ${unit}`;
}

export function timeAgo(dateString?: string | null, lang: Language = "en"): string {
  if (!dateString) return lang === "ar" ? "حديثاً" : lang === "ku" ? "تازە" : "Recently";
  const now = new Date();
  const date = new Date(dateString);
  const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffMinutes < 1) return lang === "ar" ? "الآن" : lang === "ku" ? "ئێستا" : "Just now";
  if (diffMinutes < 60) {
    if (lang === "ar") return `منذ ${diffMinutes} دقيقة`;
    if (lang === "ku") return `پێش ${diffMinutes} خولەک`;
    return `${diffMinutes} mins ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    if (lang === "ar") return `منذ ${diffHours} ساعة`;
    if (lang === "ku") return `پێش ${diffHours} کاتژمێر`;
    return `${diffHours} hours ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return lang === "ar" ? "أمس" : lang === "ku" ? "دوێنێ" : "Yesterday";
  if (lang === "ar") return `منذ ${diffDays} يوم`;
  if (lang === "ku") return `پێش ${diffDays} ڕۆژ`;
  return `${diffDays} days ago`;
}

export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
