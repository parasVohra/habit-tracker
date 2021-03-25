import { createContext, useReducer } from "react";
import moment from "moment";
import Reducer from "../reducer/reducer";

const initialState = {
  habits: [],
  category: [],
  habitRestructure: [],
  error: null,
  currentDate: moment()._d,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
