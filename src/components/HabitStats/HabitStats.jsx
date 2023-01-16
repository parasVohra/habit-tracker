import React, { Fragment, useContext } from "react";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import BackButton from "../FormComponents/BackButton/BackButton";
import { Context } from "../../Store/habitStore";
import { format, sub } from "date-fns/esm";
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
    const currentDate = state.currentDate;
    const yearlyStatData = yearlyStat(currentStatHabit.habitTrack);
    const chartdata = {
        label: "Monthly Count",
        labels: yearlyStatData.x,
        datasets: [
            {
                data: yearlyStatData.y,
                backgroundColor: currentStatHabit.color,
                borderColor: currentStatHabit.color,
            },
        ],
    };
    console.log(chartdata);

    const dateColor = (dateColor) =>
        makeStyles(() => ({
            highlight: {
                backgroundColor: dateColor.color,
                borderColor: dateColor.color,
            },
        }));

    const habitColor = dateColor(currentStatHabit)();
    const monthDataStructure = renderCalendar(
        currentDate,
        currentStatHabit.habitTrack
    );
    console.log(monthDataStructure);
    return (
        <Fragment>
            <BackButton />
            <div className={classes.title}>
                <Typography align="center" color="TextSecondary" variant="h3">
                    {currentStatHabit.habitName}
                </Typography>
            </div>
            <div style={{ width: 500, margin: " auto" }}>
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
                            <Typography align="left" variant="h5">
                                {format(currentDate, "LLLL")}
                            </Typography>
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
