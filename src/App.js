import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Store from "./Store/habitStore";
import { Home } from "./pages";
import { AddHabit } from "./pages/addHabit";
import Form from "./components/form";
import NavBar from "./components/navBar";

function App() {
  return (
    <React.Fragment>
      <Store>
        <NavBar />
        <main className="container-sm">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/addHabit" exact component={AddHabit} />
            <Route path="/form" component={Form} />
            <Redirect from="/" exact to="/home" />
          </Switch>
        </main>
      </Store>
    </React.Fragment>
  );
}

export default App;
