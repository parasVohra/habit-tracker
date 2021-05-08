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
    case "SET_HABIT_NAME_LIST":
      return {
        ...state,
        habitsNameList: payload,
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
    case "SET_HABIT_STATUS":
      return {
        ...state,
        habitStatus: Object.assign({}, state.habitStatus, payload),
      };
    case "SET_CURRENT_DATE":
      return {
        ...state,
        currentDate: payload,
      };
    case "SET_WEEK_START_DATE":
      return {
        ...state,
        weekStartDate: payload,
      };
    case "SET_WEEK_END_DATE":
      return {
        ...state,
        weekEndDate: payload,
      };

    default:
      return state;
  }
};

export default Reducer;
