import React, { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]); // store all products
  const [products, setProducts] = useState([]);       // filtered products
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");

  // Load all products initially
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");
        setAllProducts(res.data);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Apply filters
  const applyFilters = ({ metal, priceRange }) => {
    let filtered = [...allProducts];

    // Base Metal Filter (case-insensitive, partial match)
    if (metal) {
      filtered = filtered.filter(p =>
        p.baseMetal?.toLowerCase().includes(metal.toLowerCase())
      );
    }

    // Price Range Filter
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(p => {
        const price = Number(p.price);
        return price >= min && price <= max;
      });
    }

    // Sorting
    if (sort) {
      if (sort === "latest")
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (sort === "price_low") filtered.sort((a, b) => a.price - b.price);
      if (sort === "price_high") filtered.sort((a, b) => b.price - a.price);
      if (sort === "popularity")
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setProducts(filtered);
  };

  // Re-apply sort whenever it changes
  useEffect(() => {
    applyFilters({}); // just apply sorting on current products
  }, [sort]);

  return (
    <div className="px-4 md:px-8 py-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="md:col-span-1 h-fit sticky top-6 space-y-6">
        {/* Filter Box */}
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Filters</h3>
          <FilterSidebar onFilter={applyFilters} />
        </div>

        {/* Sorting Box */}
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
          <label className="block text-gray-700 font-medium mb-2">
            Sort By
          </label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2.5 rounded-lg border bg-white shadow-sm focus:ring-2 focus:ring-black focus:outline-none transition"
          >
            <option value="">Default</option>
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="md:col-span-3">
        {loading ? (
          <div className="text-center py-20 text-gray-600 text-lg animate-pulse">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-lg">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id || p.id}
                className="rounded-xl transition transform hover:-translate-y-1 hover:shadow-xl bg-white"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
