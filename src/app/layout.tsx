import type { Metadata } from "next";
import { Poppins, Mulish } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artkelmendi.github.io/ecoclean-v2"),
  title: "Eco Clean — Industrial Laundry & Textile Care, Kosovo",
  description:
    "Kosovo's leading industrial laundry. Trusted by the Kosovo Police, the Kosovo Security Force and the country's finest hotels. Hotel linen, restaurant textiles, healthcare and uniform programs — with a 24h turnaround.",
  openGraph: {
    title: "Eco Clean — The standard of clean.",
    description:
      "Industrial laundry trusted by the Kosovo Police, the KSF and Kosovo's finest hotels.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/drum-poster.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${mulish.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
