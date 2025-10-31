"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { emailIcon, facebook, insta, linkedin, location, locationIcon, phoneIcon, twitter, youtube } from "@/lib/utils/svgS";
// import { motion } from "framer-motion";

export default function Footer() {
  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       duration: 0.8,
  //       staggerChildren: 0.15,
  //     },
  //   },
  // };

  // const itemVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 60,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.7,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  // const chevronVariants = {
  //   hidden: {
  //     opacity: 0,
  //     scaleY: 0,
  //     transformOrigin: "bottom",
  //   },
  //   visible: {
  //     opacity: 1,
  //     scaleY: 1,
  //     transition: {
  //       duration: 0.6,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  // const socialIconVariants = {
  //   hidden: {
  //     opacity: 0,
  //     scale: 0.8,
  //   },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       duration: 0.5,
  //       ease: "backOut",
  //     },
  //   },
  //   hover: {
  //     scale: 1.1,
  //     rotate: 5,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

  // const linkItemVariants = {
  //   hidden: {
  //     opacity: 0,
  //     x: -20,
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  //   hover: {
  //     x: 5,
  //     color: "#ec4899", // pink-500
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

  // const formVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 30,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  // const bottomBarVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 40,
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.7,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <footer
      id="footer"
      className="relative bg-[#1f1f1f] text-white pt-24 sm:pb-8"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true, amount: 0.3 }}
      // variants={containerVariants}
    >
      {/* Top Chevron Shape */}
      <div
        className="absolute top-0 left-0 w-full overflow-hidden leading-none"
        // variants={chevronVariants}
      >
        <svg
          className="relative block w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path d="M0 0 L600 60 L1200 0 H0 Z" fill="currentColor"></path>
        </svg>

      </div>

      {/* Footer Content */}
      <div className="relative z-10 mx-auto px-4 lg:px-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Logo Section */}
        <div
          className="col-span-full md:col-span-1 lg:col-span-1"
          // variants={itemVariants}
        >
          <div
            className="flex items-center gap-3 mb-4"
            // whileHover={{ scale: 1.02 }}
            // transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/logo.png"
              alt="FitIQ Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <p
            className="text-[#fff] text-base font-medium mb-6"
            // variants={itemVariants}
          >
            Simplifying Hostel, PG, and OYO bookings with verified stays across India
          </p>

          {/* Social Icons */}
          {/* <div className="flex gap-4" variants={containerVariants}> */}
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
                className="w-9 h-9 rounded-full text-[#F1FF51] flex items-center justify-center transition"
                // variants={socialIconVariants}
                // whileHover="hover"
                // custom={index}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:gap-10 sm:col-span-2 lg:col-span-2">
          {/* Quick Links */}
          {/* <div variants={itemVariants}> */}
          <div>
            <h4
              className="text-lg font-semibold mb-2 md:mb-8"
              // variants={itemVariants}
            >
              Quick Links
            </h4>
            <ul className="space-y-2 text-[#FFFFFFE5] text-base">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/pages/about" },
                { name: "Programs", path: "/pages/programs" },
                { name: "Trainers", path: "/pages/trainers" },
                { name: "Blog", path: "/pages/blog" },
                { name: "Contact", path: "/pages/contact" },
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
          {/* <div variants={itemVariants}> */}
          <div>
            <h4
              className="text-lg font-semibold mb-2 md:mb-8"
              // variants={itemVariants}
            >
              Programs
            </h4>
            <ul className="space-y-2 text-[#FFFFFFE5] text-base">
              {[
                "Strength Training",
                "Yoga & Mindfulness",
                "HIIT & Cardio",
                "Nutrition Coaching",
                "Wellness Bootcamp",
                "Corporate Programs",
              ].map((item, index) => (
                <li
                  key={item}
                  // variants={linkItemVariants}
                  // whileHover="hover"
                  // custom={index}
                >
                  <a href="#" className="transition block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Connect */}
        <div
          className="col-span-full lg:col-span-1"
          // variants={itemVariants}
        >
          <h4
            className="text-lg font-semibold mb-2 md:mb-8"
            // variants={itemVariants}
          >
            Connect
          </h4>
          <ul
            className="space-y-3 text-gray-300 text-sm mb-6"
            // variants={containerVariants}
          >
            <li
              className="flex items-start gap-3"
              // variants={itemVariants}
            >
              {locationIcon}
              <span>Manikonda, Hyderabad, Telangana, India - 500089</span>
            </li>
            <li
              className="flex items-start gap-3"
              // variants={itemVariants}
            >
              {emailIcon}
              <span>hello@fitiq.com</span>
            </li>
            <li
              className="flex items-start gap-3"
              // variants={itemVariants}
            >
              {phoneIcon}
              <span>+91 9888 488854, 9888 488864</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        className="mt-4 md:mt-12 px-4 md:px-16 border-t border-[#FFFFFF1F] pt-4 text-center text-white text-sm flex flex-col sm:flex-row justify-between items-center gap-2"
        // variants={bottomBarVariants}
      >
        {/* <p whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}> */}
        <p>
          © 2025 FitIQ. All rights reserved
        </p>

        <div
          className="flex flex-wrap justify-center gap-x-2 gap-y-1"
          // variants={containerVariants}
        >
          {["Privacy Policy", "Terms & Conditions", "Cookie Policy"].map(
            (item, index) => (
              <a
                key={item}
                href="#"
                className="hover:text-pink-500 transition"
                // variants={linkItemVariants}
                // whileHover="hover"
                // custom={index}
              >
                {item}
                {index < 2 && <span className="mx-1 hidden sm:inline">|</span>}
              </a>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
