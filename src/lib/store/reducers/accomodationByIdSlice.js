import { createSlice } from "@reduxjs/toolkit";
import { getAccomodationById } from "../actions/accomodationActions";

const accomodationByIdSlice = createSlice({
  name: "accomodationById",
  initialState: {
    accomodationById: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccomodationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccomodationById.fulfilled, (state, action) => {
        state.loading = false;
        state.accomodationById = action.payload.data;
      })
      .addCase(getAccomodationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accomodationByIdSlice.reducer;
