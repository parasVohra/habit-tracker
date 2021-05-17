import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../../Store/habitStore";
import { tokenKey } from "../../config.json";

const ProtectedRoutes = ({ path, component: Component, render, ...rest }) => {
  const [state, dispatch] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem(tokenKey))
          return (
            <Redirect
              to={{
                pathname: "/SignIn",
                state: { form: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoutes;
