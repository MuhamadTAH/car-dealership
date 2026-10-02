export type Language = 'en' | 'ar' | 'ku';
export type Currency = 'USD' | 'IQD';

export interface CarAttachment {
  CarId?: number;
  Sort?: number;
  ID?: number;
  Url?: string;
  DetailUrl?: string;
  CardUrl?: string;
  FileName?: string;
  [key: string]: any;
}

export interface Brand {
  ID?: number;
  BrandNameen?: string;
  BrandNamear?: string;
  BrandNameku?: string;
  Attachment?: { Url?: string } | null;
  [key: string]: any;
}

export interface Model {
  ID?: number;
  ModelNameen?: string;
  ModelNamear?: string;
  ModelNameku?: string;
  [key: string]: any;
}

export interface Car {
  ID: number;
  BrandId?: number | null;
  Brand?: Brand | null;
  ModelId?: number | null;
  Model?: Model | null;
  ModelSFX?: { ID?: number; SFXName?: string | null } | null;
  CarCondition?: { ID?: number; CarConditionNameen?: string; CarConditionNamear?: string; CarConditionNameku?: string } | null;
  Year?: { ID?: number; YearName?: string } | null;
  VisitedKm: number;
  Milage?: { ID?: number; MilageNameen?: string; MilageNamear?: string; MilageNameku?: string } | null;
  Price: number;
  PriceIQD?: number | null;
  PriceUnit?: number | null;
  Engine?: { EngineNameen?: string; EngineNamear?: string; EngineNameku?: string } | null;
  Cylinder?: { CylinderNameen?: string; CylinderNamear?: string; CylinderNameku?: string } | null;
  CarFuels?: Array<{ FuelNameen: string; FuelNamear: string; FuelNameku: string }> | null;
  Transmission?: { TransmissionNameen?: string; TransmissionNamear?: string; TransmissionNameku?: string } | null;
  SeatMaterial?: { SeatMaterialNameen?: string } | null;
  SeatNumber?: { SeatNumberName?: string } | null;
  Color?: { ColorNameen?: string; ColorNamear?: string; ColorNameku?: string } | null;
  Plate?: { PlateNameen?: string } | null;
  PlateCity?: { PlateCityNameen?: string } | null;
  ImportCountry?: { ImportCountryNameen?: string } | null;
  CarLabel?: { ID?: number; LabelTitleen?: string; LabelTitlear?: string; LabelTitleku?: string; BackgroundColor?: string; IconPath?: string } | null;
  Location?: { ID?: number; LocationNameen?: string; LocationNamear?: string; LocationNameku?: string } | null;
  ShowRoom?: Showroom | null;
  Attachments?: CarAttachment[] | null;
  Specifications?: string[] | null;
  UploadedDate?: string | null;
  Description?: string | null;
  Note?: string | null;
  PhoneNumber?: string | null;
  IsFeatured?: boolean | null;
  qist?: QistPlan | null;
  [key: string]: any;
}

export interface QistPlan {
  available: boolean;
  minDownPaymentPercent: number;
  allowedMonths: number[];
  providerEn?: string | null;
  providerAr?: string | null;
  providerKu?: string | null;
}

export interface LocationCity {
  ID: number;
  ParentLocationId: number;
  LocationNameen: string;
  LocationNamear: string;
  LocationNameku: string;
  ShowOnFilter: boolean;
  [key: string]: any;
}

export interface Governorate {
  ID: number;
  ParentLocationNameen: string;
  ParentLocationNamear: string;
  ParentLocationNameku: string;
  Sort: number;
  Locations: LocationCity[];
  [key: string]: any;
}

export interface Showroom {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  nameKu: string;
  verified: boolean;
  badge: string;
  badgeAr: string;
  badgeKu: string;
  city: string;
  cityAr: string;
  cityKu: string;
  carCount: number;
  brand: string;
  logo: string;
  cover: string;
  phone: string;
  whatsapp: string;
  address: string;
  about: string;
  [key: string]: any;
}

export interface FilterParams {
  condition?: string;
  brand?: string;
  model?: string;
  city?: string;
  minYear?: string;
  maxYear?: string;
  minPrice?: string;
  maxPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  fuel?: string;
  transmission?: string;
  sortBy?: string;
  page?: number;
  [key: string]: any;
}
