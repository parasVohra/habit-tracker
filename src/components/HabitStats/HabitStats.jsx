import React, { Fragment, useContext } from "react";
import {
    Grid,
    Container,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "./useStyles";
import {
    firstDayIndexOfMonth,
    getCurrentMonth,
    getCurrentYear,
    getEndOfMonth,
    getStartOfMonth,
    getTodayDate,
} from "../../utilities/utilitiesMethods";
import BackButton from "../FormComponents/BackButton/BackButton";
import { Context } from "../../Store/habitStore";
import { compose } from "ramda";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns/esm";

function HabitStats() {
    const classes = useStyles();
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [state, dispatch] = useContext(Context);

    const currentStatHabit = state.currentStatHabit;
    const currentDate = state.currentDate;
    const currentMonthName = format(currentDate, "LLLL");
    const dateColor = (dateColor) =>
        makeStyles(() => ({
            highlight: {
                backgroundColor: dateColor.color,
                borderColor: dateColor.color,
            },
        }));
    console.log(currentStatHabit);
    const currentMonthYear = format(currentDate, "MMyyyy");
    const habitColor = dateColor(currentStatHabit)();
    function renderCalender() {
        const startIndex = compose(firstDayIndexOfMonth, getStartOfMonth);
        const monthStart = 1;
        const monthEnd = getEndOfMonth(currentDate);
        const currentYear = getCurrentYear(currentDate);
        const Month = format(currentDate, "MM");
        console.log(monthEnd);
        function filterCurrentMonthDate(habitTrack) {
            return habitTrack.filter(
                (track) => currentMonthYear === track.date.substring(2)
            );
        }
        const currentMonthDates = filterCurrentMonthDate(
            currentStatHabit.habitTrack
        );
        function isHabitDone(fullDate) {
            for (let d of currentMonthDates) {
                if (fullDate === d.date) {
                    return true;
                }
            }
        }
        function makeMonth() {
            let month = [];
            let week = [];
            let dayCount = 0;
            let firstWeek = true;
            for (let i = monthStart; i <= monthEnd; i++) {
                const day = {
                    date: "",
                    fullDate: "",
                    color: "blue",
                    isDone: false,
                };
                if (firstWeek) {
                    for (let j = 0; j < startIndex(currentDate); j++) {
                        week[j] = null;
                    }
                    dayCount = startIndex(currentDate);
                    firstWeek = false;
                }
                if (dayCount > 6) {
                    firstWeek = false;
                    dayCount = 0;
                    month.push(week);
                    week = [];
                }
                if (i === monthEnd) {
                    month.push(week);
                }
                day.date = `${i}`;
                day.fullDate = `${i
                    .toString()
                    .padStart(2, "0")}${Month}${currentYear}`;
                week[dayCount] = day;
                day.isDone = isHabitDone(day.fullDate);
                dayCount++;
            }
            return month;
        }

        return makeMonth();
    }
    const monthDataStructure = renderCalender();

    console.log(monthDataStructure);

    return (
        <Fragment>
            <BackButton />
            <div className={classes.title}>
                <Typography align="center" color="TextSecondary" variant="h3">
                    {currentStatHabit.habitName}
                </Typography>
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
                                {currentMonthName}
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
                                                {day.isDone ? (
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
