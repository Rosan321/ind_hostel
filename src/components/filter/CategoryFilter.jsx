"use client";

import RevealOnScroll from "../animations/RevealOnScroll";

const CategoryFilter = ({ categories = [], selected = [], onChange }) => {
    const handleCheckboxChange = (category, isChecked) => {
        let newSelected;
        if (isChecked) {
            newSelected = [...selected, category];
        } else {
            newSelected = selected.filter((c) => c !== category);
        }
        onChange?.(newSelected);
    };

    if (!categories || categories.length === 0) return null;

    return (
        <RevealOnScroll delay={0.2}>
            <div className="space-y-1">
                <h4 className="font-bold mb-2 text-[#222222] text-lg">Categories</h4>

                <div className="max-h-[200px] overflow-y-auto no-scrollbar space-y-2 pr-2">
                    {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`category-${category}`}
                                className="accent-[#0D0BA8] cursor-pointer w-4 h-4"
                                checked={selected.includes(category)}
                                onChange={(e) => handleCheckboxChange(category, e.target.checked)}
                            />
                            <label
                                htmlFor={`category-${category}`}
                                className="text-sm font-medium text-gray-700 cursor-pointer capitalize hover:text-[#0D0BA8] transition-colors"
                            >
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </RevealOnScroll>
    );
};

export default CategoryFilter;
