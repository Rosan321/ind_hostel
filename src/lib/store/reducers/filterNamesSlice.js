import { createSlice } from "@reduxjs/toolkit";
import { getFilterNames } from "../actions/accomodationActions";

const filterNamesSlice = createSlice({
  name: "filterNames",
  initialState: {
    filterNamesData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterNames.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilterNames.fulfilled, (state, action) => {
        state.loading = false;
        state.filterNamesData = action.payload.data;
      })
      .addCase(getFilterNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default filterNamesSlice.reducer;
