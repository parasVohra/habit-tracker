import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { HabitContext } from "./context/HabitContext";
import { Index } from "./pages";
import { AddHabit } from "./pages/addHabit";
import Form from "./components/form";
import NavBar from "./components/navBar";

function App() {
  const [habit, setHabit] = useState([]);
  return (
    <React.Fragment>
      <NavBar />
      <HabitContext.Provider value={{ habit, setHabit }}>
        <main className="container-sm">
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/addHabit" component={AddHabit} />
            <Route path="/form" component={Form} />
          </Switch>
        </main>
      </HabitContext.Provider>
    </React.Fragment>
  );
}

export default App;
