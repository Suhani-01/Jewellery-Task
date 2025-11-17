import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function AdminProducts(){
  const [products, setProducts] = useState([]);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const del = async (id) => {
    if(!confirm('Delete product?')) return;
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Link 
          to="/admin/products/add" 
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">
          Add Product
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map(p => (
          <div 
            key={p._id} 
            className="bg-blue-50 hover:bg-blue-100 shadow-md rounded-lg p-4 flex justify-between items-center transition"
          >
            <div>
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <p className="text-gray-700">₹{p.price}</p>
            </div>
            <div className="flex gap-2">
              <Link 
                to={`/admin/products/edit/${p._id}`} 
                className="px-3 py-1 border rounded text-blue-600 hover:bg-blue-200 transition">
                Edit
              </Link>
              <button 
                onClick={() => del(p._id)} 
                className="px-3 py-1 border rounded text-red-600 hover:bg-red-200 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
