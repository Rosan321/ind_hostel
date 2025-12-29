export const SpinnerLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 col-span-full">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Loading please wait...</p>
    </div>
  );
};