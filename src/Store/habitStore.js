import { createContext, useReducer } from "react";
import Reducer from "../reducer/reducer";

const initialState = {
  habits: [],
  category: [],
  habitsNameList: [],
  habitRestructure: {},
  habitStatus: [],
  error: [],
  currentDate: new Date(),
  weekStartDate: undefined,
  weekEndDate: undefined,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
