import { makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState, useEffect, Fragment } from "react";
import { format, eachDayOfInterval } from "date-fns";
import { Context } from "../Store/habitStore";
import HabitCard from "./HabitCard/HabitCard";
import DailyHabitCard from "./DailyHabitCard/DailyHabitCard";

const RenderHabits = () => {
    const [state, dispatch] = useContext(Context);
    const classes = useStyles();
    const [isHabitEmpty, setIsHabitEmpty] = useState(false);

    useEffect(() => {
        if (JSON.stringify(state.habitRestructure) === "{}") {
            setIsHabitEmpty(true);
        }
    }, [state.habitRestructure]);

    useEffect(() => {
        const fetchCurrentWeekDates = () => {
            const result = eachDayOfInterval({
                start: state.weekStartDate,
                end: state.weekEndDate,
            });

            const formatDates = result.map((date) => {
                console.log("week date:", date);
                let intDate = {
                    justDate: format(date, "dd"),
                    fullDate: date,
                    formatDate: format(date, "ddMMyyyy"),
                    day: format(date, "EEE"),
                };
                return intDate;
            });

            dispatch({ type: "SET_CURRENT_WEEK_DATES", payload: formatDates });
        };

        fetchCurrentWeekDates();
    }, [state.weekStartDate, state.weekEndDate, dispatch]);

    return (
        <div className={classes.root}>
            {state.habitRestructure && !isHabitEmpty ? (
                <>
                    {state.habits ? (
                        state.habits.map((habit, index) => {
                            return (
                                <Fragment key={`${habit.habitName}-${index}`}>
                                    {state.habitView === "daily" ? (
                                        <DailyHabitCard habit={habit} />
                                    ) : (
                                        <HabitCard habit={habit} />
                                    )}
                                </Fragment>
                            );
                        })
                    ) : (
                        <div>ss</div>
                    )}
                </>
            ) : (
                <Typography
                    align="center"
                    className={classes.noHabit}
                    color="primary"
                >
                    {`No habits to display. `}
                </Typography>
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    noHabit: {
        marginTop: "5rem",
    },
    paper: {
        padding: "5px",
        textAlign: "center",
        color: "black",
    },
    table: {
        minWidth: 350,
    },
}));
export default RenderHabits;
