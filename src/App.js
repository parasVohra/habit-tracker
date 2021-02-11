import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HabitContext } from "./context/HabitContext";
import { Index } from "./pages";
import { AddHabit } from "./pages/addHabit";

import Form from "./components/form";

function AppRouter() {
  const [habit, setHabit] = useState([]);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <div>
                <span>
                  <Link to="/">Home </Link>
                </span>
                <span>
                  <Link to="/addHabit"> Add Habit </Link>
                </span>
                <span>
                  <Link to="/form"> Form</Link>
                </span>
              </div>
            </li>
          </ul>
        </nav>
        <HabitContext.Provider value={{ habit, setHabit }}>
          <Route path="/" exact component={Index} />
          <Route path="/addHabit" component={AddHabit} />
          <Route path="/form" component={Form} />
        </HabitContext.Provider>
      </div>
    </Router>
  );
}

export default AppRouter;
