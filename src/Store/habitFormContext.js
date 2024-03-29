import { createContext, useReducer } from "react";
import HabitFormReducer from "../reducer/habitFormReducer";

export const initialState = {
  habitId: "",
  category: "General",
  habitName: "",
  dailyGoal: 1,
  habitUnit: null || "",
  habitUnitType: null,
  trackType: "Checkbox",
  color: "#FFB427",
  weeklyGoal: 7,
  weeklyInputType: "daily",
};

const HabitFormContext = ({ children }) => {
  const [state, dispatch] = useReducer(HabitFormReducer, initialState);
  return (
    <FormContext.Provider value={[state, dispatch]}>
      {children}
    </FormContext.Provider>
  );
};

export const FormContext = createContext(initialState);
export default HabitFormContext;
