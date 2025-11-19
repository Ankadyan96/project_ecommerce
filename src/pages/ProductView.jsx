// src/pages/ProductView.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsRequest,
  deleteProductRequest,
} from "../Redux/Actions/productActions";
import { addItem } from "../Redux/Actions/cartActions";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((s) => !!s.auth?.token);

  const { products, loading, error } = useSelector((s) => s.products);
  const product =
    (products || []).find((p) => String(p.id) === String(id)) || null;

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductsRequest());
    }
  }, [product, dispatch]);

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Yes, delete it",
    });

    if (!confirm.isConfirmed) return;

    dispatch(deleteProductRequest(id));

    await Swal.fire({
      title: "Deleted!",
      text: "The product has been removed.",
      icon: "success",
      confirmButtonColor: "#2563eb",
    });

    navigate("/");
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItem(product));
  };

  if (loading && !product)
    return <p className="tw:p-4 tw:text-gray-600">Loading...</p>;
  if (error) return <p className="tw:p-4 tw:text-red-600">{error}</p>;
  if (!product)
    return <p className="tw:p-4 tw:text-gray-600">Product not found.</p>;

  return (
    <div className="tw:container tw:mx-auto tw:p-6">
      <div className="tw:bg-white tw:rounded-lg tw:shadow-md tw:p-6 tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-6">
        <div className="md:tw:col-span-1 tw:flex tw:items-center tw:justify-center">
          <img
            src={
              product.image ||
              "https://via.placeholder.com/300x300?text=No+Image"
            }
            alt={product.title}
            className="tw:w-full tw:max-w-sm tw:object-contain"
          />
        </div>

        <div className="md:tw:col-span-2">
          <h1 className="tw:text-2xl tw:font-bold tw:mb-2">
            {product.title || product.name}
          </h1>
          <p className="tw:text-gray-700 tw:mb-4">{product.description}</p>

          <div className="tw:flex tw:items-center tw:gap-6 tw:mb-6">
            <div>
              <div className="tw:text-sm tw:text-gray-500">Price</div>
              <div className="tw:text-2xl tw:font-semibold">
                ${product.price}
              </div>
            </div>

            <div>
              <div className="tw:text-sm tw:text-gray-500">Category</div>
              <div className="tw:text-base">{product.category || "-"}</div>
            </div>
          </div>

          <div className="tw:flex tw:items-center tw:gap-3">
            <button
              onClick={handleAddToCart}
              className="tw:bg-indigo-600 tw:text-white tw:px-4 tw:py-2 tw:rounded-md tw:hover:bg-indigo-700 tw:cursor-pointer"
            >
              Add to cart
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={handleEdit}
                  className="tw:bg-green-600 tw:text-white tw:px-4 tw:py-2 tw:rounded-md tw:hover:bg-green-700 tw:cursor-pointer"
                >
                  {" "}
                  Edit{" "}
                </button>

                <button
                  onClick={handleDelete}
                  className="tw:bg-red-600 tw:text-white tw:px-4 tw:py-2 tw:rounded-md tw:hover:bg-red-700 tw:cursor-pointer"
                >
                  {" "}
                  Delete{" "}
                </button>
              </>
            ) : (
              <Link to="/login" className="tw-text-sm tw-text-gray-600 tw:ml-2">
                Please Login
              </Link>
            )}
            <Link
              to="/"
              className="tw:ml-2 tw:text-sm tw:text-gray-600 tw:hover:underline tw:cursor-pointer"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
