import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderAdminListReducer,
  orderDeliveredReducer,
} from "./reducers/orderReducer";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  productCreateReducer,
  productCreateReviewReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userGetByIdReducer,
  userAdminUpdateReducer,
} from "./reducers/userReducer";
const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  ordersListMy: orderListMyReducer,
  ordersListAdmin: orderAdminListReducer,
  orderDelivered: orderDeliveredReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
  user: userGetByIdReducer,
  userUpdate: userAdminUpdateReducer,
});
// get cart items from localstorage
const getCartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// get user info from localstorage
const getUserInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initalState = {
  // cart state
  cart: {
    cartItems: getCartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  // user login state
  userLogin: { userInfo: getUserInfoFromStorage },
};

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
