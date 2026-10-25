import type { Metadata, Viewport } from "next";
import { Poppins, Mulish } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import { BUSINESS, HOME_TITLE, HOME_DESCRIPTION, SITE_URL } from "@/lib/site";
import { introBootstrap } from "@/lib/intro";

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
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: "%s | Eco Clean" },
  description: HOME_DESCRIPTION,
  applicationName: BUSINESS.name,
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  category: "Industrial laundry and textile services",
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [{ url: asset("/icons/icon-96.png"), sizes: "96x96", type: "image/png" }],
    apple: [{ url: asset("/icons/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = { themeColor: "#297cf5" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
        <noscript><style>{`.brand-intro{display:none!important}`}</style></noscript>
      </head>
      <body className={`${poppins.variable} ${mulish.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
