import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map(cat => (
          <Link key={cat._id.$oid || cat._id} to={`/categories/${cat._id.$oid || cat._id}`}>
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="w-full h-36 object-cover"
              />
              <h3 className="text-lg font-medium mt-3 text-center text-gray-700">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
