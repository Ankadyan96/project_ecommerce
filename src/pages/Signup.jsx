import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../Redux/Actions/authActions";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const navigate = useNavigate?.() || (() => {});

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest({ email, password }));
  };

  return (
    <div className="tw:max-w-md tw:mx-auto tw:bg-white tw:p-6 tw:rounded tw:shadow">
      <h2 className="tw:text-2xl tw:font-semibold tw:mb-4 tw:text-center">
        Signup
      </h2>
      {error && <p className="tw:text-red-600 tw:text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="tw:space-y-3">
        <div>
          <label className="tw:font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="tw:w-full tw:mt-[5px] tw:border tw:p-2 tw:rounded-[5px]"
          />
        </div>
        <div>
          <label className="tw:font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="tw:w-full tw:mt-[5px] tw:border tw:p-2 tw:rounded-[5px]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="tw:w-full tw:mt-[5px] tw:py-2 tw:bg-blue-600 tw:text-white tw:rounded-[5px] tw:cursor-pointer"
        >
          {loading ? "Signing..." : "Signup"}
        </button>
      </form>

      <p className="tw:text-center tw:mt-4">
        Already have an account?{" "}
        <Link to="/login" className="tw:text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
