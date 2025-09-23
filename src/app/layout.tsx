import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Dial-a-Nurse Kenya – Home-Based Care in Eldoret, Uasin Gishu County",
  description:
    "Trusted home care services in Eldoret town, Uasin Gishu County. Skilled nurses for elderly care, patient support, rehabilitation, and palliative home-based care at home.",
  keywords: [
    "home-based care Eldoret",
    "home nursing Eldoret",
    "home care Uasin Gishu",
    "elderly care Eldoret",
    "patient care at home Kenya",
    "nurse booking Eldoret",
    "palliative care Eldoret",
    "rehabilitation Eldoret",
    "Dial-a-Nurse Kenya",
    // ✅ Added more local SEO keywords
    "private nurse Eldoret",
    "home health care Eldoret",
    "Eldoret nursing services",
    "home caregivers Eldoret",
    "nursing agency Eldoret",
    "bedridden patient care Eldoret",
    "in-home nursing Eldoret",
    "home visit nurse Eldoret",
    "palliative nursing Kenya",
    "Eldoret elderly support services",
    "post-surgery home care Eldoret",
    "disability care Eldoret",
    "chronic illness care Eldoret",
    "hospice care Eldoret",
    "medical home care Uasin Gishu",
    "home physiotherapy Eldoret",
    "home-based rehabilitation Eldoret",
    "skilled nursing at home Kenya",
    "Eldoret maternal and child care at home",
    "nurse for hire Eldoret",
  ],
  metadataBase: new URL("https://dialanurse.co.ke"),
  alternates: {
    canonical: "https://dialanurse.co.ke",
  },
  openGraph: {
    title: "Dial-a-Nurse Kenya | Home-Based Care in Eldoret, Uasin Gishu",
    description:
      "Professional home nursing and care services delivered to your home in Eldoret, Uasin Gishu County.",
    url: "https://dialanurse.co.ke",
    siteName: "Dial-a-Nurse Kenya",
    images: [
      {
        url: "/images/og-homecare.jpg",
        width: 1200,
        height: 630,
        alt: "Dial-a-Nurse Kenya – Home Care Eldoret",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dial-a-Nurse Kenya | Home-Based Care Eldoret",
    description:
      "Trusted home care in Eldoret, Uasin Gishu County. Skilled nurses for elderly care, rehabilitation & palliative support.",
    images: ["/images/og-homecare.jpg"],
    creator: "@DialANurseKE",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#0ea5e9",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code", // ✅ works fine
    // bing must go in <head> manually
  },
  other: {
    // Local SEO hints
    "geo.region": "KE-UG",
    "geo.placename": "Eldoret",
    "geo.position": "0.5143;35.2698",
    ICBM: "0.5143, 35.2698",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Bing Verification (manual, since Next.js metadata doesn’t support bing) */}
        <meta name="msvalidate.01" content="your-bing-verification-code" />

        {/* ✅ JSON-LD Schema for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Dial-a-Nurse Kenya",
              image: "https://dialanurse.co.ke/images/og-homecare.jpg",
              "@id": "https://dialanurse.co.ke",
              url: "https://dialanurse.co.ke",
              telephone: "+254728762044",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Eldoret Town",
                addressLocality: "Eldoret",
                addressRegion: "Uasin Gishu",
                postalCode: "30100",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 0.5143,
                longitude: 35.2698,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              sameAs: [
                "https://www.facebook.com/yourpage",
                "https://twitter.com/DialANurseKE",
                "https://www.linkedin.com/company/dialanursekenya",
              ],
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} antialiased bg-white text-gray-800`}>
        {children}
      </body>
    </html>
  );
}


