// "use client";

// import Link from "next/link";
// import {
//   emailIcon,
//   facebook,
//   insta,
//   linkedin,
//   locationIcon,
//   phoneIcon,
//   twitter,
// } from "@/lib/utils/svgS";
// import { useSelector } from "react-redux";
// import Image from "next/image";

// export default function Footer() {
//   const { accomodationStayTypeData } = useSelector(
//     (state) => state.accomodationStayType,
//   );

//   return (
//     <footer
//       id="footer"
//       className="relative bg-[#1f1f1f] text-white pt-24 sm:pb-8"
//     >
//       {/* Top Chevron Shape */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//           className="relative block w-full h-16"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//           viewBox="0 0 1200 120"
//         >
//           <path
//             d="M0 0 L600 60 L1200 0 H0 Z"
//             fill="lab(96.1596% -.082314 -1.13575)"
//           ></path>
//         </svg>
//       </div>

//       {/* Footer Content */}
//       <div className="relative z-10 mx-auto px-4 sm:px-8 lg:px-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-10">
//         {/* Logo Section */}
//         <div className="col-span-full md:col-span-1 lg:col-span-2">
//           <div className="flex items-center gap-3 mb-4 w-16 sm:w-20 lg:w-30 h-16 sm:h-20 lg:h-30">
//             <img
//               src="/images/logoF.png"
//               alt="Ind Hostel Logo"
//               className="object-contain w-16 sm:w-20 lg:w-30 h-16 sm:h-20 lg:h-30"
//             />
//           </div>
//           <p className="text-[#fff] text-sm font-medium mb-6">
//             {/* Simplifying Hostel, PG, and Hotels bookings with verified stays
//             across India */}
//             Booking Hostels Simplified
//           </p>

//           <p className="font-semibold">Download App Now For Exciting Offers</p>
//           <div className="flex gap-4 my-4">
//             <Link href="https://apps.apple.com">
//               <Image
//                 src="/images/app.png"
//                 alt="Download App"
//                 width={200}
//                 height={60}
//                 className="w-32 h-auto"
//               />
//             </Link>
//             <Link href="https://play.google.com">
//               <Image
//                 src="/images/google.png"
//                 alt="Download App"
//                 width={200}
//                 height={60}
//                 className="w-32 h-auto"
//               />
//             </Link>
//           </div>

//           {/* Social Icons */}
//           <div className="flex gap-4">
//             {[
//               { href: "https://www.facebook.com/", icon: facebook },
//               { href: "https://www.instagram.com/", icon: insta },
//               { href: "https://www.x.com/", icon: twitter },
//               { href: "https://www.youtube.com/", icon: linkedin },
//             ].map((social, index) => (
//               <a
//                 key={index}
//                 href={social.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-9 h-9 rounded-full text-[#2A32FF] flex items-center justify-center transition"
//               >
//                 {social.icon}
//               </a>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:gap-10 sm:col-span-2 lg:col-span-2">
//           {/* Quick Links */}
//           <div>
//             <h4
//               className="text-lg font-bold mb-2 md:mb-8"
//               // variants={itemVariants}
//             >
//               Quick Links
//             </h4>
//             <ul className="space-y-3 text-[#FFFFFFE5] text-sm font-medium">
//               {[
//                 { name: "Home", path: "/" },
//                 { name: "About Us", path: "/about" },
//                 // { name: "Explore Locations", path: "/" },
//                 // { name: "Why Choose Us", path: "/" },
//                 { name: "Contact", path: "/contact" },
//               ].map((item, index) => (
//                 <li
//                   key={item.name}
//                   // variants={linkItemVariants}
//                   // whileHover="hover"
//                   // custom={index}
//                 >
//                   <Link href={item.path}>{item.name}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {/* Programs */}
//           <div>
//             <h4
//               className="text-lg font-bold mb-2 md:mb-8"
//               // variants={itemVariants}
//             >
//               Our Stays
//             </h4>
//             <ul className="space-y-3 text-[#FFFFFFE5] text-sm font-medium">
//               {accomodationStayTypeData &&
//                 accomodationStayTypeData.map((item) => (
//                   <li key={item.staytype}>
//                     {item.staytype.toLowerCase() === "hostels" &&
//                       item.categories &&
//                       item.categories.length > 0 && (
//                         <div className="flex flex-col space-y-3">
//                           {item.categories.map((data, index) => (
//                             <Link
//                               key={index}
//                               href={`/data?type=hostels&category=${encodeURIComponent(
//                                 data.category_name,
//                               )}`}
//                               className="transition inline-block"
//                             >
//                               {data.category_name
//                                 ? data.category_name.charAt(0).toUpperCase() +
//                                   data.category_name.slice(1)
//                                 : "Unknown Area"}
//                             </Link>
//                           ))}
//                         </div>
//                       )}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         </div>

//         {/* Connect */}
//         <div className="col-span-full lg:col-span-1">
//           <h4 className="text-lg font-bold mb-2 md:mb-8">Connect</h4>
//           <ul className="space-y-3 text-gray-300 text-sm mb-6">
//             <li className="flex items-start gap-3">
//               <span>{locationIcon}</span>
//               {/* {locationIcon} */}
//               <span className="text-sm font-medium">
//                 IndHostel, New Delhi, India - 500089
//               </span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span>{emailIcon}</span>
//               <span className="text-sm font-medium">support@indhostel.com</span>
//             </li>
//             <li className="flex items-start gap-3">
//               <span>{phoneIcon}</span>
//               <span className="text-sm font-medium">+91-9876543210</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Line */}
//       <div className="pb-2 sm:pb-0 sm:mt-12 px-4 sm:px-8 lg:px-20 border-t border-[#FFFFFF1F] pt-4 text-center text-white text-sm flex flex-col sm:flex-row justify-between items-center gap-2">
//         <p className="text-sm font-medium">
//           © 2025 IndHostel. All rights reserved
//         </p>
//       </div>
//     </footer>
//   );
// }



/////////////////////////////////////////////////////////////////////////////////////



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
import Image from "next/image";

export default function Footer() {
  const { accomodationStayTypeData } = useSelector(
    (state) => state.accomodationStayType,
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
      <div
        className="relative z-10 mx-auto px-4 sm:px-8 lg:px-20 
                grid grid-cols-1 lg:grid-cols-6 
                gap-10 lg:gap-8"
      >
        {/* Logo Section */}
        <div className="grid sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logoF.png"
                alt="Ind Hostel Logo"
                className="object-contain w-20 h-20"
              />
            </div>
            <p className="text-sm font-medium mb-6">
              Booking Hostels Simplified
            </p>
          </div>

          <div>
            <p className="font-semibold">
              Download App Now For Exciting Offers
            </p>

            <div className="flex gap-4 my-4">
              <Link href="https://apps.apple.com">
                <Image
                  src="/images/app.png"
                  alt="Download App"
                  width={200}
                  height={60}
                  className="w-32 h-auto"
                />
              </Link>

              <Link href="https://play.google.com">
                <Image
                  src="/images/google.png"
                  alt="Download App"
                  width={200}
                  height={60}
                  className="w-32 h-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:col-span-4 gap-8 mb-5 md:mb-0">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium text-[#FFFFFFE5]">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h4 className="text-lg font-bold mb-6">Terms & Conditions</h4>
            <ul className="space-y-3 text-sm font-medium text-[#FFFFFFE5]">
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Partner with us */}
          <div>
            <h4 className="text-lg font-bold mb-6">Partner with us</h4>
            <ul className="space-y-3 text-sm font-medium text-[#FFFFFFE5]">
              <li>
                <Link
                  href="/list-property"
                  className="hover:text-white transition"
                >
                  List your property
                </Link>
              </li>
              {/* <li>
                <Link href="/affiliate" className="hover:text-white transition">
                  Become an affiliate
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-medium text-[#FFFFFFE5]">
              <li>
                <Link
                  href="/manage-bookings"
                  className="hover:text-white transition"
                >
                  Manage your bookings
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-white transition">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition">
                  FAQ’s
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="pb-2 sm:pb-0 sm:mt-12 px-4 sm:px-8 lg:px-20 border-t border-[#FFFFFF1F] pt-4 text-center text-white text-sm flex flex-col-reverse sm:flex-row justify-between items-center gap-2">
        <p className="text-sm font-medium">
          © 2025 IndHostel. All rights reserved
        </p>
        <p className="text-xs font-medium hidden md:block">
          Designed & developed by Techpixe
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[facebook, insta, twitter, linkedin].map((icon, index) => (
            <div
              key={index}
              className="w-9 h-9 rounded-full flex items-center justify-center"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
