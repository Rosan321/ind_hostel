"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111] text-white shadow-md relative overflow-hidden">
      {/* Background curve */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[#111]"></div>

      <div className="relative z-10 px-4 lg:px-20">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="w-24 h-14 bg-yellow-400 flex items-center justify-center text-black font-bold">
            {/* <Image
              src="/images/logo.png"
              alt="logo"
              width={500}
              height={500}
              className="w-18"
            /> */}
            <h4>
              Logo
            </h4>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button className="btn-wiper">
              <span className="btn-wiper-content">Sign-Up</span>
            </button>
            <button className="btn-wiper-bg">
              <span className="btn-wiper-bg-content">Book Now</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center pb-4">
          {/* Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li className="border-b-2 border-transparent hover:border-[#C7D800] transition-colors duration-300">
              <Link href="/">Home</Link>
            </li>
            <li className="border-b-2 border-transparent hover:border-[#C7D800] transition-colors duration-300">
              <Link href="/data">About Us</Link>
            </li>
            <li className="border-b-2 border-transparent hover:border-[#C7D800] transition-colors duration-300">
              <Link href={`/contact`}>Contact</Link>
            </li>
            <li className="flex items-center gap-1 cursor-pointer border-b-2 border-transparent hover:border-[#C7D800] transition-colors duration-300">
              <Link href="/stay_listing">Find Hostels</Link> <ChevronDown size={16} />
            </li>
            <li className="flex items-center gap-1 cursor-pointer border-b-2 border-transparent hover:border-[#C7D800] transition-colors duration-300">
              <span>Pay Guest (PGs)</span> <ChevronDown size={16} />
            </li>
            <li className="flex items-center gap-1 cursor-pointer border-b-2 border-transparent hover:border-[#C7D800] transition-colors duration-300">
              <span>OYO Rooms</span> <ChevronDown size={16} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
