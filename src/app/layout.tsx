import "./globals.css";
import { ReactNode } from "react";
import { LanguageProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import CustomCursor from "@/components/CustomCursor";


// app/layout.tsx atau app/metadata.ts (tergantung strukturmu)

export const metadata = {
  title: "Theodore Kasyfillah",
  description: "Portfolio Theodore Kasyfillah",

  icons: {
    icon: "/logo/Logo teds petak.png",     // favicon standar
    shortcut: "/logo/Logo teds petak.png", // favicon shortcut (biasanya sama)
    apple: "/logo/Logo teds petak.png",    // favicon untuk iOS (apple touch icon)
  },

  openGraph: {
    title: "Theodore Kasyfillah",
    description: "Portfolio Theodore Kasyfillah",
    url: "https://theodorekasyfillah.netlify.app/", // ganti dengan domain kamu
    siteName: "Theodore Kasyfillah",
    images: [
      {
        url: "/logo/Thumbnail.png", // path lokal atau URL absolut
        width: 1200,
        height: 630,
        alt: "Theodore Kasyfillah Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Theodore Kasyfillah",
    description: "Portfolio Theodore Kasyfillah",
    images: ["/logo/Thumbnail.png"],
    creator: "@tedskasy",
  },
};



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={ " bg-brand-dark text-white"}>
        <LanguageProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}