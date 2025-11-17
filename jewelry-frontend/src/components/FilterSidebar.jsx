import React, { useState } from "react";

export default function FilterSidebar({ onFilter }) {
  const [metal, setMetal] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const apply = () => {
    onFilter({ metal, priceRange });
  };

  const reset = () => {
    setMetal("");
    setPriceRange("");
    onFilter({ metal: "", priceRange: "" });
  };

  return (
    <div className="space-y-5">
      {/* Metal Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800 mb-2">Base Metal</h4>

        <select
          value={metal}
          onChange={(e) => setMetal(e.target.value)}
          className="w-full p-2.5 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-black transition"
        >
          <option value="">All</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="diamond">Diamond</option>
          <option value="copper">Copper</option>
          <option value="brass">Brass</option>
          <option value="alloy">Alloy</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition">
        <h4 className="font-semibold text-gray-800 mb-2">Price Range</h4>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full p-2.5 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-black transition"
        >
          <option value="">All</option>
          <option value="0-1000">₹0 - ₹1,000</option>
          <option value="1000-5000">₹1,000 - ₹5,000</option>
          <option value="5000-20000">₹5,000 - ₹20,000</option>
        </select>
      </div>

      {/* Buttons */}
      <button
        onClick={apply}
        className="w-full py-2.5 bg-black text-white rounded-lg shadow hover:bg-gray-900 transition font-medium"
      >
        Apply Filters
      </button>

      <button
        onClick={reset}
        className="w-full py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
      >
        Reset
      </button>
    </div>
  );
}
