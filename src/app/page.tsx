// src/app/page.tsx
"use client";
import Image from "next/image";
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
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

const features = [
  { title: "Compassionate Team", desc: "Experienced nurses dedicated to patient-centered care." },
  { title: "Tailored Plans", desc: "Care designed around your needs, schedule and budget." },
  { title: "Local & Reliable", desc: "We operate from Eldoret and know the community well." },
  { title: "Transparent Pricing", desc: "Affordable home-based care with no hidden fees." },
];



export default function HomePage() {
  const [active, setActive] = useState<"mission" | "values" | "philosophy">("mission");

  const content = {
    mission: {
      title: "Our Mission",
      text: `Eldoret Home-Based Care has a special purpose to help people enjoy a safe home life filled with comfort, independence, and dignity. Our goal at Eldoret Home-Based Care is to provide the highest quality home health care services in Eldoret.

We believe our clients and their families deserve care delivered the best home-care way, with compassion, excellence, and reliability.`
    },
    values: {
      title: "Our Values",
      text: `At Eldoret Home-Based Care, we believe the well-being of our clients is our highest priority. Every person deserves to live a life of comfort, independence, and dignity within their own home. Our timeless values of compassion, excellence, and reliability guide the care we provide to families in Eldoret and across Uasin Gishu. By staying true to these values, we ensure that children, adults, and seniors receive professional and culturally sensitive support tailored to their unique needs. With our trusted home care services in Eldoret, we make it possible for people of all ages to experience their best quality of life, wherever they call home.`
    },
    philosophy: {
      title: "Our Philosophy",
      text: `At Eldoret Home-Based Care, we believe our clients always come first, and their well-being is at the heart of everything we do. We recognize that our caregivers and employees are our greatest asset, and we are committed to supporting them as they provide compassionate, professional care. Building strong relationships and working together with families and the community is essential to our success as trusted providers of home health care in Eldoret. We uphold honesty and integrity in all our services, ensuring families can rely on us with confidence. Beyond delivering care, we are dedicated to giving back through community service where we live and work. We also believe in maintaining a strong financial foundation to support our growth, so that more families in Eldoret and beyond can access quality, reliable, and affordable home-based care.`
    }
  };
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
                <Link href="#pricing" className="px-2 py-0.5 hover:text-sky-600">Pricing</Link>
                <Link href="/blog" className="px-2 py-0.5 hover:text-sky-600">Blogs</Link>
                <Link href="#appointment" className="px-2 py-0.5 hover:text-sky-600">Contact Us</Link>
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
                img: "/images/care3.jpeg",
              },
              {
                title: "Elderly & Personal Care",
                desc: "Support with bathing, feeding, mobility, and daily routines.",
                img: "/images/eld.jpeg",
              },
              {
                title: "Rehabilitation Therapy",
                desc: "Physiotherapy, occupational therapy, and recovery programs.",
                img: "/images/this.jpeg",
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

<section id="why" className="py-16 bg-gradient-to-b from-sky-50 to-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-sky-700">
      Why Families in Eldoret Trust Us
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
      At <span className="font-semibold text-sky-700">Eldoret Home-Based Care</span>, 
      we deliver compassionate, professional, and culturally sensitive care 
      for adults, seniors, and children across Uasin Gishu. Every service we offer 
      is designed to bring comfort, dignity, and peace of mind to your family.
    </p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: "Personal Care & Companionship",
          desc: "Gentle assistance with grooming, meals, mobility, and daily living—offered with kindness and respect.",
          icon: "🤝"
        },
        {
          title: "Home Health Care",
          desc: "Rehabilitative and therapeutic support after illness, injury, or hospital stay—all from the comfort of home.",
          icon: "🏡"
        },
        {
          title: "Private Duty Nursing",
          desc: "Dedicated nursing care for adults and seniors living with chronic illnesses, disabilities, or recovery needs.",
          icon: "🩺"
        },
        {
          title: "Pediatric Nursing",
          desc: "Loving, skilled care for children under 18—our nurses are available day or night, whenever needed.",
          icon: "👶"
        },
        {
          title: "End-of-Life Care",
          desc: "Hospice care that focuses on comfort, dignity, and peace—supporting both patients and families.",
          icon: "🌷"
        },
        {
          title: "Disability & Autism Support",
          desc: "Habilitation and ABA therapies to help children and adults with developmental needs thrive independently.",
          icon: "🌟"
        },
      ].map((w, i) => (
        <motion.div
          key={i}
          className="p-8 bg-white rounded-2xl shadow-md border border-gray-100 text-left hover:shadow-2xl hover:border-sky-200 transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: i * 0.15 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="text-4xl mb-4">{w.icon}</div>
          <h3 className="text-xl font-semibold text-sky-700">{w.title}</h3>
          <p className="mt-3 text-gray-600 leading-relaxed text-sm">{w.desc}</p>
        </motion.div>
      ))}
    </div>
     {/* Mission, Values & Philosophy - Clean Horizontal Tabs */}
<div className="mt-16 max-w-5xl mx-auto">
  {/* Horizontal tab buttons */}
  <div className="flex justify-center gap-10 border-b border-gray-200">
    {(["mission", "values", "philosophy"] as const).map((key) => (
      <button
        key={key}
        onClick={() => setActive(key)}
        className={`pb-2 text-lg font-medium transition-colors ${
          active === key
            ? "text-sky-700 border-b-2 border-sky-700"
            : "text-gray-600 hover:text-sky-600"
        }`}
      >
        {content[key].title}
      </button>
    ))}
  </div>

  {/* Active content */}
  <div className="mt-6 text-center">
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-2xl font-bold text-sky-700 mb-3">
          {content[active].title}
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          {content[active].text}
        </p>
      </motion.div>
    </AnimatePresence>
  </div>
</div>


  </div>
</section>


      
  {/* Pricing Section */}
<section id="pricing" className="py-20 bg-gradient-to-b from-white to-sky-50">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-sky-800">
      Eldoret HomeBased Care Affordabl Packages
    </h2>
    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
      Transparent rates tailored to your needs, no hidden fees, just quality care
    </p>

    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* General Nursing Care */}
      <div className="relative bg-white rounded-2xl border border-sky-100 shadow-md hover:shadow-xl transition-all p-8 text-left group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 to-sky-700 rounded-t-2xl"></div>
        <h3 className="text-xl font-semibold text-sky-700 mb-5">General Nursing Care</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            Vital signs monitoring (BP, sugar, temp, pulse) 
            <span className="font-semibold">KES 800–1,000 / visit</span>
          </li>
          <li className="flex justify-between">
            Wound dressing / Injection 
            <span className="font-semibold">KES 1,000–1,500 / session</span>
          </li>
          <li className="flex justify-between">
            IV therapy (fluids, medications) 
            <span className="font-semibold">KES 1,500–2,500 / session</span>
          </li>
          <li className="flex justify-between">
            Catheterization / Catheter care 
            <span className="font-semibold">KES 2,000–2,500 / session</span>
          </li>
        </ul>
      </div>

      {/* Mother & Child Care */}
      <div className="relative bg-white rounded-2xl border border-sky-100 shadow-md hover:shadow-xl transition-all p-8 text-left group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-400 to-rose-600 rounded-t-2xl"></div>
        <h3 className="text-xl font-semibold text-pink-600 mb-5">Mother & Child Care</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            Postnatal nursing support 
            <span className="font-semibold">KES 2,000–3,000 / visit</span>
          </li>
          <li className="flex justify-between">
            Newborn care (cord care, feeding support) 
            <span className="font-semibold">KES 2,000–3,500 / day</span>
          </li>
          <li className="flex justify-between">
            Immunization support & health education 
            <span className="font-semibold">KES 1,000–1,500 / visit</span>
          </li>
        </ul>
      </div>

      {/* Specialized Nursing Care */}
      <div className="relative bg-white rounded-2xl border border-sky-100 shadow-md hover:shadow-xl transition-all p-8 text-left group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-700 rounded-t-2xl"></div>
        <h3 className="text-xl font-semibold text-indigo-700 mb-5">Specialized Nursing Care</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            Post-surgery care (monitoring, dressing, medication) 
            <span className="font-semibold">KES 3,500–5,000 / day</span>
          </li>
          <li className="flex justify-between">
            Elderly care (mobility, feeding, hygiene) 
            <span className="font-semibold">KES 2,500–4,000 / day</span>
          </li>
          <li className="flex justify-between">
            Chronic illness management (diabetes, hypertension, cancer support) 
            <span className="font-semibold">KES 2,000–3,500 / session or day</span>
          </li>
          <li className="flex justify-between">
            Palliative care (comfort, pain management, support) 
            <span className="font-semibold">KES 4,000–6,000 / day</span>
          </li>
        </ul>
      </div>

      {/* Additional Services */}
      <div className="relative bg-white rounded-2xl border border-sky-100 shadow-md hover:shadow-xl transition-all p-8 text-left group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-t-2xl"></div>
        <h3 className="text-xl font-semibold text-emerald-700 mb-5">Additional Services</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            Physiotherapy at home 
            <span className="font-semibold">KES 2,500–4,000 / session</span>
          </li>
          <li className="flex justify-between">
            Nutrition & wellness coaching 
            <span className="font-semibold">KES 1,500–2,500 / consultation</span>
          </li>
          <li className="flex justify-between">
            Health education & family training 
            <span className="font-semibold">KES 2,000–3,000 / session</span>
          </li>
        </ul>
      </div>

      {/* Home-Based Packages */}
      <div className="relative bg-white rounded-2xl border border-sky-100 shadow-md hover:shadow-xl transition-all p-8 text-left group">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 to-orange-600 rounded-t-2xl"></div>
        <h3 className="text-xl font-semibold text-amber-600 mb-5">Home-Based Packages</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex justify-between">
            Day Care Nursing (8h) 
            <span className="font-semibold">KES 4,500–6,000 / day</span>
          </li>
          <li className="flex justify-between">
            Night Care Nursing (12h) 
            <span className="font-semibold">KES 5,500–7,500 / night</span>
          </li>
          <li className="flex justify-between">
            24-Hour Live-in Nursing Care 
            <span className="font-semibold">KES 10,000–15,000 / day</span>
          </li>
          <li className="flex justify-between text-sm text-gray-600 italic">
            (Often billed weekly/monthly: avg. KES 60,000–100,000 per week)
          </li>
          <li className="flex justify-between">
            Weekly Health Check Package (2–3 visits: vitals, meds, wound care) 
            <span className="font-semibold">KES 6,000–8,500 / week</span>
          </li>
        </ul>
      </div>
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
      <footer className="bg-sky-700 text-white py-8">
  <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-3">

    {/* Verification / Trust */}
    <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
      <MdVerifiedUser className="text-yellow-400 text-2xl sm:text-3xl animate-pulse" />
      <span>All our staff are licensed by the NCK</span>
    </div>

    {/* Divider between NCK and Humphries */}
    <div className="w-24 h-[1px] bg-white/50 my-2"></div>

    {/* Humphries Dev Studio logo + text horizontally aligned */}
    <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
      <Image
        src="/images/logo.jpeg"
        alt="Humphries Dev Studio Logo"
        width={28}
        height={28}
        className="object-contain"
      />
      <span>Developed by Humphries Dev Studio</span>
    </div>

    {/* Divider before copyright */}
    <div className="w-24 h-[1px] bg-white/50 my-2"></div>

    {/* Copyright */}
    <p className="text-xs sm:text-sm text-green-300">
      © {new Date().getFullYear()} Dial-a-Nurse Kenya. All rights reserved.
    </p>
  </div>
</footer>



    </main>
  );
}








