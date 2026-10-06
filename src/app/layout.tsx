import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "iQ Cars - Official Certified Automotive Dealership in Iraq",
  description:
    "Official Certified Automotive Dealership in Iraq. Browse 100% inspected luxury and certified vehicles with official warranty, 360° virtual showroom, and flexible Qist installment financing.",
  keywords: "Iraq Dealership, Certified Cars Iraq, Baghdad luxury cars, Erbil cars, Sulaymaniyah cars, Basra cars, Qist financing Iraq",
  icons: {
    icon: "https://iqcars-assets.iqcars.io/images/iqcars_logo.svg",
  },
  openGraph: {
    title: "iQ Cars - Official Certified Automotive Dealership in Iraq",
    description:
      "Official Certified Automotive Dealership in Iraq. Browse 100% inspected vehicles with certified warranty, 360° virtual showroom, and flexible Qist installments across Baghdad, Erbil, and Basra.",
    images: ["https://iqcars-assets.iqcars.io/images/banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-[#0f1722] text-gray-900 dark:text-gray-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
