export const SkeletonLoader = () => {
  return (
    <div className="space-y-4 w-full">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-start animate-pulse">
          <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-300 rounded-full w-16"></div>
              <div className="h-6 bg-gray-300 rounded-full w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};