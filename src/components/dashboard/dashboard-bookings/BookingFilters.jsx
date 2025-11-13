"use client";

export default function BookingFilters({
  bookingType,
  setBookingType,
  status,
  setStatus,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Booking Type */}
      <select
        value={bookingType}
        onChange={(e) => setBookingType(e.target.value)}
        className="border rounded-lg px-4 py-2 text-sm"
      >
        <option value="All">Booking Type</option>
        <option value="Hostel">Hostel</option>
        <option value="PG">PG</option>
        <option value="Hotel">Hotel</option>
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-4 py-2 text-sm"
      >
        <option value="All">Status</option>
        <option value="Active">Active</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-lg px-4 py-2 text-sm"
      >
        <option value="recent">Sort by</option>
        <option value="priceLow">Price: Low to High</option>
        <option value="priceHigh">Price: High to Low</option>
      </select>
    </div>
  );
}
