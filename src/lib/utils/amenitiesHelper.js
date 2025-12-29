import {
  Wifi,
  Shield,
  Utensils,
  ShieldCheck,
  Bed,
  Shirt,
  Car,
  Camera,
  CarTaxiFront,
  CookingPot,
  Dumbbell,
  Droplets,
  CircleCheck,
} from "lucide-react";

export const getAmenityIcon = (amenity) => {
  const iconMap = {
    wifi: <Wifi className="w-5 h-5 text-[#44475A]" />,
    verified: <ShieldCheck className="w-5 h-5 text-green-600" />,
    "meals included": <Utensils className="w-5 h-5 text-[#44475A]" />,
    "24/7 security": <Shield className="w-5 h-5 text-[#44475A]" />,
    "comfortable beds": <Bed className="w-5 h-5 text-[#44475A]" />,
    "laundry service": <Shirt className="w-5 h-5 text-[#44475A]" />,
    parking: <Car className="w-5 h-5 text-[#44475A]" />,
    "cctv surveillance": <Camera className="w-5 h-5 text-[#44475A]" />,
    auto: <CarTaxiFront className="w-5 h-5 text-[#44475A]" />,
    "self-cooking kitchen": <CookingPot className="w-5 h-5 text-[#44475A]" />,
    gym: <Dumbbell className="w-5 h-5 text-[#44475A]" />,
    "tap water": <Droplets className="w-5 h-5 text-[#44475A]" />,
  };

  // Check if amenity exists in iconMap
  const normalizedAmenity = amenity.toLowerCase();
  
  if (iconMap[normalizedAmenity]) {
    return iconMap[normalizedAmenity];
  }
  
  // Default icon for unmatched amenities
  return <CircleCheck className="w-5 h-5 text-[#44475A]" />;
};

export const getAmenityLabel = (amenity) => {
  const labelMap = {
    wifi: "WiFi",
    verified: "Verified",
    "meals included": "Meals Included",
    "24/7 security": "24/7 Security",
    "comfortable beds": "Comfortable Beds",
    "laundry service": "Laundry Service",
    parking: "Parking",
    "cctv surveillance": "CCTV Surveillance",
    auto: "Auto/Taxi Service",
    "self-cooking kitchen": "Self-Cooking Kitchen",
    gym: "Gym",
    "tap water": "Tap Water",
  };

  const normalizedAmenity = amenity.toLowerCase();
  
  return labelMap[normalizedAmenity] || 
         amenity.charAt(0).toUpperCase() + amenity.slice(1);
};

// Alternative simpler version with better matching:
export const getAmenityIconAlt = (amenity) => {
  const amenityLower = amenity.toLowerCase();
  
  // More flexible matching with includes
  if (amenityLower.includes('wifi') || amenityLower.includes('wi-fi')) {
    return <Wifi className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('verified') || amenityLower.includes('verify')) {
    return <ShieldCheck className="w-5 h-5 text-green-600" />;
  }
  if (amenityLower.includes('meal') || amenityLower.includes('food')) {
    return <Utensils className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('security') || amenityLower.includes('safety')) {
    return <Shield className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('bed') || amenityLower.includes('sleep')) {
    return <Bed className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('laundry') || amenityLower.includes('wash')) {
    return <Shirt className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('parking') || amenityLower.includes('car')) {
    return <Car className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('cctv') || amenityLower.includes('camera')) {
    return <Camera className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('auto') || amenityLower.includes('taxi')) {
    return <CarTaxiFront className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('kitchen') || amenityLower.includes('cook')) {
    return <CookingPot className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('gym') || amenityLower.includes('fitness')) {
    return <Dumbbell className="w-5 h-5 text-[#44475A]" />;
  }
  if (amenityLower.includes('water') || amenityLower.includes('tap')) {
    return <Droplets className="w-5 h-5 text-[#44475A]" />;
  }
  
  // Default for any unmatched amenity
  return <CircleCheck className="w-5 h-5 text-[#44475A]" />;
};

