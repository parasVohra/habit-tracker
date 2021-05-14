import { signOut } from "../../services/authServices";
import React, { useEffect, useContext } from "react";
import { tokenKey } from "../../config.json";
import { useHistory } from "react-router-dom";
import { Context } from "../../Store/habitStore";

const SignOut = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    dispatch({ type: "SET_TOKEN", payload: "" });
    dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
    dispatch({ type: "SET_USER_INFO", payload: {} });
    signOut(tokenKey);
  }, []);

  // history.push("/");
  return (
    <div>
      <h1>LoggedOut</h1>
      <pre>{JSON.stringify(state.isAuthenticated, null, 2)}</pre>
    </div>
  );
};

export default SignOut;
