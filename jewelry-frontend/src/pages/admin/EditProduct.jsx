import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import api from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct(){
  const { id } = useParams();
  const nav = useNavigate();
  const [initial, setInitial] = useState(null);

  useEffect(()=>{
    const load = async () => {
      const res = await api.get(`/products/${id}`);
      const p = res.data;
      setInitial({
        name: p.name, description: p.description || '', category: p.category?._id || p.category, price: p.price || 0,
        discount: p.discount || 0, baseMetal: p.baseMetal || '', polish: p.polish || '', rating: p.rating || 0, imageUrl: p.imageUrl || ''
      });
    };
    load();
  },[id]);

  if(!initial) return <div>Loading...</div>;

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <Formik initialValues={initial}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await api.put(`/products/${id}`, values);
            nav('/admin/products');
          } catch (err) {
            setErrors({ server: err.response?.data?.message || 'Failed' });
          } finally { setSubmitting(false); }
        }}>
        {({ isSubmitting, errors }) => (
          <Form className="space-y-3">
            {errors.server && <div className="text-red-600">{errors.server}</div>}
            <Field name="name" placeholder="Name" className="w-full p-2 border"/>
            <Field name="description" placeholder="Description" className="w-full p-2 border"/>
            <Field name="category" placeholder="CategoryId" className="w-full p-2 border"/>
            <Field name="price" type="number" placeholder="Price" className="w-full p-2 border"/>
            <Field name="discount" type="number" placeholder="Discount" className="w-full p-2 border"/>
            <Field name="baseMetal" placeholder="Base Metal" className="w-full p-2 border"/>
            <Field name="polish" placeholder="Polish" className="w-full p-2 border"/>
            <Field name="rating" type="number" placeholder="Rating" className="w-full p-2 border"/>
            <Field name="imageUrl" placeholder="Image URL" className="w-full p-2 border"/>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
