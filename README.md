📦 E-Commerce React App

A fully functional E-Commerce frontend built with:

React + Vite

Redux + Redux-Saga

Tailwind CSS (tw- prefix)

Fake API (ReqRes + FakeStoreAPI)

Authentication (Login / Signup)

Protected Routes

Add to Cart, View Product, Edit, Delete

Product CRUD

SweetAlert2 Confirmations

🚀 Features
🔐 Authentication

Login via ReqRes Fake API

Signup via ReqRes Fake API

Stores token + user in localStorage

Auto Logout when token becomes invalid

Protected Routes — Cart, Add Product, Edit Product require login

Redirects to login with “Session expired” message

🛒 Cart System

Add to cart

Increase / decrease quantity

Remove product

Clear cart

Coupon system (DISCOUNT10, FLAT50)

Tax calculation (5% VAT)

Cart saved in localStorage

Checkout simulation with saga

📦 Product Management (CRUD)

Get all products

View product details page

Add product

Edit product

Delete product

All using Redux + Saga + FakeStoreAPI

SweetAlert2 confirmation popup

🎨 Tailwind CSS (tw- prefix)

Clean UI

Fully responsive

Class prefix set to tw-

Modern card layout & sticky summary

🧰 Technologies Used
Tech	Purpose
React	UI library
Redux	State management
Redux-Saga	Async logic (API calls, side-effects)
Tailwind CSS	Styling (with tw- prefix)
Axios	API requests
ReqRes API	Fake login/signup
FakeStoreAPI	Fake products CRUD
SweetAlert2	Alerts/confirmation modals
React Router	Navigation & protected routes

Project Structure
src
 ├── Components
 │    └── Cart
 │   └── Common
 │    └── Header.jsx      
 │
 ├── pages
 │    ├── Homepage.jsx
 │    ├── Login.jsx
 │    ├── Signup.jsx
 │    ├── Cart.jsx
 │    ├── ProductView.jsx
 │    ├── AddProduct.jsx
 │    └── EditProduct.jsx
 │
 ├── Redux
 │    ├── Actions
 │    ├── Reducers
 │    ├── Constants
 │    └── Sagas
 │
 ├── services
 │    └── apiAuth.js
 │
 ├── App.jsx
 └── main.jsx

1️⃣ Clone the Repository
git clone https://github.com/Ankadyan96/project_ecommerce.git
cd project_ecommerce

2️⃣ Install Dependencies
npm install

3️⃣ Start the Development Server
npm run dev

🌐 Fake APIs Used
🔑 Auth API (ReqRes.in)
POST https://reqres.in/api/login
POST https://reqres.in/api/register


Valid login example:

{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}

📦 Product API (FakeStoreAPI)

Get all products

GET https://fakestoreapi.com/products


Add product

POST https://fakestoreapi.com/products


Edit product

PUT https://fakestoreapi.com/products/:id


Delete product

DELETE https://fakestoreapi.com/products/:id

🔒 Protected Routes

These pages require login:

/cart

/add

/edit/:id

/product/:id

If no token is found:

Show toast: Session expired — please login again

Redirect to /login

🛡 Auto Logout Logic

Token is stored in localStorage

If token missing or corrupted → logout

If JSON parse error occurs → logout

Every protected route checks token

Saga ensures secure flow

🎨 Screens Included

✨ Homepage (Products grid)

🧐 Product Details page

➕ Add Product

✏️ Edit Product

🗑 Delete Product (SweetAlert)

🔑 Login / Signup

🛒 Cart Page (discount + tax + summary)

📸 Screenshots (Add in GitHub later)

You can drag images into README after pushing project.


