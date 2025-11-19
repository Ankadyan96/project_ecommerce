import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartBadge from "../Cart/CartBadge";
import { logout } from "../../Redux/Actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="tw:bg-white tw:shadow tw:sticky tw:top-0 tw:z-50">
      <div className="tw:container tw:mx-auto tw:flex tw:items-center tw:justify-between tw:py-4 tw:px-4">
        <Link to="/" className="tw:text-2xl tw:font-bold tw:text-gray-800">
          E-Shop
        </Link>

        <div className="tw:flex tw:items-center tw:gap-5">
          <CartBadge />
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="tw:bg-blue-600 tw:text-white tw:px-4 tw:py-1.5 tw:rounded-md hover:tw:bg-blue-700 tw:cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="tw:bg-red-600 tw:text-white tw:px-4 tw:py-1.5 tw:rounded-md tw:hover:bg-red-700 tw:cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
