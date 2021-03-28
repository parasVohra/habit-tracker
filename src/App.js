import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
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
            <Route path="/" exact component={Home} />
            <Route path="/addHabit" component={AddHabit} />
            <Route path="/form" component={Form} />
          </Switch>
        </main>
      </Store>
    </React.Fragment>
  );
}

export default App;
