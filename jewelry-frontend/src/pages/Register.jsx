import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register(){
  const { register } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <Formik initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await register(values.name, values.email, values.password);
            nav('/');
          } catch (err) {
            setErrors({ server: err.response?.data?.message || 'Registration failed' });
          } finally { setSubmitting(false); }
        }}>
        {({ isSubmitting, errors }) => (
          <Form className="space-y-3">
            {errors.server && <div className="text-red-600">{errors.server}</div>}
            <div>
              <label className="block">Name</label>
              <Field name="name" className="w-full p-2 border"/>
            </div>
            <div>
              <label className="block">Email</label>
              <Field name="email" type="email" className="w-full p-2 border"/>
            </div>
            <div>
              <label className="block">Password</label>
              <Field name="password" type="password" className="w-full p-2 border"/>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full p-2 bg-blue-600 text-white rounded">
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
