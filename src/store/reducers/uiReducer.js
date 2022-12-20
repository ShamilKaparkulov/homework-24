const TOGGLE = "TOGGLE";
export function toggle() {
  return {
    type: TOGGLE,
  };
}

const initialState = {
  cartVisible: false,
};

export const uiReducer = (state = initialState, action) => {
  if (action.type === TOGGLE) {
    return {
      ...state,
      cartVisible: !state.cartVisible,
    };
  }

  return state;
};
