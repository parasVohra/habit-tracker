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
        const startIndex = compose(firstDayIndexOfMonth, getStartOfMonth);
        const monthStart = 1;
        const monthEnd = getEndOfMonth(state.currentDate);
        const currentYear = getCurrentYear(state.currentDate);
        const Month = getCurrentMonth(state.currentDate)
            .toString()
            .padStart(2, "0");
        console.log(monthEnd);
        function makeMonth() {
            let month = [];
            let week = [];
            let dayCount = 1;
            let firstWeek = true;
            for (let i = monthStart; i <= monthEnd; i++) {
                const day = {
                    date: "",
                    fullDate: "",
                    color: "blue",
                    isDone: false,
                };
                if (firstWeek) {
                    dayCount = startIndex(state.currentDate) + 1;
                    firstWeek = false;
                }
                if (dayCount > 7) {
                    dayCount = 1;
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
                week[dayCount - 1] = day;
                dayCount++;
            }
            return month;
        }

        return makeMonth();
        // get month start day

        // get month end

        // start 6 row of the month

        // if end of month then return

        // if end of week then jump to next row break
        //
    }
    const monthDataStructure = renderCalender();
    return (
        <div>
            <BackButton />
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Sun</TableCell>
                        <TableCell>Mon</TableCell>
                        <TableCell>Tue</TableCell>
                        <TableCell>Wed</TableCell>
                        <TableCell>Thu</TableCell>
                        <TableCell>Fri</TableCell>
                        <TableCell>Sat</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {monthDataStructure.map((week, index) => {
                        return (
                            <TableRow key={index}>
                                {week.map((day, index) => {
                                    return <TableCell>{day.date}</TableCell>;
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TableContainer>
        </div>
    );
}

export default HabitStats;
