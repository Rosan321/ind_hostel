import { createSlice } from "@reduxjs/toolkit";
import { getAllFilteredData } from "../actions/filterActions";
import { getSortData, getFilteredAccomodationByArea } from "../actions/accomodationActions";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterData: {},
    loading: false,
    error: null,

    currentPage: 1,
    totalPages: 1,
    totalItems: 0,

    appliedFilters: {},
    sortBy: "default",
  },

  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setAppliedFilters: (state, action) => {
      state.appliedFilters = action.payload;
      state.currentPage = 1;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },

    clearFilters: (state) => {
      state.appliedFilters = {};
      state.sortBy = "default";
      state.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= FILTER API ================= */
      .addCase(getAllFilteredData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFilteredData.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload;
        state.totalItems = action.payload?.total || 0;
        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
      })
      .addCase(getAllFilteredData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= SORT API ================= */
      .addCase(getSortData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSortData.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 overwrite listing with sorted data
        state.filterData = {
          ...state.filterData,
          data: action.payload?.data || [],
        };
      })
      .addCase(getSortData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= LOCATION FILTER API ================= */
      .addCase(getFilteredAccomodationByArea.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilteredAccomodationByArea.fulfilled, (state, action) => {
        state.loading = false;
        state.filterData = action.payload;

        const totalItems = action.payload?.totalaccommodations || 0;
        const limit = action.payload?.pagination?.limit || 10;

        state.totalItems = totalItems;
        state.totalPages = Math.ceil(totalItems / limit) || 1;
        state.currentPage = action.payload?.pagination?.page || 1;
      })
      .addCase(getFilteredAccomodationByArea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentPage,
  setAppliedFilters,
  clearFilters,
  setSortBy,
} = filterSlice.actions;

export default filterSlice.reducer;
