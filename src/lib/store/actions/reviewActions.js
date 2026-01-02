import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createReview = createAsyncThunk(
  'profile/createReview',
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${API_ENDPOINTS.REVIEWS.REVIEWS}/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const updateReview = createAsyncThunk(
  'profile/updateReview',
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`${API_ENDPOINTS.REVIEWS.REVIEWS}/${id}`, data);
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getAllReviewsById = createAsyncThunk(
  'profile/getAllReviewsById',
  async ({ id, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.REVIEWS.REVIEWS_ALL}/${id}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      // console.error('❌ getAllReviewsById error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getAllReviews = createAsyncThunk(
  'profile/getAllReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.REVIEWS.REVIEWS_ALL);
      return response.data;
    } catch (error) {
      // console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

