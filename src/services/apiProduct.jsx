import axios from "axios";
import store from "../Redux/store"; 
import { logout } from "../Redux/Actions/authActions"; 

const apiProduct = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

apiProduct.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(err);
  }
);

export default apiProduct;
