import { createSlice } from "@reduxjs/toolkit";
import { getAllAccomodation } from "../actions/accomodationActions";

const initialState = {
  accomodationData: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const accomodationSlice = createSlice({
  name: "accomodation",
  initialState,
  reducers: {
    clearAccomodationData: (state) => {
      state.accomodationData = [];
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccomodation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAccomodation.fulfilled, (state, action) => {
        state.loading = false;
        state.accomodationData = action.payload.data || [];
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(getAllAccomodation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch accommodations";
        state.accomodationData = [];
        state.currentPage = 1;
        state.totalPages = 1;
      });
  },
});

export const { clearAccomodationData } = accomodationSlice.actions;
export default accomodationSlice.reducer;