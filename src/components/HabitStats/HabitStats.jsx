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

function HabitStats() {
    const classes = useStyles();
    const [state, dispatch] = useContext(Context);
    const monthRows = [0, 1, 2, 3, 4, 5];
    function renderCalender() {
        console.log(getCurrentYear(state.currentDate));
        console.log(getCurrentMonth(state.currentDate));
        console.log(getStartOfMonth(state.currentDate));
        console.log(firstDayIndexOfMonth(getStartOfMonth(state.currentDate)));
        const startIndex = compose(firstDayIndexOfMonth, getStartOfMonth);
        console.log(monthStart(state.currentDate));
        console.log(getEndOfMonth(state.currentDate));
        const monthStart = 1;
        const monthEnd = 31;

        const currentYear = 2023;
        const Month = getCurrentMonth(state.currentDate)
            .toString()
            .padStart(2, "0");

        function makeMonth() {
            const month = [];
            let week = [];
            let dayCount = 1;
            let firstWeek = true;
            for (let i = 1; i <= monthEnd; i++) {
                const day = {
                    date: "",
                    fullDate: "",
                    color: "blue",
                    isDone: false,
                };
                if (firstWeek) {
                    dayCount = startIndex + 1;
                    firstWeek = false;
                }
                if (dayCount > 7) {
                    dayCount = 1;
                    month.push(week);
                    week = [];
                }
                if (i === 31) {
                    month.push(week);
                }
                day.date = `${i}`;
                day.fullDate = `${i
                    .toString()
                    .padStart(2, "0")}${Month}${currentYear}`;
                week[dayCount - 1] = day;
                dayCount++;
            }
            return month;
        }

        makeMonth();

        // get month start day

        // get month end

        // start 6 row of the month

        // if end of month then return

        // if end of week then jump to next row break
        //
    }
    renderCalender();
    return (
        <div>
            <BackButton />
            {monthRows.map(() => {
                return (
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
                            item
                        ></Grid>
                    </Container>
                );
            })}
        </div>
    );
}

export default HabitStats;
