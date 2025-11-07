"use client"

export default function PricingSummary({ basePrice, nights, subtotal, taxes, total }) {
  return (
    <>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-sm text-[#666666]">₹{basePrice} × {nights} nights</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="text-sm text-[#666666]">Taxes & Fees</span>
          <span className="font-medium">₹{taxes}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-lg font-semibold mt-3">
        <span>Total</span>
        <h4 className="text-[#1A1A1A] text-xl font-bold">₹{total.toLocaleString()}</h4>
      </div>
    </>
  );
}
