// "use client";

// import { useState } from "react";
// import { Calendar, User, Mail, Phone, MapPin } from "lucide-react";
// import BookingSummary from "./BookingSummary";

// export default function BookingConfirmation({ basePrice = 2999, pgName = "UrbanNest PG – Cozy Stay in Bandra", location = "Bandra West, Mumbai" }) {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     checkIn: "",
//     checkOut: "",
//     roomType: "",
//     specialRequests: "",
//     agreeToTerms: false
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Mock data for booking summary
//   const nights = 3;
//   const subtotal = basePrice * nights;
//   const taxes = 400;
//   const total = subtotal + taxes;

//   return (
//     <main className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Complete Your Booking
//           </h1>
//           <p className="text-gray-600">
//             You're just one step away from confirming your stay at {pgName}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Guest Details */}
//           <div className="space-y-6">
//             {/* Guest Details Card */}
//             <div className="bg-white rounded-xl p-6 shadow">
//               <h2 className="text-xl font-semibold mb-6">Guest Details</h2>
              
//               <div className="space-y-4">
//                 {/* Full Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Full name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email address
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone number
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stay Information Card */}
//             <div className="bg-white rounded-xl p-6 shadow">
//               <h3 className="text-lg font-semibold mb-6">Stay Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Check-in */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Check-in
//                   </label>
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     <input
//                       type="date"
//                       name="checkIn"
//                       value={formData.checkIn}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 {/* Check-out */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Check-out
//                   </label>
//                   <div className="relative">
//                     <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     <input
//                       type="date"
//                       name="checkOut"
//                       value={formData.checkOut}
//                       onChange={handleInputChange}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Room Type */}
//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Room Type
//                 </label>
//                 <select
//                   name="roomType"
//                   value={formData.roomType}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                 >
//                   <option value="">Select room type</option>
//                   <option value="single">Single Room</option>
//                   <option value="double">Double Sharing</option>
//                   <option value="triple">Triple Sharing</option>
//                   <option value="deluxe">Deluxe Room</option>
//                 </select>
//               </div>

//               {/* Special Requests */}
//               <div className="mt-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Special Requests
//                 </label>
//                 <textarea
//                   name="specialRequests"
//                   value={formData.specialRequests}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent"
//                   placeholder="Any special requests or requirements..."
//                 />
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="bg-white rounded-xl p-6 shadow">
//               <label className="flex items-start gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleInputChange}
//                   className="mt-1 w-4 h-4 text-[#00BFA6] bg-gray-100 border-gray-300 rounded focus:ring-[#00BFA6]"
//                 />
//                 <span className="text-sm text-gray-700">
//                   I agree to the Terms & Conditions and Cancellation Policy
//                 </span>
//               </label>
//             </div>
//           </div>
//           <BookingSummary formData={formData} pgName={pgName} location={location} />
//         </div>
//       </div>
//     </main>
//   );
// }


///////////////////////////////////////////////////////////////////////////

"use client";

import { useState } from "react";
import { Calendar, User, Mail, Phone, MapPin, Shield, RotateCcw, Headphones } from "lucide-react";
import BookingSummary from "./BookingSummary";

export default function BookingConfirmation({ basePrice = 2999, pgName = "UrbanNest PG – Cozy Stay in Bandra", location = "Bandra West, Mumbai" }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    specialRequests: "",
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600 text-lg">
            You're just one step away from confirming your stay at {pgName}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Guest Details (2/3 width) */}
            <div className="bg-white rounded-xl p-6 rounded-3xl lg:col-span-2 space-y-6">
              {/* Guest Details Card */}
              <div className="">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Guest Details</h2>
                
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Full name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <section className="flex items-center gap-6">
                    {/* Email */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Phone number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Stay Information Card */}
              <div className="">
                <h3 className="text-lg font-semibold mb-6 text-gray-900">Stay Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Check-in */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Check-out */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Room Type */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Room Type
                  </label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option value="">Select room type</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Sharing</option>
                    <option value="triple">Triple Sharing</option>
                    <option value="deluxe">Deluxe Room</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BFA6] focus:border-transparent text-gray-900 placeholder-gray-500 resize-none"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-0.5 w-4 h-4 text-[#00BFA6] bg-gray-100 border-gray-300 rounded focus:ring-[#00BFA6]"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the Terms & Conditions and Cancellation Policy
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column - Booking Summary (1/3 width) */}
            <div className="lg:col-span-1">
              <BookingSummary formData={formData} basePrice={basePrice} pgName={pgName} location={location} />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}