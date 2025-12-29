import { createSlice } from "@reduxjs/toolkit";
import { getTopLocationByCity } from "../actions/accomodationActions";

const toplocationSlice = createSlice({
  name: "toplocation",
  initialState: {
    toplocationData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTopLocationByCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopLocationByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.toplocationData = action.payload.data;
      })
      .addCase(getTopLocationByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default toplocationSlice.reducer;
