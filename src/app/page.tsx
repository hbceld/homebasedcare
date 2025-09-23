// src/app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Home-Based Care in Eldoret Town, Uasin Gishu – Dial-a-Nurse Kenya",
  description:
    "Book trusted home-based care in Eldoret town, Uasin Gishu County. Our nurses provide skilled nursing, personal care, rehabilitation, and elderly care directly at your home.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Top info (small) */}
      <div className="bg-sky-700 text-white text-[12px]">
        <div className="max-w-7xl mx-auto px-2 py-1 flex flex-wrap items-center justify-between gap-2">
          {/* left info (wraps on tiny screens) */}
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Eldoret, Uasin Gishu County
            </span>
            <span className="flex items-center gap-1">
              <Phone size={14} /> 0728 762 044
            </span>
            <span className="flex items-center gap-1">
              <Mail size={14} /> info@dialanurse.co.ke
            </span>
          </div>

          {/* socials (stay in one line, wrap below if needed) */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {[Facebook, Instagram, Youtube, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="hover:text-gray-200" aria-label="social">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2">
          {/* Top row: logo + actions/logins (wrap on very small screens) */}
          <div className="flex flex-wrap items-center justify-between py-1 gap-2">
            {/* Logo */}
            <div className="flex-shrink-0 h-8 flex items-center text-sm sm:text-lg font-bold text-sky-700 whitespace-nowrap">
              Dial-a-Nurse Kenya
            </div>

            {/* Right side (links + logins) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm justify-end">
              <Link
                href="#appointment"
                className="underline underline-offset-2 decoration-2 font-semibold hover:text-sky-600"
              >
                Make Appointment
              </Link>
              <Link
                href="#services"
                className="underline underline-offset-2 decoration-2 font-semibold hover:text-sky-600"
              >
                Explore Services
              </Link>

              {/* logins */}
              <div className="flex items-center gap-1 text-[11px] text-gray-600 whitespace-nowrap">
                <Link href="/login/nurse" className="hover:text-sky-600">
                  Nurse Login
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/login/patient" className="hover:text-sky-600">
                  Patient Login
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/login/admin" className="hover:text-sky-600">
  Admin Login
</Link>

              </div>
            </div>
          </div>

          {/* Bottom row: main nav, scrolls if too tight */}
          <div className="border-t border-gray-100">
            <nav className="w-full overflow-x-auto whitespace-nowrap py-1">
              <div className="inline-flex items-center gap-2 px-2 text-xs sm:text-sm">
                <Link href="#" className="px-2 py-0.5 hover:text-sky-600">Home</Link>
                <Link href="#about" className="px-2 py-0.5 hover:text-sky-600">About Us</Link>
                <Link href="#services" className="px-2 py-0.5 hover:text-sky-600">Services</Link>
                <Link href="#why" className="px-2 py-0.5 hover:text-sky-600">Why Us</Link>
                <Link href="/blog" className="px-2 py-0.5 hover:text-sky-600">Blogs</Link>
                <Link href="#contact" className="px-2 py-0.5 hover:text-sky-600">Contact Us</Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - text placed at bottom so it doesn't cover faces */}
      <section className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
        <Image
          src="/images/kwanza.jpeg"
          alt="Home-based care in Eldoret, Uasin Gishu County"
          fill
          priority
          className="object-cover object-top sm:object-center"
        />

        {/* subtle gradient to help text legibility but not over-darken image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />

        {/* content sits near bottom so image subject remains visible */}
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 pb-8 sm:pb-14">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center sm:text-left">
              Home-Based Care in Eldoret, Uasin Gishu
            </h1>

            <p className="mt-3 text-white/90 text-sm sm:text-base md:text-lg max-w-2xl text-center sm:text-left">
              Compassionate, skilled nursing and elderly care delivered to your
              home in Eldoret town and surrounding areas.
            </p>

            {/* Underlined text links (no buttons) placed below headline */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Link
                href="#appointment"
                className="text-white underline underline-offset-4 decoration-2 font-semibold hover:text-sky-200"
              >
                Make Appointment
              </Link>
              <Link
                href="#services"
                className="text-white underline underline-offset-4 decoration-2 font-semibold hover:text-sky-200"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About (brief, optional) */}
      <section id="about" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-700">
            Who we are
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl">
            Dial-a-Nurse Kenya provides trusted home-based nursing and caregiving
            across Eldoret and Uasin Gishu. Our team offers personalised care
            plans, skilled nursing, rehabilitation, and compassionate support
            for elderly and chronically ill patients in the comfort of their
            homes.
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-700 text-center">
            Our Home Care Services in Eldoret
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Comprehensive home-based care across Uasin Gishu County
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Skilled Nursing",
                desc: "Medication, wound care, injections, and vital monitoring.",
                img: "/images/service-nursing.jpg",
              },
              {
                title: "Elderly & Personal Care",
                desc: "Support with bathing, feeding, mobility, and daily routines.",
                img: "/images/service-elderly.jpg",
              },
              {
                title: "Rehabilitation Therapy",
                desc: "Physiotherapy, occupational therapy, and recovery programs.",
                img: "/images/service-therapy.jpg",
              },
            ].map((s, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-44 md:h-56">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-lg font-semibold text-sky-700">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-700">
            Why families in Eldoret trust us
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Compassionate Team",
                desc: "Experienced nurses dedicated to patient-centered care.",
              },
              {
                title: "Tailored Plans",
                desc: "Care designed around your needs, schedule and budget.",
              },
              {
                title: "Local & Reliable",
                desc: "We operate from Eldoret and know the community well.",
              },
              {
                title: "Transparent Pricing",
                desc: "Affordable home-based care with no hidden fees.",
              },
            ].map((w, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-xl shadow-sm text-left"
              >
                <h3 className="text-lg font-semibold text-sky-700">{w.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment / Contact */}
      <section id="appointment" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-700">
            Make an appointment
          </h2>
          <p className="mt-3 text-gray-600">
            Call or email to schedule a home visit, or send a message and we
            will get back to you.
          </p>
          <div className="mt-5 space-y-2 text-gray-800">
            <p className="font-semibold">📞 0728 762 044</p>
            <p className="font-semibold">📧 info@dialanurse.co.ke</p>
            <p>📍 Eldoret, Uasin Gishu County</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sky-700 text-white py-6 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Dial-a-Nurse Kenya. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}








