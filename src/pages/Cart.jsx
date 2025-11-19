import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  checkoutRequest,
} from "../Redux/Actions/cartActions";
import { Link, useNavigate } from "react-router-dom";
import shoppingCart from "../assets/Images/shopping-cart.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [] } = useSelector((s) => s.cart);
  const loading = useSelector((s) => s.products?.loading);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0),
    [items]
  );

  const applyCoupon = () => {
    setCouponError("");
    const code = (coupon || "").trim().toUpperCase();
    if (!code) {
      setCouponError("Enter a coupon code");
      return;
    }

    if (code === "DISCOUNT10") {
      setAppliedCoupon({ code, type: "percent", value: 10, label: "10% off" });
    } else if (code === "FLAT50") {
      setAppliedCoupon({ code, type: "flat", value: 50, label: "$50 off" });
    } else {
      setCouponError("Invalid coupon");
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError("");
  };

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") {
      return (subtotal * appliedCoupon.value) / 100;
    }
    return appliedCoupon.value;
  }, [subtotal, appliedCoupon]);

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const TAX_RATE = 0.05;
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + tax;

  const handleCheckout = () => {
    if (!items.length) {
      alert("Your cart is empty");
      return;
    }
    dispatch(checkoutRequest());
  };

  return (
    <div className="tw:bg-gray-50 tw:min-h-screen">
      <div className="tw:container tw:mx-auto tw:px-6 tw:py-10">
        <h1 className="tw:text-4xl tw:font-extrabold tw:text-gray-900 tw:mb-8">Shopping Cart</h1>

        <div className="tw:grid tw:grid-cols-1 tw:lg:grid-cols-2 tw:gap-8">
          
          <div className="tw:lg:col-span-1">
            <div className="tw:bg-white tw:rounded-xl tw:shadow tw:p-6">
              
              {items.length === 0 ? (
                <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-center tw:py-16">
                  
                  <div className="tw:bg-gray-100 tw:rounded-full tw:p-6 tw:mb-6">
                   <img src={shoppingCart} alt="" />
                  </div>

                  <h2 className="tw:text-2xl tw:font-semibold tw:text-gray-900 tw:mb-2">Your cart is empty</h2>
                  <p className="tw:text-gray-500 tw:mb-6">Start shopping to add items to your cart.</p>

                  <div className="tw:flex tw:gap-4">
                    <Link
                      to="/"
                      className="tw:bg-blue-600 tw:text-white tw:px-6 tw:py-2.5 tw:rounded-md hover:tw:bg-blue-700 tw:font-medium"
                    >
                      Continue Shopping
                    </Link>

                    <button
                      onClick={() => { dispatch(clearCart()); removeCoupon(); }}
                      className="tw:bg-white tw:border tw:border-gray-200 tw:text-gray-700 tw:px-4 tw:py-2.5 tw:rounded-md tw:hover:bg-gray-50 tw:cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="tw:space-y-6">
                  {items.map((it) => (
                    <div key={it.id} className="tw:flex tw:items-start tw:gap-5 tw:border-b tw:pb-4">
                      <img
                        src={it.image || "https://via.placeholder.com/140x140?text=No+Image"}
                        alt={it.title}
                        className="tw:w-32 tw:h-32 tw:object-contain tw:rounded"
                      />

                      <div className="tw:flex-1">
                        <div className="tw:flex tw:justify-between tw:items-start">
                          <div>
                            <h3 className="tw:text-lg tw:font-semibold tw:text-gray-900">{it.title}</h3>
                            <p className="tw:text-sm tw:text-gray-500 tw:mt-1">{it.description ? it.description.substring(0, 120) + (it.description.length>120?'...':'') : ''}</p>
                          </div>

                          <div className="tw:text-right">
                            <div className="tw:text-sm tw:text-gray-600">Unit</div>
                            <div className="tw:text-lg tw:font-semibold tw:text-gray-900">${it.price}</div>
                          </div>
                        </div>

                        <div className="tw:flex tw:items-center tw:justify-between tw:mt-4">
                          <div className="tw:flex tw:items-center tw:gap-3">
                            <button
                              onClick={() => dispatch(decrementQuantity(it.id))}
                              className="tw:w-9 tw:h-9 tw:flex tw:items-center tw:justify-center tw:border tw:rounded tw:text-lg tw:cursor-pointer"
                            >
                              -
                            </button>
                            <div className="tw:text-base tw:font-medium">{it.qty}</div>
                            <button
                              onClick={() => dispatch(incrementQuantity(it.id))}
                              className="tw:w-9 tw:h-9 tw:flex tw:items-center tw:justify-center tw:border tw:rounded tw:text-lg tw:cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="tw:flex tw:items-center tw:gap-6">
                            <div className="tw:text-sm tw:text-gray-600">Total</div>
                            <div className="tw:text-lg tw:font-semibold">${(it.price * it.qty).toFixed(2)}</div>
                            <button
                              onClick={() => dispatch(removeItem(it.id))}
                              className="tw:text-sm tw:text-red-600 tw:hover:underline tw:cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="tw:flex tw:justify-between tw:items-center tw:pt-3">
                    <button
                      onClick={() => { dispatch(clearCart()); removeCoupon(); }}
                      className="tw:text-sm tw:text-red-600 tw:cursor-pointer tw:hover:underline"
                    >
                      Clear Cart
                    </button>

                    <div className="tw:text-sm tw:text-gray-600">
                      {items.length} item{items.length > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <aside className="tw:lg:col-span-1">
            <div className="tw:sticky tw:lg:top-28">
              <div className="tw:bg-white tw:rounded-xl tw:shadow tw:p-6">
                <h4 className="tw:text-xl tw:font-semibold tw:mb-4">Order Summary</h4>

                <div className="tw:space-y-3">
                  <div className="tw:flex tw:justify-between tw:text-sm tw:text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="tw:flex tw:justify-between tw:text-sm tw:text-gray-600">
                    <span>After Discount</span>
                    <span>${afterDiscount.toFixed(2)}</span>
                  </div>

                  <div className="tw:flex tw:justify-between tw:text-sm tw:text-gray-600">
                    <span>Tax (5% VAT)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="tw:border-t tw:pt-4 tw:mt-4">
                  <div className="tw:flex tw:justify-between tw:items-center">
                    <div>
                      <div className="tw:text-lg tw:font-bold">Total</div>
                    </div>
                    <div className="tw:text-2xl tw:font-extrabold">${total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="tw:mt-5">
                  <label className="tw:block tw:text-sm tw:font-medium tw:mb-2">Coupon Code</label>
                  <div className="tw:flex tw:items-center tw:gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="tw:flex-1 tw:border tw:border-gray-200 tw:rounded tw:px-3 tw:py-2 tw:outline-none tw:focus:ring-2 tw:focus:ring-blue-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="tw:bg-blue-600 tw:text-white tw:px-4 tw:py-2 tw:rounded-md tw:hover:bg-blue-700 tw:cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && <p className="tw:text-sm tw:text-red-600 tw:mt-2">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="tw:flex tw:items-center tw:justify-between tw:bg-green-50 tw:border tw:border-green-100 tw:text-green-800 tw:p-2 tw:rounded tw:mt-3">
                      <div className="tw:text-sm">Applied: {appliedCoupon.label}</div>
                      <button onClick={removeCoupon} className="tw:text-sm tw:underline tw:cursor-pointer">Remove</button>
                    </div>
                  )}
                </div>

                <div className="tw:mt-6">
                  <button
                    disabled={loading}
                    onClick={handleCheckout}
                    className="tw:w-full tw:bg-blue-600 tw:text-white tw:py-3 tw:rounded-md tw:hover:bg-blue-700 tw:disabled:opacity-60 tw:cursor-pointer"
                  >
                    {loading ? "Processing..." : "Checkout"}
                  </button>
                </div>

                <p className="tw:text-xs tw:text-gray-500 tw:mt-3">
                  By placing your order you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
