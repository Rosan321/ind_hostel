import { createSlice } from "@reduxjs/toolkit";
import { getAllAccomodationStayType } from "../actions/accomodationActions";

const accomodationStayTypeSlice = createSlice({
  name: "accomodation_stay-type",
  initialState: {
    accomodationStayTypeData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccomodationStayType.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAccomodationStayType.fulfilled, (state, action) => {
        state.loading = false;
        state.accomodationStayTypeData = action.payload.groupedCategories;
      })
      .addCase(getAllAccomodationStayType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accomodationStayTypeSlice.reducer;
