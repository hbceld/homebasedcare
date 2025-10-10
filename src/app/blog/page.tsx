// src/app/blog/page.tsx
"use client";

import { FaUserNurse, FaHome, FaNotesMedical, FaBandAid, FaHandHoldingHeart} from "react-icons/fa";

export default function BlogPage() {
  const blogs = [
    {
      id: 1,
      title: "Home-Based Nursing Care in Eldoret: Why Families Trust Dial-a-Nurse Kenya",
      date: "October 10, 2025",
      author: "Dial-a-Nurse Team",
      excerpt: `Dial-a-Nurse Kenya provides compassionate, skilled home-based nursing care in Eldoret and across Uasin Gishu County. 
For families searching “home-based nursing care Eldoret” or “home care Eldoret,” our team delivers personalised nursing, elderly care, wound management, medication administration, and rehabilitation therapy at home. 
Choosing local home nursing means faster response times, culturally aware care, and continuity from a trusted Eldoret nurse.

Our skilled nursing services include injections, vital sign monitoring, wound dressing, and post-operative support. 
For elderly and personal care needs, Dial-a-Nurse Kenya supports bathing, mobility assistance, medication reminders, and companionship, helpful for families seeking “elderly care at home Eldoret.” 
Rehabilitation therapy covers physiotherapy and occupational interventions to speed recovery in your home environment.

Why we stand out: experienced, registered nurses; transparent pricing; tailored care plans; and reliable local service in Eldoret. 
We prioritise patient safety, dignity, and family communication. Call 0728 762 044 or email info@dialanurse.co.ke to make an appointment.`,
      icon: <FaUserNurse className="text-sky-500 text-3xl" />,
      color: "from-sky-100 to-sky-200",
    },
    {
      id: 2,
      title: "Post-Surgery Home Care in Eldoret: Faster Recovery with Dial-a-Nurse Kenya",
      date: "September 10, 2025",
      author: "Dial-a-Nurse Team",
      excerpt:
        `Recover safely at home with Dial-a-Nurse Kenya's specialised post-surgery home care services in Eldoret and Uasin Gishu County. If you're searching for "post-surgery home care Eldoret" or "post operative care at home Eldoret", our registered nurses provide wound management, medication administration, pain monitoring, physiotherapy follow-up, and daily clinical assessments, all delivered in the comfort of your home.

Choosing post-operative home care reduces hospital readmissions, improves wound healing, and supports faster, more comfortable recovery. Local families in Eldoret are increasingly choosing home-based care for chronic and post-surgical needs, driven by convenience and continuity of care.

Our post-surgery package includes: thorough wound dressing and infection checks, injectable medications and IV line management where needed, vital sign monitoring, physiotherapy coordination, mobility support, and clear family education on home-based recovery routines. We coordinate with your surgeon or Moi Teaching and Referral Hospital for seamless follow-up and referrals when necessary.

Why Dial-a-Nurse Kenya? We are local to Eldoret, staffed by experienced, registered nurses who understand the community and provide personalised care plans with transparent pricing. Compared to generic homecare listings, our focus is on clinical safety, timely visits, and rehabilitation support.

Call 0728 762 044 or email info@dialanurse.co.ke
 to schedule a post-surgery home visit. For urgent post-operative concerns, contact your surgeon or visit the nearest health facility. Book today and let Dial-a-Nurse Kenya help you recover faster, safely, and at home. We serve Eldoret town, Eldoret North, Eldoret West, Turbo, Kapseret and surrounding Uasin Gishu neighborhoods. Follow our blog for recovery tips and check our Services page for full package details and pricing. Contact us today.`,
      icon: <FaHome className="text-green-500 text-3xl" />,
      color: "from-green-100 to-green-200",
    },
    {
      id: 3,
      title: "Chronic Illness Management at Home in Eldoret: Professional Care You Can Trust",
      date: "August 10, 2025",
      author: "Dial-a-Nurse Team",
      excerpt:
        `Managing chronic conditions like diabetes, hypertension, stroke recovery, or cancer requires more than basic help, it requires trained medical attention. At Dial-a-Nurse Kenya, we provide professional chronic illness home care in Eldoret and Uasin Gishu County, ensuring patients receive safe, consistent, and skilled support in the comfort of their homes. If you’re searching “chronic illness home care Eldoret” or “home nursing for diabetes Eldoret,” you’ll find our services trusted by families across the region.

Our registered nurses are trained to monitor vital signs, administer medications and insulin, provide wound care, manage pressure sores, and educate families on disease management. For stroke and cancer patients, we support mobility, pain control, feeding, and rehabilitation therapy, services that go far beyond what untrained househelps or family members can safely provide.

Why professional home-based care matters: chronic illnesses require clinical monitoring to avoid dangerous complications. Missed medication, unmanaged wounds, or unmonitored blood pressure can lead to hospital readmissions. With our nurses, patients benefit from early detection of risks, emergency readiness, and continuous communication with doctors and local health facilities.

Families in Eldoret trust Dial-a-Nurse because we combine compassion with professionalism, transparent pricing, and reliable scheduling. Whether in Eldoret town, Kapseret, Turbo, or Kimumu, our team brings hospital-level care right to your doorstep.

📞 Call 0728 762 044 or 📧 email info@dialanurse.co.ke
 to schedule a visit today. Choose chronic illness home care that puts safety, dignity, and recovery first. Dial-a-Nurse Kenya — your partner in managing health at home.`,
      icon: <FaNotesMedical className="text-red-500 text-3xl" />,
      color: "from-red-100 to-red-200",
    },
    {
      id: 4,
      title: "Palliative and End-of-Life Care at Home in Eldoret: Compassion with Dignity",
      date: "July 10, 2025",
      author: "Dial-a-Nurse Team",
      excerpt:
        `When a loved one is facing a life-limiting illness, families in Eldoret want care that is both compassionate and medically professional. Dial-a-Nurse Kenya provides trusted palliative care at home in Eldoret and Uasin Gishu County, helping patients live with dignity and comfort while receiving the medical support they need. If you are searching for “palliative care at home Eldoret” or “end-of-life nursing Eldoret,” our team is here to walk the journey with you.

Our palliative care nurses are trained to manage pain, provide wound care, monitor symptoms, and support feeding and mobility for patients with advanced illnesses such as cancer, kidney failure, or neurological conditions. We also offer emotional support to both patients and families, ensuring holistic care that addresses physical, emotional, and spiritual needs.

Why families choose home-based palliative care: hospitals can feel overwhelming, but home care allows patients to remain in familiar surroundings with family close by. Professional nurses ensure medications are given correctly, pain is controlled, and complications are managed early, things that untrained caregivers cannot safely provide.

Dial-a-Nurse Kenya stands out for compassionate, patient-centered care, transparent pricing, and reliable service across Eldoret town, Turbo, Kapseret, and surrounding neighborhoods. Our mission is to reduce suffering, promote dignity, and support families through one of life’s most difficult journeys.

📞 Call 0728 762 044 or 📧 email info@dialanurse.co.ke
 to arrange palliative care at home. Dial-a-Nurse Kenya brings comfort, medical expertise, and compassionate presence to your doorstep in Eldoret. Because every moment matters.`,
      icon: <FaNotesMedical className="text-red-500 text-3xl" />,
      color: "bg-yellow-200",
    },
    {
      id: 4,
      title: "Professional Wound Care at Home in Eldoret: Safe Healing with Dial-a-Nurse Kenya",
      date: "June 10, 2025",
      author: "Dial-a-Nurse Team",
      excerpt:
        `Chronic and surgical wounds require skilled medical attention to heal properly. At Dial-a-Nurse Kenya, we provide professional wound care at home in Eldoret and across Uasin Gishu County, helping patients recover safely without the stress of repeated hospital visits. Families searching for “wound care at home Eldoret” or “home nursing for wound dressing Eldoret” trust our qualified nurses for reliable, evidence-based care.

Our wound care services include post-surgical dressing, pressure ulcer management, diabetic foot care, burn care, and infection monitoring. Every visit is handled by a trained nurse who uses sterile techniques, proper dressing materials, and clinical judgment to reduce complications and speed recovery. Unlike untrained caregivers, our team is equipped to detect infections early and escalate care to doctors or hospitals if necessary.

Why choose professional home-based wound care? Many wounds, especially in diabetic or elderly patients, require specialised monitoring. Incorrect dressing or neglect can lead to infections, sepsis, or delayed healing. By bringing nursing expertise into your home, we reduce hospital readmissions, minimise costs, and ensure patients heal in comfort.

Dial-a-Nurse Kenya is based in Eldoret and committed to affordable, transparent, and patient-focused care. Whether you need daily dressing changes, weekly wound assessments, or ongoing chronic wound management, our nurses are available to serve Eldoret town, Turbo, Kapseret, Langas, Elgonview, Kapsoya, Kesses and surrounding areas.

📞 Call 0728 762 044 or 📧 info@dialanurse.co.ke
 today to schedule professional wound care at home. With Dial-a-Nurse Kenya, you receive compassionate, clinical-grade nursing that promotes faster recovery and peace of mind for your family. Safe healing starts here.`,
      icon: <FaBandAid className="text-red-500 text-3xl" />,
      color: "bg-stone-200",
    },
    {
      id: 5,
      title: "Affordable Home Nursing Care in Eldoret: Quality Care You Can Trust",
      date: "May 10, 2025",
      author: "Dial-a-Nurse Team",
      excerpt: `The Complete Guide to Home-Based Nursing Care in Eldoret
    
    Introduction
    Healthcare is changing, and in Eldoret, Uasin Gishu County, more families are turning to home-based nursing care as a safer, affordable, and more personalized option. Instead of long hospital stays or relying on untrained house helps, professional nurses now deliver skilled, compassionate care directly to your doorstep. This guide explores everything you need to know about home nursing care in Eldoret, who needs it, what services are included, and why families are making the shift.
    
    What is Home-Based Nursing Care?
    Home-based nursing care means receiving medical and personal care services in the comfort of your own home. Unlike ordinary caregiving, this care is provided by qualified nurses and trained caregivers who can handle medical needs such as wound dressing, injections, medication management, and rehabilitation therapy.
    
    Who Needs Home-Based Care in Eldoret?
    Not everyone needs hospitalization. Home-based nursing care is designed for:
    
    - Elderly patients who need daily support with mobility, feeding, or personal care.
    - Post-surgery patients who are recovering at home but still require medical supervision.
    - Patients with chronic illnesses such as diabetes, hypertension, or stroke.
    - Palliative care patients who need comfort, dignity, and professional support.
    - Families with busy schedules who cannot always be physically present to provide care.
    
    Benefits of Home Nursing Care in Eldoret
    Choosing home-based care comes with several advantages:
    
    - Comfort of home – Patients recover better in familiar surroundings.
    - Personalized attention – Nurses design care plans based on each patient’s needs.
    - Affordable – Reduces costly hospital stays.
    - Family involvement – Loved ones can stay close and actively participate in care.
    - Safety – Minimizes hospital-acquired infections.
    
    Types of Home Nursing Services Offered in Eldoret
    Dial-a-Nurse Kenya provides comprehensive home care services across Uasin Gishu County, including:
    
    - Skilled Nursing – Wound care, injections, IV therapy, vital checks, medication.
    - Elderly & Personal Care – Bathing, feeding, mobility assistance, hygiene support.
    - Rehabilitation Therapy – Physiotherapy and occupational therapy for recovery.
    - Chronic Illness Management – Diabetes, hypertension, stroke, and long-term conditions.
    - Palliative & End-of-Life Care – Compassionate support for patients and families.
    
    Why Eldoret Families Trust Home-Based Care
    Many households in Eldoret prefer home care because:
    
    - They get local and reliable nurses who understand their community.
    - Care is tailored to family budgets with no hidden fees.
    - Patients receive professional care, not just domestic help.
    - Families avoid the stress of frequent hospital visits.
    
    Dial-a-Nurse Kenya: Your Trusted Partner in Eldoret
    At Dial-a-Nurse Kenya, we are committed to delivering professional, affordable, and compassionate home nursing care in Eldoret and beyond. Our nurses are trained, licensed, and dedicated to ensuring the dignity and comfort of every patient.
    
    How to Choose the Right Nursing Care Provider
    Before hiring, consider:
    
    - Is the nurse qualified and licensed?
    - Do they provide transparent pricing?
    - Are they local and available on call?
    - Do they have a track record of trusted care in Eldoret?
    
    Dial-a-Nurse checks all these boxes.
    
    Frequently Asked Questions (FAQs)
    
    1. How much does home nursing care in Eldoret cost?
    Our services are affordable and tailored to your needs. Pricing depends on the level of care required.
    
    2. Can I request part-time or full-time nursing care?
    Yes, we provide both flexible hourly visits and 24/7 support.
    
    3. What areas do you cover?
    We serve Eldoret town and the greater Uasin Gishu County.
    
    4. How do I make an appointment?
    You can call, email, or book directly through our website.
    
    Conclusion: Quality Care, Right at Home
    Home-based nursing care is more than a service, it’s peace of mind. For families in Eldoret, it ensures loved ones receive professional medical support while staying close to home. At Dial-a-Nurse Kenya, we combine compassion, skill, and reliability to deliver healthcare that truly matters.
    
    📞 Call us today at 0728 762 044
    📧 Email: info@dialanurse.co.ke
    
    📍 Serving Eldoret and Uasin Gishu County`,
      icon: <FaHandHoldingHeart className="text-red-500 text-3xl" />,
      color: "from-purple-100 to-purple-200",
    }
    
  ];
  

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <header className="relative mb-16 overflow-hidden">
  {/* Background pattern */}
  <svg
    className="absolute top-0 left-0 w-full h-full opacity-10"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern
        id="lines"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <line x1="0" y1="0" x2="40" y2="40" className="stroke-black" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#lines)" />
  </svg>

  {/* Decorative circles */}
  <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-sky-200/50 animate-pulse"></div>
  <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-sky-300/30 animate-pulse"></div>

  {/* Main content */}
  <div className="relative text-center py-24 px-6">
    {/* Hero icon */}
    <div className="inline-block bg-white p-6 rounded-full shadow-2xl mb-8 transform rotate-6">
      <FaNotesMedical className="text-sky-600 text-5xl" />
    </div>

    {/* Title */}
    <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
      Our Blog
    </h1>

    {/* Decorative underline */}
    <div className="mx-auto mb-6 w-32 h-1 relative">
      <div className="absolute left-0 w-full h-1 bg-sky-400 rounded-full animate-pulse"></div>
      <div className="absolute left-1/4 w-1/2 h-1 bg-sky-200 rounded-full"></div>
    </div>

    {/* Subtitle */}
    <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
      Insights, tips, and updates on <strong>home-based care in Eldoret and Uasin Gishu</strong>. Learn about nursing, elderly support, rehabilitation, and compassionate home care for your loved ones.
    </p>
  </div>
</header>


        {/* Blog Notes */}
        <div className="space-y-16">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`relative p-8 rounded-3xl shadow-2xl transform transition-transform duration-500 hover:-translate-y-2 bg-gradient-to-br ${blog.color}`}
              style={{
                rotate: `${index % 2 === 0 ? "-1deg" : "1deg"}`,
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {/* Decorative pinned icon */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                {blog.icon}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2 text-center">
                {blog.title}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-6">
                {blog.date} • {blog.author}
              </p>
              <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-line">{blog.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


