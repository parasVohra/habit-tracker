import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";

import Store from "./Store/habitStore";
import Home from "./pages";
import AddHabit from "./pages/addHabit";
import Form from "./components/CreateHabitForm/form";
import SignUp from "./components/auth/signUpForm";
import SignIn from "./components/auth/signInForm";
import NavBar from "./components/navBar";
import SignOut from "./components/auth/signOut";
import ProtectedRoute from "../src/components/auth/protectedRoutes";
import HabitCard from "./components/HabitCard/HabitCard";
import DailyHabitCard from "./components/DailyHabitCard/DailyHabitCard";
import HabitFormContext from "./Store/habitFormContext";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <HashRouter basename="/">
                <Store>
                    <HabitFormContext>
                        <NavBar />
                        <main className="container-sm">
                            <Switch>
                                <ProtectedRoute
                                    exact
                                    path="/"
                                    component={Home}
                                />
                                <ProtectedRoute
                                    path="/addHabit"
                                    component={AddHabit}
                                />
                                <ProtectedRoute path="/form" component={Form} />
                                <ProtectedRoute
                                    path="/habitCard"
                                    component={HabitCard}
                                />
                                <ProtectedRoute
                                    path="/dailyHabitCard"
                                    component={DailyHabitCard}
                                />
                                <Route path="/signUp" component={SignUp} />
                                <Route path="/signIn" component={SignIn} />
                                <ProtectedRoute
                                    path="/signOut"
                                    component={SignOut}
                                />
                            </Switch>
                        </main>
                    </HabitFormContext>
                </Store>
            </HashRouter>
        </MuiThemeProvider>
    );
}

export default App;
