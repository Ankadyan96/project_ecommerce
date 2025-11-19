import { takeLatest, call, put } from "redux-saga/effects";
import apiProduct from "../../services/apiProduct";
import {
  FETCH_PRODUCTS_REQUEST,
  ADD_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
} from "../Constants/productConstants";

import {
  fetchProductsSuccess,
  fetchProductsFail,
  addProductSuccess,
  addProductFail,
  deleteProductSuccess,
  deleteProductFail,
  updateProductSuccess,
  updateProductFail,
} from "../Actions/productActions";


function* handleFetchProducts() {
  try {
    const response = yield call(apiProduct.get, "/products");
    yield put(fetchProductsSuccess(response.data));
  } catch (err) {
    yield put(fetchProductsFail(err.message || "Failed to fetch products"));
  }
}


function* handleAddProduct(action) {
  try {
    const response = yield call(apiProduct.post, "/products", action.payload);
    yield put(addProductSuccess(response.data));
  } catch (err) {
    yield put(addProductFail(err.message || "Failed to add product"));
  }
}


function* handleUpdateProduct(action) {
  try {
    const response = yield call(apiProduct.put, `/products/${action.id}`, action.payload);
    yield put(updateProductSuccess(response.data));
  } catch (err) {
    yield put(updateProductFail(err.message || "Failed to update product"));
  }
}


function* handleDeleteProduct(action) {
  try {
    const response = yield call(apiProduct.delete, `/products/${action.id}`);
  
    yield put(deleteProductSuccess(action.id));
  } catch (err) {
    yield put(deleteProductFail(err.message || "Failed to delete product"));
  }
}

export function* watchProductSagas() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, handleFetchProducts);
  yield takeLatest(ADD_PRODUCT_REQUEST, handleAddProduct);
  yield takeLatest(UPDATE_PRODUCT_REQUEST, handleUpdateProduct);
  yield takeLatest(DELETE_PRODUCT_REQUEST, handleDeleteProduct);
}