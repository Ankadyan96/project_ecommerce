import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "../Constants/productConstants";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});
export const fetchProductsSuccess = (payload) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload,
});
export const fetchProductsFail = (error) => ({
  type: FETCH_PRODUCTS_FAIL,
  error,
});

export const addProductRequest = (payload) => ({
  type: ADD_PRODUCT_REQUEST,
  payload,
});
export const addProductSuccess = (payload) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload,
});
export const addProductFail = (error) => ({
  type: ADD_PRODUCT_FAIL,
  error,
});

export const updateProductRequest = (id, payload) => ({
  type: UPDATE_PRODUCT_REQUEST,
  id,
  payload,
});
export const updateProductSuccess = (payload) => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload,
});
export const updateProductFail = (error) => ({
  type: UPDATE_PRODUCT_FAIL,
  error,
});

export const deleteProductRequest = (id) => ({
  type: DELETE_PRODUCT_REQUEST,
  id,
});
export const deleteProductSuccess = (id) => ({
  type: DELETE_PRODUCT_SUCCESS,
  id,
});
export const deleteProductFail = (error) => ({
  type: DELETE_PRODUCT_FAIL,
  error,
});
