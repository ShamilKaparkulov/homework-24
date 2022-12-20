import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

// import { combineReducers } from "redux";
import uiSlice from "./uiSlice";
// import { createStore } from "redux";
// export const rootReducer = combineReducers({
//   ui: uiReducer,
// });

// export const store = createStore(rootReducer);
// console.log(uiSlice)

//Все редюсеры собирает в один.
const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
   
  },
});

export default store;
