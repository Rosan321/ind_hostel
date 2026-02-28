import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllAccomodation = createAsyncThunk(
  "accomodation/getAllAccomodation",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Remove undefined, null, empty values
      const queryParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null && value !== "")
      );

      //   console.log(queryParams)

      const response = await axiosInstance.get(
        API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION,
        { params: queryParams }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const getAccomodationById = createAsyncThunk(
  "accomodation/getAccomodationById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const getAllAccomodationByCity = createAsyncThunk(
  "accomodation/getAllAccomodationByCity",
  async (params = {}, { rejectWithValue }) => {
    try {
      // Remove undefined, null, empty values
      const queryParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null && value !== "")
      );

      // console.log(queryParams)

      const response = await axiosInstance.get(
        API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_BY_CITY,
        { params: queryParams }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const getTopLocationByCity = createAsyncThunk(
  "accomodation/getTopAccomodationByCity",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_BY_TOPCITY,
        { params: data }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const getFilterNames = createAsyncThunk(
  'accomodation/FilterNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.FILTER_NAMES.FILTER_NAMES);
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getAllAccomodationStayType = createAsyncThunk(
  'accomodation/Staytype',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_STAY_TYPE);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getSortData = createAsyncThunk(
  'accomodation/Sorttype',
  async (data = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_SORT,
        { params: data }
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);
export const getFilteredAccomodationByArea = createAsyncThunk(
  "accomodation/getFilteredAccomodationByArea",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = {
        page: filters.page || 1,
        limit: filters.limit || 12,
        category: filters.category,
        location: filters.location,
        rating: filters.rating,
        checkIn: filters.checkIn,
        checkOut: filters.checkOut,
        price: filters.price,
      };

      // Handle arrays: category as comma-separated, others as JSON strings
      if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
        params.category = filters.category.join(",");
      }
      if (filters.roomtype && filters.roomtype.length > 0) {
        params.roomtype = JSON.stringify(filters.roomtype);
      }
      if (filters.amenities && filters.amenities.length > 0) {
        params.amenities = JSON.stringify(filters.amenities);
      }

      // Remove undefined/empty values
      const queryParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null && value !== "")
      );

      const response = await axiosInstance.get(
        API_ENDPOINTS.ACCOMMODATION.ACCOMMODATION_LOCATION_FILTER,
        { params: queryParams }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching filtered data");
    }
  }
);
