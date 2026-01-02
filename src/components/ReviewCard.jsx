"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  Star,
  ThumbsUp,
  Plus,
  CheckCircle,
  Loader2,
  ArrowUp,
  ArrowLeft,
  ArrowUpCircle,
} from "lucide-react";
import RevealOnScroll from "./animations/RevealOnScroll";
import AnimatedCard from "./animations/AnimatedCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviewsById,
  updateReview,
  createReview,
} from "@/lib/store/actions/reviewActions";
import {
  clearSuccessMessage,
  updateLocalHelpfulCount,
  setUpdateLoading,
} from "@/lib/store/reducers/reviewSlice";
import { toast } from "react-toastify";
import Link from "next/link";

export function ReviewCard({ id }) {
  const dispatch = useDispatch();
  const { reviews, loading, successMessage, error, updateLoading } =
    useSelector((state) => state.reviews);
  const { isAuth } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    aboutstay: "",
    verifiedstay: false,
    stayeddate: "",
    roomtype: "",
  });

  const [processedHelpfulUpdates, setProcessedHelpfulUpdates] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState(null);
  const containerRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    const pic = sessionStorage.getItem("profilepic");
    const user = sessionStorage.getItem("userInfo");

    setProfilePic(pic);

    if (user) {
      setUserName(JSON.parse(user));
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (id) {
      setCurrentPage(1);
      setAllReviews([]);
      setHasMore(true);
      dispatch(getAllReviewsById({ id, page: 1, limit: 10 }));
    }
  }, [id, dispatch]);

  // Update allReviews when reviews data changes
  useEffect(() => {
    if (reviews?.reviews && Array.isArray(reviews.reviews)) {
      if (currentPage === 1) {
        // First page - replace all reviews
        setAllReviews(reviews.reviews);
      } else {
        // Subsequent pages - append reviews (filter duplicates)
        setAllReviews((prev) => {
          const existingIds = new Set(prev.map((r) => r._id));
          const newReviews = reviews.reviews.filter(
            (r) => !existingIds.has(r._id)
          );
          return [...prev, ...newReviews];
        });
      }

      // Update total pages from response
      if (reviews.totalpages) {
        setTotalPages(reviews.totalpages);
      }

      // Check if has more
      const hasMorePages = reviews.page < reviews.totalpages;
      setHasMore(hasMorePages);
    }
  }, [reviews, currentPage]);

  // Scroll handler for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show back to top button when scrolled down 300px
      setShowBackToTop(currentScrollY > 300);

      // Detect scroll direction
      if (currentScrollY < lastScrollY) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setShowModal(false);
      setNewReview({
        rating: 0,
        aboutstay: "",
        verifiedstay: false,
        stayeddate: "",
        roomtype: "",
      });
      // Refresh reviews after new review is added
      if (id) {
        setCurrentPage(1);
        dispatch(getAllReviewsById({ id, page: 1, limit: 10 }));
      }
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setTimeout(() => {
        dispatch({ type: "reviews/clearError" });
      }, 3000);
    }
  }, [error, dispatch]);

  // Intersection Observer callback for infinite scroll
  const lastReviewRef = useCallback(
    (node) => {
      if (loading || loadingMore || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMoreReviews();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, loadingMore, hasMore]
  );

  // Load more reviews
  const loadMoreReviews = useCallback(() => {
    if (loadingMore || !hasMore || !id) return;

    const nextPage = currentPage + 1;
    setLoadingMore(true);

    dispatch(getAllReviewsById({ id, page: nextPage, limit: 10 }))
      .then((result) => {
        if (result.payload?.reviews) {
          setCurrentPage(nextPage);
        }
      })
      .catch((err) => {
        console.error("Error loading more reviews:", err);
        toast.error("Failed to load more reviews");
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, [currentPage, hasMore, loadingMore, id, dispatch]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Scroll to bottom function (to see latest loaded reviews)
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Manual navigation to specific page
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage)
      return;

    setCurrentPage(pageNumber);
    setAllReviews([]); // Clear existing reviews
    dispatch(getAllReviewsById({ id, page: pageNumber, limit: 10 }));

    // Scroll to top when changing pages
    scrollToTop();
  };

  // ⭐ Helpful Click - Proper optimistic update
  const handleHelpful = async (review) => {
    const reviewId = review._id;

    // Prevent duplicate clicks
    if (updateLoading[reviewId] || processedHelpfulUpdates[reviewId]) {
      return;
    }

    // Mark as processed to prevent double counting
    setProcessedHelpfulUpdates((prev) => ({
      ...prev,
      [reviewId]: true,
    }));

    // Update UI immediately (optimistic update)
    dispatch(
      updateLocalHelpfulCount({ reviewId, type: "helpful", increment: 1 })
    );

    // Set loading for this specific review
    dispatch(setUpdateLoading({ reviewId, isLoading: true }));

    try {
      // Send API request
      const result = await dispatch(
        updateReview({
          id: reviewId,
          data: { helpful: "true" },
        })
      ).unwrap();

      // Success message is handled by the slice
    } catch (error) {
      // Revert the optimistic update on error
      dispatch(
        updateLocalHelpfulCount({ reviewId, type: "helpful", increment: -1 })
      );
    } finally {
      // Clear loading state
      dispatch(setUpdateLoading({ reviewId, isLoading: false }));

      // Clear processed state after a delay to allow API response
      setTimeout(() => {
        setProcessedHelpfulUpdates((prev) => {
          const newState = { ...prev };
          delete newState[reviewId];
          return newState;
        });
      }, 1000);
    }
  };

  // ⭐ Not Helpful Click - Proper optimistic update
  const handleNotHelpful = async (review) => {
    const reviewId = review._id;

    // Prevent duplicate clicks
    if (updateLoading[reviewId] || processedHelpfulUpdates[reviewId]) {
      return;
    }

    // Mark as processed to prevent double counting
    setProcessedHelpfulUpdates((prev) => ({
      ...prev,
      [reviewId]: true,
    }));

    // Update UI immediately (optimistic update)
    dispatch(
      updateLocalHelpfulCount({ reviewId, type: "nothelpful", increment: 1 })
    );

    // Set loading for this specific review
    dispatch(setUpdateLoading({ reviewId, isLoading: true }));

    try {
      // Send API request
      const result = await dispatch(
        updateReview({
          id: reviewId,
          data: { nothelpful: "true" },
        })
      ).unwrap();

      // Success message is handled by the slice
    } catch (error) {
      // Revert the optimistic update on error
      dispatch(
        updateLocalHelpfulCount({ reviewId, type: "nothelpful", increment: -1 })
      );
    } finally {
      // Clear loading state
      dispatch(setUpdateLoading({ reviewId, isLoading: false }));

      // Clear processed state after a delay to allow API response
      setTimeout(() => {
        setProcessedHelpfulUpdates((prev) => {
          const newState = { ...prev };
          delete newState[reviewId];
          return newState;
        });
      }, 1000);
    }
  };

  // ⭐ Submit New Review
  const handleSubmitReview = () => {
    if (!newReview.rating || !newReview.aboutstay) {
      toast.error("Please enter rating and review text!");
      return;
    }

    dispatch(
      createReview({
        id,
        data: newReview,
      })
    ).unwrap();
  };

  // Check if button should be disabled
  const isButtonDisabled = (reviewId) => {
    return updateLoading[reviewId] || processedHelpfulUpdates[reviewId];
  };

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6 mx-auto w-full relative"
      ref={containerRef}
    >
      {/* Header */}
      <RevealOnScroll delay={0.2}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#44475A]">
            <ArrowRight size={15} />
            <h3 className="text-sm sm:text-base font-semibold tracking-wide">
              REVIEWS
            </h3>
          </div>

          {/* ⭐ Write Review Button */}
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 border-1 border-[#666666] text-[#0D0BA8] font-medium rounded-xl text-sm flex items-center gap-1"
          >
            <Plus size={14} /> Write Review
          </button>
        </div>
      </RevealOnScroll>

      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A]">
        Guest Reviews ({reviews?.averageRating || 0}/5) (
        {reviews?.totalRatings || 0})
      </h2>

      {loading && currentPage === 1 && (
        <div className="text-center py-4">
          <Loader2 className="animate-spin mx-auto" size={24} />
          <p>Loading Reviews...</p>
        </div>
      )}

      {!loading && currentPage === 1 && allReviews.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No reviews yet for this property.
        </p>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {allReviews.length > 0 &&
          allReviews.map((review, index) => (
            <div
              key={review?._id || index}
              ref={index === allReviews.length - 1 ? lastReviewRef : null}
              className="p-4 sm:p-6 rounded-xl shadow-md border border-gray-100"
            >
              <RevealOnScroll delay={0.2}>
                <AnimatedCard>
                  {/* Top */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          review?.userId?.profileUrl ||
                          profilePic ||
                          "/images/default-avatar.png"
                        }
                        alt="avatar"
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div>
                        <p className="font-bold text-[#1A1A1A] text-base sm:text-lg">
                          {review?.userId?.fullname ||
                            userName ||
                            "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Reviewed on{" "}
                          {new Date(review?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-[#0D0BA8]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < review?.rating
                              ? "fill-[#0D0BA8] stroke-[#0D0BA8]"
                              : "stroke-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm ml-1">({review?.rating})</span>
                    </div>
                  </div>

                  {/* Review? Text */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {review?.aboutstay}
                  </p>

                  {/* Facilities */}
                  {review?.facilities && (
                    <div className="flex flex-wrap gap-2 pt-3">
                      {review?.facilities.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-xs px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Review Details */}
                  <div className="flex flex-wrap gap-3 pt-3 text-xs text-gray-500">
                    {review?.verifiedstay && (
                      <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded">
                        <CheckCircle size={12} /> Verified Stay
                      </span>
                    )}
                    {review?.roomtype && (
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        {review.roomtype}
                      </span>
                    )}
                    {review?.stayeddate && (
                      <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                        Stayed:{" "}
                        {new Date(review.stayeddate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </AnimatedCard>

                {/* Helpful Section */}
                <div className="flex items-center justify-end gap-4 mt-3 text-xs font-medium">
                  <div
                    className={`flex items-center gap-1 ${
                      isButtonDisabled(review?._id)
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#0099FF] cursor-pointer hover:text-blue-700"
                    } transition-colors`}
                    onClick={() =>
                      !isButtonDisabled(review?._id) && handleHelpful(review)
                    }
                  >
                    <ThumbsUp size={14} />
                    <span>
                      {updateLoading[review?._id]
                        ? "..."
                        : `(${review?.helpful || 0})`}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-1 ${
                      isButtonDisabled(review?._id)
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-500 cursor-pointer hover:text-red-700"
                    } transition-colors`}
                    onClick={() =>
                      !isButtonDisabled(review?._id) && handleNotHelpful(review)
                    }
                  >
                    <ThumbsUp size={14} className="rotate-180" />
                    <span>
                      {updateLoading[review?._id]
                        ? "..."
                        : `(${review?.nothelpful || 0})`}
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          ))}
      </div>

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="text-center py-4">
          <Loader2 className="animate-spin mx-auto" size={20} />
          <p className="text-sm text-gray-500 mt-2">Loading more reviews...</p>
        </div>
      )}

      {/* Page Navigation at Bottom */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {allReviews.length} of {reviews?.totalRatings || 0} reviews
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Previous
            </button>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {/* {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#0D0BA8] text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      )} */}

      {/* Scroll Up Button (when scrolling down) */}
      {/* {isScrollingUp && lastScrollY > 100 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Scroll up"
        >
          <ArrowUpCircle size={20} />
        </button>
      )} */}

      {/* ⭐ Review Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 w-[90%] sm:w-xl rounded-2xl space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isAuth ? (
              <>
                <h2 className="text-lg font-bold">Write a Review</h2>

                {/* ⭐ Rating */}
                <div>
                  <label className="block text-sm mb-1">Rating *</label>
                  <select
                    className="w-full border px-3 py-2 rounded-lg"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: Number(e.target.value),
                      })
                    }
                  >
                    <option value={0}>Select rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 📝 About Stay */}
                <div>
                  <label className="block text-sm mb-1">Review *</label>
                  <textarea
                    rows="4"
                    className="w-full border px-3 py-2 rounded-lg"
                    value={newReview.aboutstay}
                    onChange={(e) =>
                      setNewReview({ ...newReview, aboutstay: e.target.value })
                    }
                  />
                </div>

                {/* 🔵 Verified Stay */}
                <div>
                  <label className="block text-sm mb-1">Verified Stay *</label>
                  <select
                    className="w-full border px-3 py-2 rounded-lg"
                    value={newReview.verifiedstay ? "yes" : "no"}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        verifiedstay: e.target.value === "yes",
                      })
                    }
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/* 📅 Stayed Date */}
                <div>
                  <label className="block text-sm mb-1">Stayed Date *</label>
                  <input
                    type="date"
                    className="w-full border px-3 py-2 rounded-lg"
                    value={newReview.stayeddate}
                    onChange={(e) =>
                      setNewReview({ ...newReview, stayeddate: e.target.value })
                    }
                  />
                </div>

                {/* 🛏 Room Type */}
                <div>
                  <label className="block text-sm mb-1">Room Type *</label>
                  <input
                    type="text"
                    placeholder="Enter type (e.g., Single, Shared, Deluxe)"
                    className="w-full border px-3 py-2 rounded-lg"
                    value={newReview.roomtype}
                    onChange={(e) =>
                      setNewReview({ ...newReview, roomtype: e.target.value })
                    }
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 bg-[#0D0BA8] text-white rounded-lg cursor-pointer"
                    onClick={handleSubmitReview}
                  >
                    Submit Review
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-center text-lg font-semibold">
                  Please login to write a review
                </h4>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                  <Link
                    className="px-4 py-2 bg-[#0D0BA8] text-white rounded-lg"
                    onClick={() => setShowModal(false)}
                    href="/login"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
