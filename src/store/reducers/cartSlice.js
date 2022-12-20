import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants/general";
import { uiActions } from "./uiSlice";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalAmount++;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalAmount--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },

    addProductsOnUi(state, action) {
      const newProducts = action.payload;
      console.log(newProducts);

      const { newId, title, newPrice, description } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newProducts.newId
      );
      // state.totalAmount ++
      if (!existingItem) {
        state.items.push({
          ...newProducts,
          title,
          newPrice,
          description,
          quantity: 1,
          totalPrice: newProducts.newPrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newProducts.price;
      }
    },

    getDataByServerCart(state, { payload }) {
      console.log(payload);
      state.items = payload.items;
      state.totalAmount = payload.totalAmount;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;

export const getRequest = async () => {
  const response = await fetch(`${BASE_URL}/ui.json`);
  const data = await response.json();
  const updatetProducts = [];
  for (let key in data) {
    updatetProducts.push({
      title: data[key].title,
      description: data[key].description,
      price: data[key].price,
    });
  }
};

export const sendCartData = (cart) => {
  return (dispatch, initialState) => {
    dispatch(
      uiActions.showNotification({
        status: "panding",
        title: "sending",
        message: "Sending data failed",
      })
    );

    fetch(`${BASE_URL}/cart.json`, {
      method: "PUT",
      body: JSON.stringify(cart),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sending data failed");
        }
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "sending cart data succesfully",
          })
        );
      })
      .catch(() => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "Sending cart data filed",
          })
        );
      });
  };
};
