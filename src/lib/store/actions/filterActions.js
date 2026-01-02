import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Map UI sort values to API sort values
const sortMapping = {
  default: "",
  price_low: "price_asc",
  price_high: "price_desc",
  rating: "rating_desc",
  newest: "createdAt_desc",
};

export const getAllFilteredData = createAsyncThunk(
  "accommodation/getAllFilteredData",
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Prepare query parameters according to API documentation
      const params = {};

      // Category parameter
      if (filters.category_name) {
        params.category = filters.category_name;
      }

      // Location parameter
      if (filters.location) {
        params.location = filters.location;
      }

      // Stay type parameter (array to comma-separated string)
      if (filters.stayType && filters.stayType.length > 0) {
        params.staytype = filters.stayType.join(",");
      }

      // Room type parameter (array to comma-separated string)
      if (filters.roomType && filters.roomType.length > 0) {
        params.roomtype = filters.roomType;
      }

      // Amenities parameter (array to comma-separated string)
      if (filters.amenities && filters.amenities.length > 0) {
        params.amenities = filters.amenities;
      }

      // Price range parameters
      if (filters.priceRange) {
        params.minprice = filters.priceRange.min || 0;
        params.maxprice = filters.priceRange.max || 10000;
      }

      // Rating parameter
      if (filters.rating) {
        params.rating = filters.rating;
      }

      // Pagination parameters
      if (filters.page) {
        params.page = filters.page;
      }

      if (filters.limit) {
        params.limit = filters.limit;
      }

      // Sort parameter
      if (filters.sort && filters.sort !== "default") {
        params.sort = sortMapping[filters.sort] || "";
      }

      // console.log('API Params:', params);

      // Use GET request with query parameters
      const response = await axiosInstance.get(
        API_ENDPOINTS.FILTER_NAMES.FILTERS,
        {
          params: params,
        }
      );

      // console.log('Filter response:', response.data);
      return response.data;
    } catch (error) {
      // console.error("❌ Filter data error:", error);
      return rejectWithValue(
        error.response?.data || "Error fetching filtered data"
      );
    }
  }
);
