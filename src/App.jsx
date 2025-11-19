import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditPage";
import ProductView from "./pages/ProductView";
import Header from "./Components/Common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="tw:min-h-screen">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
