import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/Category";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminProducts from "./pages/admin/ProductList";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoriesList from "./pages/Categories";
import AdminDatabase from "./pages/admin/adminDatabase";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            <Route path="/categories" element={<CategoriesList />} />
            <Route path="/categories/:id" element={<CategoryPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin/database"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDatabase/>
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/edit/:id"
              element={
                <ProtectedRoute adminOnly={true}>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
