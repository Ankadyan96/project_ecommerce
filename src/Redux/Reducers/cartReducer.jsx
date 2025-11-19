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

const saved =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;
const initialState = saved ? JSON.parse(saved) : { items: [] };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART_FROM_STORAGE:
      return { ...state, items: action.payload?.items || [] };

    case ADD_TO_CART: {
      const p = action.payload;
      const existing = state.items.find((it) => String(it.id) === String(p.id));
      if (existing) {
        return {
          ...state,
          items: state.items.map((it) =>
            String(it.id) === String(p.id) ? { ...it, qty: it.qty + 1 } : it
          ),
        };
      } else {
        const newItem = {
          id: p.id,
          title: p.title || p.name || "",
          price: p.price || 0,
          image: p.image || "",
          qty: 1,
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (it) => String(it.id) !== String(action.payload)
        ),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((it) =>
          String(it.id) === String(action.payload)
            ? { ...it, qty: it.qty + 1 }
            : it
        ),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((it) =>
            String(it.id) === String(action.payload)
              ? { ...it, qty: Math.max(1, it.qty - 1) }
              : it
          )
          .filter((it) => it.qty > 0),
      };
    case CLEAR_CART:
      return { ...state, items: [] };

    case CHECKOUT_SUCCESS:
      return { ...state, items: [] };

    default:
      return state;
  }
};
