/*
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
  
} from "lucide-react";


const features = [
  { title: "Compassionate Team", desc: "Experienced nurses dedicated to patient-centered care." },
  { title: "Tailored Plans", desc: "Care designed around your needs, schedule and budget." },
  { title: "Local & Reliable", desc: "We operate from Eldoret and know the community well." },
  { title: "Transparent Pricing", desc: "Affordable home-based Nursing care with no hidden fees." },
];



export default function HomePage() {
  const [active, setActive] = useState<"mission" | "values" | "philosophy">("mission");

  const content = {
    mission: {
      title: "Our Mission",
      text: `Eldoret Home-Based Nursing Care has a special purpose to help people enjoy a safe home life filled with comfort, independence, and dignity. Our goal at Eldoret Home-Based Nursing Care is to provide the highest quality home health care services in Eldoret.

We believe our clients and their families deserve care delivered the best home-care way, with compassion, excellence, and reliability.`
    },
    values: {
      title: "Our Values",
      text: `At Eldoret Home-Based Nursing Care, we believe the well-being of our clients is our highest priority. Every person deserves to live a life of comfort, independence, and dignity within their own home. Our timeless values of compassion, excellence, and reliability guide the care we provide to families in Eldoret and across Uasin Gishu. By staying true to these values, we ensure that children, adults, and seniors receive professional and culturally sensitive support tailored to their unique needs. With our trusted home care services in Eldoret, we make it possible for people of all ages to experience their best quality of life, wherever they call home.`
    },
    philosophy: {
      title: "Our Philosophy",
      text: `At Eldoret Home-Based Nursing Care, we believe our clients always come first, and their well-being is at the heart of everything we do. We recognize that our caregivers and employees are our greatest asset, and we are committed to supporting them as they provide compassionate, professional care. Building strong relationships and working together with families and the community is essential to our success as trusted providers of home health care in Eldoret. We uphold honesty and integrity in all our services, ensuring families can rely on us with confidence. Beyond delivering care, we are dedicated to giving back through community service where we live and work. We also believe in maintaining a strong financial foundation to support our growth, so that more families in Eldoret and beyond can access quality, reliable, and affordable home-based care.`
    }
  };
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      
      <div className="bg-sky-700 text-white text-[12px]">
        <div className="max-w-7xl mx-auto px-2 py-1 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Eldoret, Uasin Gishu County
            </span>
            <span className="flex items-center gap-1">
              <Phone size={14} /> 0728 762 044
            </span>
            <span className="flex items-center gap-1">
              <Mail size={14} /> info@eldorethomecare.co.ke
            </span>
          </div>

          
     
<div className="flex items-center gap-2 flex-wrap justify-center">
  <a
    href="https://www.facebook.com/profile.php?id=61563652291470"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="hover:text-gray-200 transition"
  >
    <Facebook size={14} />
  </a>
  <a
    href="https://www.instagram.com/dial_a_nurse_kenya?igsh=Z2gzMGFiZTZmeHI2"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="hover:text-gray-200 transition"
  >
    <Instagram size={14} />
  </a>
  <a
    href="https://www.linkedin.com/in/dial-a-nurse-home-based-nursing-care-eldoret-5975b1389/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="hover:text-gray-200 transition"
  >
    <Linkedin size={14} />
  </a>
  <a
  href="https://x.com/HomeCareEldoret"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="X (formerly Twitter)"
  className="hover:text-gray-200 transition"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 1227"
    width={14}
    height={14}
    fill="currentColor"
  >
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.747 681.821L0 1226.37H105.864L515.373 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.201 687.828L521.124 619.931L144.52 80.036H306.401L602.325 505.509L650.402 573.406L1056.31 1146.33H894.428L569.201 687.828Z" />
  </svg>
</a>


</div>


        </div>
      </div>

      
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2">
          
          <div className="flex flex-wrap items-center justify-between py-1 gap-2">
            
<div className="flex-shrink-0 h-8 flex items-center gap-2 text-sm sm:text-lg font-bold text-sky-700 whitespace-nowrap">
  <Image
    src="/images/land.png"
    alt="Dial-a-Nurse Kenya logo"
    width={100}
    height={36}
    className="object-contain rounded-md"
    priority
  />
  Dial-a-Nurse Kenya
</div>


            
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

              
              <div className="flex items-center gap-1 text-[11px] text-gray-600 whitespace-nowrap">
                <Link href="/login/nurse" className="hover:text-sky-600 text">
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

      
      <section className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden">
        <Image
          src="/images/kwanza.jpeg"
          alt="Home-based care in Eldoret, Uasin Gishu County"
          fill
          priority
          className="object-cover object-top sm:object-center"
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none" />

        
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 pb-8 sm:pb-14">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center sm:text-left">
              Home-Based Nursing Care in Eldoret, Uasin Gishu
            </h1>

            <p className="mt-3 text-white/90 text-sm sm:text-base md:text-lg max-w-2xl text-center sm:text-left">
              Compassionate, skilled nursing and elderly care delivered to your
              home in Eldoret town and surrounding areas.
            </p>

            
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

      
      <section id="about" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4 overflow-hidden">
  
  <div className="w-1/2 flex justify-center">
    <img
      src="/images/vvv.png"
      alt="Who we are"
      className="rounded-xl object-contain w-full h-auto max-w-[380px]"
    />
  </div>

  
  <div className="w-1/2 text-left">
    <h2 className="text-2xl md:text-3xl font-bold text-sky-700">
      Who we are
    </h2>
    <p className="mt-3 text-gray-600 leading-relaxed">
      Dial-a-Nurse Kenya provides trusted home-based nursing and caregiving
      across Eldoret and Uasin Gishu. Our team offers personalised care
      plans, skilled nursing, rehabilitation, and compassionate support
      for elderly and chronically ill patients in the comfort of their
      homes.
    </p>
  </div>
</div>


      </section>

      
      <section id="services" className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-700 text-center">
            Our Home Care Services in Eldoret
          </h2>
          <p className="mt-2 text-gray-600 text-center">
            Comprehensive home-based nursing care across Uasin Gishu County
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
              {
                title: "Adolescent Mentorship & Life Skills",
                desc: "Guiding youth (12–19) in Eldoret through decision-making, emotional balance, self-esteem, healthy relationships, and family collaboration.",
                img: "/images/m.jpg",
              },
              {
                title: "Mother & Child Care",
                desc: "Postnatal and post-operative (C-section) nursing care for mothers in Eldoret homes, including newborn feeding support, cord care, recovery monitoring, immunization follow-up, and home-based nursing maternal health education across Uasin Gishu County.",
                img: "/images/han.png",
              },
              {
                title: "Hospital Admission & Patient Transition Support",
                desc: "Professional hospital admission, discharge, and in-hospital care support in Eldoret and Uasin Gishu. Our nurses ensure smooth admission, safe discharge, and continuous bedside monitoring, providing recovery and home-based nursing follow-up.",
                img: "/images/ad.jpg",
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
          
<div className="mt-16">
  <h3 className="text-xl md:text-2xl font-bold text-sky-700 text-center">
    How Eldoret Home-Based Nursing Care Works
  </h3>

  <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
    {[
      {
        step: "1",
        title: "Contact Us",
        desc: "Reach out to our Eldoret care team and we’ll create your secure patient account instantly.",
      },
      {
        step: "2",
        title: "Log In Anytime",
        desc: "Get immediate access to your digital dashboard with medical records and progress reports.",
      },
      {
        step: "3",
        title: "Browse Services",
        desc: "Discover personalized nursing, elderly care, and therapy services tailored to your family’s needs.",
      },
      {
        step: "4",
        title: "Connect With Nurses",
        desc: "Message specialized caregivers, arrange schedules, and track progress in real time.",
      },
      {
        step: "5",
        title: "Start Care",
        desc: "Enjoy paperless, compassionate care at the comfort of your home in Eldoret and Uasin Gishu.",
      },
    ].map((item, i) => (
      <div key={i} className="relative">
        
        <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-sky-700 text-white font-bold text-lg shadow-md">
          {item.step}
        </div>
        <h4 className="mt-4 font-semibold text-sky-700">{item.title}</h4>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>


</div>

        </div>
      </section>
      

<section id="why" className="py-16 bg-gradient-to-b from-sky-50 to-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-sky-700">
      Why Families in Eldoret Trust Us
    </h2>
    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
      At <span className="font-semibold text-sky-700">Eldoret Home-Based Nursing Care</span>, 
      we deliver compassionate, professional, and culturally sensitive care 
      for adults, seniors, and children across Uasin Gishu. Every service we offer 
      is designed to bring comfort, dignity, and peace of mind to your family.
    </p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          title: "Personal Care & Companionship",
          desc: "Gentle assistance with grooming, meals, mobility, and daily living,offered with kindness and respect.",
          icon: "🤝"
        },
        {
          title: "Home Health Care",
          desc: "Rehabilitative and therapeutic support after illness, injury, or hospital stay, all from the comfort of home.",
          icon: "🏡"
        },
        {
          title: "Private Duty Nursing",
          desc: "Dedicated nursing care for adults and seniors living with chronic illnesses, disabilities, or recovery needs.",
          icon: "🩺"
        },
        {
          title: "Pediatric Nursing",
          desc: "Loving, skilled care for children under 18, our nurses are available day or night, whenever needed.",
          icon: "👶"
        },
        {
          title: "End-of-Life Care",
          desc: "Hospice care that focuses on comfort, dignity, and peace, supporting both patients and families.",
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
     
<div className="mt-16 max-w-5xl mx-auto">
  
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


      
  
<section
  id="pricing"
  className="py-20 bg-gradient-to-b from-white via-sky-50 to-emerald-50 text-gray-800"
>
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-sky-700 mb-10">
      What Our Home Nursing Pricing Covers in Eldoret
    </h2>

    <p className="max-w-3xl mx-auto text-gray-600 mb-12 text-lg">
      <strong>Dial-a-Nurse Kenya</strong> provides professional{" "}
      <strong>home-based nursing care in Eldoret and Uasin Gishu County</strong>,
      supporting patients, families, and seniors with trusted in-home and in-hospital nursing services.
      Below is a breakdown of what our care packages cover, ensuring safe recovery and comfort at home or in hospitals.
    </p>

    <div className="space-y-10 text-left">
      
      
      <div>
        <h3 className="text-2xl font-semibold text-sky-700 border-b-2 border-sky-200 pb-2 mb-3">
          General Nursing Care
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Vital signs monitoring, blood pressure, blood sugar, temperature, and pulse checks.</li>
          <li>Medication administration, wound dressing, injections, and IV therapy at home.</li>
          <li>Catheterization, catheter care, and routine nursing performed by registered nurses.</li>
        </ul>
      </div>

      
<div className="my-12">
  <h3 className="text-2xl font-semibold text-emerald-700 border-b border-emerald-300 pb-2 mb-8 text-center">
    Hospital Admission & Patient Transition Support
  </h3>

  <div className="flex flex-col divide-y divide-gray-300">
    
    <div className="py-6">
      <h4 className="text-lg font-semibold text-emerald-700 mb-2">
        Hospital Admission Assistance
      </h4>
      <p className="text-gray-700 text-base leading-relaxed">
        We help families in Eldoret and Uasin Gishu navigate smooth
        hospital admission processes, ensuring seamless transition between
        home-based nursing and hospital care.
      </p>
    </div>

    
    <div className="py-6">
      <h4 className="text-lg font-semibold text-emerald-700 mb-2">
        Patient Discharge & Transition Care
      </h4>
      <p className="text-gray-700 text-base leading-relaxed">
        Our nurses coordinate safe and comfortable hospital discharge,
        providing follow-up recovery and home nursing support across Eldoret and Uasin Gishu.
      </p>
    </div>

    
    <div className="py-6">
      <h4 className="text-lg font-semibold text-emerald-700 mb-2">
        In-Hospital Patient Care Support
      </h4>
      <p className="text-gray-700 text-base leading-relaxed">
        For admitted patients, our qualified bedside nurses in Eldoret hospitals
        provide continuous monitoring, companionship, and compassionate recovery support
        to ensure comfort during hospitalization.
      </p>
    </div>
  </div>
</div>



      
      <div>
        <h3 className="text-2xl font-semibold text-pink-600 border-b-2 border-pink-200 pb-2 mb-3">
          Mother & Child Care
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Postnatal nursing and maternal health support for mothers in Eldoret homes.</li>
          <li>Newborn feeding guidance, cord care, and developmental health monitoring.</li>
          <li>Immunization tracking and home-based health education for mothers and infants.</li>
        </ul>
      </div>

      
      <div>
        <h3 className="text-2xl font-semibold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-3">
          Specialized Nursing Care
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Post-surgery recovery, wound dressing, and vital follow-ups at home.</li>
          <li>Elderly care, mobility support, and hygiene management for seniors.</li>
          <li>Chronic illness management for diabetes, hypertension, and cancer care in Eldoret.</li>
          <li>Palliative and hospice nursing, offering end-of-life comfort and dignity.</li>
        </ul>
      </div>

      
      <div>
        <h3 className="text-2xl font-semibold text-emerald-700 border-b-2 border-emerald-200 pb-2 mb-3">
          Additional Services
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Physiotherapy and home rehabilitation in Eldoret and Uasin Gishu County.</li>
          <li>Nutrition guidance, wellness education, and family health training.</li>
          <li>Patient admission, discharge coordination, and hospital bedside care.</li>
          <li>Adolescent mentorship and health awareness for youth and parents.</li>
        </ul>
      </div>

      
      <div>
        <h3 className="text-2xl font-semibold text-amber-700 border-b-2 border-amber-200 pb-2 mb-3">
          Home-Based Packages
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Day and night nursing shifts for observation and continuous care.</li>
          <li>24-hour live-in home nursing for bedridden and dependent patients.</li>
          <li>Weekly vitals check, wound care, and medication follow-up by registered nurses.</li>
        </ul>
      </div>

      
      
<div className="pt-10 border-t border-gray-300 mt-10">
  <h3 className="text-2xl font-semibold text-purple-700 border-b-2 border-purple-200 pb-4 mb-6 text-center md:text-left">
    Adolescent Mentorship & Life Skills Program
  </h3>

  
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    
    <div className="md:w-1/2 w-full flex justify-center">
      <Image
        src="/images/ca.jpeg"
        alt="Adolescent Mentorship and Life Skills Program in Eldoret for Teens and Youth Development"
        width={900}
        height={500}
        className="rounded-xl w-full max-h-72 object-contain"
        priority
      />
    </div>

    
    <div className="md:w-1/2 w-full">
  <p className="text-gray-700 leading-relaxed">
    The Adolescent Mentorship and Life Skills Program in Eldoret empowers youth aged 12–19 to develop confidence, career path, emotional stability, and effective communication through nurse-led guidance. This youth mentorship initiative focuses on decision-making, goal-setting, and emotional wellness, promoting self-esteem, resilience, and positive behavior among adolescents. It integrates healthy lifestyle awareness, responsible relationships, and peer mentorship sessions that encourage teamwork and self-expression. Parents are actively involved to create a holistic family-based support system, ensuring that every teenager across Uasin Gishu County receives personalized life skills coaching for better emotional balance, academic focus, and personal growth.
  </p>
</div>


  </div>
</div>


    </div>

    <div className="mt-16 text-center">
      <p className="text-sky-700 font-semibold text-lg">
        Contact <strong>Dial-a-Nurse Kenya</strong> today for customized home care
        or hospital nursing support, compassionate, professional, and built
        around your family’s needs.
      </p>
    </div>
  </div>
</section>










      
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
            <p className="font-semibold">📧 info@eldorethomecare.co.ke</p>
            <p>📍 Eldoret, Uasin Gishu County</p>
          </div>
        </div>
      </section>

      
<footer className="bg-sky-700 text-white py-8">
  <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-3">

    
    <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
      <MdVerifiedUser className="text-yellow-400 text-2xl sm:text-3xl animate-pulse" />
      <span>All our staff are licensed by the NCK</span>
    </div>

    
    <div className="w-full h-[1px] bg-white/50 my-2"></div>

    
    <p className="text-xs text-center sm:text-base px-4 leading-relaxed">
      Eldoret Home-Based Nursing Care is committed to truth in advertising, ensuring all information accurately reflects our home care services, professional licenses, service rates, and client testimonials. We pride ourselves on transparency, integrity, and delivering trusted home care across Eldoret and Uasin Gishu County.
    </p>

    
    <div className="w-full h-[1px] bg-white/50 my-2"></div>

    
    <div className="flex items-center gap-2 text-sm sm:text-base font-medium">
      <Image
        src="/images/logo.jpeg"
        alt="Humphries Dev Studio Logo"
        width={28}
        height={28}
        className="object-contain rounded-full"
      />
      <span>Developed by Humphries Dev Studio</span>
    </div>

    
    <div className="w-16 h-[1px] bg-white/40 my-2"></div>

    
    <div className="flex items-center gap-3 flex-wrap justify-center text-white/80">
      <a
        href="https://www.facebook.com/profile.php?id=61563652291470"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="hover:text-white transition transform hover:scale-110"
      >
        <Facebook size={18} />
      </a>
      <a
        href="https://www.instagram.com/dial_a_nurse_kenya?igsh=Z2gzMGFiZTZmeHI2"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:text-white transition transform hover:scale-110"
      >
        <Instagram size={18} />
      </a>
      <a
        href="https://www.linkedin.com/in/dial-a-nurse-home-based-nursing-care-eldoret-5975b1389/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="hover:text-white transition transform hover:scale-110"
      >
        <Linkedin size={18} />
      </a>
      <a
        href="https://x.com/HomeCareEldoret"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (formerly Twitter)"
        className="hover:text-white transition transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 1227"
          width={18}
          height={18}
          fill="currentColor"
        >
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.747 681.821L0 1226.37H105.864L515.373 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.201 687.828L521.124 619.931L144.52 80.036H306.401L602.325 505.509L650.402 573.406L1056.31 1146.33H894.428L569.201 687.828Z" />
        </svg>
      </a>
    </div>

    
    <div className="w-24 h-[1px] bg-white/40 my-2"></div>

    
    <p className="text-xs sm:text-sm text-green-300">
      © {new Date().getFullYear()} Dial-a-Nurse Kenya. All rights reserved.
    </p>
  </div>
</footer>




    </main>
  );
}
  */

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <img 
        src="/images/pesa.png" 
        alt="Payment Required" 
        className="w-[600px] h-auto"
      />
    </main>
  );
}









