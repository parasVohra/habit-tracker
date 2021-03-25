const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_HABIT":
      return {
        ...state,
      };
    case "SET_CATEGORY":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default Reducer;
