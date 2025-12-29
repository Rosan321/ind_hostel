"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createReview,
  getAllReviews,
  getAllReviewsById,
  updateReview,
} from "../actions/reviewActions";

const initialState = {
  loading: false,
  reviews: null,
  error: null,
  successMessage: null,
  updateLoading: {},
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    // Update local helpful count without making API call
    updateLocalHelpfulCount: (state, action) => {
      const { reviewId, type, increment = 1 } = action.payload;
      if (state.reviews?.reviews) {
        const reviewIndex = state.reviews.reviews.findIndex(r => r._id === reviewId);
        if (reviewIndex !== -1) {
          if (type === 'helpful') {
            state.reviews.reviews[reviewIndex].helpful = 
              (state.reviews.reviews[reviewIndex].helpful || 0) + increment;
          } else if (type === 'nothelpful') {
            state.reviews.reviews[reviewIndex].nothelpful = 
              (state.reviews.reviews[reviewIndex].nothelpful || 0) + increment;
          }
        }
      }
    },
    setUpdateLoading: (state, action) => {
      const { reviewId, isLoading } = action.payload;
      if (isLoading) {
        state.updateLoading[reviewId] = true;
      } else {
        delete state.updateLoading[reviewId];
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // ⭐ CREATE REVIEW
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload?.message || "Review added successfully!";
        
        const newReview = action.payload.review;
        
        if (!state.reviews) {
          state.reviews = {
            reviews: [newReview],
            averageRating: newReview.rating,
            totalReviews: 1
          };
          return;
        }
        
        if (state.reviews.reviews !== undefined) {
          state.reviews.reviews.unshift(newReview);
          state.reviews.totalReviews = (state.reviews.totalReviews || 0) + 1;
          
          const reviewsArray = state.reviews.reviews;
          const totalRating = reviewsArray.reduce((sum, r) => sum + r.rating, 0);
          state.reviews.averageRating = parseFloat((totalRating / reviewsArray.length).toFixed(1));
        } else {
          state.reviews = {
            reviews: [newReview],
            averageRating: newReview.rating,
            totalReviews: 1
          };
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add review";
        state.successMessage = null;
      })

      // ⭐ UPDATE REVIEW - FIXED: Don't overwrite with server response if it's just a count increment
      .addCase(updateReview.pending, (state, action) => {
        const { id, data } = action.meta.arg;
        const isHelpfulUpdate = data?.helpful === "true" || data?.nothelpful === "true";
        
        if (isHelpfulUpdate) {
          // Set loading for this specific review
          state.updateLoading[id] = true;
        } else {
          state.loading = true;
        }
        state.successMessage = null;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        const { data } = action.meta.arg;
        const isHelpfulUpdate = data?.helpful === "true" || data?.nothelpful === "true";
        
        // Clear loading states
        if (isHelpfulUpdate) {
          delete state.updateLoading[id];
        } else {
          state.loading = false;
        }
        
        // Show success message from API
        if (action.payload?.message) {
          state.successMessage = action.payload.message;
        } else if (isHelpfulUpdate) {
          // Default message for helpful updates
          state.successMessage = "Thank you for your feedback!";
        }
        
        // Only update the review if it's NOT a helpful update
        // (helpful updates are handled optimistically)
        if (!isHelpfulUpdate && action.payload?.data) {
          const updatedReview = action.payload.data;
          
          if (state.reviews && state.reviews.reviews && updatedReview?._id) {
            const reviewIndex = state.reviews.reviews.findIndex(r => r._id === updatedReview._id);
            if (reviewIndex !== -1) {
              state.reviews.reviews[reviewIndex] = {
                ...state.reviews.reviews[reviewIndex],
                ...updatedReview
              };
            }
          }
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        const { id, data } = action.meta.arg;
        const isHelpfulUpdate = data?.helpful === "true" || data?.nothelpful === "true";
        
        // Clear loading states
        if (isHelpfulUpdate) {
          delete state.updateLoading[id];
        } else {
          state.loading = false;
        }
        
        // Show error message from API
        if (action.payload?.message) {
          state.error = action.payload.message;
        } else {
          state.error = "Failed to update review";
        }
        
        state.successMessage = null;
      })

      // ⭐ GET ALL REVIEWS
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
        state.successMessage = null;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load reviews";
        state.successMessage = null;
      })

      // ⭐ GET REVIEWS BY PROPERTY ID
      .addCase(getAllReviewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
        state.successMessage = null;
      })
      .addCase(getAllReviewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load reviews";
        state.successMessage = null;
      });
  },
});

export const { clearSuccessMessage, updateLocalHelpfulCount, setUpdateLoading } = reviewSlice.actions;
export default reviewSlice.reducer;