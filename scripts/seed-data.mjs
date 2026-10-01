import fs from 'fs';
import path from 'path';

const headers = {
  "Content-Type": "application/json",
  "useruniqueid": "8b6d7e44-670c-4f4c-87ac-1f541d0cb8a6",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Origin": "https://www.iqcars.net",
  "Referer": "https://www.iqcars.net/"
};

async function main() {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  console.log("1. Fetching Locations...");
  const locRes = await fetch("https://web.iqcars.net/api/Main/Locations-parent", { headers });
  const locations = await locRes.json();
  fs.writeFileSync(path.join(dataDir, 'locations.json'), JSON.stringify(locations, null, 2));
  console.log(`Saved ${locations.length} locations.`);

  console.log("2. Fetching Filter Data...");
  const filterRes = await fetch("https://web.iqcars.net/api/Main/GetFilterData?langCode=en", { headers });
  const filterData = await filterRes.json();
  fs.writeFileSync(path.join(dataDir, 'filterData.json'), JSON.stringify(filterData.data || {}, null, 2));
  console.log(`Saved filter data with ${filterData.data?.Brands?.length || 0} brands.`);

  console.log("3. Fetching Car Listings (pages 1 to 4)...");
  let allCars = [];
  for (let page = 1; page <= 4; page++) {
    try {
      const carsRes = await fetch(`https://web.iqcars.net/api/Category//search?PriceUnit=1&page=${page}&langCode=en&size=30`, {
        method: "POST",
        headers,
        body: JSON.stringify({ LocationIds: [] })
      });
      const pageData = await carsRes.json();
      if (pageData.data && pageData.data.length > 0) {
        allCars = allCars.concat(pageData.data);
        console.log(`Page ${page}: got ${pageData.data.length} cars.`);
      }
    } catch (e) {
      console.error(`Error on page ${page}:`, e.message);
    }
  }

  // De-duplicate cars by ID
  const uniqueCars = [];
  const seenIds = new Set();
  for (const car of allCars) {
    if (car.ID && !seenIds.has(car.ID)) {
      seenIds.add(car.ID);
      uniqueCars.push(car);
    }
  }
  fs.writeFileSync(path.join(dataDir, 'cars.json'), JSON.stringify(uniqueCars, null, 2));
  console.log(`Saved ${uniqueCars.length} unique cars.`);

  console.log("4. Creating Showrooms data...");
  const showrooms = [
    {
      id: "mercedes-benz-erbil",
      slug: "mercedes.benz.iraq.bcm.erbil",
      name: "Bright Castle Motors - Erbil",
      nameAr: "برايت كاسل موتورز - أربيل",
      nameKu: "برایتی کاستڵ مۆتۆرز - هەولێر",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      carCount: 17,
      brand: "Mercedes-Benz",
      logo: "https://cdn.iqcars.io/img/ShowRoomLogoAttachments/1768897115612.6213497397566_1112257620938547_5637777672880080484_n.jpg",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1768988263786.1543DSC03683%20(1).png",
      phone: "+964 750 100 2030",
      whatsapp: "+9647501002030",
      address: "100 Meter Street, Near Erbil International Airport, Erbil",
      about: "Bright Castle Motors is the authorized general distributor of Mercedes-Benz passenger cars and commercial vehicles in the Kurdistan Region of Iraq, delivering supreme German engineering and exceptional luxury service."
    },
    {
      id: "kia-nim-erbil",
      slug: "kia.nim.erbil",
      name: "Kia (NIM) - Erbil",
      nameAr: "كيا (نيم) - أربيل",
      nameKu: "کیا (نـیم) - هەولێر",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      carCount: 15,
      brand: "Kia",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1691318753979.1956_Kia.png",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1680638282969.5623scaled_image_picker4118731240221054534.jpg",
      phone: "+964 750 200 3040",
      whatsapp: "+9647502003040",
      address: "60 Meter Road, Erbil",
      about: "Official authorized dealer for Kia vehicles in Erbil, providing genuine warranty, maintenance, and the latest modern crossover and SUV models."
    },
    {
      id: "toyota-uselect",
      slug: "toyota.uselect",
      name: "Toyota USelect",
      nameAr: "تويوتا يو سيلكت",
      nameKu: "تۆیۆتا یوسیلێکت",
      verified: true,
      badge: "Certified Pre-Owned",
      badgeAr: "معتمد ومفحوص",
      badgeKu: "پشکنراو و باوەڕپێکراو",
      city: "Baghdad",
      cityAr: "بغداد",
      cityKu: "بەغداد",
      carCount: 56,
      brand: "Toyota",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1692609856905.7356_Toyota.png",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1741271782375.665588.jpg",
      phone: "+964 770 300 4050",
      whatsapp: "+9647703004050",
      address: "Al-Karrada, Baghdad",
      about: "Toyota USelect guarantees 160-point multi-check inspection, original parts, certified warranty, and high trade-in value across Iraq."
    },
    {
      id: "bmw-al-uroush-baghdad",
      slug: "bmw.al.uroush.auto.baghdad",
      name: "BMW Al-Uroush Baghdad",
      nameAr: "بي ام دبليو العروش بغداد",
      nameKu: "بی ئێم دەبلیو عەروش بەغداد",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Baghdad",
      cityAr: "بغداد",
      cityKu: "بەغداد",
      carCount: 12,
      brand: "BMW",
      logo: "https://iqcars-assets.iqcars.io/images/icons/golden_badge.svg",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1787141351730.59131786278004754.2476DSC01570.jpg",
      phone: "+964 780 400 5060",
      whatsapp: "+9647804005060",
      address: "Al-Mansour, Baghdad",
      about: "Official importer and dealer for BMW and MINI vehicles in Baghdad, offering supreme luxury models and full maintenance service."
    },
    {
      id: "cihan-motors-erbil",
      slug: "cihan.motors.erbil.krk.road.branch",
      name: "Cihan Motors KRK Road-Erbil",
      nameAr: "جيهان موتورز طريق كركوك - أربيل",
      nameKu: "جیهان مۆتۆرز ڕێگای کەرکووک - هەولێر",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      carCount: 43,
      brand: "Toyota",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1692609856905.7356_Toyota.png",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1640705398056.118WhatsApp%20Image%202021-12-28%20at%206.26.48%20PM.jpeg",
      phone: "+964 750 500 6070",
      whatsapp: "+9647505006070",
      address: "Kirkuk Main Road, Erbil",
      about: "Authorized Toyota dealer delivering Land Cruisers, Hiluxes, Camrys, and genuine after-sales customer care across the Kurdistan region."
    },
    {
      id: "omoda-jaecoo-iraq",
      slug: "omodajaecooiraq",
      name: "Omoda & Jaecoo Iraq",
      nameAr: "أومودا وجايكو العراق",
      nameKu: "ئۆمۆدا و جەیکۆ عێراق",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      carCount: 15,
      brand: "OMODA",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1775725925776.4033_OMODA.png",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1789984250045.705photo_2026-07-29_01-13-14.jpg",
      phone: "+964 750 600 7080",
      whatsapp: "+9647506007080",
      address: "Gulan Street, Erbil",
      about: "Futuristic luxury SUVs designed for modern tech-savvy drivers, backed with 7-year manufacturer warranty in Iraq."
    },
    {
      id: "gwm-nahj-al-iraq",
      slug: "gwm.nahj.al-iraq.erbil",
      name: "GWM-Nahj Al-Iraq-Erbil",
      nameAr: "جي دبليو إم نهج العراق - أربيل",
      nameKu: "جی دەبلیو ئێم نەهجی عێراق - هەولێر",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      carCount: 21,
      brand: "TANK",
      logo: "https://cdn.iqcars.io/img/BrandAttachments/1747315387629.3057_GWM%20TANK.png",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1780998288440.1995IMG_20250901_160957_edit_337940215364781.jpg",
      phone: "+964 750 700 8090",
      whatsapp: "+9647507008090",
      address: "100 Meter Highway, Erbil",
      about: "Official distributor of TANK and HAVAL off-road and premium SUVs built for Iraqi rugged terrain and luxury commuting."
    },
    {
      id: "geely-iraq",
      slug: "geely.iraq",
      name: "Geely Iraq - TAM",
      nameAr: "جيلي العراق - شركة طام",
      nameKu: "جیلی عێراق - کۆمپانیای تام",
      verified: true,
      badge: "Official Dealership",
      badgeAr: "وكيل رسمي",
      badgeKu: "بریکاری فەرمی",
      city: "Baghdad",
      cityAr: "بغداد",
      cityKu: "بەغداد",
      carCount: 6,
      brand: "Geely",
      logo: "https://iqcars-assets.iqcars.io/images/icons/golden_badge.svg",
      cover: "https://cdn.iqcars.io/img/ShowRoomAttachments/1783329081650.6453geely-iraq-baghdad-Showroom-Exterior-photo-carousel-019.jpg",
      phone: "+964 770 800 9010",
      whatsapp: "+9647708009010",
      address: "Airport Road, Baghdad",
      about: "Exclusive distributor of Geely Auto in Iraq, offering Monjaro, Starray, Coolray, and Emgrand with comprehensive service packages."
    }
  ];
  fs.writeFileSync(path.join(dataDir, 'showrooms.json'), JSON.stringify(showrooms, null, 2));
  console.log(`Saved ${showrooms.length} showrooms.`);

  console.log("5. Creating News data...");
  const news = [
    {
      id: "mercedes-benz-iraq-interview",
      slug: "The-Strategy-Behind-Mercedes--Benz-Iraq:-Interview-with-the-Head-of-Marketing",
      title: "The Strategy Behind Mercedes-Benz Iraq: Interview with the Head of Marketing",
      titleAr: "استراتيجية مرسيدس-بنز في العراق: حوار مع مدير التسويق",
      titleKu: "ستراتیژیی مێرسیدس-بێنز لە عێراق: چاوپێکەوتن لەگەڵ بەڕێوەبەری بەبازاڕکردن",
      date: "2026-03-26",
      category: "Interviews",
      image: "https://cdn.iqcars.io/img/NewsAttachments/1774546270538.8333hf_20260326_171842_81e73d96-2547-4642-9a5c-57fea9ef91bc.jpeg",
      summary: "An exclusive deep dive into how Bright Castle Motors and MEC are reshaping the luxury automotive experience in Baghdad, Erbil, and across Iraq.",
      content: `The automotive market in Iraq has entered a transformative era. With increasing consumer demand for cutting-edge technology, authentic after-sales service, and verified warranties, premium brands like Mercedes-Benz are expanding their footprint across major Iraqi cities.

In our exclusive sit-down interview with the Head of Marketing for Mercedes-Benz Iraq, we discussed customer preferences, the rising adoption of intelligent Mild-Hybrid and Electric models, and the company's commitment to delivering world-class service standards in Baghdad and Erbil.

"Our goal is not merely selling luxury cars, but cultivating a lifelong journey of trust and performance for Iraqi families and business leaders," explained the executive. New showrooms and service centers equipped with the latest diagnostic technology are set to open throughout 2026.`
    },
    {
      id: "cihan-motors-toyota-after-sales",
      slug: "Cihan-Motors:-Elevating-Toyota-After--Sales-in-Iraq",
      title: "Cihan Motors: Elevating Toyota After-Sales in Iraq",
      titleAr: "جيهان موتورز: الارتقاء بخدمات ما بعد البيع لسيارات تويوتا في العراق",
      titleKu: "جیهان مۆتۆرز: بەرزکردنەوەی خزمەتگوزارییەکانی دوای فرۆشتنی تۆیۆتا لە عێراق",
      date: "2026-03-25",
      category: "Dealerships",
      image: "https://cdn.iqcars.io/img/NewsAttachments/1774457024743.8671774454056983.jpg",
      summary: "How Cihan Motors continues to set industry benchmarks in certified maintenance, original spare parts, and fast service bays.",
      content: `Toyota remains the undisputed favorite automotive marque in Iraq, celebrated for its legendary reliability and unmatched resale value. As the vehicle parc grows, providing reliable, certified maintenance becomes pivotal.

Cihan Motors has unveiled a massive modernization program for its service facilities along the Kirkuk road branch in Erbil and Dohuk. With specialized technicians certified by Toyota Motor Corporation and computerized spare parts logistics, maintenance turnaround times have been slashed by 40%.`
    },
    {
      id: "geely-monjaro-starray-baghdad",
      slug: "Geely-Introduces-the-New-Monjaro-and-Starray-in-Baghdad",
      title: "Geely Introduces the New Monjaro and Starray in Baghdad",
      titleAr: "جيلي تدشن طرازي مونجارو وستارراي الجديدين في بغداد",
      titleKu: "جیلی مۆدێلە نوێیەکانی مۆنجارۆ و ستارڕەی لە بەغداد دەناسێنێت",
      date: "2026-10-01",
      category: "New Launches",
      image: "https://cdn.iqcars.io/img/NewsAttachments/1790845945687.9307Untitled%20design%20(47)%20(1).png",
      summary: "Geely Auto and TAM celebrated the official arrival of two flagship crossovers blending Scandinavian design cues and robust performance.",
      content: `In a grand reveal hosted at the central Baghdad showroom, Geely Auto officially introduced the refreshed Monjaro and all-new Starray crossovers to Iraqi motorists.

Featuring CMA architecture developed with European engineering partners, high-output turbocharged powertrains, and panoramic smart screens, these models offer remarkable value, safety, and comfort for long highway drives between Iraqi governorates.`
    },
    {
      id: "byd-shark-6-spotlight",
      slug: "BYD-Shark-6-Faces-Recall-and-Cybersecurity-Scrutiny-in-Australia",
      title: "BYD Shark 6: Global Reception & What It Means for Iraqi Buyers",
      titleAr: "بي واي دي شارك 6: الأصداء العالمية وما تعنيه للمشترين في العراق",
      titleKu: "بی وای دی شارک 6: دەنگدانەوەی جیهانی و چی دەگەیەنێت بۆ کڕیارانی عێراق",
      date: "2026-09-30",
      category: "Electric & Hybrid",
      image: "https://cdn.iqcars.io/img/NewsAttachments/1790775180147.7324Firefly_Gemini%20Flash_keep%20everything%20the%20same%20just%20extend%20the%20sides%20adjusting%20it%20to%20the%20environement%20248936.png",
      summary: "With plug-in hybrid pickups entering the Iraqi market, we examine the durability, DMO platform capabilities, and maintenance expectations.",
      content: `The pickup segment in Iraq has long been dominated by traditional combustion powertrains. However, BYD's aggressive hybrid offensive with the Shark 6 DMO off-road pickup is turning heads among contractors, outdoor adventurers, and tech lovers alike.

Combining dual electric motors with a high-efficiency turbocharged engine, the Shark 6 delivers over 430 horsepower while drastically cutting fuel consumption during city gridlock in Baghdad and Basra.`
    },
    {
      id: "toyota-hilux-2027",
      slug: "2027-Toyota-Hilux-Officially-Arrives-in-the-Kurdistan-Region",
      title: "2027 Toyota Hilux Officially Arrives in the Kurdistan Region",
      titleAr: "تويوتا هايلوكس 2027 تصل رسمياً إلى إقليم كوردستان",
      titleKu: "تۆیۆتا هایلۆکس 2027 بە شێوەیەکی فەرمی دەگاتە هەرێمی کوردستان",
      date: "2026-09-22",
      category: "New Launches",
      image: "https://cdn.iqcars.io/img/NewsAttachments/1790087324844.1797Firefly_Gemini%20Flash%20(6).png",
      summary: "The legendary workhorse returns with bolder styling, enhanced multi-terrain capability, and upgraded cabin refinement.",
      content: `The Toyota Hilux is an integral part of Iraqi motoring culture. From mountain trails in Sulaymaniyah and Duhok to desert highways in southern Iraq, its durability is unmatched.

The new edition boasts a reinforced chassis, updated steering damper system, wireless Apple CarPlay integration, and improved turbo diesel efficiency.`
    },
    {
      id: "omoda-c7-arrives",
      slug: "OMODA-C7-Officially-Arrives-in-Iraq-Through-Jameel-Motors",
      title: "OMODA C7 Officially Arrives in Iraq Through Jameel Motors",
      titleAr: "أومودا سي 7 تصل رسمياً إلى العراق عبر جميل موتورز",
      titleKu: "ئۆمۆدا C7 بە فەرمی دەگاتە عێراق لە ڕێگەی جەمیل مۆتۆرزەوە",
      date: "2026-09-22",
      category: "New Launches",
      image: "https://cdn.iqcars.io/img/NewsAttachments/1790087129352.6208Firefly_Gemini%20Flash%20(5).png",
      summary: "Bold aesthetic contours, smart ambient lighting, and intelligent driving aids make OMODA C7 one of the most anticipated compact crossovers.",
      content: `Targeted at youthful drivers who demand modern design without exorbitant luxury price tags, the OMODA C7 has formally hit dealership floors in Iraq. Featuring 19-inch aerowheels, a futuristic cockpit, and Level-2 driver assistance, it offers exceptional style.`
    }
  ];
  fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(news, null, 2));
  console.log(`Saved ${news.length} news articles.`);

  console.log("6. Creating Guides & Video Reviews data...");
  const guides = {
    videos: [
      {
        id: "range-rover-sport",
        title: "Land Rover Range Rover Sport - In-Depth Review Iraq",
        thumbnail: "https://customer-gwfahdyt8tqfncta.cloudflarestream.com/e5d756a000c6ed00613ff1be9898371b/thumbnails/thumbnail.jpg",
        duration: "14:20",
        author: "iQ Cars Media"
      },
      {
        id: "exeed-exlantix",
        title: "EXEED Exlantix ET - Electric Flagship Test Drive",
        thumbnail: "https://customer-gwfahdyt8tqfncta.cloudflarestream.com/e38ba848cfabaaee4fe40005f36e17fc/thumbnails/thumbnail.jpg",
        duration: "11:45",
        author: "iQ Cars Media"
      },
      {
        id: "land-rover-defender",
        title: "Land Rover Defender 110 - Off-Road in Kurdistan Mountains",
        thumbnail: "https://customer-gwfahdyt8tqfncta.cloudflarestream.com/2fb732daa22ebcfbcde035da4cdab9e9/thumbnails/thumbnail.jpg",
        duration: "18:02",
        author: "iQ Cars Media"
      },
      {
        id: "bmw-5-series",
        title: "BMW 5-Series G60 530i - Luxury & Technology Walkthrough",
        thumbnail: "https://customer-gwfahdyt8tqfncta.cloudflarestream.com/4f906b12848d1ec902cdb5bdce58b796/thumbnails/thumbnail.jpg",
        duration: "16:30",
        author: "iQ Cars Media"
      },
      {
        id: "toyota-prado",
        title: "Toyota Land Cruiser Prado 250 - All New Platform Tested",
        thumbnail: "https://customer-gwfahdyt8tqfncta.cloudflarestream.com/597224b23a19f6afaef40f7c5930a777/thumbnails/thumbnail.jpg",
        duration: "19:15",
        author: "iQ Cars Media"
      },
      {
        id: "gac-empow",
        title: "GAC Empow - Sport Sedan Under $20,000",
        thumbnail: "https://customer-gwfahdyt8tqfncta.cloudflarestream.com/7706450dbaa29414cd17ca1973f872a6/thumbnails/thumbnail.jpg",
        duration: "10:12",
        author: "iQ Cars Media"
      }
    ],
    latestModels: [
      {
        id: 419,
        brand: "BYD",
        model: "Shark 6",
        year: 2026,
        image: "https://cdn.iqcars.io/img/BrandNewCarThumb/1765874720460.602368c1168233c4cBYD_Shark_front_uae-removebg-preview.png",
        priceEst: "$38,000",
        specs: "1.5T Plug-in Hybrid | 430 HP | 4WD | 840 km range"
      },
      {
        id: 500,
        brand: "Mercedes-Benz",
        model: "E-Class",
        year: 2026,
        image: "https://cdn.iqcars.io/img/BrandNewCarThumb/1772302838290.0337IMG_7580-removebg-preview.png",
        priceEst: "$72,000",
        specs: "2.0L Turbo Mild-Hybrid | 255 HP | MBUX Superscreen"
      },
      {
        id: 660,
        brand: "Toyota",
        model: "Land Cruiser FJ",
        year: 2027,
        image: "https://cdn.iqcars.io/img/BrandNewCarThumb/1790022027664.8892IMG_5358-removebg-preview.png",
        priceEst: "$41,000",
        specs: "2.8L Turbo Diesel | 204 HP | Full-time 4WD"
      },
      {
        id: 478,
        brand: "BYD",
        model: "SONG PLUS",
        year: 2026,
        image: "https://cdn.iqcars.io/img/BrandNewCarThumb/1771243039542.3406IMG_6615.PNG",
        priceEst: "$23,500",
        specs: "DM-i Super Hybrid | Blade Battery | 1,000+ km range"
      },
      {
        id: 377,
        brand: "Mercedes-Benz",
        model: "S-Class",
        year: 2026,
        image: "https://cdn.iqcars.io/img/BrandNewCarThumb/1772392495475.4568IMG_7631-removebg-preview.png",
        priceEst: "$145,000",
        specs: "3.0L Inline-6 Turbo | 429 HP | Executive Rear Seating"
      },
      {
        id: 345,
        brand: "Kia",
        model: "Tasman",
        year: 2026,
        image: "https://cdn.iqcars.io/img/BrandNewCarThumb/1759669083052.3865image_processing20250712-10-5rkf3f-removebg-preview.png",
        priceEst: "$32,000",
        specs: "2.5L Turbo Gasoline | 281 HP | Heavy Duty Bed"
      },
      {
        id: 571,
        brand: "TANK",
        model: "300",
        year: 2026,
        image: "https://cdn.iqcars.io/img/BrandAttachments/1747315387629.3057_GWM%20TANK.png",
        priceEst: "$34,500",
        specs: "2.0T Turbo | Front & Rear Diff Locks | Tank Turn"
      }
    ],
    categories: [
      { id: "family-cars", title: "Family Cars", titleAr: "سيارات عائلية", titleKu: "ئۆتۆمبێلی خێزانی", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/family-cars.jpeg", count: "14,200" },
      { id: "muscle-cars", title: "Muscle Cars", titleAr: "سيارات رياضية", titleKu: "ئۆتۆمبێلی وەرزشی", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/muscle-cars.jpg", count: "3,840" },
      { id: "pickup-cars", title: "Pickup", titleAr: "بيك آب ونصف نقل", titleKu: "پیکاب", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/pickup.jpg?v=2", count: "8,950" },
      { id: "personal-cars", title: "Personal Cars", titleAr: "سيارات شخصية سيدان", titleKu: "ئۆتۆمبێلی کەسی", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/pc-2.jpg", count: "22,400" },
      { id: "van-cars", title: "VAN", titleAr: "فان وحافلات", titleKu: "ڤان", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/van.jpg", count: "1,620" },
      { id: "us-cars", title: "US Cars", titleAr: "وارد أمريكي", titleKu: "واردی ئەمریکی", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/us-cars.jpg", count: "28,700" },
      { id: "gcc-cars", title: "GCC Cars", titleAr: "وارد خليجي", titleKu: "واردی خەلیجی", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/gcc-cars.png", count: "19,850" },
      { id: "ev-cars", title: "EV Cars", titleAr: "سيارات كهربائية", titleKu: "ئۆتۆمبێلی کارەبایی", img: "https://cdn.iqcars.io/img/DefinedCategoryFilterAttachments/ev-cars.png", count: "1,230" }
    ]
  };
  fs.writeFileSync(path.join(dataDir, 'guides.json'), JSON.stringify(guides, null, 2));
  console.log("Saved guides data.");

  console.log("7. Creating EV Map Charging Stations across Iraq...");
  const evStations = [
    {
      id: "ev-bgd-01",
      name: "Baghdad Mall Supercharger Station",
      nameAr: "محطة شحن بغداد مول فائقة السرعة",
      nameKu: "وێستگەی شەحنکردنەوەی بەغداد مۆڵ",
      city: "Baghdad",
      cityAr: "بغداد",
      cityKu: "بەغداد",
      address: "Al-Harthiya, Baghdad Mall Parking Level B1",
      lat: 33.3128,
      lng: 44.3615,
      powerKw: 120,
      plugs: ["CCS2", "GB/T DC", "Type 2"],
      portsCount: 6,
      status: "Available",
      fee: "Free for mall visitors / 250 IQD/kWh",
      hours: "24/7",
      phone: "+964 770 123 4567"
    },
    {
      id: "ev-bgd-02",
      name: "Mansour Hub EV Charger",
      nameAr: "شاحن المنصور السريع",
      nameKu: "شەحنی خێرای مەنسوور",
      city: "Baghdad",
      cityAr: "بغداد",
      cityKu: "بەغداد",
      address: "14th Ramadan St, Al-Mansour, Baghdad",
      lat: 33.3155,
      lng: 44.3490,
      powerKw: 60,
      plugs: ["CCS2", "GB/T DC"],
      portsCount: 4,
      status: "Available",
      fee: "300 IQD/kWh",
      hours: "08:00 AM - 12:00 AM",
      phone: "+964 771 987 6543"
    },
    {
      id: "ev-erb-01",
      name: "Erbil Empire World EV Station",
      nameAr: "محطة إمباير وورلد للسيارات الكهربائية",
      nameKu: "وێستگەی کارەبایی ئیمپایەر وۆڕڵد",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      address: "Empire World Diamond Towers, Gulan St, Erbil",
      lat: 36.2063,
      lng: 43.9852,
      powerKw: 150,
      plugs: ["CCS2", "GB/T DC", "Type 2 AC"],
      portsCount: 8,
      status: "Available",
      fee: "Free Charging Spot",
      hours: "24/7",
      phone: "+964 750 444 8899"
    },
    {
      id: "ev-erb-02",
      name: "Majidi Mall Erbil Fast Hub",
      nameAr: "محطة ماجدي مول أربيل للشحن",
      nameKu: "وێستگەی مەجیدی مۆڵ هەولێر",
      city: "Erbil",
      cityAr: "أربيل",
      cityKu: "هەولێر",
      address: "Koya Main Road, Near Majidi Mall, Erbil",
      lat: 36.1950,
      lng: 44.0520,
      powerKw: 120,
      plugs: ["CCS2", "GB/T DC"],
      portsCount: 4,
      status: "Available",
      fee: "200 IQD/kWh",
      hours: "10:00 AM - 11:00 PM",
      phone: "+964 750 333 2211"
    },
    {
      id: "ev-sul-01",
      name: "Sulaymaniyah Family Mall EV Hub",
      nameAr: "محطة فاميلي مول السليمانية",
      nameKu: "وێستگەی فامیلی مۆڵ سلێمانی",
      city: "Sulaymaniyah",
      cityAr: "السليمانية",
      cityKu: "سلێمانی",
      address: "Qalat Chwalan Road, Family Mall, Sulaymaniyah",
      lat: 35.5668,
      lng: 45.4180,
      powerKw: 100,
      plugs: ["CCS2", "GB/T DC", "Type 2"],
      portsCount: 6,
      status: "Available",
      fee: "250 IQD/kWh",
      hours: "24/7",
      phone: "+964 770 555 1234"
    },
    {
      id: "ev-bsr-01",
      name: "Basra Times Square EV Charger",
      nameAr: "محطة تايمز سكوير البصرة",
      nameKu: "وێستگەی تایمز سکوێری بەسرە",
      city: "Basra",
      cityAr: "البصرة",
      cityKu: "بەسرە",
      address: "Al-Jubaila, Basra Times Square Mall, Basra",
      lat: 30.5258,
      lng: 47.8124,
      powerKw: 120,
      plugs: ["CCS2", "GB/T DC"],
      portsCount: 4,
      status: "Available",
      fee: "Free parking with charging",
      hours: "10:00 AM - 12:00 AM",
      phone: "+964 780 222 3344"
    },
    {
      id: "ev-dhk-01",
      name: "Duhok Dream City Charger",
      nameAr: "محطة دريم سيتي دهوك",
      nameKu: "وێستگەی دریم سیتی دهۆک",
      city: "Duhok",
      cityAr: "دهوك",
      cityKu: "دهۆک",
      address: "Dream City Gate, Duhok Main Boulevard",
      lat: 36.8617,
      lng: 42.9880,
      powerKw: 60,
      plugs: ["CCS2", "Type 2"],
      portsCount: 4,
      status: "Available",
      fee: "250 IQD/kWh",
      hours: "24/7",
      phone: "+964 750 999 8877"
    }
  ];
  fs.writeFileSync(path.join(dataDir, 'evStations.json'), JSON.stringify(evStations, null, 2));
  console.log(`Saved ${evStations.length} EV charging stations.`);

  console.log("All data successfully downloaded and generated!");
}

main().catch(console.error);
