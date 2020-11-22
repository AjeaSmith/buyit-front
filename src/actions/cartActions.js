import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const res = await axios(`/api/products/${id}`);
  // add cart item to cart state
  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      product: res.data._id,
      name: res.data.name,
      image: res.data.image,
      price: res.data.price,
      countInStock: res.data.countInStock,
      qty,
    },
  });

  // set cart items to localstorage from cart state (get any state using getState() )
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: "CART_REMOVE_ITEM", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_SHIPPING", payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_PAYMENT_METHOD", payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
export const placeOrder = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_PAYMENT_METHOD", payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
