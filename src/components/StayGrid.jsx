import StayCard from "./StayCard";

export default function StayGrid({
  stays = [],
  currentPage,
  totalPages,
  onPageChange = () => {},
  loading = false,
}) {
  // ✅ Show loading skeleton (always when loading)
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 animate-pulse"
            >
              {/* Image */}
              <div className="h-44 bg-gray-200 rounded-lg mb-4" />

              {/* Title */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />

              {/* Location */}
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

              {/* Price + rating */}
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (stays.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No accommodations found
          </h3>
          <p className="text-gray-600">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {stays.map((stay) => (
          <StayCard key={stay._id} stay={stay} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
