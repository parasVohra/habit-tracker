import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Store from "./Store/habitStore";
import Home from "./pages";
import AddHabit from "./pages/addHabit";
import Form from "./components/form";
import SignUp from "./components/auth/signUpForm";
import SignIn from "./components/auth/signInForm";
import NavBar from "./components/navBar";
import SignOut from "./components/auth/signOut";

console.log("*************** In App");

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
              <Route path="/signUp" component={SignUp} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/signOut" component={SignOut} />
            </Switch>
          </main>
        </Store>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
