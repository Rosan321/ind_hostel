import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const applyCoupon = createAsyncThunk(
  'profile/applyCoupon',
  async (coupon, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.COUPON.COUPON_APPLY, coupon);
      return response.data;
    } catch (error) {
      // console.error('❌ applyCoupon error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getAllCoupon = createAsyncThunk(
  'profile/getAllCoupon',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.COUPON.COUPON_ALL);
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const myAllBookings = createAsyncThunk(
  'address/myAllBookings',
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.BOOKING.MY_BOOKING, {
          params: { page, limit }
        });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'address/cancelBooking',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${API_ENDPOINTS.BOOKING.CANCEL_BOOKING}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);
