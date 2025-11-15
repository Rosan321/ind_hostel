// "use client";

// import SearchBar from "./SearchBar";

// // import { MapPin, Calendar, Search } from "lucide-react";

// export default function HeroSection() {
//   return (
//     <section
//       className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
//       style={{ backgroundImage: "url('/images/hero.png')" }}
//     >
//       <div className="absolute inset-0 bg-black/60"></div>

//       {/* Centered Search Bar */}
//       <div className="relative z-10 w-full flex justify-center px-4">
//         <SearchBar />
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  const images = [
    "/images/hero.png",
    "/images/city.png",
    "/images/3.png",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[836px] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          ></div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Centered Search Bar */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <SearchBar />
      </div>
    </section>
  );
}
