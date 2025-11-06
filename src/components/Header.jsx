"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  hostelsDropdownItems,
  hotelsDropdownItems,
  pgDropdownItems,
} from "@/lib/utils/headerDropdowns";
import { useDropdown } from "@/hooks/useDropDown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    activeDropdown,
    isHoveringDropdown,
    setIsHoveringDropdown,
    dropdownRef,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  } = useDropdown();

  const isActiveLink = (path) => pathname === path;

  const handleDropdownItemClick = (type, category) => {
    const queryParams = new URLSearchParams({ type, category }).toString();
    router.push(`/data?${queryParams}`);
    closeDropdown();
    setIsMenuOpen(false);
  };

  const renderDropdown = (items, dropdownType) => (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white text-black rounded-xl shadow-xl p-4 w-64"
      onMouseEnter={() => setIsHoveringDropdown(true)}
      onMouseLeave={() => {
        setIsHoveringDropdown(false);
        setTimeout(() => !isHoveringDropdown && closeDropdown(), 100);
      }}
    >
      <ul className="flex flex-col gap-3 text-sm">
        {items.map((item, index) => (
          <li
            key={index}
            className="hover:text-yellow-500 cursor-pointer transition-colors duration-200 py-1 px-2 rounded"
            onClick={() => handleDropdownItemClick(item.type, item.category)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderMobileDropdown = (items, dropdownType) => (
    <ul className="mt-3 ml-4 flex flex-col gap-3 text-sm bg-gray-800 p-3 rounded-lg">
      {items.map((item, index) => (
        <li
          key={index}
          className="hover:text-yellow-500 cursor-pointer transition-colors duration-200 py-1 px-2 rounded"
          onClick={() => handleDropdownItemClick(item.type, item.category)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      ref={dropdownRef}
      className="fixed top-0 w-full z-50 bg-[#111] text-white shadow-md relative pb-6"
    >
      <div className="relative z-10 px-4 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="w-24 h-14 bg-yellow-400 flex items-center justify-center text-black font-bold">
            <Link href="/">
              <h4>Logo</h4>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center lg:gap-4 xl:gap-10 text-sm">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <li
                  key={path}
                  className={`border-b-2 transition-colors duration-300 ${
                    isActiveLink(path)
                      ? "border-[#C7D800] text-[#C7D800]"
                      : "border-transparent hover:border-[#C7D800]"
                  }`}
                >
                  <Link href={path}>{label}</Link>
                </li>
              ))}

              {/* Dropdowns */}
              {[
                { type: "hostels", label: "Find Hostels", items: hostelsDropdownItems },
                { type: "pgs", label: "Pay Guest (PGs)", items: pgDropdownItems },
                { type: "hotels", label: "Hotels", items: hotelsDropdownItems },
              ].map(({ type, label, items }) => (
                <li
                  key={type}
                  className={`relative group flex items-center gap-1 border-b-2 transition-colors duration-300 cursor-pointer ${
                    activeDropdown === type
                      ? "border-[#C7D800] text-[#C7D800]"
                      : "border-transparent hover:border-[#C7D800]"
                  }`}
                  onMouseEnter={() => openDropdown(type)}
                  onMouseLeave={() =>
                    setTimeout(() => !isHoveringDropdown && closeDropdown(), 100)
                  }
                  onClick={() => toggleDropdown(type)}
                >
                  <span>{label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      activeDropdown === type ? "rotate-180" : ""
                    }`}
                  />
                  {activeDropdown === type && renderDropdown(items, type)}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/signup" className="btn-wiper">
              <span className="btn-wiper-content">Sign-Up</span>
            </Link>
            <Link href="/login" className="btn-wiper-bg">
              <span className="btn-wiper-bg-content">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden text-white cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col gap-4 text-sm">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map(({ path, label }) => (
                <li
                  key={path}
                  className={`border-b pb-2 ${
                    isActiveLink(path)
                      ? "border-[#C7D800] text-[#C7D800]"
                      : "border-gray-700"
                  }`}
                >
                  <Link href={path} onClick={() => setIsMenuOpen(false)}>
                    {label}
                  </Link>
                </li>
              ))}

              {/* Mobile Dropdowns */}
              {[
                { type: "mobile-hostels", label: "Find Hostels", items: hostelsDropdownItems },
                { type: "mobile-pgs", label: "Pay Guest (PGs)", items: pgDropdownItems },
                { type: "mobile-hotels", label: "Hotels", items: hotelsDropdownItems },
              ].map(({ type, label, items }) => (
                <li key={type} className="border-b border-gray-700 pb-2">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => toggleDropdown(type)}
                    >
                      <span>{label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeDropdown === type ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {activeDropdown === type && renderMobileDropdown(items, type)}
                  </div>
                </li>
              ))}

              {/* Auth Buttons */}
              <li className="flex flex-col gap-3 pt-2">
                <Link
                  href="/signup"
                  className="btn-wiper sm:w-1/4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="btn-wiper-content">Sign-Up</span>
                </Link>
                <Link
                  href="/login"
                  className="btn-wiper-bg sm:w-1/4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="btn-wiper-bg-content">Login</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
