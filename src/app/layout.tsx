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
    "Eco Clean provides textile supply and laundry services for hotels, restaurants, hospitals and other businesses across Kosovo and the region.",
  openGraph: {
    title: "Eco Clean — The standard of clean.",
    description:
      "Textile supply, laundry services and Streamline stock management across Kosovo and the region.",
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
