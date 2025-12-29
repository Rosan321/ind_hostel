import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const contactUS = createAsyncThunk(
  'profile/contactUS',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.CONTACT.CONTACT, data);
      return response.data;
    } catch (error) {
      console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getAllNotification = createAsyncThunk(
  'profile/getAllNotification',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.NOTIFICATION.NOTIFICATION);
      return response.data;
    } catch (error) {
      console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getNotificationById = createAsyncThunk(
  'profile/getNotificationById',
  async (notificationid, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.NOTIFICATION.NOTIFICATION, notificationid);
      return response.data;
    } catch (error) {
      console.error('❌ createBooking error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);
