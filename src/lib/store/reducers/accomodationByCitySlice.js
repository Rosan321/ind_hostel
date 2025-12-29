import { createSlice } from "@reduxjs/toolkit";
import { getAllAccomodationByCity } from "../actions/accomodationActions";

const accomodationByCitySlice = createSlice({
  name: "accomodationByCity",
  initialState: {
    accomodationByCityData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccomodationByCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAccomodationByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.accomodationByCityData = action.payload.data;
      })
      .addCase(getAllAccomodationByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accomodationByCitySlice.reducer;
