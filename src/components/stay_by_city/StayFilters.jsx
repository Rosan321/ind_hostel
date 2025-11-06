"use client"

export function StayFilters({ priceFilter, setPriceFilter, stayType, setStayType }) {
  return (
    <div className="flex gap-4 max-w-6xl mx-auto mt-2 lg:px-4">
      <select
        className="border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 cursor-pointer transition"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      >
        <option value="">Price</option>
        <option value="5000">Below ₹5,000</option>
        <option value="7000">Below ₹7,000</option>
      </select>

      <select
        className="border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 cursor-pointer transition"
        value={stayType}
        onChange={(e) => setStayType(e.target.value)}
      >
        <option value="">Stay Type</option>
        <option value="Hostel">Hostel</option>
        <option value="PG">PG</option>
      </select>
    </div>
  );
}
