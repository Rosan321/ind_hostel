import { createSlice } from "@reduxjs/toolkit";
import { getProfileById } from "../actions/profileActions";

const profileSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },

  reducers: {
    // 🔥 instant image update
    updateProfileImage: (state, action) => {
      if (state.userData) {
        state.userData.profileUrl = action.payload;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfileById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateProfileImage } = profileSlice.actions;
export default profileSlice.reducer;
