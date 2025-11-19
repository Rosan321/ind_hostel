"use client";

import { ChevronDown, LayoutGrid, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  hostelsDropdownItems,
  hotelsDropdownItems,
  pgDropdownItems,
} from "@/lib/utils/headerDropdowns";
import { useDropdown } from "@/hooks/useDropDown";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact" },
];

const DROPDOWNS = [
  { type: "hostels", label: "Find Hostels", items: hostelsDropdownItems },
  { type: "pgs", label: "Pay Guest (PGs)", items: pgDropdownItems },
  { type: "hotels", label: "Hotels", items: hotelsDropdownItems },
];

const DropdownMenu = ({
  items,
  onItemClick,
  isMobile = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const baseClasses = isMobile
    ? "mt-2 flex flex-col gap-3 text-sm bg-gray-800 p-3 rounded-lg"
    : "absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white text-black rounded-xl shadow-xl p-4 w-64 flex flex-col gap-3 text-sm";

  return (
    <ul
      className={baseClasses}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map(({ label, type, category }, index) => (
        <li
          key={index}
          className="hover:text-[#0D0BA8] cursor-pointer transition-colors duration-200 py-1 px-2 rounded"
          onClick={() => onItemClick(type, category)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
};

const NavLink = ({ path, label, isActive, onClick }) => (
  <Link
    href={path}
    onClick={onClick}
    className={`relative xl:text-lg px-4 lg:px-0 xl:px-4 font-semibold pb-2
      after:absolute after:left-0 after:bottom-0 after:h-[2px]
      after:bg-[#0D0BA8]
      after:transition-all after:duration-300
      ${isActive 
        ? "after:w-full"
        : "after:w-0 hover:after:w-full"
      }
    `}
  >
    {label}
  </Link>
);

const AuthButton = ({ href, label, variant = "primary", onClick }) => {
  const baseClasses =
    variant === "primary"
      ? "btn-wiper text-center py-3"
      : "btn-wiper-bg text-center py-3";

  return (
    <Link href={href} onClick={onClick} className={baseClasses}>
      <span
        className={
          variant === "primary"
            ? "btn-wiper-content text-base text-[#FFF] lg:text-[#0D0BA8]"
            : "btn-wiper-bg-content text-base"
        }
      >
        {label}
      </span>
    </Link>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const {
    activeDropdown,
    setIsHoveringDropdown,
    dropdownRef,
    openDropdown,
    closeDropdown,
    closeDropdownWithDelay,
    toggleDropdown,
  } = useDropdown();

  const isActiveLink = (path) => pathname === path;

  const handleDropdownItemClick = async (type, category) => {
    const queryParams = new URLSearchParams({ type, category }).toString();
    await router.push(`/data?${queryParams}`);
    closeDropdown();
    setIsMenuOpen(false);
    setIsHoveringDropdown(false);
  };

  const handleNavItemMouseEnter = (type) => {
    setIsHoveringDropdown(true);
    openDropdown(type);
  };

  const handleNavItemMouseLeave = () => {
    setIsHoveringDropdown(false);
    closeDropdownWithDelay();
  };

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    closeDropdownWithDelay();
  };

  const handleNavMouseLeave = (e) => {
    const dropdownEl = dropdownRef.current;

    if (
      !dropdownEl ||
      !(e.relatedTarget instanceof Node) ||
      !dropdownEl.contains(e.relatedTarget)
    ) {
      setIsHoveringDropdown(false);
      closeDropdown();
    }
  };

  return (
    <nav
      ref={dropdownRef}
      className="fixed top-0 w-full z-50 bg-[#FFFFFF] text-white shadow-md"
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="relative z-10 px-4 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="w-18 h-14 flex items-center justify-center">
            <Link href="/">
              <img 
                src="/images/logo.png"
                alt="logo"
                className="w-20 h-16"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-5 text-sm text-[#1A1A1A] font-semibold">
              {NAV_LINKS.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    path={path}
                    label={label}
                    isActive={isActiveLink(path)}
                  />
                </li>
              ))}

              {DROPDOWNS.map(({ type, label, items }) => (
                <li
                  key={type}
                  className="relative group flex items-center gap-2 cursor-pointer select-none"
                  onMouseEnter={() => handleNavItemMouseEnter(type)}
                  onMouseLeave={handleNavItemMouseLeave}
                  onClick={() => toggleDropdown(type)}
                >
                  <span
                    className={`xl:text-lg ${
                      activeDropdown === type ? "text-[#1A1A1A]" : ""
                    }`}
                  >
                    {label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      activeDropdown === type ? "rotate-180" : ""
                    }`}
                  />
                  {activeDropdown === type && (
                    <DropdownMenu
                      items={items}
                      onItemClick={handleDropdownItemClick}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <AuthButton href="/signup" label="Sign-Up" variant="primary" />
            <AuthButton
              href="/login"
              label="Login"
              variant="secondary"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#1A1A1A] cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={48} /> : <LayoutGrid size={44} fill="#1A1A1A" />}
          </button>
        </div>

        {/* Mobile Overlay */}
        {isMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/70 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#111] shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 border-b border-gray-700">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:bg-gray-800 rounded-lg cursor-pointer"
            >
              <X size={48} />
            </button>
          </div>

          <div className="h-full overflow-y-auto px-6 py-4 flex flex-col gap-4">
            {/* Nav Links */}
            {NAV_LINKS.map(({ path, label }) => (
              <NavLink
                key={path}
                path={path}
                label={label}
                isActive={isActiveLink(path)}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}

            {/* Dropdowns */}
            {DROPDOWNS.map(({ type, label, items }) => (
              <div key={type} className="flex flex-col gap-2 px-4">
                <div
                  className="flex items-center justify-between cursor-pointer py-2"
                  onClick={() => toggleDropdown(type)}
                >
                  <span className="text-lg font-medium">{label}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      activeDropdown === type ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {activeDropdown === type && (
                  <DropdownMenu
                    items={items}
                    onItemClick={handleDropdownItemClick}
                    isMobile
                  />
                )}
              </div>
            ))}

            {/* Auth Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <AuthButton
                href="/signup"
                label="Sign-Up"
                variant="primary"
                onClick={() => setIsMenuOpen(false)}
              />
              <AuthButton
                href="/login"
                label="Login"
                variant="secondary"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
