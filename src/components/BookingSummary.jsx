"use client";

import { useState, useMemo, useEffect } from "react";
import {
  CalendarDays,
  ArrowRight,
  CreditCard,
  RefreshCw,
  Headphones,
  Minus,
  Plus,
  Tag,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RevealOnScroll from "./animations/RevealOnScroll";
import Coupons from "./Coupons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/lib/axiosInstance";
import { API_ENDPOINTS } from "@/lib/api/api";
import { loadRazorpayScript } from "@/lib/utils/razorpay";
import { useSelector } from "react-redux";

const BookingSummary = ({ roomData, formData }) => {
  // console.log(roomData)
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);

  // States
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [durationType, setDurationType] = useState("day");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  // Coupon states
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  // 🔹 State for modal
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [allCoupons, setAllCoupons] = useState([]);

  // console.log(isAuth)

  // 🔹 Handle coupon click from modal
  const handleCouponSelect = (couponData) => {
    // Apply the coupon directly with the data
    applyCouponFromData(couponData);
  };

  const applyCouponFromData = (couponData) => {
    // Check minimum amount
    if (couponData.minimumamount > totalPrice) {
      toast.error(
        `Minimum booking amount of ₹${couponData.minimumamount.toLocaleString()} required for this coupon`
      );
      return;
    }

    // Check if coupon is active
    if (couponData.status !== "active") {
      toast.error("This coupon is not active");
      return;
    }

    // Check if coupon is expired
    if (couponData.expireDate && new Date(couponData.expireDate) < new Date()) {
      toast.error("This coupon has expired");
      return;
    }

    // Check if accommodation is targeted
    if (
      couponData.targetedAccommodations &&
      couponData.targetedAccommodations.length > 0
    ) {
      // console.log(couponData);
      if (
        !accommodation?._id ||
        !couponData.targetedAccommodations.includes(accommodation._id)
      ) {
        toast.error("This coupon is not valid for this accommodation");
        return;
      }
    }

    // All validations passed - apply the coupon
    setAppliedCoupon({
      code: couponData.code,
      discountType: couponData.discounttype || "fixed",
      discountAmount:
        couponData.discounttype === "percentage"
          ? couponData.discountpercentage
          : couponData.discountamount,
      maxDiscount: couponData.maxDiscount || null,
      minBookingAmount: couponData.minimumamount || 0,
      couponId: couponData.id,
      ...couponData,
    });

    setCoupon(couponData.code);
    setCouponError("");
    setShowCouponModal(false);

    // Show success message
    const discountText =
      couponData.discounttype === "percentage"
        ? `${couponData.discountpercentage}%`
        : `₹${couponData.discountamount}`;
    toast.success(
      `Coupon ${couponData.code} applied! ${discountText} discount added.`
    );
  };

  // Get accommodation details from roomData
  const accommodation = roomData?.accommodation_id || {};
  const pricing = roomData?.pricing_id?.pricing || [];

  // Type flags
  const isHotel = accommodation?.property_type === "hotels";
  const isPG = accommodation?.property_type === "pgs";
  const isHostel = accommodation?.property_type === "hostels";

  // Calculate total guests for hotels
  const totalHotelGuests = isHotel ? adults + children : guests;

  // 🔹 Get room details and pricing
  const selectedRoom = useMemo(() => {
    if (!roomData) return {};

    // Convert pricing array to object for easy access
    const pricingObj = {};
    const pricingDetails = {};

    pricing.forEach((priceItem) => {
      const type = priceItem.price_type.replace("per ", "");
      pricingObj[type] = priceItem.price;

      // Store full price details
      pricingDetails[type] = {
        price: priceItem.price,
        description: priceItem.description,
        price_type: priceItem.price_type,
        currency: priceItem.currency || "INR",
      };
    });

    return {
      id: roomData._id,
      type: roomData.room_type || "Three Share Room",
      pricing: pricingObj,
      pricingDetails: pricingDetails,
      bedsAvailable: roomData.beds_available || 0,
      roomsAvailable: roomData.rooms_available || 0,
      maxGuests: roomData.no_of_guests || 3,
      maxAdults: roomData.no_of_guests || (isHotel ? 2 : 1),
      maxChildren: 2,
      allowsChildren: isHotel,
      roomAmenities: roomData.room_amenities || [],
    };
  }, [roomData, pricing, isHotel]);

  // 🔹 Set default duration type on component mount
  useEffect(() => {
    if (isHotel) {
      setDurationType("day");
    } else if (isHostel) {
      setDurationType("month");
    } else if (isPG && selectedRoom.pricing) {
      if (selectedRoom.pricing.day) {
        setDurationType("day");
      } else if (selectedRoom.pricing.week) {
        setDurationType("week");
      } else if (selectedRoom.pricing.month) {
        setDurationType("month");
      }
    }
  }, [selectedRoom, isPG, isHostel, isHotel]);

  // 🔹 Calculate number of complete months between dates
  const calculateCompleteMonths = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Set both dates to the 1st of the month to avoid day-of-month issues
    start.setDate(1);
    end.setDate(1);

    let months = 0;

    // Add months until we reach or pass the end date
    const tempDate = new Date(start);
    while (tempDate < end) {
      tempDate.setMonth(tempDate.getMonth() + 1);
      months++;
    }

    return months;
  };

  // 🔹 Calculate number of complete weeks between dates
  const calculateCompleteWeeks = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate complete weeks
    return Math.ceil(diffDays / 7);
  };

  // 🔹 Get price for current duration type from roomData
  const getPriceForDuration = (duration) => {
    // For hotels, always use daily price
    if (isHotel) {
      return (
        selectedRoom.pricing?.day ||
        selectedRoom.pricingDetails?.day?.price ||
        0
      );
    }

    // For PG/Hostel, get the price for the selected duration type
    return (
      selectedRoom.pricing?.[duration] ||
      selectedRoom.pricingDetails?.[duration]?.price ||
      0
    );
  };

  // 🔹 Compute effective base price
  const calculatedBasePrice = useMemo(() => {
    return getPriceForDuration(durationType);
  }, [durationType, isHotel, selectedRoom]);

  // 🔹 Calculate total price dynamically based on roomData pricing
  const totalPrice = useMemo(() => {
    // If no price data available, return 0
    if (
      !selectedRoom.pricing ||
      Object.keys(selectedRoom.pricing).length === 0
    ) {
      return 0;
    }

    // Hotel pricing logic (per ADULT only, children don't affect price)
    if (isHotel) {
      const dailyRate = selectedRoom.pricing.day || 0;
      let totalNights = 1;

      if (checkIn && checkOut) {
        const diffTime = Math.abs(checkOut - checkIn);
        totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      // Calculate price based on ADULTS only (children don't affect price)
      const baseAmount = Math.round(dailyRate * totalNights * adults);

      return baseAmount;
    }

    // PG & Hostel pricing logic (per guest pricing - all guests count)
    if (isPG || isHostel) {
      // Get the price for selected duration type
      const durationPrice = getPriceForDuration(durationType);

      if (checkIn && checkOut) {
        if (durationType === "day") {
          // Daily pricing: calculate exact days
          const diffTime = Math.abs(checkOut - checkIn);
          const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return Math.round(durationPrice * totalDays * guests);
        } else if (durationType === "week") {
          // Weekly pricing: calculate complete weeks
          const totalWeeks = calculateCompleteWeeks(checkIn, checkOut);
          return Math.round(durationPrice * totalWeeks * guests);
        } else if (durationType === "month" || durationType === "year") {
          // Monthly/Yearly pricing: calculate complete months/years
          if (durationType === "year") {
            // For yearly, calculate months and divide by 12
            const totalMonths = calculateCompleteMonths(checkIn, checkOut);
            const totalYears = Math.ceil(totalMonths / 12);
            return Math.round(durationPrice * totalYears * guests);
          } else {
            // For monthly
            const totalMonths = calculateCompleteMonths(checkIn, checkOut);
            return Math.round(durationPrice * totalMonths * guests);
          }
        }
      }

      // If no dates selected, just show base price for guests
      return Math.round(durationPrice * guests);
    }

    return 0;
  }, [
    checkIn,
    checkOut,
    adults, // Only adults affect hotel price
    children, // Children don't affect hotel price, but kept for PG/Hostel logic
    guests,
    durationType,
    isPG,
    isHostel,
    isHotel,
    selectedRoom.pricing,
  ]);

  // 🔹 Calculate discount amount
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    // console.log("Applied Coupon:", appliedCoupon); // Debug log
    // console.log("Total Price:", totalPrice); // Debug log

    if (appliedCoupon.discountType === "percentage") {
      const discount = (totalPrice * appliedCoupon.discountAmount) / 100;
      // console.log("Percentage Discount:", discount); // Debug log

      // Apply max discount if specified
      if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
        // console.log("Applying max discount:", appliedCoupon.maxDiscount); // Debug log
        return appliedCoupon.maxDiscount;
      }
      return discount;
    } else if (appliedCoupon.discountType === "fixed") {
      // console.log("Fixed Discount:", appliedCoupon.discountAmount); // Debug log
      return Math.min(appliedCoupon.discountAmount, totalPrice); // Don't discount more than total
    }

    // console.log("No discount calculated"); // Debug log
    return 0;
  };

  const discountAmount = calculateDiscount();
  const taxAmount =
  typeof accommodation?.tax_amount === 'number'
    ? accommodation.tax_amount
    : 0;

  const finalPrice = totalPrice + taxAmount - discountAmount;

  // 🔹 Apply Coupon Function (Client-side validation)
  const handleApplyCoupon = async (couponCode = null) => {
    const codeToApply = couponCode || coupon;

    if (!codeToApply.trim()) {
      setCouponError("Please enter a coupon code");
      toast.error("Please enter a coupon code");
      return;
    }

    if (allCoupons.length === 0) {
      toast.info("Loading available coupons...");
      setShowCouponModal(true);
      setIsApplyingCoupon(false);
      return;
    }

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      // Find the coupon in our stored coupons
      const couponData = allCoupons.find(
        (c) => c.code.toUpperCase() === codeToApply.toUpperCase()
      );

      if (!couponData) {
        setCouponError("Invalid coupon code");
        toast.error("Invalid coupon code");
        return;
      }

      // Apply coupon with validation
      applyCouponFromData(couponData);
    } catch (err) {
      console.error("Coupon apply error:", err);
      const errorMessage = "Failed to apply coupon. Please try again.";
      setCouponError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // 🔹 Remove Coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError("");
    toast.info("Coupon removed");
  };

  // 🔹 Handle Proceed to Checkout
  const handleProceedToCheckout = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (
      !formData.fullname ||
      !formData.agreed ||
      !formData.emailAddress ||
      !formData.mobilenumber ||
      !formData.gender
    ) {
      toast.error("Please fill the guest information");
      return;
    }

    // Another alternative: Manual formatting (most reliable)
    const formatDateManual = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const accoid = accommodation?._id || "";
    const roomid = selectedRoom.id || "";
    
    const bookingData = {
      // 🔹 FIX: Use proper date formatting
      check_in_date: formatDateManual(checkIn),  // Changed from toISOString().split('T')[0]
      check_out_date: formatDateManual(checkOut), // Changed from toISOString().split('T')[0]
        price_type: isHotel ? "per day" : `per ${durationType}`,
        noofguests: isHotel ? totalHotelGuests : guests,
        paymentmode: "online",
        bookingamount: finalPrice,
        couponCode: appliedCoupon?.code || "",
        discountamount: discountAmount,
        guestdetails: {
          ...formData,
          noofadults: isHotel ? adults : 0,
          noofchildrens: isHotel ? children : 0,
        },
      };

    try {
      // Step 1: Create booking and get order details from backend
      const createBookingResponse = await axiosInstance.post(
        `${API_ENDPOINTS.PAYMENT.CREATE_PAYMENT}/${accoid}/${roomid}`,
        bookingData
      );

      // console.log(createBookingResponse)

      // Assuming the response contains order details needed for Razorpay
      const { id: orderId, currency } = createBookingResponse.data.order;

      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error("Razorpay failed to load");
      }
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(finalPrice * 100),
        currency: currency || "INR",
        name: "Ind Hostels",
        description: `Booking for ${roomData?.accommodation_id?.property_type} || "Staying"`,
        order_id: orderId,
        handler: async function (response) {
          try {
            const payload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: {
                ...bookingData,
                accoid,
                roomid
              }
            };

            const verifyResponse = await axiosInstance.post(
              API_ENDPOINTS.PAYMENT.VERIFY_PAYMENTS, payload
            );

            const bookingId = verifyResponse?.data?.order?.bookingId;

            // console.log(verifyResponse);
            toast.success(verifyResponse.data?.message);
            router.replace(`/booking_completed?bookingId=${bookingId}`);
          } catch (error) {
            toast.error("Error verifying payment");
            console.error("Verification error:", error);
          }
        },
        prefill: {
          name: formData?.fullname,
          email: formData?.emailAddress,
          contact: formData?.mobilenumber,
        },
        theme: {
          color: "#0D0BA8",
        },
        modal: {
          ondismiss: function() {
            toast.info("Payment cancelled");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // Handle payment failure (optional)
      razorpay.on('payment.failed', function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        console.error("Payment failed:", response.error);
      });

    } catch (error) {
      // Handle booking creation error
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Error creating booking";
      toast.error(errorMessage);
      if (!isAuth && errorMessage === "please login") {
        router.replace(`/login?redirect=checkout`)
      }
      // console.error("Booking creation error:", error);
    }
  };

  // 🔹 Get display text for duration
  const getDurationDisplay = () => {
    if (!checkIn || !checkOut) {
      return isHotel ? "1 night" : `1 ${durationType}`;
    }

    if (durationType === "day") {
      const diffTime = Math.abs(checkOut - checkIn);
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${totalDays} day${totalDays > 1 ? "s" : ""}`;
    } else if (durationType === "week") {
      const totalWeeks = calculateCompleteWeeks(checkIn, checkOut);
      return `${totalWeeks} week${totalWeeks > 1 ? "s" : ""}`;
    } else if (durationType === "month") {
      const totalMonths = calculateCompleteMonths(checkIn, checkOut);
      return `${totalMonths} month${totalMonths > 1 ? "s" : ""}`;
    } else if (durationType === "year") {
      const totalMonths = calculateCompleteMonths(checkIn, checkOut);
      const totalYears = Math.ceil(totalMonths / 12);
      return `${totalYears} year${totalYears > 1 ? "s" : ""}`;
    }

    return "";
  };

  // 🔹 Get available duration types
  const availableDurationTypes = useMemo(() => {
    if (isHotel) return [];
    if (isHostel) return ["month"];
    if (isPG && selectedRoom.pricing) {
      const availableTypes = [];
      if (selectedRoom.pricing.day) availableTypes.push("day");
      if (selectedRoom.pricing.week) availableTypes.push("week");
      if (selectedRoom.pricing.month) availableTypes.push("month");
      if (selectedRoom.pricing.year) availableTypes.push("year");
      return availableTypes;
    }
    return ["day", "week", "month"];
  }, [isPG, isHostel, isHotel, selectedRoom]);

  // 🔹 Get maximum allowed guests
  const maxAllowedAdults = useMemo(() => {
    return isHotel ? selectedRoom.maxAdults || 4 : 4;
  }, [isHotel, selectedRoom]);

  const maxAllowedChildren = useMemo(() => {
    return isHotel && selectedRoom.allowsChildren ? 2 : 0;
  }, [isHotel, selectedRoom]);

  const maxAllowedGuests = useMemo(() => {
    return isPG || isHostel ? selectedRoom.maxGuests || 4 : 4;
  }, [isPG, isHostel, selectedRoom]);

  const maxAllowedTotalGuests = useMemo(() => {
    return isHotel ? maxAllowedAdults + maxAllowedChildren : maxAllowedGuests;
  }, [isHotel, maxAllowedAdults, maxAllowedChildren, maxAllowedGuests]);

  // 🔹 Get available beds/rooms text
  const availableBedsText = useMemo(() => {
    if (isHotel) {
      const rooms = selectedRoom.roomsAvailable || 0;
      if (rooms === 0) return "No rooms available";
      if (rooms === 1) return `1 room available`;
      return `${rooms} ${selectedRoom.type} available`;
    }

    if (isPG || isHostel) {
      const rooms = selectedRoom.roomsAvailable || 0;
      if (rooms === 0)
        return "No rooms available, Please check another room type !";
      if (rooms === 1) return `1 room available`;
      return `${rooms} rooms available (${selectedRoom.type})`;
    }

    return "Multiple rooms available";
  }, [isPG, isHostel, isHotel, selectedRoom]);

  // 🔹 Guest handlers
  const handleAdultIncrement = () => {
    if (adults < maxAllowedAdults) {
      setAdults(adults + 1);
    }
  };

  const handleAdultDecrement = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const handleChildrenIncrement = () => {
    if (children < maxAllowedChildren) {
      setChildren(children + 1);
    }
  };

  const handleChildrenDecrement = () => {
    if (children > 0) setChildren(children - 1);
  };

  const handleGuestIncrement = () => {
    if (guests < maxAllowedGuests) {
      setGuests(guests + 1);
    }
  };

  const handleGuestDecrement = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  // 🔹 Date functions
  const getExactMonthLater = (fromDate, months) => {
    if (!fromDate) return null;
    const result = new Date(fromDate);
    result.setMonth(result.getMonth() + months);

    // Handle month overflow (e.g., Jan 31 + 1 month = Feb 28/29)
    const originalDay = fromDate.getDate();
    const maxDaysInResultMonth = new Date(
      result.getFullYear(),
      result.getMonth() + 1,
      0
    ).getDate();

    if (originalDay > maxDaysInResultMonth) {
      result.setDate(maxDaysInResultMonth);
    } else {
      result.setDate(originalDay);
    }

    return result;
  };

  const getExactWeekLater = (fromDate, weeks) => {
    if (!fromDate) return null;
    const result = new Date(fromDate);
    result.setDate(result.getDate() + weeks * 7);
    return result;
  };

  // 🔹 Handle duration type change
  const handleDurationTypeChange = (type) => {
    const oldDurationType = durationType;
    setDurationType(type);

    // Auto-set check-out based on duration type
    if (checkIn) {
      if (type === "day") {
        // For daily, don't auto-set check-out
        setCheckOut(null);
      } else if (type === "week") {
        const oneWeekLater = getExactWeekLater(checkIn, 1);
        setCheckOut(oneWeekLater);
      } else if (type === "month" || type === "year") {
        const oneMonthLater = getExactMonthLater(checkIn, 1);
        setCheckOut(oneMonthLater);
      }
    }
  };

  // 🔹 Filter dates for monthly/weekly selection
  const filterHostelPgDates = (date) => {
    if (!checkIn) return false;

    const startOfCheckIn = new Date(checkIn);
    startOfCheckIn.setHours(0, 0, 0, 0);

    const startOfDate = new Date(date);
    startOfDate.setHours(0, 0, 0, 0);

    // For monthly/yearly durations
    if (durationType === "month" || durationType === "year") {
      const checkInMonth = startOfCheckIn.getMonth();
      const checkInYear = startOfCheckIn.getFullYear();
      const dateMonth = startOfDate.getMonth();
      const dateYear = startOfDate.getFullYear();

      const monthDiff =
        (dateYear - checkInYear) * 12 + (dateMonth - checkInMonth);

      // Only allow exact month intervals (1 month, 2 months, etc.)
      if (monthDiff <= 0) return false;

      // Check if it's the same day of month (with month-end adjustment)
      const checkInDay = startOfCheckIn.getDate();
      const dateDay = startOfDate.getDate();

      // Get last day of the month for the date
      const lastDayOfDateMonth = new Date(dateYear, dateMonth + 1, 0).getDate();

      // Allow if:
      // 1. Same day number, OR
      // 2. Check-in day > last day of month AND date is the last day of month
      if (dateDay === checkInDay) {
        return true;
      }
      if (checkInDay > lastDayOfDateMonth && dateDay === lastDayOfDateMonth) {
        return true;
      }

      return false;
    }

    // For weekly durations
    else if (durationType === "week") {
      const timeDiff = startOfDate.getTime() - startOfCheckIn.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      return dayDiff > 0 && dayDiff % 7 === 0;
    }

    // For daily durations, allow all dates
    return true;
  };

  // 🔹 Handle check-in change
  const handleCheckInChange = (date) => {
    setCheckIn(date);
    if (checkOut && date > checkOut) {
      setCheckOut(null);
    }

    // Auto-set check-out based on duration type
    if (date) {
      if (
        isHostel ||
        (isPG && (durationType === "month" || durationType === "year"))
      ) {
        const oneMonthLater = getExactMonthLater(date, 1);
        setCheckOut(oneMonthLater);
      } else if (isPG && durationType === "week") {
        const oneWeekLater = getExactWeekLater(date, 1);
        setCheckOut(oneWeekLater);
      }
      // For daily mode, don't auto-set
    }
  };

  // 🔹 Get checkout placeholder
  const getCheckoutPlaceholder = () => {
    if (isHostel) return "Select months duration";
    if (isPG) {
      if (durationType === "week") return "Select weeks duration";
      if (durationType === "month" || durationType === "year")
        return "Select months duration";
      return "Check-out";
    }
    return "Check-out";
  };

  // 🔹 Get filter function
  const getFilterFunction = () => {
    if (isHostel || isPG) return filterHostelPgDates;
    return undefined;
  };

  // 🔹 Get minimum checkout date
  const getMinCheckoutDate = () => {
    if (!checkIn) return new Date();
    if (isHostel) return getExactMonthLater(checkIn, 1);
    if (isPG && durationType === "week") return getExactWeekLater(checkIn, 1);
    if (isPG && (durationType === "month" || durationType === "year"))
      return getExactMonthLater(checkIn, 1);
    return checkIn;
  };

  // 🔹 Duration type selector UI
  const renderDurationSelector = () => {
    if (isHotel) return null;
    if (isPG && availableDurationTypes.length > 0) {
      return (
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Stay Duration
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {availableDurationTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleDurationTypeChange(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  durationType === type
                    ? "bg-[#0D0BA8] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "day"
                  ? "Daily"
                  : type === "week"
                  ? "Weekly"
                  : type === "month"
                  ? "Monthly"
                  : "Yearly"}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 🔹 Guest selector UI
  const renderGuestSelector = () => {
    if (isHotel) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm text-gray-700">Adults</p>
              <p className="text-xs text-gray-500">Age 13+</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdultDecrement}
                className="border border-gray-300 rounded-full w-8 h-8 grid place-items-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={adults <= 1}
              >
                <Minus
                  size={14}
                  className={adults <= 1 ? "text-gray-300" : "text-gray-600"}
                />
              </button>
              <span className="text-lg font-semibold text-gray-900 min-w-8 text-center">
                {adults}
              </span>
              <button
                onClick={handleAdultIncrement}
                className="border border-gray-300 rounded-full w-8 h-8 grid place-items-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  adults >= maxAllowedAdults ||
                  totalHotelGuests >= maxAllowedTotalGuests
                }
              >
                <Plus
                  size={14}
                  className={
                    adults >= maxAllowedAdults
                      ? "text-gray-300"
                      : "text-gray-600"
                  }
                />
              </button>
            </div>
          </div>

          {selectedRoom.allowsChildren && (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm text-gray-700">Children</p>
                <p className="text-xs text-gray-500">Age 2-12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleChildrenDecrement}
                  className="border border-gray-300 rounded-full w-8 h-8 grid place-items-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={children <= 0}
                >
                  <Minus
                    size={14}
                    className={
                      children <= 0 ? "text-gray-300" : "text-gray-600"
                    }
                  />
                </button>
                <span className="text-lg font-semibold text-gray-900 min-w-8 text-center">
                  {children}
                </span>
                <button
                  onClick={handleChildrenIncrement}
                  className="border border-gray-300 rounded-full w-8 h-8 grid place-items-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    children >= maxAllowedChildren ||
                    totalHotelGuests >= maxAllowedTotalGuests
                  }
                >
                  <Plus
                    size={14}
                    className={
                      children >= maxAllowedChildren
                        ? "text-gray-300"
                        : "text-gray-600"
                    }
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // For PGs and Hostels
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm text-gray-700">Guests</p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGuestDecrement}
              className="border border-gray-300 rounded-full w-8 h-8 grid place-items-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={guests <= 1}
            >
              <Minus
                size={14}
                className={guests <= 1 ? "text-gray-300" : "text-gray-600"}
              />
            </button>
            <span className="text-lg font-semibold text-gray-900 min-w-8 text-center">
              {guests}
            </span>
            <button
              onClick={handleGuestIncrement}
              className="border border-gray-300 rounded-full w-8 h-8 grid place-items-center bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={guests >= maxAllowedGuests}
            >
              <Plus
                size={14}
                className={
                  guests >= maxAllowedGuests ? "text-gray-300" : "text-gray-600"
                }
              />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 🔹 Render Coupon Input Section
  const renderCouponInput = () => {
    return (
      <RevealOnScroll delay={0.2}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Apply Coupon
            </label>
            <button
              type="button"
              onClick={() => setShowCouponModal(true)}
              className="text-sm text-[#0D0BA8] hover:text-[#2A32FF] font-medium flex items-center gap-1 cursor-pointer"
            >
              <Tag size={14} />
              Browse available coupons
            </button>
          </div>

          {!appliedCoupon ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value.toUpperCase());
                  setCouponError("");
                }}
                placeholder="Enter coupon code"
                className={`border ${
                  couponError ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={isApplyingCoupon}
              />
              <button
                type="button"
                onClick={() => handleApplyCoupon()}
                disabled={isApplyingCoupon || !coupon.trim()}
                className="bg-[#0D0BA8] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2A32FF] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isApplyingCoupon ? "Applying..." : "Apply"}
              </button>
            </div>
          ) : (
            /* Applied Coupon Display */
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-green-800">
                      {appliedCoupon.code}
                    </p>
                    <p className="text-xs text-green-600">
                      {appliedCoupon.discountType === "percentage"
                        ? `${appliedCoupon.discountAmount}% discount`
                        : `Flat ₹${appliedCoupon.discountAmount} discount`}
                      {appliedCoupon.minBookingAmount > 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCouponModal(true)}
                    className="text-sm text-[#0D0BA8] hover:text-[#2A32FF] font-medium cursor-pointer"
                  >
                    Change
                  </button>
                  |
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <X size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {couponError && <p className="text-xs text-red-500">{couponError}</p>}

          {allCoupons.length === 0 && (
            <p className="text-xs text-gray-500">
              Click "Browse available coupons" to see all coupons.
            </p>
          )}
        </div>
      </RevealOnScroll>
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-4 sm:p-6 py-6 space-y-4 sm:space-y-5 sticky top-6">

      <RevealOnScroll delay={0.2}>
        <h3 className="text-2xl font-semibold border-b border-gray-300 pb-4 sm:pb-6">
          Booking Summary
        </h3>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>{renderDurationSelector()}</RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <h4 className="text-2xl font-bold text-gray-900">
          ₹{calculatedBasePrice.toLocaleString()}{" "}
          <span className="text-gray-600 text-lg">
            / {isHotel ? "day" : isHostel ? "month" : durationType}
            {guests > 1 && ` (per guest)`}
          </span>
        </h4>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            {isHotel ? "Stay Duration" : "Booking Dates"}
          </label>
          <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-300 flex-1">
              <CalendarDays size={20} className="text-gray-500" />
              <DatePicker
                selected={checkIn}
                onChange={handleCheckInChange}
                placeholderText="Check-in"
                className="outline-none w-full text-sm"
                minDate={new Date()}
                dateFormat="dd MMM yyyy"
              />
            </div>

            <div className="hidden md:flex justify-center items-center">
              <ArrowRight size={16} className="text-gray-400" />
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-gray-300 flex-1">
              <CalendarDays size={20} className="text-gray-500" />
              <DatePicker
                selected={checkOut}
                onChange={setCheckOut}
                placeholderText={getCheckoutPlaceholder()}
                className="outline-none w-full text-sm"
                minDate={getMinCheckoutDate()}
                filterDate={getFilterFunction()}
                disabledKeyboardNavigation={
                  isHostel || (isPG && durationType !== "day")
                }
                showDisabledMonthNavigation
                dateFormat="dd MMM yyyy"
                popperClassName="suggested-dates-popper"
                popperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 8],
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {isHotel && (
        <section className="flex items-center justify-evenly text-xs font-medium text-[#666666]">
          <p>{accommodation?.check_in_time || "from 6:00 am"}</p>
          <div className="hidden md:flex justify-center items-center">
            <ArrowRight size={16} className="text-gray-400" />
          </div>
          <p>{accommodation?.check_out_time || "NA"}</p>
        </section>
      )}

      <RevealOnScroll delay={0.2}>
        <div className="space-y-3">
          {renderGuestSelector()}
          <p className="text-xs text-green-600 font-medium">
            {availableBedsText}
          </p>
        </div>
      </RevealOnScroll>

      {/* Coupon Input Section */}
      {isAuth && renderCouponInput()}

      {/* Price Summary */}
      <RevealOnScroll delay={0.2}>
        <div className="space-y-3">
          {/* Price Breakdown */}
          <div className="space-y-2">
            {appliedCoupon && (
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            )}

            {appliedCoupon && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Coupon Applied: 
                    <span className="text-xs pl-1 font-semibold">
                      {appliedCoupon.code}
                      {appliedCoupon.discountType === "percentage"
                      ? ` (${appliedCoupon.discountAmount}%)`
                      : ` (Flat ₹${appliedCoupon.discountAmount})`}
                    </span>
                  </span>
                  <span className="text-green-600 font-medium">
                    -₹{discountAmount.toLocaleString()}
                  </span>
                </div>
                {/* <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Including taxes and service charge: 
                    <span className="text-xs pl-1 font-semibold">
                      {appliedCoupon.code}
                      {appliedCoupon.discountType === "percentage"
                      ? ` (${appliedCoupon.discountAmount}%)`
                      : ` (Flat ₹${appliedCoupon.discountAmount})`}
                    </span>
                  </span>
                  <span className="text-green-600 font-medium">
                    ₹{accommodation.tax_amount}
                  </span>
                </div> */}

                {appliedCoupon.maxDiscount &&
                appliedCoupon.discountType === "percentage" && (
                  <div className="text-xs text-gray-500 pl-1">
                    (Maximum discount: ₹
                    {appliedCoupon.maxDiscount.toLocaleString()})
                  </div>
                )}
              </>
            )}
            
            {accommodation?.tax_amount > 0 && (
              <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                <p>Includes taxes and service fees</p>
                <p>₹{accommodation.tax_amount}</p>
              </div>
            )}

            {/* This is for PG */}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">
                  {getDurationDisplay()}
                  {isHotel && ` • ${adults} adult${adults > 1 ? "s" : ""}`}
                  {isHotel &&
                    children > 0 &&
                    ` + ${children} child${children > 1 ? "ren" : ""}`}
                  {!isHotel &&
                    guests > 1 &&
                    ` • ${guests} guest${guests > 1 ? "s" : ""}`}
                </span>
                <h4 className="text-xl font-semibold text-gray-900">
                  ₹{finalPrice.toLocaleString()}
                </h4>
              </div>
            </div>
          </div>

          {/* Price explanation */}
          <div className="text-xs text-gray-500 space-y-1">
            {isHotel && checkIn && checkOut && (
              <div className="space-y-1">
                <p>
                  {adults} adult{adults > 1 ? "s" : ""}
                  {children > 0 &&
                    ` + ${children} child${children > 1 ? "ren" : ""} (free)`}
                </p>
              </div>
            )}

            {(isPG || isHostel) &&
              checkIn &&
              checkOut &&
              selectedRoom.pricing?.[durationType] && (
                <p>
                  ₹{selectedRoom.pricing[durationType]}/{durationType}
                  {guests > 1 && ` × ${guests} guests`}
                </p>
              )}

            {appliedCoupon && (
              <div className="space-y-1">
                <p className="text-green-600 font-medium">
                  {appliedCoupon.discountType === "percentage"
                    ? `${appliedCoupon.discountAmount}% discount applied`
                    : `Flat ₹${appliedCoupon.discountAmount} discount applied`}
                </p>
                {appliedCoupon.maxDiscount &&
                  appliedCoupon.discountType === "percentage" && (
                    <p className="text-green-500">
                      (Maximum discount: ₹
                      {appliedCoupon.maxDiscount.toLocaleString()})
                    </p>
                  )}
              </div>
            )}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <button
          onClick={handleProceedToCheckout}
          disabled={isApplyingCoupon || !checkIn || !checkOut}
          className="w-full bg-[#0D0BA8] text-white text-center py-3.5 rounded-xl font-semibold hover:bg-[#2A32FF] transition-all cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed To Checkout
        </button>
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1">
            <CreditCard size={14} />
            <span>Secure payments</span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw size={14} />
            <span>Free cancellation</span>
          </div>
          <div className="flex items-center gap-1">
            <Headphones size={14} />
            <span>24/7 support</span>
          </div>
        </div>
      </RevealOnScroll>
      {/* Coupon Modal */}
      <Coupons
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onCouponSelect={handleCouponSelect}
        appliedCouponCode={appliedCoupon?.code}
        isLoading={isApplyingCoupon}
        totalPrice={totalPrice}
        onCouponsLoaded={(coupons) => setAllCoupons(coupons)}
      />
    </div>
  );
};

export default BookingSummary;
