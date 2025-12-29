"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Settings,
  LogOut,
  House,
  CalendarDays,
  MessageCircleMore,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import { logout } from "@/lib/store/reducers/authSlice";
import { useDispatch } from "react-redux";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false); // off-canvas state

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

  // Find the active item based on current pathname
  const activeItem = navItems.find(item => 
    pathname === item.href || 
    (item.href !== "/user_dashboard" && pathname.startsWith(item.href))
  );

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  return (
    <>
      {/* Topbar for sm and md screens */}
      <div className="flex items-center justify-between bg-white p-4 shadow md:hidden">
        {/* Show active page label */}
        <div className="flex items-center gap-2">
          {activeItem && (
            <>
              <activeItem.icon className="w-5 h-5 text-[#0D0BA8]" />
              <p className="font-semibold text-[#0D0BA8]">
                {activeItem.label}
              </p>
            </>
          )}
        </div>

        {/* Menu button */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-[#0D0BA8] text-white hover:bg-[#0a0990] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar for lg screens */}
      <aside className="hidden md:flex flex-row w-full lg:w-64 bg-white shadow-md sm:p-6 lg:flex-col justify-center lg:justify-start items-center lg:items-start text-[#000000] font-semibold">
        <img src="/images/logo.png" alt="logo" className="w-16 h-16 hidden lg:block" />
        <nav className="flex flex-col md:flex-row lg:flex-col gap-2 lg:mt-8">
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 lg:mt-4 hover:text-[#0D0BA8] hover:bg-gray-50 cursor-pointer"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Offcanvas Sidebar for sm/md screens */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-transform transform bg-white shadow-lg md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)} // close when clicked
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

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 mt-4 hover:text-[#0D0BA8] hover:bg-gray-50 cursor-pointer px-3 py-2 rounded-md"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}