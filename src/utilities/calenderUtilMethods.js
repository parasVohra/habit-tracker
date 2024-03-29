/**
 *  Utilities methods
 */

//Dependencies
import { format } from "date-fns";
import {
    firstDayIndexOfMonth,
    getCurrentYear,
    getEndOfMonth,
    getStartOfMonth,
} from "./utilitiesMethods";
import { compose, reverse } from "ramda";

const filterCurrentMonthDate = (habitTrack, currentDate) => {
    return habitTrack.filter(
        (track) => format(currentDate, "MMyyyy") === track.date.substring(2)
    );
};

export function yearlyStat(habitTrack, currentDate) {
    const copyTrack = reverse(habitTrack);
    const stat = copyTrack.reduce(
        (acc, val) => {
            const statyear = Number(val.date.substring(4, 9));
            const statmonth = Number(val.date.substring(2, 4)) - 1;
            const statdate = Number(val.date.substring(0, 2));
            const shortYear = format(
                new Date(statyear, statmonth, statdate),
                "y"
            );
            const statmonthName = format(
                new Date(statyear, statmonth, statdate),
                "MMM"
            );
            const statMonthYear = `${statmonthName}-${shortYear}`;
            if (acc.x.length === 0) {
                acc.x.push(statMonthYear);
                acc.y[acc.x.length - 1] = 0;
            }
            if (acc.x[acc.x.length - 1] === statMonthYear) {
                acc.y[acc.x.length - 1]++;
            } else {
                acc.x.push(statMonthYear);
                acc.y[acc.x.length - 1] = 1;
            }
            return acc;
        },
        {
            x: [],
            y: [],
        }
    );
    return stat;
}

function makeMonth(currentDate, isHabitDone) {
    let month = [];
    let week = [];
    let dayCount = 0;
    const monthStart = 1;
    const Month = format(currentDate, "MM");
    const startIndex = compose(firstDayIndexOfMonth, getStartOfMonth);
    let firstWeek = true;
    for (let i = monthStart; i <= getEndOfMonth(currentDate); i++) {
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
        if (i === getEndOfMonth(currentDate)) {
            month.push(week);
        }
        day.date = `${i}`;
        day.fullDate = `${i
            .toString()
            .padStart(2, "0")}${Month}${getCurrentYear(currentDate)}`;
        week[dayCount] = day;
        day.isDone = isHabitDone(
            `${i.toString().padStart(2, "0")}${Month}${format(
                currentDate,
                "yyyy"
            )}`
        );
        dayCount++;
    }
    return month;
}

export function renderCalendar(currentDate, habitTrack) {
    function isHabitDone(fullDate) {
        for (let d of filterCurrentMonthDate(habitTrack, currentDate)) {
            if (fullDate === d.date) {
                return true;
            }
        }
        return false;
    }
    return makeMonth(currentDate, isHabitDone);
}
