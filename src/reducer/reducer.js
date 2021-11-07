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
        error: [...state.error, payload],
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
    case "SET_TOKEN":
      return {
        ...state,
        token: payload,
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: payload,
      };
    case "SET_IS_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: payload,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    case "SET_CURRENT_WEEK_DATES":
      return {
        ...state,
        currentWeekDates: payload,
      };
    case "SET_HABIT_VIEW":
      return {
        ...state,
        habitView: payload,
      };

    default:
      return state;
  }
};

export default Reducer;
