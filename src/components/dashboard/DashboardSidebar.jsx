"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  LogOut,
  House,
  CalendarDays,
  MessageCircleMore,
} from "lucide-react";
import clsx from "clsx";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/user_dashboard", label: "Dashboard", icon: House },
    {
      href: "/user_dashboard/bookings",
      label: "My Bookings",
      icon: CalendarDays,
    },
    {
      href: "/user_dashboard/help",
      label: "Help & Support",
      icon: MessageCircleMore,
    },
    { href: "/user_dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white shadow-md sm:p-6 flex flex-col text-[#000000] font-semibold">
      <img src="/images/logo.png" alt="logo" className="w-16 h-16" />
      <nav className="flex flex-col gap-2 mt-8">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname === href
                ? "bg-indigo-50 text-[#0D0BA8] font-medium"
                : "hover:text-[#0D0BA8] hover:bg-gray-50"
            )}
          >
            <Icon className="w-5 h-5" /> {label}
          </Link>
        ))}
      </nav>

      <div className="px-3">
        <Link
          href="/"
          className="flex items-center gap-3 mt-4 hover:text-[#0D0BA8] hover:bg-gray-50"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Link>
      </div>
    </aside>
  );
}
