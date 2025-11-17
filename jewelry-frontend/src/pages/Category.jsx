import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        const catRes = await api.get("/categories");
        const category = catRes.data.find(
          (c) => c._id.$oid === id || c._id === id
        );
        setCategoryName(category?.name || "Category");

        const prodRes = await api.get("/products");
        const filtered = prodRes.data.filter((p) => {
          if (typeof p.category === "string") return p.category === id;
          if (p.category?._id) return p.category._id === id;
          if (p.category?.$oid) return p.category.$oid === id;
          return false;
        });

        setProducts(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {categoryName}
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id.$oid || p._id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-48 object-cover rounded-t"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
                <p className="text-gray-600 font-medium">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
