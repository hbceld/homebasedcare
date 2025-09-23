"use client";

import Link from "next/link";
import {
  CalendarDays,
  User,
  Users,
  FileText,
  BarChart2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const modules = [
    { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
    { name: "Nurses", href: "/admin/nurses", icon: User },
    { name: "Patients", href: "/admin/patients", icon: Users },
    { name: "Billing", href: "/admin/billing", icon: FileText },
    { name: "Reports", href: "/admin/reports", icon: BarChart2 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-8 text-center">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link
                key={module.name}
                href={module.href}
                className="flex flex-col items-center text-center text-sky-700 hover:text-sky-600 transition"
              >
                <IconComponent size={32} className="mb-2" />
                <span className="text-sm sm:text-base font-medium underline">
                  {module.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="mt-10 text-center text-gray-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} Dial-a-Nurse Kenya. All rights reserved.
      </footer>
    </main>
  );
}

