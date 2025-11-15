const REVIEWS = [
  {
    id: 1,
    rating: 5,
    comment:
      "UrbanNest PG felt like home from day one. The rooms are spotless, WiFi is fast, and the staff are super helpful. Kitchen meals were tasty and affordable. Highly recommended for students!",
    author: "Rahul S.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    rating: 5,
    comment:
      "UrbanNest PG felt like home from day one. The rooms are spotless, WiFi is fast, and the staff are super helpful. Kitchen meals were tasty and affordable. Highly recommended for students!",
    author: "Priya M.",
    date: "1 month ago",
  },
  {
    id: 3,
    rating: 5,
    comment:
      "UrbanNest PG felt like home from day one. The rooms are spotless, WiFi is fast, and the staff are super helpful. Kitchen meals were tasty and affordable. Highly recommended for students!",
    author: "Amit K.",
    date: "2 months ago",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default function ReviewsList() {
  return (
    <div className="space-y-6">
      {REVIEWS.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-200 pb-6 last:border-0"
        >
          <div className="flex items-center gap-4 mb-3">
            <StarRating rating={review.rating} />
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">{review.comment}</p>
          <p className="text-sm font-medium text-gray-900">{review.author}</p>
        </div>
      ))}
    </div>
  );
}
