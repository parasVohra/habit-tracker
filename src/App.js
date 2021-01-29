import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HabitContext } from "./context/HabitContext";
import { Index } from "./pages";
import { AddHabit } from "./pages/addHabit";

function AppRouter() {
  const [habit, setHabit] = useState([]);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addHabit">Add Habit</Link>
            </li>
          </ul>
        </nav>
        <HabitContext.Provider value={{ habit, setHabit }}>
          <Route path="/" exact component={Index} />
          <Route path="/addHabit" component={AddHabit} />
        </HabitContext.Provider>
      </div>
    </Router>
  );
}

export default AppRouter;
