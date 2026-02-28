export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "auth/user/signup",
    SIGNIN: "auth/user/signin",
    VERIFY_OTP: "auth/user/verify",
    LOGOUT: "auth/user/logout",
    FORGET_PASSWORD: "auth/user/password/forget",
    SET_NEW_PASSWORD: "auth/user/password/setNew",
  },
  USER: {
    PROFILE: "auth/user/me",
    PROFILE_UPDATE: "auth/user/update",
    PROFILE_PIC: "auth/user/profilepic",
    CHANGE_PASSWORD: "auth/user/password/change",
    DEACTIVE_ACCOUNT: "auth/user/deactivateaccount",
  },
  ACCOMMODATION: {
    ACCOMMODATION: "auth/accommodation",
    ACCOMMODATION_BY_CITY: "auth/accommodation/bycity",
    ACCOMMODATION_BY_TOPCITY: "auth/accommodation/topaccommodations",
    ACCOMMODATION_RANDOM: "auth/accommodation/randomproducts",
    ACCOMMODATION_STAY_TYPE: "auth/accommodation/getallcategoriesanditsstaytype",
    ACCOMMODATION_PRODUCT_FILTER: "auth/accommodation/productfilter",
    ACCOMMODATION_SEARCH: "auth/accommodation/search",
    ACCOMMODATION_NEIGHBOR: "auth/accommodation/neighborhoods",
    ACCOMMODATION_SORT: "auth/accommodation/sortaccommodation",
    ACCOMMODATION_FEATURES: "auth/accommodation/featureaccommodations",
    ACCOMMODATION_DEALSINCITY: "auth/accommodation/dealsincity",
    ACCOMMODATION_RECENTLY_VIEWS: "auth/accommodation/recentlyviews",
    ACCOMMODATION_USER_LIKED: "auth/accommodation/user-liked-accommodation",
    ACCOMMODATION_LOCATION_FILTER: "auth/accommodation/getfilter-accomidations-by-area",
  },
  FILTER_NAMES: {
    FILTER_NAMES: "auth/accommodation/filternames",
    FILTERS: "auth/accommodation/productfilter",
  },
  DASHBOARD: {
    DASHBOARD: "auth/user/dashboard",
  },
  BOOKINGS: {
    BOOKING: "auth/user/booking",
    MY_BOOKING: "auth/user/booking/mybookings",
    CANCEL_BOOKING: "auth/user/booking/cancel",
    ALL_IDS: "auth/user/allids",
  },
  COUPON: {
    COUPON_APPLY: "auth/coupon/apply",
    COUPON_ALL: "auth/coupon/all",
    COUPON_SEARCH: "auth/coupon/search",
  },
  WISHLIST: {
    WISHLIST: "auth/user/wishlist",
    WISHLIST_ALL: "auth/user/getwishlist",
    WISHLIST_DELETE: "auth/user/deletewishlist",
  },
  PAYMENT: {
    CREATE_PAYMENT: "auth/user/booking",
    VERIFY_PAYMENTS: "auth/user/booking/verify-payment",
  },
  BOOKING: {
    GETBY_ID: "auth/user/booking",
  },
  REVIEWS: {
    REVIEWS: "auth/accommodation/review",
    REVIEWS_ALL: "auth/accommodation/reviews/all",
    REVIEWS_RANDOM: "auth/accommodation/reviews/random",
  },
  NOTIFICATION: {
    NOTIFICATION: "auth/user/notification",
  },
  CONTACT: {
    CONTACT: "auth/user/query",
  },
  INVOICE: {
    INVOICE: "auth/user/booking/generate-invoice",
  },
  HELP: {
    POST_HELP: "auth/helpandsupport/create-ticket-and-messages",
    GET_HELP: "auth/helpandsupport/get-tickets-and-messages"
  }
};
