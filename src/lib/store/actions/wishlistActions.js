import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishlist = createAsyncThunk(
  'addToWishlist',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.WISHLIST.WISHLIST, {
        accommodationid: id
      });
      return response.data;
    } catch (error) {
      console.error('❌ createWishlist error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);

export const getWishlist = createAsyncThunk(
  'getWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.WISHLIST.WISHLIST_ALL);
      return response.data;
    } catch (error) {
      console.error('❌ getWishlist error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);
export const deleteWishlist = createAsyncThunk(
  'deleteWishlist',
  async (wishlistid, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(API_ENDPOINTS.WISHLIST.WISHLIST_DELETE, wishlistid);
      return response.data;
    } catch (error) {
      console.error('❌ deleteWishlist error:', error);
      return rejectWithValue(error.response?.data || 'Error');
    }
  }
);