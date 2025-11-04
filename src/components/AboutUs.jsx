"use client";

import { dotsSix } from "@/lib/utils/svgS";
import { Building2, CircleCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="py-12 px-4 lg:px-20 bg-gray-100">
      <section className="pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center mx-auto">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-[#00bfa6]">ABOUT US</h2>

              <h3 className="text-2xl lg:text-4xl font-bold text-[#1A1A1A]">
                Making Stays Simpler, Safer, and Smarter
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                At NIO Hostel, we bring together verified hostels, PGs, and OYO
                rooms on one seamless platform. Our mission is to make finding
                the right stay stay — whether you're a student searching for a
                budget-friendly PG, a traveler looking for a hostel, or a
                professional booking an OYO for work. Every property listed is
                verified for safety, affordability, and comfort, so you can book
                with confidence.
              </p>
            </div>

            {/* Learn More Button */}
            <button className="bg-[#F1FF51] hover:bg-[#dde953] px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300 cursor-pointer">
              Learn More About Us
            </button>
          </div>

          <div>
            <div className="flex justify-end gap-10 relative">
                <section>{dotsSix}</section>
                <Image
                    src="/images/abt.png"
                    alt="abt"
                    width={500}
                    height={500}
                    className="w-4/5 h-4/5"
                />
            </div>
            <div className="absolute bottom-0 xl:right-3/9 flex flex-col text-center gap-4 text-white bg-[#1A1A1A] w-56 p-6">
                <section className="flex flex-col items-center gap-3">
                <CircleCheck className="text-white w-5 h-5" />
                <h6 className="text-xs lg:text-sm font-semibold">
                    50K+ Verified Stays
                </h6>
                </section>

                <section className="flex flex-col items-center gap-3">
                <ShieldCheck className="text-white w-5 h-5" />
                <h6 className="text-xs lg:text-sm font-semibold">
                    Trusted by 20K+ Students & Travelers
                </h6>
                </section>

                <section className="flex flex-col items-center gap-3">
                <Building2 className="text-white w-5 h-5" />
                <h6 className="text-xs lg:text-sm font-semibold">
                    Serving 100+ Cities in India
                </h6>
                </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
