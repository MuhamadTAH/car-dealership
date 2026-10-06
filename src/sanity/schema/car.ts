export const carSchema = {
  name: "car",
  title: "Dealership Vehicle",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Vehicle Title",
      type: "string",
      description: "e.g. BMW 7 Series 740i M-Sport 2024",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "status",
      title: "Inventory Status",
      type: "string",
      options: {
        list: [
          { title: "Available in Showroom", value: "available" },
          { title: "Reserved / Deposit Paid", value: "reserved" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
    },
    {
      name: "brand",
      title: "Brand / Make",
      type: "string",
      options: {
        list: [
          "Toyota", "Mercedes-Benz", "BMW", "Kia", "Hyundai",
          "Jetour", "HAVAL", "Mazda", "OMODA", "JAECOO",
          "GAC", "TANK", "Volkswagen", "Chevrolet", "Ford",
          "Land Rover", "Porsche", "Audi", "Nissan", "Lexus"
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "model",
      title: "Model",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "trim",
      title: "Trim / SFX",
      type: "string",
      description: "e.g. M-Sport, Limited, Platinum, Overland",
    },
    {
      name: "year",
      title: "Model Year",
      type: "number",
      validation: (Rule: any) => Rule.required().min(1990).max(2030),
    },
    {
      name: "condition",
      title: "Condition",
      type: "string",
      options: {
        list: [
          { title: "Brand New (سفر)", value: "New" },
          { title: "Certified Pre-Owned", value: "Certified" },
          { title: "Used", value: "Used" },
        ],
      },
      initialValue: "New",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bodyType",
      title: "Body Type",
      type: "string",
      options: {
        list: ["SUV & 4x4", "Sedan", "Coupe", "Pickup Truck", "Hatchback", "Van"],
      },
      initialValue: "SUV & 4x4",
    },
    {
      name: "priceUSD",
      title: "Price (USD $)",
      type: "number",
      description: "Full retail price in US Dollars",
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: "priceIQD",
      title: "Price in IQD (Optional Override)",
      type: "number",
      description: "Leave blank to auto-calculate at daily rate",
    },
    {
      name: "visitedKm",
      title: "Mileage (Kilometers)",
      type: "number",
      initialValue: 0,
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: "location",
      title: "Showroom Branch Location",
      type: "string",
      options: {
        list: [
          "Baghdad - Karrada Showroom",
          "Erbil - 100M Airport Road",
          "Sulaymaniyah - Salim Street",
          "Basra - Al-Jazaer Showroom",
          "Duhok - Central Showroom",
        ],
      },
      initialValue: "Baghdad - Karrada Showroom",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Vehicle Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    // Qist (قيست) Installments Configuration
    {
      name: "qist",
      title: "Qist (Installments / قیست) Options",
      type: "object",
      fields: [
        {
          name: "available",
          title: "Eligible for Qist Installments",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "minDownPaymentPct",
          title: "Minimum Down Payment (%)",
          type: "number",
          initialValue: 20,
        },
        {
          name: "allowedTermsMonths",
          title: "Allowed Financing Period (Months)",
          type: "array",
          of: [{ type: "number" }],
          initialValue: [12, 24, 36, 48],
        },
        {
          name: "monthlyEstimateUSD",
          title: "Estimated Monthly Installment ($)",
          type: "number",
        },
      ],
    },
    // 360 Exterior Virtual Spin
    {
      name: "virtual360",
      title: "360° Virtual Walkaround",
      type: "object",
      fields: [
        {
          name: "available",
          title: "Enable 360° View",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "videoUrl",
          title: "Walkaround Video URL (MP4 / WebM)",
          type: "url",
        },
        {
          name: "framesPreset",
          title: "360 Preset Model",
          type: "string",
          options: {
            list: [
              { title: "Sedan 72-Frames", value: "sedan" },
              { title: "SUV & 4x4 72-Frames", value: "suv" },
              { title: "Sport & Coupe 72-Frames", value: "sport" },
            ],
          },
        },
      ],
    },
    // Specifications
    {
      name: "transmission",
      title: "Transmission",
      type: "string",
      options: {
        list: ["Automatic", "Manual", "Dual-Clutch (DCT)", "CVT"],
      },
      initialValue: "Automatic",
    },
    {
      name: "engine",
      title: "Engine Specification",
      type: "string",
      description: "e.g. 2.0L Turbo, 3.5L V6, Dual Electric Motor",
    },
    {
      name: "cylinders",
      title: "Cylinders",
      type: "string",
      options: {
        list: ["4 cylinder", "6 cylinder", "8 cylinder", "12 cylinder", "Electric"],
      },
      initialValue: "4 cylinder",
    },
    {
      name: "fuel",
      title: "Fuel Type",
      type: "string",
      options: {
        list: ["Gasoline / البنزين", "Hybrid / هايبرد", "Electric / كهربائي", "Diesel / ديزل"],
      },
      initialValue: "Gasoline / البنزين",
    },
    {
      name: "color",
      title: "Exterior Color",
      type: "string",
    },
    {
      name: "warranty",
      title: "Dealership Warranty",
      type: "string",
      initialValue: "3-Year / 100,000 KM Dealership Official Warranty",
    },
    {
      name: "features",
      title: "Key Features & Equipment",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "description",
      title: "Official Dealership Inspection Notes",
      type: "text",
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "priceUSD",
      media: "mainImage",
      status: "status",
    },
    prepare({ title, subtitle, media, status }: any) {
      return {
        title,
        subtitle: `$${subtitle?.toLocaleString()} • Status: ${status || "available"}`,
        media,
      };
    },
  },
};
