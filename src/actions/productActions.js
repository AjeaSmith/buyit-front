import axios from "axios";
import { logout } from "./userActions";
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const res = await axios.get(
      `https://buyit-backend-api.herokuapp.com/api/products`
    );
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "PRODUCT_LIST_FAIL", payload: error.message });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const res = await axios.get(
      `https://buyit-backend-api.herokuapp.com/api/products/${id}`
    );
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: error.message });
  }
};

// ADMIN METHODS
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `https://buyit-backend-api.herokuapp.com/api/products/${id}`,
      config
    );

    dispatch({
      type: "PRODUCT_DELETE_SUCCESS",
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "PRODUCT_DELETE_FAIL",
      payload: message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_CREATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      "Content-Type": "application/json",
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `https://buyit-backend-api.herokuapp.com/api/products/`,
      {},
      config
    );

    dispatch({
      type: "PRODUCT_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload: message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRODUCT_UPDATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `https://buyit-backend-api.herokuapp.com/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: "PRODUCT_UPDATE_SUCCESS",
      payload: data,
    });
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "PRODUCT_UPDATE_FAIL",
      payload: message,
    });
  }
};
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: "PRODUCT_CREATE_REVIEW_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `https://buyit-backend-api.herokuapp.com/api/products/${productId}/reviews`,
      review,
      config
    );

    dispatch({
      type: "PRODUCT_CREATE_REVIEW_SUCCESS",
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "PRODUCT_CREATE_REVIEW_FAIL",
      payload: message,
    });
  }
};
