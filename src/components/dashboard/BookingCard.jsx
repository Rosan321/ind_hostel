import Link from "next/link";
import ShuffleInOnScroll from "../animations/SuffleInOnScroll";

export default function BookingCard({ data }) {
  // console.log("Booking data:", data);
  
  // Extract data from the provided structure
  const booking = data || {};
  
  // Extract accommodation details
  const accommodation = booking.accommodationId || {};
  const propertyName = accommodation.property_name || "Unknown Property";
  const location = accommodation.location || "Location not specified";
  
  // Extract room details
  const room = booking.room_id || {};
  const roomType = booking.roomtype || room.room_type || "Unknown Room Type";
  const roomImage = room.room_images_url?.[0] || "/images/hero.png";
  
  // Extract booking dates
  const checkInDate = booking.check_in_date ? new Date(booking.check_in_date) : new Date();
  const checkOutDate = booking.check_out_date ? new Date(booking.check_out_date) : new Date();
  
  // Format dates
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formattedCheckIn = formatDate(checkInDate);
  const formattedCheckOut = formatDate(checkOutDate);
  
  // Calculate stay duration
  const daysText = booking.days || "Custom duration";
  
  // Get booking status
  const getStatusText = () => {
    const status = booking.status || "ongoing";
    switch(status.toLowerCase()) {
      case 'checkin':
        return 'Ongoing';
      case 'checkedout':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      case 'confirmed':
        return 'Confirmed';
      default:
        return 'Ongoing';
    }
  };
  
  const statusText = getStatusText();
  const statusColor = statusText === 'Ongoing' ? 'bg-[#F1FF51] text-[#1A1A1A]' : 
                     statusText === 'Completed' ? 'bg-green-100 text-green-800' :
                     statusText === 'Cancelled' ? 'bg-red-100 text-red-800' :
                     'bg-blue-100 text-blue-800';
  
  // Get price details
  const bookingAmount = booking.bookingamount || 0;
  const guests = booking.guests || 1;
  
  // Generate description based on booking details
  const generateDescription = () => {
    const baseDesc = `Your ${daysText.toLowerCase()} stay at ${propertyName}`;
    
    if (room.room_amenities && room.room_amenities.length > 0) {
      const amenities = room.room_amenities.slice(0, 3).join(', ');
      return `${baseDesc} includes ${amenities.toLowerCase()}`;
    }
    
    return `${baseDesc} includes comfortable accommodation and essential amenities`;
  };
  
  const description = generateDescription();

  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden my-8 sm:my-16">
      <ShuffleInOnScroll delay={0.2}>
        <div className="flex flex-col">
          {/* Image Section */}
          <div className="w-full h-[200px] sm:h-[240px] md:h-[269px] overflow-hidden">
            <img
              src={roomImage}
              alt={roomType}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/hero.png";
              }}
            />
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 flex flex-col xl:flex-row justify-between gap-6 xl:gap-24">
            {/* Left Content */}
            <div className="w-full lg:w-2/3">
              {/* Header Section */}
              <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-2">
                    {propertyName} {/* You might want to add city here if available */}
                  </h3>
                  <p className="text-[#666666] text-sm sm:text-base flex items-center gap-1">
                    {location.address || location || "Address not specified"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {guests} guest{guests !== 1 ? 's' : ''} • ₹{bookingAmount.toLocaleString()} total
                  </p>
                </div>
                <p className={`${statusColor} px-3 py-1 text-sm rounded-lg w-fit sm:w-auto`}>
                  {statusText}
                </p>
              </section>

              {/* Booking Details */}
              <div className="mt-4 text-sm text-[#1A1A1A] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
                  <div className="flex flex gap-4 sm:gap-24 sm:pr-44 lg:pr-4 sm:border-r border-gray-300">
                    <section className="flex items-center gap-2">
                      <span>
                        <p className="text-[#666666]">Check-in</p>
                        <p className="font-medium">{formattedCheckIn}</p>
                      </span>
                    </section>
                    <section className="flex items-center gap-2">
                      <span>
                        <p className="text-[#666666]">Check-out</p>
                        <p className="font-medium">{formattedCheckOut}</p>
                      </span>
                    </section>
                  </div>
                  <span>
                    <p className="text-[#666666]">Room Type</p>
                    <p className="font-medium">{roomType}</p>
                  </span>
                </div>
                
                {/* Additional booking info */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
                  <section className="flex items-center gap-2">
                    <span>
                      <p className="text-[#666666]">Booking ID</p>
                      <p className="font-medium text-xs">{booking.bookingId || "N/A"}</p>
                    </span>
                  </section>
                  <section className="flex items-center gap-2">
                    <span>
                      <p className="text-[#666666]">Price Type</p>
                      <p className="font-medium capitalize">{booking.price_type?.replace('per ', '') || "Monthly"}</p>
                    </span>
                  </section>
                </div>
              </div>

              {/* Additional Info */}
              <p className="text-sm text-[#666666] mt-4">
                {description}
              </p>
              
              {/* Guest details if needed */}
              {booking.guestdetails && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Booked by: {booking.guestdetails.fullname || "N/A"}
                  </p>
                </div>
              )}
            </div>

            {/* Right Content - Buttons */}
            <div className="flex flex-col justify-center gap-4 w-full lg:w-1/3">
              <Link href={`/stay/${data?.accommodationId?._id}`} className="bg-[#0D0BA8] text-white text-sm sm:text-base font-semibold px-6 py-2 sm:py-3 rounded-full hover:bg-white hover:text-[#0D0BA8] hover:border hover:border-[#0D0BA8] w-fit mx-auto cursor-pointer transition-colors duration-200">
                View Details
              </Link>

              <button className="border border-[#0D0BA8] text-[#0D0BA8] text-sm sm:text-base font-semibold px-6 py-2 sm:py-3 rounded-full hover:bg-[#0D0BA8] hover:text-white w-fit mx-auto cursor-pointer transition-colors duration-200">
                Contact Hostel
              </button>
            </div>
          </div>
        </div>
      </ShuffleInOnScroll>
    </div>
  );
}