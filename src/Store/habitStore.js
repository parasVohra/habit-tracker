import { createContext, useReducer } from "react";
import Reducer from "../reducer/reducer";
import {
  getTodayDate,
  getWeekStartDate,
  getWeekEndDate,
  fetchHabitData,
  extractCategories,
} from "../utilities/utilitiesMethods";

const TODAY_DATE = getTodayDate();
const CURRENT_WEEK_START_DATE = getWeekStartDate();
const CURRENT_WEEK_END_DATE = getWeekEndDate();
const habitsData = fetchHabitData();
const categories = extractCategories(habitsData);

const initialState = {
  habits: habitsData || {},
  category: categories || [],
  habitRestructure: [],
  habitStatus: {},
  error: [],
  currentDate: TODAY_DATE,
  weekStartDate: CURRENT_WEEK_START_DATE,
  weekEndDate: CURRENT_WEEK_END_DATE,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
