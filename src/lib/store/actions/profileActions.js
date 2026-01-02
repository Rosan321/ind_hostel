import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProfileById = createAsyncThunk(
  'profile/getProfileById',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE);
      return response.data.user_response;
    } catch (error) {
      // console.error('❌ getProfileById error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const profileUpdate = createAsyncThunk(
  'address/profileUpdate',
  async (profile, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.USER.PROFILE_UPDATE, profile);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

