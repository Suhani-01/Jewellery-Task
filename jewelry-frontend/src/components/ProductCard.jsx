import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const discountedPrice = product.discount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  return (
    <div className="border rounded-xl p-3 shadow hover:shadow-md transition">
      <Link to={`/products/${product._id || product.id}`}>
        <img
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-2"
        />

        <h3 className="font-medium line-clamp-1">{product.name}</h3>
      </Link>

      {/* CATEGORY */}
      <p className="text-xs text-gray-500">{product.category?.name || ''}</p>

      {/* PRICE SECTION */}
      <div className="mt-2">
        <div className="flex items-center gap-2">
          {/* Discounted Price */}
          <span className="text-lg font-semibold text-black">
            ₹{discountedPrice}
          </span>

          {/* Strike-through Original Price */}
          {product.discount ? (
            <>
              <span className="text-sm line-through text-gray-400">
                ₹{product.price}
              </span>
              <span className="text-sm text-red-500 font-medium">
                {product.discount}% off
              </span>
            </>
          ) : null}
        </div>

        {/* Rating */}
        <div className="text-sm mt-1 text-yellow-700 font-medium">
          ⭐ {product.rating || 0}
        </div>
      </div>
    </div>
  );
}
