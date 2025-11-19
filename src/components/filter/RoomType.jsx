import RevealOnScroll from "../animations/RevealOnScroll";

const RoomType = () => {
  return (
    <>
      <RevealOnScroll delay={0.4}>
        <div className=" space-y-1">
          <h4 className="font-bold mb-2 text-[#222222] text-lg">Room Type</h4>
          {["Single", "Shared", "Suite"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input type="checkbox" id={type} className="accent-[#44475A]" />
              <label
                htmlFor={type}
                className="text-[#1A1A1A] text-sm font-medium"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </>
  );
};

export default RoomType;
