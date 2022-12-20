import { createSlice } from "@reduxjs/toolkit";
const TOGGLE = "TOGGLE";
export function toggle() {
  return {
    type: TOGGLE,
  };
}

const initialState = {
  cartVisible: false,
  notification: null,
  items:[]
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggle(state, action) {
      //автоматом будет создават экшен , где уже есть тип
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state,action){
    state.notification = {
    status:action.payload.status,
    title: action.payload.title,
    message: action.payload.message,
    }
    },

    hideNotification(state, action) {
      state.notification = null
    },
    getDataByServer(state, {payload}){
      console.log(payload);
      state.items = payload
    }
  },
});

// console.log(uiSlice.actions.toggle())

export const uiActions = uiSlice.actions;
export default uiSlice;
