import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CLEAR_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAIL,
  LOAD_CART_FROM_STORAGE,
} from "../Constants/cartConstants";

export const addItem = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeItem = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const incrementQuantity = (productId) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const decrementQuantity = (productId) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const checkoutRequest = () => ({
  type: CHECKOUT_REQUEST,
});

export const checkoutSuccess = () => ({
  type: CHECKOUT_SUCCESS,
});

export const checkoutFail = (error) => ({
  type: CHECKOUT_FAIL,
  error,
});

export const loadCartFromStorage = (payload) => ({
  type: LOAD_CART_FROM_STORAGE,
  payload,
});
