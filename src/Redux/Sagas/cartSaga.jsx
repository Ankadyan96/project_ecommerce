import { takeEvery, select, put, call } from "redux-saga/effects";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CLEAR_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
} from "../Constants/cartConstants";
import { checkoutSuccess, checkoutFail } from "../Actions/cartActions";

const getCart = (state) => state.cart;

function persistCartToStorage(cartState) {
  try {
    localStorage.setItem("cart_v1", JSON.stringify(cartState));
    return true;
  } catch (err) {
    return false;
  }
}

const fakeCheckoutApi = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ ok: true }), 900);
  });

function* handlePersist() {
  const cartState = yield select(getCart);
  yield call(persistCartToStorage, cartState);
}

function* handleCheckout() {
  try {
    const cartState = yield select(getCart);
    if (!cartState.items.length) throw new Error("Cart is empty");
    const res = yield call(fakeCheckoutApi);
    if (res.ok) {
      yield put(checkoutSuccess());
    } else {
      throw new Error("Checkout failed");
    }
  } catch (err) {
    yield put(checkoutFail(err.message || "Checkout failed"));
  }
}

export function* watchCartSagas() {
  yield takeEvery(
    [
      ADD_TO_CART,
      REMOVE_FROM_CART,
      INCREMENT_QUANTITY,
      DECREMENT_QUANTITY,
      CLEAR_CART,
      CHECKOUT_SUCCESS,
    ],
    handlePersist
  );

  yield takeEvery(CHECKOUT_REQUEST, handleCheckout);
}
