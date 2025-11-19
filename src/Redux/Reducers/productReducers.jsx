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

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case ADD_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p.id !== action.id),
      };

    case FETCH_PRODUCTS_FAIL:
    case ADD_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
