import { sanityClient, isSanityConfigured, urlForImage } from "./client";
import { Car, CarAttachment } from "@/lib/types";
import carsDataRaw from "@/data/cars.json";

export const ALL_CARS_GROQ = `*[_type == "car" && status != "sold"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  status,
  brand,
  model,
  trim,
  year,
  condition,
  bodyType,
  priceUSD,
  priceIQD,
  visitedKm,
  location,
  mainImage,
  gallery,
  qist,
  virtual360,
  transmission,
  engine,
  cylinders,
  fuel,
  color,
  warranty,
  tiktokUrl,
  youtubeUrl,
  inspectionReportImage,
  paintCondition,
  chassisCondition,
  spin360Images,
  features,
  description,
  _createdAt
}`;

export const SINGLE_CAR_GROQ = `*[_type == "car" && (_id == $id || slug.current == $slug)][0] {
  _id,
  title,
  "slug": slug.current,
  status,
  brand,
  model,
  trim,
  year,
  condition,
  bodyType,
  priceUSD,
  priceIQD,
  visitedKm,
  location,
  mainImage,
  gallery,
  qist,
  virtual360,
  transmission,
  engine,
  cylinders,
  fuel,
  color,
  warranty,
  tiktokUrl,
  youtubeUrl,
  inspectionReportImage,
  paintCondition,
  chassisCondition,
  spin360Images,
  features,
  description,
  _createdAt
}`;

export function mapSanityCarToCar(doc: any): Car {
  const mainImgUrl = doc.mainImage ? urlForImage(doc.mainImage)?.url() || "" : "";
  const galleryUrls = (doc.gallery || []).map((img: any) => urlForImage(img)?.url() || "").filter(Boolean);
  const allUrls = [mainImgUrl, ...galleryUrls].filter(Boolean);

  const inspectionSheetUrl = doc.inspectionReportImage
    ? urlForImage(doc.inspectionReportImage)?.url() || ""
    : "";
  const spin360Urls = (doc.spin360Images || [])
    .map((img: any) => urlForImage(img)?.url() || "")
    .filter(Boolean);

  const attachments: CarAttachment[] = allUrls.map((url, idx) => ({
    CarId: Number(doc._id?.replace(/\D/g, "").slice(0, 7)) || 999000 + idx,
    Sort: idx,
    ID: 8000000 + idx,
    Url: url,
    ThumbUrl: url,
    DetailUrl: url,
    CardUrl: url,
  }));

  const car: Car = {
    RankingValue: 100,
    ID: Number(doc._id?.replace(/\D/g, "").slice(0, 7)) || 999999,
    Clicks: 0,
    CallPhoneClicks: 0,
    WhatsAppClicks: 0,
    ExternalLinkClicks: 0,
    Chats: 0,
    LocationClicks: 0,
    BrandId: 1,
    PhoneNumber: "+9647501002030",
    Brand: {
      ID: 1,
      BrandNameen: doc.brand || "Dealership",
      BrandNamear: doc.brand || "وكيل رسمي",
      BrandNameku: doc.brand || "بریکار",
    },
    CarCondition: {
      ID: doc.condition === "New" ? 1 : 2,
      CarConditionNameen: doc.condition || "New",
      CarConditionNamear: doc.condition === "New" ? "جديد" : "مستخدم",
      CarConditionNameku: doc.condition === "New" ? "نوێ" : "بەکارهاتوو",
    },
    Color: doc.color
      ? {
          ColorNameen: doc.color,
          ColorNamear: doc.color,
          ColorNameku: doc.color,
        }
      : null,
    CarLabel: {
      ID: 3,
      LabelTitleen: "Official Dealership",
      LabelTitlear: "وكيل رسمي",
      LabelTitleku: "بریکاری فەرمی",
      BackgroundColor: "#10b981",
    },
    Model: {
      ID: 1,
      ModelNameen: doc.model || "",
      ModelNamear: doc.model || "",
      ModelNameku: doc.model || "",
    },
    ModelSFX: doc.trim
      ? {
          ID: 1,
          SFXName: doc.trim,
        }
      : null,
    Location: {
      ID: 1,
      LocationNameen: doc.location || "Iraq",
      LocationNamear: doc.location || "العراق",
      LocationNameku: doc.location || "عێراق",
    },
    UploadedDate: doc._createdAt || new Date().toISOString(),
    Transmission: doc.transmission
      ? {
          TransmissionNameen: doc.transmission,
          TransmissionNamear: doc.transmission,
          TransmissionNameku: doc.transmission,
        }
      : null,
    Cylinder: doc.cylinders
      ? {
          CylinderNameen: doc.cylinders,
          CylinderNamear: doc.cylinders,
          CylinderNameku: doc.cylinders,
        }
      : null,
    Engine: doc.engine
      ? {
          EngineNameen: doc.engine,
          EngineNamear: doc.engine,
          EngineNameku: doc.engine,
        }
      : null,
    Year: {
      ID: 1,
      YearName: String(doc.year || 2024),
    },
    VisitedKm: doc.visitedKm || 0,
    Price: doc.priceUSD || 0,
    PriceIQD: doc.priceIQD || 0,
    Sold: doc.status === "sold",
    Attachments: attachments,
    CarFuels: doc.fuel
      ? [
          {
            FuelNameen: doc.fuel,
            FuelNamear: doc.fuel,
            FuelNameku: doc.fuel,
          },
        ]
      : [],
    qist: doc.qist?.available
      ? {
          available: true,
          minDownPaymentPercent: doc.qist.minDownPaymentPct || 20,
          allowedMonths: doc.qist.allowedTermsMonths || [12, 24, 36, 48],
          providerEn: "Official Dealership Direct Financing",
          providerAr: "تمويل مباشر من الوكيل الرسمي",
          providerKu: "قیستی ڕاستەوخۆ لە بریکاری فەرمی",
        }
      : null,
    tiktokUrl: doc.tiktokUrl || null,
    youtubeUrl: doc.youtubeUrl || null,
    inspectionReportImage: inspectionSheetUrl || null,
    paintCondition: doc.paintCondition || null,
    chassisCondition: doc.chassisCondition || null,
    warranty: doc.warranty || null,
    spin360Images: spin360Urls.length > 0 ? spin360Urls : null,
  };

  return car;
}

/**
 * Fetch all available cars from Sanity with resilient fallback to static inventory.
 * Automatically handles adding, updating, and deleting vehicles in Sanity.
 */
export async function getInventoryCars(): Promise<Car[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const sanityCars = await sanityClient.fetch(ALL_CARS_GROQ);
      if (Array.isArray(sanityCars) && sanityCars.length > 0) {
        return sanityCars.map(mapSanityCarToCar);
      }
    } catch (err) {
      console.warn("Failed to fetch from Sanity, falling back to local dataset:", err);
    }
  }

  return carsDataRaw as Car[];
}
