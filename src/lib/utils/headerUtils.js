// import Link from "next/link";
// import { hostelsDropdownItems, hotelsDropdownItems, pgDropdownItems } from "./headerDropdowns";

// export const NAV_LINKS = [
//   { path: "/", label: "Home" },
//   { path: "/about", label: "About Us" },
//   { path: "/contact", label: "Contact" },
// ];

// export const DROPDOWNS = [
//   {
//     type: "hostels",
//     label: "Find Hostels",
//     items: hostelsDropdownItems,
//     icon: "/images/hostel.png",
//   },
//   {
//     type: "pgs",
//     label: "Pay Guest (PGs)",
//     items: pgDropdownItems,
//     icon: "/images/pg.png",
//   },
//   {
//     type: "hotels",
//     label: "Hotels",
//     items: hotelsDropdownItems,
//     icon: "/images/hotel.png",
//   },
// ];

// export const DropdownMenu = ({
//   items,
//   onItemClick,
//   isMobile = false,
//   onMouseEnter,
//   onMouseLeave,
// }) => {
//   const baseClasses = isMobile
//     ? "mt-2 flex flex-col gap-3 text-sm bg-gray-800 p-3 rounded-lg"
//     : "absolute left-1/2 -translate-x-1/2 top-full mt-3 bg-white text-black rounded-xl shadow-xl p-4 w-64 flex flex-col gap-3 text-sm";

//   return (
//     <ul
//       className={baseClasses}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       {items.map(({ label, type, category }, index) => (
//         <li
//           key={index}
//           className="hover:text-[#0D0BA8] cursor-pointer transition-colors duration-200 py-1 px-2 rounded"
//           onClick={() => onItemClick(type, category)}
//         >
//           {label}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export const NavLink = ({ path, label, isActive, onClick }) => (
//   <Link
//     href={path}
//     onClick={onClick}
//     className={`relative xl:text-lg px-4 lg:px-0 xl:px-4 font-semibold pb-2
//       after:absolute after:left-0 after:bottom-0 after:h-[2px]
//       after:bg-[#0D0BA8]
//       after:transition-all after:duration-300
//       ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
//     `}
//   >
//     {label}
//   </Link>
// );

// export const AuthButton = ({ href, label, variant = "primary", onClick }) => {
//   const baseClasses =
//     variant === "primary"
//       ? "btn-wiper text-center py-3"
//       : "btn-wiper-bg text-center py-3";

//   return (
//     <Link href={href} onClick={onClick} className={baseClasses}>
//       <span
//         className={
//           variant === "primary"
//             ? "btn-wiper-content text-base text-[#FFF] lg:text-[#0D0BA8]"
//             : "btn-wiper-bg-content text-base"
//         }
//       >
//         {label}
//       </span>
//     </Link>
//   );
// };


/////////////////////////////////////////////////////////////////////////////////////////////


import Link from "next/link";

export const DropdownMenu = ({
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
          {label?.slice(0, 1).toUpperCase() + label?.slice(1)}
        </li>
      ))}
    </ul>
  );
};

export const NavLink = ({ path, label, isActive, onClick }) => (
  <Link
    href={path}
    onClick={onClick}
    className={`relative xl:text-lg px-4 lg:px-0 xl:px-4 font-semibold pb-2
      after:absolute after:left-0 after:bottom-0 after:h-[2px]
      after:bg-[#0D0BA8]
      after:transition-all after:duration-300
      ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
    `}
  >
    {label}
  </Link>
);

export const AuthButton = ({ href, label, variant = "primary", onClick }) => {
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