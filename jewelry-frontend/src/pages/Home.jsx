import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/products?sort=latest&limit=8');
      setFeatured(res.data.slice(0, 8));
    };
    load();
  }, []);

  return (
    <div className="px-4 md:px-8">

      {/* Hero Section */}
      <section className="mb-12">
        <div className="rounded-2xl p-10 bg-gradient-to-r from-[#fef8f4] to-[#fff3e0] shadow-sm border">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Discover Elegant Jewelry
          </h1>
          <p className="mt-3 text-gray-700 text-lg max-w-xl">
            Timeless designs crafted to perfection. Explore our latest collection curated just for you.
          </p>

          <Link
            to="/products"
            className="inline-block mt-6 px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Featured Products</h2>
          <Link 
            to="/products"
            className="text-sm font-medium hover:underline text-gray-600"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}
