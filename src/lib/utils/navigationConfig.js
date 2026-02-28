// export const NAV_LINKS = [
//   { path: "/", label: "Home" },
//   { path: "/about", label: "About Us" },
//   { path: "/contact", label: "Contact" },
// ];

// export const DROPDOWN_CONFIGS = [
//   {
//     type: "hostels",
//     label: "Find Hostels",
//     icon: "/images/hostel.png",
//     staticItems: [
//       { label: "Girls Hostels", type: "hostels", category: "Girls Hostels" },
//       { label: "Co-Living Hostels", type: "hostels", category: "Co-Livin Hostels" },
//       { label: "Boys Hostels", type: "hostels", category: "Boys Hostels" },
//     ]
//   },
//   {
//     type: "pgs",
//     label: "Pay Guest (PGs)",
//     icon: "/images/pg.png",
//     staticItems: [
//       { label: "Men's PG", type: "pgs", category: "menspg" },
//       { label: "Women's PG", type: "pgs", category: "girlspg" },
//       { label: "Co-Living PG", type: "pgs", category: "colivingpg" },
//     ]
//   },
//   {
//     type: "hotels",
//     label: "Hotels",
//     icon: "/images/hotel.png",
//     staticItems: [
//       { label: "New Hotels", type: "hotels", category: "New Hotel" },
//       { label: "Business Hotels", type: "hotels", category: "Business Hotels" },
//     ]
//   },
// ];

/////////////////////////////////////////////////////////////////////////////////////////////////////

// export const NAV_LINKS = [
//   // { path: "/", label: "Home" },
//   { path: "/https://vendors.indhostel.com", label: "List Properties" },
//   { path: "/https://play.google.com/store", label: "Download App" },
// ];

export const NAV_LINKS = [
  {
    path: "https://vendors.indhostel.com",
    label: "List Properties",
    external: true,
  },
  {
    path: "https://play.google.com/store",
    label: "Download App",
    external: true,
  },
];

export const DROPDOWN_CONFIGS = [
  {
    type: "find-hostels",
    label: "Find Hostels",
    icon: "/images/hostel.png",
    categories: [
      {
        label: "Hostels",
        type: "hostels",
        items: [
          { label: "Girls Hostels", category: "Girls Hostels" },
          { label: "Boys Hostels", category: "Boys Hostels" },
          { label: "Co-Living Hostels", category: "Co-Livin Hostels" },
        ],
      },
      {
        label: "PGs",
        type: "pgs",
        items: [
          { label: "Men's PG", category: "menspg" },
          { label: "Women's PG", category: "girlspg" },
          { label: "Co-Living PG", category: "colivingpg" },
        ],
      },
    ],
  },
];
