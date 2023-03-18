import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import RenderHabits from "../components/RenderHabits";
import {
    fetchHabitData,
    extractCategoriesAndRestructureHabits,
    getTodayDate,
    getWeekStartDate,
    getWeekEndDate,
    extractHabitNames,
    processHabitStatus,
} from "../utilities/utilitiesMethods";
import { format } from "date-fns";

export default function Home() {
    const [state, dispatch] = useContext(Context);
    const classes = useStyles();
    const [isNextDisable] = useState(false);

    useEffect(() => {
        async function hydrateStoreState() {
            dispatch({ type: "SET_IS_LOADING", payload: true });
            const habitObj = await fetchHabitData();

            dispatch({ type: "SET_HABIT", payload: habitObj });
            const [habitRestructure, categories] =
                await extractCategoriesAndRestructureHabits(habitObj);

            dispatch({
                type: "SET_HABIT_RESTRUCTURE",
                payload: habitRestructure,
            });
            dispatch({ type: "SET_CATEGORY", payload: categories });

            const habitNameList = extractHabitNames(habitObj);
            dispatch({ type: "SET_HABIT_NAME_LIST", payload: habitNameList });

            const todayDate = await getTodayDate();
            dispatch({ type: "SET_CURRENT_DATE", payload: todayDate });

            const weekStartDate = await getWeekStartDate(new Date());
            const weekEndDate = await getWeekEndDate(new Date());

            dispatch({ type: "SET_WEEK_START_DATE", payload: weekStartDate });
            dispatch({ type: "SET_WEEK_END_DATE", payload: weekEndDate });

            const habitStatus = await processHabitStatus(
                habitObj,
                weekStartDate
            );
            dispatch({ type: "SET_HABIT_STATUS", payload: habitStatus });

            dispatch({ type: "SET_IS_LOADING", payload: false });
        }

        hydrateStoreState();
    }, [dispatch]);

    function setHabitView(viewType) {
        dispatch({ type: "SET_HABIT_VIEW", payload: viewType });
    }

    return (
        <React.Fragment>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Typography
                        variant="h3"
                        align="center"
                        color="textSecondary"
                        className={classes.title}
                    >
                        HABITS
                    </Typography>
                    <Typography
                        className={classes.lastUpdate}
                        align="center"
                        color="textSecondary"
                    >
                        {`Last updated: ${format(state.currentDate, "PPp")}`}
                    </Typography>
                    <Grid container justify="center">
                        <Grid item>
                            <Button
                                style={{ margin: "5px" }}
                                disabled={isNextDisable}
                                className={
                                    state.habitView === "daily"
                                        ? classes.activeButton
                                        : classes.disabledButton
                                }
                                onClick={() => setHabitView("daily")}
                            >
                                Daily
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                style={{ margin: "5px" }}
                                disabled={isNextDisable}
                                className={
                                    state.habitView === "weekly"
                                        ? classes.activeButton
                                        : classes.disabledButton
                                }
                                onClick={() => setHabitView("weekly")}
                            >
                                Weekly
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        {state.isLoading ? (
                            <div style={{ fontSize: "4vw" }}>
                                <CircularProgress style={{ color: "white" }} />
                            </div>
                        ) : (
                            <RenderHabits />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const useStyles = makeStyles({
    table: {
        minWidth: 200,
        maxWidth: 600,
        paddingLeft: 10,
    },
    root: {
        marginBottom: "8rem",
    },
    checkbox: {
        color: green[400],
        "&$checked": {
            color: green[600],
        },
    },
    title: {
        fontWeight: "bold",
        marginTop: "4rem",
        marginBottom: "2rem",
    },
    lastUpdate: {
        marginBottom: "1rem",
    },

    activeButton: {
        background: "rgba(196, 196, 196, 0.19)",
        color: "#FFFFFF",
    },
    disabledButton: {
        background: "rgba(196, 196, 196, 0.04)",
        color: "#8F8E8E",
    },

    spinIt: {
        width: 10,
        height: 10,
    },
});
