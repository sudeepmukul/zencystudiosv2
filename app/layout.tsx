import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Navbar from "./components/common/Navbar";
import { Montserrat } from 'next/font/google';

const montserratFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
  display: "swap",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zency Studios",
  description: "Creative Design Agency — Branding, Web, UI/UX, Motion, and Print.",
  keywords: "Zency Studios, Creative Design Agency, Branding, Web Design, UI/UX, Motion Design, 3D, Print Design",
  authors: [{ name: "Zency Studios" }],
  creator: "Zency Studios",
  publisher: "Zency Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Zency Studios — Creative Design Agency",
    description: "Creative Design Agency — Branding, Web, UI/UX, Motion, and Print.",
    url: "https://mohitvirli.github.io",
    siteName: "Zency Studios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zency Studios — Creative Design Agency",
    description: "Creative Design Agency — Branding, Web, UI/UX, Motion, and Print.",
  },
  verification: {
    google: "GsRYY-ivL0F_VKkfs5KAeToliqz0gCrRAJKKmFkAxBA",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} ${montserratFont.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>

    </html>
  );
}
