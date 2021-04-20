import { createContext, useReducer } from "react";
import moment from "moment";
import Reducer from "../reducer/reducer";

const initialState = {
  habits: null,
  category: [],
  habitRestructure: [],
  habitStatus: {},
  error: null,
  currentDate: moment()._d,
  weekStartDate: moment().subtract(moment().weekday(), "days")._d,
  weekEndDate: moment(moment().subtract(moment().weekday(), "days")._d).add(
    6,
    "days"
  )._d,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
