import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shoppingCart from "../../assets/Images/shopping-cart.svg"

const CartBadge = () => {
  const items = useSelector((s) => s.cart.items || []);
  const count = items.reduce((sum, it) => sum + (it.qty || 0), 0);

  return (
    <Link to="/cart" className="tw:relative tw:inline-flex tw:items-center">
      <img src={shoppingCart} alt="" className="tw:w-8 tw:h-8"/>

      {count > 0 && (
        <span className="tw:absolute tw:-top-2 tw:-right-2 tw:bg-red-600 tw:text-white tw:text-xs tw:px-2 tw:py-0.5 tw:rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

export default CartBadge;
