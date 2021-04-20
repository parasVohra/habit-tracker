import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Store from "./Store/habitStore";
import { Home } from "./pages";
import { AddHabit } from "./pages/addHabit";
import Form from "./components/form";
import NavBar from "./components/navBar";

function App() {
  return (
    <React.Fragment>
      <HashRouter basename="/">
        <Store>
          <NavBar />
          <main className="container-sm">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/addHabit" component={AddHabit} />
              <Route path="/form" component={Form} />
            </Switch>
          </main>
        </Store>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;