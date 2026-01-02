import { createSlice } from "@reduxjs/toolkit";
import {
  passwordChange,
  userLogin,
  userSignup,
  verifyOTP,
} from "../actions/authActions";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
  message: "",
  isAuth: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // ✅ Used by StoreProvider
    setAuthFromSession: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },

    logout: (state) => {
      state.userInfo = null;
      state.isAuth = false;
      state.token = null;
      state.error = null;
      state.success = false;
      state.message = "";
    },

    resetLoginState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    resetSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    resetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // ⭐ Signup
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message || "Signup successful";
      })
      .addCase(userSignup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Signup failed";
      })

      // ⭐ OTP Verify
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;

        if (payload?.JWTtoken) {
          state.userInfo = payload;
          state.token = payload.JWTtoken;
          state.isAuth = true;
        }
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "OTP verification failed";
        state.isAuth = false;
      })

      // ⭐ Password Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;

        if (payload?.JWTtoken) {
          state.userInfo = payload;
          state.token = payload.JWTtoken;
          state.isAuth = true;
        } else {
          state.message = payload?.message;
        }
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Login failed";
        state.isAuth = false;
      })

      // ⭐ Password Change
      .addCase(passwordChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(passwordChange.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.message = payload?.message || "Password changed";
      })
      .addCase(passwordChange.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Password change failed";
      });
  },
});

export const {
  setAuthFromSession,
  logout,
  resetLoginState,
  resetSignupState,
  resetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;

