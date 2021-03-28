const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_HABIT":
      return {
        ...state,
        habits: payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        category: payload,
      };
    case "SET_HABIT_RESTRUCTURE":
      return {
        ...state,
        habitRestructure: payload,
      };
    case "SET_ERROR":
      return {
        ...state,
      };
    case "SET_CURRENT_DATE":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default Reducer;
