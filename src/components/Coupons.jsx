
// "use client";

// import { API_ENDPOINTS } from "@/lib/api/api";
// import axiosInstance from "@/lib/axiosInstance";
// import { X, Search, Loader2 } from "lucide-react";
// import { useState, useEffect } from "react";

// const Coupons = ({ 
//   isOpen, 
//   onClose, 
//   onCouponSelect,
//   appliedCouponCode,
//   isLoading
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [coupons, setCoupons] = useState([]); // Will store only coupon codes
//   const [filteredCoupons, setFilteredCoupons] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch coupons from API when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       fetchCoupons();
//     }
//   }, [isOpen]);

//   const fetchCoupons = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.get(
//         API_ENDPOINTS.COUPON.COUPON_ALL
//       );
      
//       // Extract just coupon codes from response.data.data
//       const couponCodes = response.data.data.map(coupon => ({
//         code: coupon.couponCode,
//         id: coupon._id || coupon.couponCode
//       }));

//       setCoupons(couponCodes);
//       setFilteredCoupons(couponCodes);
//     } catch (err) {
//       console.error('Error fetching coupons:', err);
//       setError('Failed to load coupons. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter coupons by search term
//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredCoupons(coupons);
//     } else {
//       const filtered = coupons.filter(coupon => {
//         return coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//       setFilteredCoupons(filtered);
//     }
//   }, [searchTerm, coupons]);

//   const handleCouponClick = (couponCode) => {
//     onCouponSelect(couponCode);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h3 className="text-xl font-semibold text-gray-900">Available Coupons</h3>
//             <p className="text-sm text-gray-500 mt-1">
//               Select a coupon to apply
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             disabled={isLoading}
//           >
//             <X size={24} className="text-gray-500" />
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search coupon codes..."
//               className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={loading || isLoading}
//             />
//             <div className="absolute left-3 top-3">
//               <Search size={20} className="text-gray-400" />
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="p-12 text-center">
//             <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
//             <p className="text-gray-500">Loading coupons...</p>
//           </div>
//         ) : (
//           /* Coupons List */
//           <div className="p-6 overflow-y-auto max-h-[50vh]">
//             {error ? (
//               <div className="text-center py-8">
//                 <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
//                   <X className="w-6 h-6 text-red-600" />
//                 </div>
//                 <h4 className="text-lg font-medium text-gray-900 mb-2">Error loading coupons</h4>
//                 <p className="text-gray-500 mb-4">{error}</p>
//                 <button
//                   onClick={fetchCoupons}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             ) : filteredCoupons.length > 0 ? (
//               <div className="grid grid-cols-1 gap-3">
//                 {filteredCoupons.map((coupon) => {
//                   const isApplied = appliedCouponCode === coupon.code;
                  
//                   return (
//                     <button
//                       key={coupon.id}
//                       onClick={() => handleCouponClick(coupon.code)}
//                       disabled={isLoading}
//                       className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between ${
//                         isApplied
//                           ? "border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-50"
//                           : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
//                       } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                           isApplied ? 'bg-green-100' : 'bg-blue-100'
//                         }`}>
//                           <span className={`font-bold ${
//                             isApplied ? 'text-green-600' : 'text-blue-600'
//                           }`}>
//                             {coupon.code.charAt(0)}
//                           </span>
//                         </div>
//                         <div className="text-left">
//                           <h4 className="font-semibold text-gray-900">{coupon.code}</h4>
//                           <p className="text-xs text-gray-500">
//                             Click to apply this coupon
//                           </p>
//                         </div>
//                       </div>
                      
//                       {isApplied ? (
//                         <div className="flex items-center gap-2 text-green-600">
//                           {isLoading ? (
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                           ) : (
//                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                           <span className="text-sm font-medium">Applied</span>
//                         </div>
//                       ) : (
//                         <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                         </svg>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Search className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h4 className="text-lg font-medium text-gray-900 mb-2">
//                   {searchTerm ? 'No coupons found' : 'No coupons available'}
//                 </h4>
//                 <p className="text-gray-500">
//                   {searchTerm 
//                     ? 'Try a different search term.' 
//                     : 'Check back later for available coupons.'}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Modal Footer */}
//         <div className="p-6 border-t border-gray-200 bg-gray-50">
//           <div className="flex items-center justify-between">
//             <div className="text-sm text-gray-500">
//               {loading ? 'Loading...' : `${filteredCoupons.length} coupon${filteredCoupons.length !== 1 ? 's' : ''} available`}
//             </div>
//             <button
//               onClick={onClose}
//               disabled={isLoading}
//               className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//             >
//               {isLoading ? 'Applying...' : 'Close'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Coupons;


////////////////////////////////////////////////////////////////////


// components/Coupons.js
"use client";

import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { X, Search, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

const Coupons = ({ 
  isOpen, 
  onClose, 
  onCouponSelect,
  appliedCouponCode,
  isLoading,
  totalPrice,
  onCouponsLoaded 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coupons, setCoupons] = useState([]); // Store full coupon data
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch coupons from API when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCoupons();
    }
  }, [isOpen]);

  const fetchCoupons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.COUPON.COUPON_ALL
      );
      
      // Store full coupon data
      const couponData = response.data.data.map(coupon => ({
        id: coupon._id,
        code: coupon.couponCode,
        description: coupon.description || `Use code ${coupon.couponCode}`,
        discounttype: coupon.discounttype || 'fixed',
        discountpercentage: coupon.discountpercentage || 0,
        discountamount: coupon.discountamount || 0,
        minimumamount: coupon.minimumamount || 0,
        maxDiscount: coupon.maxDiscount || null,
        expireDate: coupon.expireDate,
        status: coupon.status,
        targetedAccommodations: coupon.targetedAccommodations || [],
        usedBy: coupon.usedBy || []
      }));

      setCoupons(couponData);
      setFilteredCoupons(couponData);
      
      if (onCouponsLoaded) {
        onCouponsLoaded(couponData);
      }
    } catch (err) {
      console.error('Error fetching coupons:', err);
      setError('Failed to load coupons. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter coupons by search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCoupons(coupons);
    } else {
      const filtered = coupons.filter(coupon => {
        return coupon.code.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredCoupons(filtered);
    }
  }, [searchTerm, coupons]);

  const handleCouponClick = (coupon) => {
    // Check minimum amount validation
    if (coupon.minimumamount > totalPrice) {
      toast.error(`Minimum booking amount of ₹${coupon.minimumamount} required for this coupon`);
      return;
    }
    
    // Pass full coupon data to parent
    onCouponSelect(coupon);
  };

  const getCouponStatus = (coupon) => {
    // Check if coupon is active
    if (coupon.status !== 'active') {
      return { 
        text: 'Inactive', 
        color: 'bg-gray-100 text-gray-800',
        icon: <AlertCircle size={14} />,
        disabled: true
      };
    }
    
    // Check if coupon is expired
    if (coupon.expireDate && new Date(coupon.expireDate) < new Date()) {
      return { 
        text: 'Expired', 
        color: 'bg-red-100 text-red-800',
        icon: <AlertCircle size={14} />,
        disabled: true
      };
    }
    
    // Check minimum amount
    if (coupon.minimumamount > totalPrice) {
      return { 
        text: `Min. ₹${coupon.minimumamount.toLocaleString()}`, 
        color: 'bg-amber-100 text-amber-800',
        icon: <AlertCircle size={14} />,
        disabled: true,
        message: `Minimum booking amount of ₹${coupon.minimumamount} required`
      };
    }
    
    return { 
      text: 'Available', 
      color: 'bg-green-100 text-green-800',
      icon: null,
      disabled: false
    };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Available Coupons</h3>
            <p className="text-sm text-gray-500 mt-1">
              Select a coupon to apply
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isLoading}
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search coupon codes..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || isLoading}
            />
            <div className="absolute left-3 top-3">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </div> */}

        {/* Loading State */}
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-500">Loading coupons...</p>
          </div>
        ) : (
          /* Coupons List */
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {error ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Error loading coupons</h4>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={fetchCoupons}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Try Again
                </button>
              </div>
            ) : filteredCoupons.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {filteredCoupons.map((coupon) => {
                  const isApplied = appliedCouponCode === coupon.code;
                  const status = getCouponStatus(coupon);
                  const isDisabled = status.disabled || isLoading;
                  
                  return (
                    <button
                      key={coupon.id}
                      onClick={() => !isDisabled && handleCouponClick(coupon)}
                      disabled={isDisabled}
                      className={`w-full p-4 rounded-xl border transition-all flex items-center justify-between text-left ${
                        isApplied
                          ? "border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-50"
                          : isDisabled
                          ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                      } ${isDisabled ? 'opacity-70' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isApplied ? 'bg-green-100' : 
                          status.disabled ? 'bg-gray-100' : 
                          'bg-blue-100'
                        }`}>
                          <span className={`font-bold ${
                            isApplied ? 'text-green-600' : 
                            status.disabled ? 'text-gray-600' : 
                            'text-blue-600'
                          }`}>
                            {coupon.code.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{coupon.code}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
                              {status.icon && <span className="inline-flex items-center gap-1">{status.icon} </span>}
                              {status.text}
                            </span>
                            <span className="text-xs text-blue-600 font-medium">
                              {coupon.discounttype === 'percentage' 
                                ? `${coupon.discountpercentage}% OFF` 
                                : `₹${coupon.discountamount} OFF`}
                            </span>
                          </div>
                          {status.message && (
                            <p className="text-xs text-amber-600 mt-1">
                              {status.message}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {isApplied ? (
                        <div className="flex items-center gap-2 text-green-600">
                          {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className="text-sm font-medium">Applied</span>
                        </div>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No coupons found' : 'No coupons available'}
                </h4>
                <p className="text-gray-500">
                  {searchTerm 
                    ? 'Try a different search term.' 
                    : 'Check back later for available coupons.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {loading ? 'Loading...' : `${filteredCoupons.length} coupon${filteredCoupons.length !== 1 ? 's' : ''} available`}
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Applying...' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;

