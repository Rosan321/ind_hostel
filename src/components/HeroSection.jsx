"use client";

import SearchBar from "./SearchBar";

// import { MapPin, Calendar, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered Search Bar */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <SearchBar />
      </div>
    </section>
  );
}
