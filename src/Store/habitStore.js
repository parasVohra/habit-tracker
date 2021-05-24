import { createContext, useReducer } from "react";
import Reducer from "../reducer/reducer";
import {
  getWeekStartDate,
  getWeekEndDate,
} from "../utilities/utilitiesMethods";

const initialState = {
  habits: [],
  category: [],
  habitsNameList: [],
  habitRestructure: {},
  habitStatus: [],
  error: [],
  currentDate: new Date(),
  weekStartDate: getWeekStartDate() || new Date(),
  weekEndDate: getWeekEndDate() || new Date(),
  token: "",
  isAuthenticated: false,
  userInfo: {},
  isLoading: true,
  currentWeekDates: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
