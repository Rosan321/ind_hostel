"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CalendarDays, MapPin, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SlideUp from "./animations/SlideUp";
import RevealOnScroll from "./animations/RevealOnScroll";
import { toast } from "react-toastify";

export default function SearchBar({ initialParams = {} }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();

  const [city, setCity] = useState(initialParams.city || "");
  const [stayType, setStayType] = useState(initialParams.type || "hotels");
  const [pgMode, setPgMode] = useState("daily");
  const [checkInDate, setCheckInDate] = useState(
    initialParams.checkIn ? new Date(initialParams.checkIn) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialParams.checkOut ? new Date(initialParams.checkOut) : null
  );

  useEffect(() => {
    if (initialParams.city) setCity(initialParams.city);
    if (initialParams.type) setStayType(initialParams.type);
    if (initialParams.mode) setPgMode(initialParams.mode);
    if (initialParams.checkIn) setCheckInDate(new Date(initialParams.checkIn));
    if (initialParams.checkOut) setCheckOutDate(new Date(initialParams.checkOut));
  }, [initialParams]);

  // Filter function for hostel checkout (monthly basis)
  const filterHostelDates = (date) => {
    if (!checkInDate) return false;
    
    // Convert dates to start of day for accurate comparison
    const startOfCheckIn = new Date(checkInDate);
    startOfCheckIn.setHours(0, 0, 0, 0);
    
    const startOfDate = new Date(date);
    startOfDate.setHours(0, 0, 0, 0);
    
    // For hostels, allow only:
    // 1. Same day (different time) for short stays OR
    // 2. Exact months later (1 month, 2 months, 3 months, etc.)
    const isSameDay = startOfDate.getDate() === startOfCheckIn.getDate() && 
                      startOfDate.getMonth() === startOfCheckIn.getMonth() && 
                      startOfDate.getFullYear() === startOfCheckIn.getFullYear();
    
    if (isSameDay) {
      return date > checkInDate; // Allow same day checkout (different time)
    }
    
    // Check if it's exact months later
    const checkInMonth = startOfCheckIn.getMonth();
    const checkInYear = startOfCheckIn.getFullYear();
    const dateMonth = startOfDate.getMonth();
    const dateYear = startOfDate.getFullYear();
    
    const monthDiff = (dateYear - checkInYear) * 12 + (dateMonth - checkInMonth);
    const isSameDayOfMonth = startOfDate.getDate() === startOfCheckIn.getDate();
    
    // Handle month-end edge cases
    const maxDaysInDateMonth = new Date(dateYear, dateMonth + 1, 0).getDate();
    const originalDay = startOfCheckIn.getDate();
    const isLastDayOfMonth = originalDay > maxDaysInDateMonth && 
                             startOfDate.getDate() === maxDaysInDateMonth;
    
    return monthDiff > 0 && (isSameDayOfMonth || isLastDayOfMonth);
  };

  // Filter function for PGs in weekly/monthly mode
  const filterPgDates = (date) => {
    if (!checkInDate || pgMode === "daily") return true;
    
    // Convert dates to start of day for accurate comparison
    const startOfCheckIn = new Date(checkInDate);
    startOfCheckIn.setHours(0, 0, 0, 0);
    
    const startOfDate = new Date(date);
    startOfDate.setHours(0, 0, 0, 0);
    
    const timeDiff = startOfDate.getTime() - startOfCheckIn.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (pgMode === "weekly") {
      // Allow only multiples of 7 days (1 week, 2 weeks, 3 weeks, etc.)
      return dayDiff > 0 && dayDiff % 7 === 0;
    } else if (pgMode === "monthly") {
      // Allow only dates that are exact months later (1, 2, 3... months)
      const checkInMonth = startOfCheckIn.getMonth();
      const checkInYear = startOfCheckIn.getFullYear();
      const dateMonth = startOfDate.getMonth();
      const dateYear = startOfDate.getFullYear();
      
      const monthDiff = (dateYear - checkInYear) * 12 + (dateMonth - checkInMonth);
      const isSameDayOfMonth = startOfDate.getDate() === startOfCheckIn.getDate();
      
      // Handle month-end edge cases
      const maxDaysInDateMonth = new Date(dateYear, dateMonth + 1, 0).getDate();
      const originalDay = startOfCheckIn.getDate();
      const isLastDayOfMonth = originalDay > maxDaysInDateMonth && 
                               startOfDate.getDate() === maxDaysInDateMonth;
      
      return monthDiff > 0 && (isSameDayOfMonth || isLastDayOfMonth);
    }
    
    return true; // For daily mode
  };

  // Handle stay type change
  const handleStayTypeChange = (type) => {
    setStayType(type);
    
    // Reset PG mode if not PGs
    if (type !== "pgs") {
      setPgMode("daily");
    }
    
    // If switching to hostels and we have check-in date, set checkout to 1 month later
    if ((type === "hostels" || type === "pgs") && checkInDate) {
      const oneMonthLater = getExactMonthLater(checkInDate, 1);
      setCheckOutDate(oneMonthLater);
    } else {
      // Reset checkout date for hotels
      setCheckOutDate(null);
    }
  };

  const handleSearch = () => {
    // Collect missing fields
    const missingFields = [];
    if (!city?.trim()) missingFields.push("City");
    if (!stayType?.trim()) missingFields.push("Stay Type");
    if (!checkInDate) missingFields.push("Check-in Date");
    if (!checkOutDate) missingFields.push("Check-out Date");

    // Show error if any required field is missing
    if (missingFields.length > 0) {
      toast.warning("All input fields are required !");
      return;
    }

    // Format dates
    const formatDate = (date) => date ? date.toISOString().split("T")[0] : undefined;

    const params = {
      city,
      type: stayType,
      mode:
        stayType === "pgs"
          ? pgMode
          : stayType === "hostels"
          ? "monthly"
          : "daily",
      checkIn: formatDate(checkInDate),
      checkOut: formatDate(checkOutDate),
    };

    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null && v !== "")
    );

    const queryString = new URLSearchParams(cleanParams).toString();

    // Navigate
    if (isHomePage) {
      router.push(`/location?${queryString}`);
    } else {
      router.push(`/location?${queryString}`, { scroll: false });
    }
  };

  // Get exact month(s) later date
  const getExactMonthLater = (fromDate, months) => {
    if (!fromDate) return null;
    const result = new Date(fromDate);
    result.setMonth(result.getMonth() + months);
    
    // Handle month-end edge cases
    const originalDay = fromDate.getDate();
    const maxDaysInResultMonth = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
    if (originalDay > maxDaysInResultMonth) {
      result.setDate(maxDaysInResultMonth);
    }
    
    return result;
  };

  // Handle check-in date change
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    
    if (stayType === "hostels") {
      // For hostels, automatically set checkout to 1 month later
      const oneMonthLater = getExactMonthLater(date, 1);
      setCheckOutDate(oneMonthLater);
    } else if (stayType === "pgs" && pgMode === "weekly") {
      // For PGs weekly mode, set checkout to 1 week later
      const oneWeekLater = new Date(date);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      setCheckOutDate(oneWeekLater);
    } else if (stayType === "pgs" && pgMode === "monthly") {
      // For PGs monthly mode, set checkout to 1 month later
      const oneMonthLater = getExactMonthLater(date, 1);
      setCheckOutDate(oneMonthLater);
    } else {
      // For other cases, reset checkout
      setCheckOutDate(null);
    }
  };

  // Handle PG mode change
  const handlePgModeChange = (mode) => {
    setPgMode(mode);
    
    // If we have check-in date, set appropriate checkout
    if (checkInDate) {
      if (mode === "weekly") {
        const oneWeekLater = new Date(checkInDate);
        oneWeekLater.setDate(oneWeekLater.getDate() + 7);
        setCheckOutDate(oneWeekLater);
      } else if (mode === "monthly") {
        const oneMonthLater = getExactMonthLater(checkInDate, 1);
        setCheckOutDate(oneMonthLater);
      } else {
        // For daily mode, reset checkout
        setCheckOutDate(null);
      }
    }
  };

  // Get highlight dates for the calendar
  const getHighlightDates = () => {
    if (!checkInDate) return [];
    
    const highlights = [];
    const maxPeriods = 12; // Show up to 12 periods
    
    if (stayType === "hostels") {
      // Highlight monthly intervals for hostels (1 month, 2 months, 3 months, etc.)
      for (let i = 1; i <= maxPeriods; i++) {
        const monthDate = getExactMonthLater(checkInDate, i);
        if (monthDate) highlights.push(monthDate);
      }
    } else if (stayType === "pgs" && pgMode === "weekly") {
      // Highlight weekly intervals (1 week, 2 weeks, 3 weeks, etc.)
      for (let i = 1; i <= maxPeriods; i++) {
        const weekDate = new Date(checkInDate);
        weekDate.setDate(weekDate.getDate() + (i * 7));
        highlights.push(weekDate);
      }
    } else if (stayType === "pgs" && pgMode === "monthly") {
      // Highlight monthly intervals (1 month, 2 months, 3 months, etc.)
      for (let i = 1; i <= maxPeriods; i++) {
        const monthDate = getExactMonthLater(checkInDate, i);
        if (monthDate) highlights.push(monthDate);
      }
    }
    
    return highlights;
  };

  // Get appropriate placeholder text
  const getCheckoutPlaceholder = () => {
    if (stayType === "hostels") {
      return "Select months duration";
    } else if (stayType === "pgs") {
      if (pgMode === "weekly") return "Select weeks duration";
      if (pgMode === "monthly") return "Select months duration";
      return "Check-out";
    }
    return "Check-out";
  };

  // Get filter function based on stay type and mode
  const getFilterFunction = () => {
    if (stayType === "hostels") {
      return filterHostelDates;
    } else if (stayType === "pgs") {
      return filterPgDates;
    }
    return undefined; // Hotels - no filter
  };

  return (
    <SlideUp delay={0}>
      <div className="relative z-10 text-white py-10 h-full gap-12 lg:gap-24 sm:px-6 lg:px-20 flex flex-col items-center justify-center text-center">
        {isHomePage && (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-snug">
              Find Your Perfect Stay – Hostel, PG & Hotels in One Place
            </h1>
            <p className="text-gray-200 mt-4 text-base md:text-lg max-w-xl">
              Book affordable stays with comfort and convenience across India
            </p>
          </div>
        )}

        <div className="bg-black/60 rounded-3xl xl:rounded-full py-8 xl:py-12 px-4 sm:px-8 xl:px-24 w-full">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-8 xl:gap-10 max-w-7xl mx-auto w-full">
            {/* 📱 MOBILE + TABLET + LAPTOP (<XL) */}
            <div className="flex flex-col w-full xl:hidden gap-4 sm:gap-5 md:gap-6">
              {/* Stay Type */}
              <SlideUp delay={0.05}>
                <div
                  className={`${
                    stayType === "pgs"
                      ? "hidden"
                      : "bg-white text-black px-4 py-3 rounded-full h-12 flex items-center"
                  }`}
                >
                  <select
                    value={stayType}
                    onChange={(e) => handleStayTypeChange(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  >
                    <option value="hotels">Hotel</option>
                    <option value="pgs">PG</option>
                    <option value="hostels">Hostel</option>
                  </select>
                </div>
              </SlideUp>

              {/* ⭐ PG TYPE + MODE side by side full width */}
              {stayType === "pgs" && (
                <div className="flex gap-4 w-full">
                  {/* Stay Type Dropdown */}
                  <div className="bg-white text-black px-4 py-3 rounded-full h-12 flex items-center w-full">
                    <select
                      value={stayType}
                      onChange={(e) => handleStayTypeChange(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    >
                      <option value="hotels">Hotel</option>
                      <option value="pgs">PG</option>
                      <option value="hostels">Hostel</option>
                    </select>
                  </div>

                  {/* PG Mode Dropdown */}
                  <div className="bg-white text-black px-4 py-3 rounded-full h-12 flex items-center w-full">
                    <select
                      value={pgMode}
                      onChange={(e) => handlePgModeChange(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Location */}
              <SlideUp delay={0.1}>
                <div className="flex items-center bg-white text-black px-4 py-3 rounded-full h-12 gap-2">
                  <MapPin size={18} />
                  <input
                    type="text"
                    placeholder="Enter City or Area"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </SlideUp>

              {/* Dates */}
              <div className="sm:flex items-center gap-4">
                <SlideUp delay={0.2}>
                  <div className="bg-white text-black px-4 py-3 rounded-full h-12 flex items-center gap-2 w-full">
                    <CalendarDays size={18} />
                    <DatePicker
                      selected={checkInDate}
                      onChange={handleCheckInChange}
                      className="bg-transparent outline-none w-full"
                      placeholderText="Check-in"
                      dateFormat="dd MMM yyyy"
                      minDate={new Date()}
                    />
                  </div>
                </SlideUp>

                <ArrowRight size={28} className="text-gray-300 hidden sm:block" />

                <SlideUp delay={0.2}>
                  <div className="bg-white text-black px-4 py-3 rounded-full h-12 flex items-center gap-2 w-full mt-4 sm:mt-0">
                    <CalendarDays size={18} />
                    <DatePicker
                      selected={checkOutDate}
                      onChange={(d) => setCheckOutDate(d)}
                      className="bg-transparent outline-none w-full"
                      placeholderText={getCheckoutPlaceholder()}
                      dateFormat="dd MMM yyyy"
                      minDate={checkInDate || new Date()}
                      filterDate={getFilterFunction()}
                      highlightDates={getHighlightDates()}
                      disabledKeyboardNavigation={
                        stayType === "hostels" || (stayType === "pgs" && pgMode !== "daily")
                      }
                      showDisabledMonthNavigation
                    />
                  </div>
                </SlideUp>
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="btn-wiper-bg sm:w-2/3 mx-auto h-12 rounded-full"
              >
                <span className="btn-wiper-bg-content flex items-center justify-center gap-2 font-semibold">
                  <Search size={18} />
                  {isHomePage ? "Find Stay" : "Update Search"}
                </span>
              </button>
            </div>

            {/* 🖥️ DESKTOP (XL AND ABOVE) */}
            <div className="hidden xl:flex gap-4 w-full items-center">
              {/* Stay Type */}
              <div className="bg-white text-black px-6 rounded-full h-12 flex items-center flex-1">
                <select
                  value={stayType}
                  onChange={(e) => handleStayTypeChange(e.target.value)}
                  className="w-full outline-none bg-transparent"
                >
                  <option value="hotels">Hotel</option>
                  <option value="pgs">PG</option>
                  <option value="hostels">Hostel</option>
                </select>
              </div>

              {/* PG MODE */}
              {stayType === "pgs" && (
                <div className="bg-white text-black px-6 rounded-full h-12 flex items-center flex-1">
                  <select
                    value={pgMode}
                    onChange={(e) => handlePgModeChange(e.target.value)}
                    className="w-full outline-none bg-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center bg-white text-black px-6 rounded-full h-12 flex-2 gap-3">
                <MapPin size={24} />
                <input
                  type="text"
                  placeholder="Enter City or Area"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent outline-none w-full"
                />
              </div>

              {/* Check-in */}
              <div className="flex items-center bg-white text-black px-6 rounded-full h-12 flex-1 gap-3">
                <CalendarDays size={32} />
                <DatePicker
                  selected={checkInDate}
                  onChange={handleCheckInChange}
                  className="bg-transparent outline-none w-full"
                  placeholderText="Check-in"
                  minDate={new Date()}
                  dateFormat="dd MMM yyyy"
                />
              </div>

              <ArrowRight size={20} className="text-gray-300" />

              {/* Check-out */}
              <div className="flex items-center bg-white text-black px-6 rounded-full h-12 flex-1 gap-3">
                <CalendarDays size={32} />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(d) => setCheckOutDate(d)}
                  className="bg-transparent outline-none w-full"
                  placeholderText={getCheckoutPlaceholder()}
                  minDate={checkInDate || new Date()}
                  filterDate={getFilterFunction()}
                  highlightDates={getHighlightDates()}
                  disabledKeyboardNavigation={
                    stayType === "hostels" || (stayType === "pgs" && pgMode !== "daily")
                  }
                  showDisabledMonthNavigation
                  dateFormat="dd MMM yyyy"
                />
              </div>

              {/* Search Button */}
              <SlideUp delay={0.2}>
                <button
                  onClick={handleSearch}
                  className="btn-wiper-bg h-12 rounded-full px-8 flex items-center justify-center"
                >
                  <span className="btn-wiper-bg-content flex items-center gap-2 font-medium">
                    <Search size={20} />
                    {isHomePage ? "Find Stay" : "Update Search"}
                  </span>
                </button>
              </SlideUp>
            </div>
          </div>

          <RevealOnScroll delay={0.2}>
            <p className="text-sm text-gray-300 mt-4 text-center">
              Find affordable Hostels, PGs & Hotels in seconds
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </SlideUp>
  );
}