import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Fab, TextField, Typography } from "@material-ui/core";
import useStyles from "./useStyles";
import { FormContext } from "../../../Store/habitFormContext";
import { useContext, useState, useEffect } from "react";

function NumberCounter({ type }) {
    const [habitForm, dispatch] = useContext(FormContext);
    const classes = useStyles();
    const [isNegCountDisabled, setCountDisabled] = useState(false);
    const [isPosCountDisabled, setPosCount] = useState(false);

    useEffect(() => {
        if (type === "daily") {
            setCountDisabled(isCountZero(habitForm.dailyGoal));
            setPosCount(isCountValid(habitForm.dailyGoal, 10));
        }
    }, [habitForm.dailyGoal, type]);

    useEffect(() => {
        if (type === "weekly") {
            setCountDisabled(isCountZero(habitForm.weeklyGoal));
            setPosCount(isCountValid(habitForm.weeklyGoal, 7));
        }
    }, [habitForm.weeklyGoal, type]);

    function handleCounter(action) {
        if (type === "daily") {
            if (action === "-") {
                dispatch({
                    type: "SET_DAILY_GOAL",
                    payload: habitForm.dailyGoal - 1,
                });
            } else {
                dispatch({
                    type: "SET_DAILY_GOAL",
                    payload: habitForm.dailyGoal + 1,
                });
            }
            setCountDisabled(isCountZero(habitForm.dailyGoal));
        }
        if (type === "weekly") {
            if (action === "-") {
                dispatch({
                    type: "SET_WEEKLY_GOAL",
                    payload: habitForm.weeklyGoal - 1,
                });
            } else {
                dispatch({
                    type: "SET_WEEKLY_GOAL",
                    payload: habitForm.weeklyGoal + 1,
                });
            }
            setCountDisabled(isCountZero(habitForm.weeklyGoal));
        }
    }

    function isCountZero(value) {
        if (value <= 1) {
            return true;
        } else {
            return false;
        }
    }
    function isCountValid(value, max) {
        if (value >= max) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className={classes.count}>
            <Fab
                size="small"
                color="secondary"
                onClick={() => handleCounter("-")}
                disabled={isNegCountDisabled}
            >
                <RemoveIcon />
            </Fab>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.countText}
            >
                {type === "daily" ? habitForm.dailyGoal : habitForm.weeklyGoal}
            </Typography>
            <Fab
                size="small"
                color="secondary"
                onClick={() => handleCounter("+")}
                disabled={isPosCountDisabled}
            >
                <AddIcon />
            </Fab>
        </div>
    );
}

export default NumberCounter;
