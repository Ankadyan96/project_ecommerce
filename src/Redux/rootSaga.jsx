import { all } from "redux-saga/effects"
import authRoot from "./Sagas/authSaga"
import { watchProductSagas } from "./Sagas/productSaga"
import { watchCartSagas } from "./Sagas/cartSaga"

export function* rootSaga() {
    yield all([authRoot(), watchProductSagas(), watchCartSagas()])
}