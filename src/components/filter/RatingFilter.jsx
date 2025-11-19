import RevealOnScroll from "../animations/RevealOnScroll";

const RatingFilter = () => {
  return (
    <>
      <RevealOnScroll delay={0.2}>
        <div>
          <h4 className="font-bold mb-2 text-[#222222] text-lg">Rating</h4>
          {[
            { label: "5 Stars & Above", stars: 5 },
            { label: "4 Stars & Above", stars: 4 },
            { label: "3 Stars & Above", stars: 3 },
            { label: "2 Stars & Above", stars: 2 },
            { label: "1 Star & Above", stars: 1 },
          ].map(({ label, stars }) => (
            <div key={label} className="flex items-center space-x-2 mb-2">
              <input type="checkbox" id={label} className="accent-[#44475A]" />
              <label
                htmlFor={label}
                className="flex items-center space-x-1 cursor-pointer text-sm font-medium text-[#1A1A1A]"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill={i < stars ? "#44475A" : "#E5E7EB"}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.036 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z" />
                    </svg>
                  ))}
                </div>
              </label>
            </div>
          ))}
          <p className="text-xs text-[#666666] font-medium mt-2">Min Rating</p>
        </div>
      </RevealOnScroll>
    </>
  );
};

export default RatingFilter;
