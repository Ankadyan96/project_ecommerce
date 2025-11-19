// src/pages/Homepage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  deleteProductRequest,
} from "../Redux/Actions/productActions";
import { addItem } from "../Redux/Actions/cartActions";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete product?")) {
      dispatch(deleteProductRequest(id));
    }
  };

  return (
    <div className="tw:container tw:mx-auto tw:p-4">
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-6">
        <h2 className="tw:text-2xl tw:font-bold">Products</h2>

        <Link
          to="/add"
          className="tw:inline-block tw:bg-blue-600 tw:text-white tw:px-4 tw:py-2 tw:rounded-md tw:shadow tw:hover:bg-blue-700"
        >
          Add product
        </Link>
      </div>

      {loading && (
        <p className="tw:text-gray-600 tw:mb-4">
          Loading products, please wait...
        </p>
      )}

      {error && <p className="tw:text-red-600 tw:mb-4">{error}</p>}

      <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-4">
        {products && products.length ? (
          products.map((p) => (
            <div
              key={p.id}
              className="tw:bg-white tw:border tw:border-gray-200 tw:rounded-lg tw:shadow-sm tw:p-4 tw:flex tw:flex-col tw:justify-between"
            >
              <div>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title || p.name}
                    className="tw:w-full tw:h-40 tw:object-contain tw:mb-3"
                  />
                )}

                <h4 className="tw:text-lg tw:font-semibold tw:mb-1">
                  {p.title || p.name}
                </h4>

                <p className="tw:text-gray-700 tw:mb-3">Price: ${p.price}</p>

                {p.description && (
                  <p className="tw:text-sm tw:text-gray-600 tw:mb-3 tw:line-clamp-3">
                    {p.description}
                  </p>
                )}
              </div>

              <div className="tw:flex tw:justify-between tw:items-center tw:gap-2 tw:mt-3">
                <button
                  onClick={() => dispatch(addItem(p))}
                  className="tw:inline-block tw:bg-indigo-600 tw:text-white tw:px-3 tw:py-1 tw:rounded tw:hover:bg-indigo-700 tw:cursor-pointer"
                >
                  Add to cart
                </button>

                <button
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="tw:inline-block tw:bg-gray-100 tw:text-gray-800 tw:cursor-pointer tw:px-3 tw:py-1 tw:rounded tw:hover:bg-gray-200"
                >
                  View Product
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="tw:col-span-full tw:text-gray-600">No products</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
