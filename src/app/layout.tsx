import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export const metadata: Metadata = {
  title: "iQ Cars - The Largest Online Car Marketplace in Iraq",
  description:
    "Buy and Sell your car on the most trusted car marketplace in Iraq. The best deal for buying and selling your car online anywhere in Iraq, Website of Cars For Sale in Iraq.",
  keywords: "Iraq Car, Iraq Cars, Car for sale in Iraq, Baghdad cars, Erbil cars, Sulaymaniyah cars, Basra cars",
  icons: {
    icon: "https://iqcars-assets.iqcars.io/images/iqcars_logo.svg",
  },
  openGraph: {
    title: "iQ Cars - The Largest Online Car Marketplace in Iraq",
    description:
      "Buy and Sell your car on the most trusted car marketplace in Iraq. The best deals across Baghdad, Erbil, Basra and all governorates.",
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
          <AuthModal />
        </AppProvider>
      </body>
    </html>
  );
}
