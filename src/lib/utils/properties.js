export const properties = [
  {
    id: 1,
    name: "Coxy Stay Hostel",
    location: "Mumbai, India",
    price: "₹8,000/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "budget",
    images: "/images/coxy.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 8000,
  },
  {
    id: 2,
    name: "Green Leaf Hostel",
    location: "Pune, India",
    price: "₹7,500/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "budget",
    images: "/images/g-leaf.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 7500,
  },
  {
    id: 3,
    name: "Blue Star Hostel",
    location: "Goa, India",
    price: "₹9,000/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "premium",
    images: "/images/g_leaf.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 9000,
  },
  {
    id: 4,
    name: "Ocean View Hostel",
    location: "Hyderabad, India",
    price: "₹8,500/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "premium",
    images: "/images/ocean.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 8500,
  },
  {
    id: 5,
    name: "Mountain View Hostel",
    location: "Bangalore, India",
    price: "₹8,200/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "budget",
    images: "/images/3.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 8200,
  },
  {
    id: 6,
    name: "City Center Hostel",
    location: "Delhi, India",
    price: "₹9,500/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "premium",
    images: "/images/city.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 9500,
  },
  {
    id: 7,
    name: "Riverside Hostel",
    location: "Chennai, India",
    price: "₹7,800/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "budget",
    images: "/images/goa.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 7800,
  },
  {
    id: 8,
    name: "Luxury Stay Hostel",
    location: "Kolkata, India",
    price: "₹11,000/month",
    description: "Amadeim hostel with all amenities, free Wi-Fi, and guest community space",
    category: "luxury",
    images: "/images/urban.png",
    allImages: [
      "/images/abt.png",
      "/images/coxy.png",
      "/images/g-leaf.png",
      "/images/g_leaf.png",
    ],
    basePrice: 11000,
  },
];

// Helper functions
// Helper functions
export const getAllPropertyIds = () => {
  return properties.map(property => ({ id: property.id.toString() }));
};

export const getPropertyById = (id) => {
  // Add null check and proper type conversion
  if (!id) return null;
  
  const idNum = parseInt(id.toString());
  return properties.find(property => property.id === idNum);
};

export const getPropertiesByCategory = (category) => {
  return properties.filter(property => property.category === category);
};