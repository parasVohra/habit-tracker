import { initialState } from "../Store/habitFormContext";

const HabitFormReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: payload,
      };
    case "SET_HABIT_NAME":
      return {
        ...state,
        habitName: payload,
      };
    case "SET_DAILY_GOAL":
      return {
        ...state,
        dailyGoal: payload,
      };
    case "SET_WEEKLY_GOAL":
      return {
        ...state,
        weeklyGoal: payload,
      };
    case "SET_WEEKLY_INPUT_TYPE":
      return {
        ...state,
        weeklyInputType: payload,
      };
    case "SET_COLOR":
      return {
        ...state,
        color: payload,
      };
    case "SET_HABIT_UNIT":
      return {
        ...state,
        habitUnit: payload,
      };
    case "SET_HABIT_UNIT_TYPE":
      return {
        ...state,
        habitUnitType: payload,
      };
    case "SET_INPUT_TYPE":
      return {
        ...state,
        inputType: payload,
      };
    case "RESET_HABIT_FORM":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default HabitFormReducer;
