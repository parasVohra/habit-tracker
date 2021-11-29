import { createContext, useReducer } from "react";
import HabitFormReducer from "../reducer/habitFormReducer";

const initialState = {
    category: "General",
    habitName: "",
    dailyGoal: 1,
    weeklyGoal: 7,
    habitUnit: null,
    inputType: "number",
    color: "red",
    weeklyInputType: "daily",
    habitUnitType: "noUnit",
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
