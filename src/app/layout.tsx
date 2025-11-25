/*
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
    "Dial-a-Nurse Kenya – 24 Hour Home-Based Nursing Care in Eldoret, Uasin Gishu County",
  description:
    "Dial-a-Nurse Kenya provides 24-hour professional home nursing and elderly care services in Eldoret and Uasin Gishu County. Skilled, compassionate nurses for patients, post-surgery recovery, rehabilitation, and palliative care at home.",
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
  metadataBase: new URL("https://eldorethomecare.co.ke/"),
  alternates: {
    canonical: "https://eldorethomecare.co.ke/",
  },
  openGraph: {
    title: "Dial-a-Nurse Kenya | Home-Based Care in Eldoret, Uasin Gishu",
    description:
      "Professional home nursing and care services delivered to your home in Eldoret, Uasin Gishu County.",
    url: "https://eldorethomecare.co.ke/",
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
    icon: [{ url: "/images/w.png", type: "image/png" }],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
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
  // kept here for completeness; the <meta> tag below is what Search Console reads.
  verification: {
    google: "7GpvFzm_vJAJfUQaf72fx2sUFl3zamrNs9TvxunCJwA",
  },
  other: {
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
        {}
        <meta
          name="google-site-verification"
          content="7GpvFzm_vJAJfUQaf72fx2sUFl3zamrNs9TvxunCJwA"
        />

        {}
        <meta name="msvalidate.01" content="your-bing-verification-code" />

        {}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{/*
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Dial-a-Nurse Kenya",
              image: "https://eldorethomecare.co.ke/images/og-homecare.jpg",
              "@id": "https://eldorethomecare.co.ke/",
              url: "https://eldorethomecare.co.ke/",
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
                    "Sunday",
                  ],
                  opens: "00:00",
                  closes: "23:59",
                },
              ],
              sameAs: [
                "https://www.facebook.com/profile.php?id=61563652291470",
                "https://x.com/HomeCareEldoret",
                "https://www.linkedin.com/in/dial-a-nurse-home-based-nursing-care-eldoret-5975b1389/",
              ],
            }),
          }}
        />

        {}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "24 Hour Home-Based Nursing Care",
              provider: {
                "@type": "MedicalBusiness",
                name: "Dial-a-Nurse Kenya",
                areaServed: {
                  "@type": "AdministrativeArea",
                  name: "Eldoret, Uasin Gishu County, Kenya",
                },
              },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: "https://eldorethomecare.co.ke",
                availableLanguage: ["English", "Swahili"],
              },
              hoursAvailable: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${playfair.variable} antialiased bg-white text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}*/
