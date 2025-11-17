import React from "react";
import { Formik, Form, Field } from "formik";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add New Product
      </h2>

      <Formik
        initialValues={{
          name: "",
          description: "",
          category: "",
          price: 0,
          discount: 0,
          baseMetal: "",
          polish: "",
          rating: 0,
          imageUrl: "",
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await api.post("/products", values);
            nav("/admin/products");
          } catch (err) {
            setErrors({ server: err.response?.data?.message || "Failed" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">
            {errors.server && (
              <div className="text-red-600 text-center">{errors.server}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="name"
                placeholder="Product Name"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Field
                name="category"
                placeholder="Category ID"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Field
              name="description"
              placeholder="Description"
              as="textarea"
              rows={3}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="mb-1 font-medium text-gray-700"
                >
                  Price (₹)
                </label>
                <Field
                  id="price"
                  name="price"
                  type="number"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  min={0}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="discount"
                  className="mb-1 font-medium text-gray-700"
                >
                  Discount (%)
                </label>
                <Field
                  id="discount"
                  name="discount"
                  type="number"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  min={0}
                  max={100}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="rating"
                  className="mb-1 font-medium text-gray-700"
                >
                  Rating
                </label>
                <Field
                  id="rating"
                  name="rating"
                  type="number"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  min={0}
                  max={5}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="baseMetal"
                placeholder="Base Metal"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Field
                name="polish"
                placeholder="Polish Type"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Field
              name="imageUrl"
              placeholder="Image URL"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
