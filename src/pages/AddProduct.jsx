import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductRequest } from "../Redux/Actions/productActions";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.products);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/150");
  const [category, setCategory] = useState("electronics");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      price: parseFloat(price),
      description,
      image,
      category,
    };
    dispatch(addProductRequest(payload));
    navigate("/");
  };

  return (
    <div className="tw:container tw:mx-auto tw:p-4 md:tw:p-8">
      <div className="tw:max-w-3xl tw:mx-auto tw:bg-white tw:shadow-md tw:rounded-lg tw:p-6">
        <h2 className="tw:text-2xl tw:font-bold tw:mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="tw:space-y-5">
         
          <div className="tw:flex tw:justify-center tw:mb-4">
            <img
              src={image}
              alt="Preview"
              className="tw:w-32 tw:h-32 tw:object-contain tw:rounded-md tw:border tw:border-gray-300"
            />
          </div>

          
          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
              placeholder="Enter description"
            />
          </div>

          
          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">
              Image URL
            </label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
              placeholder="Paste image link"
            />
          </div>

       
          <div>
            <label className="tw:block tw:text-sm tw:font-medium tw:mb-1">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="tw:w-full tw:border tw:border-gray-300 tw:rounded-md tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
              placeholder="Enter category"
            />
          </div>

         
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-4 tw:pt-4">
            <button
              type="submit"
              disabled={loading}
              className="tw:bg-blue-600 tw:text-white tw:px-4 tw:py-2 tw:cursor-pointer tw:rounded-md tw:hover:bg-blue-700 tw:disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
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

export default AddProduct;
