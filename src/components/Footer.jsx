"use client";

import Link from "next/link";
import {
  emailIcon,
  facebook,
  insta,
  linkedin,
  locationIcon,
  phoneIcon,
  twitter,
} from "@/lib/utils/svgS";
import { useSelector } from "react-redux";

export default function Footer() {
  const { accomodationStayTypeData } = useSelector(
    (state) => state.accomodationStayType
  );

  return (
    <footer
      id="footer"
      className="relative bg-[#1f1f1f] text-white pt-24 sm:pb-8"
    >
      {/* Top Chevron Shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0 0 L600 60 L1200 0 H0 Z"
            fill="lab(96.1596% -.082314 -1.13575)"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto px-4 sm:px-8 lg:px-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
        {/* Logo Section */}
        <div className="col-span-full md:col-span-1 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4 w-16 sm:w-20 lg:w-30 h-16 sm:h-20 lg:h-30">
            <img
              src="/images/logoF.png"
              alt="Ind Hostel Logo"
              className="object-contain w-16 sm:w-20 lg:w-30 h-16 sm:h-20 lg:h-30"
            />
          </div>
          <p className="text-[#fff] text-sm font-medium mb-6">
            Simplifying Hostel, PG, and Hotels bookings with verified stays
            across India
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { href: "https://www.facebook.com/", icon: facebook },
              { href: "https://www.instagram.com/", icon: insta },
              { href: "https://www.x.com/", icon: twitter },
              { href: "https://www.youtube.com/", icon: linkedin },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full text-[#2A32FF] flex items-center justify-center transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-10 sm:col-span-2 lg:col-span-2">
          {/* Quick Links */}
          <div>
            <h4
              className="text-lg font-bold mb-2 md:mb-8"
              // variants={itemVariants}
            >
              Quick Links
            </h4>
            <ul className="space-y-3 text-[#FFFFFFE5] text-sm font-medium">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                // { name: "Explore Locations", path: "/" },
                // { name: "Why Choose Us", path: "/" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <li
                  key={item.name}
                  // variants={linkItemVariants}
                  // whileHover="hover"
                  // custom={index}
                >
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Programs */}
          <div>
            <h4
              className="text-lg font-bold mb-2 md:mb-8"
              // variants={itemVariants}
            >
              Our Stays
            </h4>
            <ul className="space-y-3 text-[#FFFFFFE5] text-sm font-medium">
              {accomodationStayTypeData &&
                accomodationStayTypeData.map((item) => (
                  <li key={item.staytype}>
                    {item.staytype.toLowerCase() === "hostels" &&
                      item.categories &&
                      item.categories.length > 0 && (
                        <div className="flex flex-col space-y-3">
                          {item.categories.map((data, index) => (
                            <Link
                              key={index}
                              href={`/data?type=hostels&category=${encodeURIComponent(
                                data.category_name
                              )}`}
                              className="transition inline-block"
                            >
                              {data.category_name
                                ? data.category_name.charAt(0).toUpperCase() +
                                  data.category_name.slice(1)
                                : "Unknown Area"}
                            </Link>
                          ))}
                        </div>
                      )}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Connect */}
        <div className="col-span-full lg:col-span-1">
          <h4 className="text-lg font-bold mb-2 md:mb-8">Connect</h4>
          <ul className="space-y-3 text-gray-300 text-sm mb-6">
            <li className="flex items-start gap-3">
              <span>{locationIcon}</span>
              {/* {locationIcon} */}
              <span className="text-sm font-medium">
                IndHostel, New Delhi, India - 500089
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span>{emailIcon}</span>
              <span className="text-sm font-medium">support@indhostel.com</span>
            </li>
            <li className="flex items-start gap-3">
              <span>{phoneIcon}</span>
              <span className="text-sm font-medium">+91-9876543210</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="pb-2 sm:pb-0 sm:mt-12 px-4 sm:px-8 lg:px-20 border-t border-[#FFFFFF1F] pt-4 text-center text-white text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-sm font-medium">© 2025 IndHostel. All rights reserved</p>
      </div>
    </footer>
  );
}
