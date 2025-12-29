import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice"
import profileReducer from "./reducers/profileSlice"
import accomodationReducer from "./reducers/accomodationSlice"
import accomodationStayTypeReducer from "./reducers/accomodationStayTypeSlice"
import accomodationByCityReducer from "./reducers/accomodationByCitySlice"
import accomodationByIdReducer from "./reducers/accomodationByIdSlice"
import filterNamesReducer from "./reducers/filterNamesSlice"
import filterReducer from "./reducers/filterSlice"
import toplocationReducer from "./reducers/toplocationSlice"
import wishlistReducer from "./reducers/wishlistSlice"
import reviewReducer from "./reducers/reviewSlice"
import { configureAxiosInterceptors } from "../axiosInstance";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      accomodation: accomodationReducer,
      accomodationByCity: accomodationByCityReducer,
      accomodationById: accomodationByIdReducer,
      filterNames: filterNamesReducer,
      filterData: filterReducer,
      toplocation: toplocationReducer,
      wishlist: wishlistReducer,
      accomodationStayType: accomodationStayTypeReducer,
      reviews: reviewReducer,
    },
  });
};

// Create a single, global store instance for client-side use.
let globalStore;

if (typeof window !== "undefined") {
  globalStore = makeStore();
  // Configure Axios with the created store instance
  configureAxiosInterceptors(globalStore);
}

export const store = globalStore;
