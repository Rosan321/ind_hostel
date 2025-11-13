import React from "react";

const AmentiesFilter = () => {
  return (
    <>
      <div className=" space-y-1">
        <h4 className="font-bold mb-2 text-[#222222] text-lg">Amenities</h4>
        {["WiFi", "AC", "Parking", "Laundry"].map((amenity) => (
          <div key={amenity} className="flex items-center space-x-2">
            <input type="checkbox" id={amenity} className="accent-[#44475A]" />
            <label
              htmlFor={amenity}
              className="text-[#1A1A1A] text-sm font-medium"
            >
              {amenity}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default AmentiesFilter;
