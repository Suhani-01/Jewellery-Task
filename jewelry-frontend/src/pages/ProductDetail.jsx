import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    load();
  }, [id]);

  if (!product) return <div className="py-20 text-center text-gray-600">Loading...</div>;

  const discountedPrice = product.discount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  return (
    <div className="grid md:grid-cols-3 gap-8 p-6">
      
      {/* IMAGE */}
      <div className="md:col-span-1">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl shadow"
        />
      </div>

      {/* DETAILS */}
      <div className="md:col-span-2 space-y-4">

        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

        <p className="text-sm text-gray-500">
          Category: {product.category?.name || "Unknown"}
        </p>

        {/* PRICE SECTION */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-3xl font-semibold text-black">₹{discountedPrice}</span>

          {product.discount ? (
            <>
              <span className="line-through text-gray-400">₹{product.price}</span>
              <span className="text-red-500 text-sm font-medium">
                {product.discount}% off
              </span>
            </>
          ) : null}
        </div>

        {/* EXTRA DETAILS */}
        <div className="space-y-1 text-gray-700">
          <p><b>Base Metal:</b> {product.baseMetal}</p>
          <p><b>Polish:</b> {product.polish}</p>
          <p><b>Rating:</b> ⭐ {product.rating}</p>
        </div>

        <p className="text-gray-700 pt-2">{product.description}</p>

        <button className="mt-4 px-5 py-2 bg-black text-white rounded-lg shadow hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
