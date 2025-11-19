import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductRequest, fetchProductsRequest } from "../Redux/Actions/productActions";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading } = useSelector((s) => s.products);

  const product = products.find((p) => String(p.id) === String(id)) || null;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductsRequest());
    } else {
      setTitle(product.title || product.name || "");
      setPrice(product.price || "");
      setDescription(product.description || "");
      setImage(product.image || "");
      setCategory(product.category || "");
    }
  }, [product, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, price: parseFloat(price), description, image, category };
    dispatch(updateProductRequest(id, payload));
    navigate("/");
  };

  if (loading) return <p className="tw:text-gray-600 tw:p-4">Loading...</p>;
  if (!product) return <p className="tw:text-gray-600 tw:p-4">Product not found</p>;

  return (
    <div className="tw:container tw:mx-auto tw:p-4 md:tw:p-8">
      <div className="tw:max-w-3xl tw:mx-auto tw:bg-white tw:shadow-md tw:rounded-lg tw:p-6">
        <h2 className="tw:text-2xl tw:font-bold tw:mb-4">Edit Product</h2>

        <form onSubmit={handleSubmit} className="tw:space-y-4">
          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              type="number"
              step="0.01"
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">Image URL</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
            />
          </div>

          <div className="tw:flex tw:items-center tw:justify-between tw:gap-4 tw:mt-2">
            <button
              type="submit"
              disabled={loading}
              className="tw:bg-blue-600 tw:cursor-pointer tw:text-white tw:px-4 tw:py-2 tw:rounded-md hover:tw:bg-blue-700 tw:disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="tw:border tw:border-gray-300 tw:text-gray-700 tw:cursor-pointer tw:px-4 tw:py-2 tw:rounded-md tw:hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
