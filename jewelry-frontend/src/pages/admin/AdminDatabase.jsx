import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaListAlt } from 'react-icons/fa';

export default function AdminDatabase() {
  return (
    <div className="h-screen flex flex-col items-center   bg-gray-50 px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900  mb-4">
          Admin Dashboard
        </h1>
      {/* Admin Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full mt-20 max-w-md p-8 flex flex-col gap-6">
        

        {/* Buttons */}
        <Link
          to="/admin/products"
          className="flex items-center justify-center gap-3 w-full py-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition text-lg font-semibold"
        >
          <FaListAlt /> Manage Products
        </Link>

        <Link
          to="/admin/products/add"
          className="flex items-center justify-center gap-3 w-full py-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition text-lg font-semibold"
        >
          <FaPlus /> Add Product
        </Link>
      </div>

      {/* Only admin note */}
      <p className="mt-8 text-gray-500 text-sm">
        ⚠️ Only admins can access this page
      </p>
    </div>
  );
}
