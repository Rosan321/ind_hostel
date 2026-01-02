import { API_ENDPOINTS } from "@/lib/api/api";
import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

/* =========================
   Helper (optional but clean)
========================= */
const saveAuthToSession = (data) => {
  if (typeof window === "undefined") return;

  if (data?.JWTtoken) {
    sessionStorage.setItem("token", data.JWTtoken);
    sessionStorage.setItem("userInfo", JSON.stringify(data));
  }
};

/* =========================
   Signup
========================= */
export const userSignup = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.AUTH.SIGNUP,
        userData
      );

      saveAuthToSession(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =========================
   Login
========================= */
export const userLogin = createAsyncThunk(
  "user/signin",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.AUTH.SIGNIN,
        loginData
      );

      saveAuthToSession(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =========================
   Verify OTP
========================= */
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otp, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        {},
        { params: { otp } }
      );

      saveAuthToSession(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Verification failed" }
      );
    }
  }
);

/* =========================
   Forget Password
========================= */
export const forgetPassword = createAsyncThunk(
  "user/forgetpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.FORGET_PASSWORD,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =========================
   Change Password
========================= */
export const passwordChange = createAsyncThunk(
  "user/changepassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        API_ENDPOINTS.USER.CHANGE_PASSWORD,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =========================
   Set New Password
========================= */
export const setPassword = createAsyncThunk(
  "user/setPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        API_ENDPOINTS.AUTH.SET_NEW_PASSWORD,
        data
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
