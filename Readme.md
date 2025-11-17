## Project Overview
This is a Jewellery e-commerce web application built with the MERN stack.  
It allows users to browse products, filter them by base metal and price, view categories, and for admins to manage products via an admin panel.

## Features
- Browse all jewellery products with images, prices, and ratings
- Filter products by base metal and price range
- Sort products by price, popularity, and latest
- View products by categories
- Admin panel for managing products (Add, Edit, Delete)
- Secure login and role-based access control

## Tech Stack
- Frontend: React, Tailwind CSS, Formik
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- API: RESTful endpoints

## Routes
| Route | Component / Page | Access |
|-------|-----------------|--------|
| `/` | Home | Public |
| `/products` | Products | Public |
| `/products/:id` | ProductDetail | Public |
| `/categories` | CategoriesList | Public |
| `/categories/:id` | CategoryPage | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/admin/database` | AdminDatabase | Admin Only |
| `/admin/products` | AdminProducts | Admin Only |
| `/admin/products/add` | AddProduct | Admin Only |
| `/admin/products/edit/:id` | EditProduct | Admin Only |


How to Run the Project Locally

## 1. Clone the repository
```bash
git clone https://github.com/Suhani-01/Jewellery-Task.git
cd Jewellery-Task
```

## 2. Set up the backend
```bash
cd backend-jewellery
npm install        # install dependencies
npx nodemon server.js        # start backend server (default port: 5000)
```

## 3. Set up the frontend
```bash
cd ../frontend-jewellery
npm install        # install dependencies
npm run dev         # start frontend (default port: 3000)
```

## 4. Set up environment variables for backend
Create a .env file inside backend-jewellery with:
```bash
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<any_secret_key>
```

## Open the app :
```bash
Frontend: http://localhost:3000
Admin Panel (login required): http://localhost:3000/admin/products
```