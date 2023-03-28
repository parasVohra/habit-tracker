import React, { Fragment, useContext, useEffect } from "react";
import { Grid, Container, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import BackButton from "../FormComponents/BackButton/BackButton";
import { Context } from "../../Store/habitStore";
import { format, addMonths } from "date-fns/esm";
import {
    renderCalendar,
    yearlyStat,
} from "../../utilities/calenderUtilMethods";
import LineChart from "../LineChart/LineChart";

function HabitStats() {
    const classes = useStyles();
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [state, dispatch] = useContext(Context);
    const currentStatHabit = state.currentStatHabit;
    const yearlyStatData = yearlyStat(
        currentStatHabit.habitTrack,
        state.statCurrentDate
    );
    const chartdata = {
        label: "Monthly Count",
        labels: yearlyStatData.x,
        datasets: [
            {
                data: yearlyStatData.y,
                backgroundColor: currentStatHabit.color,
                borderColor: currentStatHabit.color,
                //label: currentStatHabit.name,
            },
        ],
    };
    useEffect(() => {}, [state.statCurrentDate]);

    const dateColor = (dateColor) =>
        makeStyles(() => ({
            highlight: {
                backgroundColor: dateColor.color,
                borderColor: dateColor.color,
            },
        }));

    const habitColor = dateColor(currentStatHabit)();
    const monthDataStructure = renderCalendar(
        state.statCurrentDate,
        currentStatHabit.habitTrack
    );

    function changeMonth(opt) {
        let oprater = 1;
        if (opt === "sub") {
            oprater = -1;
        }
        const changeMonthDate = addMonths(state.statCurrentDate, oprater);
        dispatch({ type: "SET_STAT_CURRENT_DATE", payload: changeMonthDate });
        return changeMonthDate;
    }
    console.log(monthDataStructure);
    return (
        <Fragment>
            <BackButton />
            <div className={classes.title}>
                <Typography align="center" color="TextSecondary" variant="h3">
                    {currentStatHabit.habitName}
                </Typography>
            </div>
            <div style={{ minWidth: 350, maxWidth: 500, margin: " auto" }}>
                <LineChart chartData={chartdata} />
            </div>
            <Container className={classes.root}>
                <Grid
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={12}
                    elevation={6}
                    className={classes.habitContainer}
                    component={Paper}
                >
                    <Grid item container className={classes.habitTitleBox}>
                        <Grid item xs={12}>
                            <Grid item container xs={12}>
                                <Grid item xs={4} align="left">
                                    <Button onClick={() => changeMonth("sub")}>
                                        Prev
                                    </Button>
                                </Grid>
                                <Grid item xs={4} align="center">
                                    <Typography align="left" variant="h4" item>
                                        {format(state.statCurrentDate, "LLLL")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} align="right">
                                    <Button onClick={() => changeMonth("add")}>
                                        Next
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {weekDays.map((day, index) => {
                            return (
                                <Grid item className={classes.titleText}>
                                    <Typography
                                        align="center"
                                        variant="h6"
                                        className={classes.textGrey}
                                    >
                                        {day}
                                    </Typography>
                                </Grid>
                            );
                        })}
                    </Grid>
                    {monthDataStructure.map((week, index) => {
                        return (
                            <Grid item container key={index} direction="row">
                                {week.map((day, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Grid
                                                item
                                                className={classes.titleText}
                                            >
                                                {day !== null ? (
                                                    day.isDone ? (
                                                        <Typography
                                                            align="center"
                                                            variant="h6"
                                                            className={`${classes.selected}
                                    ${habitColor.highlight}`}
                                                        >{`${day.date}`}</Typography>
                                                    ) : (
                                                        <Typography
                                                            align="center"
                                                            variant="h6"
                                                            className={`${classes.unSelected} ${classes.textGrey}`}
                                                        >{`${day.date}`}</Typography>
                                                    )
                                                ) : (
                                                    <Typography></Typography>
                                                )}
                                            </Grid>
                                        </Fragment>
                                    );
                                })}
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Fragment>
    );
}

export default HabitStats;
