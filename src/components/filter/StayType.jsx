import React from "react";

const StayType = () => {
  return (
    <>
      <div className=" space-y-1">
        <h4 className="font-bold mb-2 text-[#222222] text-lg">Stay Type</h4>
        {["Hostel", "PG", "Hotel"].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <input type="checkbox" id={type} className="accent-[#44475A]" />
            <label
              htmlFor={type}
              className="text-[#1A1A1A] text-sm font-medium"
            >
              {type}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default StayType;
