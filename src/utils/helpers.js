export function findById(state, id) {
  return state.items.find((item) => item.id === id);
}
