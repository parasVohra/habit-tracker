import React, { Fragment, useContext } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { getDay, format } from "date-fns";
import HabitService from "../../services/habitService";
import {
    updateLocalHabitStatus,
    updateStatusObjToFullyComplete,
    updateStatusObjToPartialComplete,
    updateTrackObjToFullyComplete,
    updateTrackObjToPartialComplete,
    isHabitDailyGoalMetAfterClick,
    isHabitFullyDone,
} from "../../utilities/updateHabitMethods";

function HabitCard(habits) {
    const classes = useStyles();
    const habit = habits.habit;
    const [state, dispatch] = useContext(Context);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayDayIndex = getDay(state.currentDate);
    console.log("weelky today index", todayDayIndex);
    const dateColor = {
        color: habit.color,
    };
    console.log("state", state);

    const isDateInFuture = (todayDayIndex, dateIndex) => {
        return dateIndex <= todayDayIndex ? true : false;
    };

    const dateClasses = (dateColor, index) =>
        makeStyles(() => ({
            selected: {
                marginTop: "0.2rem",
                height: "2rem",
                width: "2rem",
                textAlign: "center",
                lineHeight: "2rem",
                color: "#ffffff",
                border: "2px solid",
                borderRadius: "2rem",
                //backgroundColor: dateColor.color,
                background: `linear-gradient(to right, ${
                    dateColor.color
                } 0%,  ${dateColor.color}  ${
                    state.habitStatus[habit.habitName][index].percentageDone
                }%, rgba(0,0,0,0) ${
                    state.habitStatus[habit.habitName][index].percentageDone
                }%,rgba(0,0,0,0) 100%)`,
                borderColor: dateColor.color,
                cursor: "pointer",
                boxShadow: "1px 1px 4px 0px #000000ab",
            },
            unSelected: {
                marginTop: "0.2rem",
                height: "2rem",
                width: "2rem",
                textAlign: "center",
                lineHeight: "2rem",
                color: dateColor.color,
                border: "2px solid",
                borderRadius: "2rem",
                borderColor: dateColor.color,
                cursor: "pointer",
            },
            noPointer: {
                pointerEvents: "none",
            },
            pointer: {
                pointerEvents: "all",
            },
        }));

    function handleClick(habit, index) {
        const clickedHabitStatus =
            state.habitStatus[`${habit.habitName}`][index];
        const dailyGoalOfCurrentHabit = habit.dailyGoal;
        const trackObj = {
            id: habit._id,
            date: state.currentWeekDates[index].formatDate,
            day: state.currentWeekDates[index].day,
            data: "",
            isFullyComplete: false,
            isPartialComplete: false,
            done: 0,
        };
        console.log(clickedHabitStatus);
        if (isHabitFullyDone(clickedHabitStatus, habit)) {
            const resetStatusObj = {
                isFullyComplete: false,
                isPartialComplete: false,
                done: 0,
                percentageDone: 0,
            };
            console.log("before status", state.habitStatus);
            updateLocalHabitStatus({
                habit,
                habitStatus: state.habitStatus,
                updatedStatusObj: resetStatusObj,
                dispatch,
                index,
            });
            updateStatus(trackObj);
            return;
        }
        if (
            !isHabitDailyGoalMetAfterClick(
                dailyGoalOfCurrentHabit,
                clickedHabitStatus
            )
        ) {
            updateLocalHabitStatus({
                habit,
                habitStatus: state.habitStatus,
                updatedStatusObj: updateStatusObjToPartialComplete({
                    currentGoal: clickedHabitStatus.done,
                    dailyGoal: dailyGoalOfCurrentHabit,
                }),
                dispatch,
                index,
            });

            updateStatus(
                updateTrackObjToPartialComplete({
                    trackObj,
                    currentGoalCount: clickedHabitStatus.done,
                })
            );
            return;
        }
        updateLocalHabitStatus({
            habit,
            habitStatus: state.habitStatus,
            updatedStatusObj: updateStatusObjToFullyComplete({
                dailyGoal: habit.dailyGoal,
            }),
            dispatch,
            index,
        });

        updateStatus(
            updateTrackObjToFullyComplete({
                trackObj,
                dailyGoal: habit.dailyGoal,
            })
        );
        console.log(clickedHabitStatus);
    }

    const updateStatus = async (data) => {
        try {
            let response = await HabitService.updateHabitStatus(data);

            if (response.status === 201) {
                //alert("Habit Status updated");
            }
        } catch {
            alert("Something went wrong, Please try again");
        }
    };

    function SelectedDate(index) {
        const dateC = dateClasses(dateColor, index)();
        const isClickable = isDateInFuture(todayDayIndex, index);
        const pointerClass = isClickable ? dateC.pointer : dateC.noPointer;

        return (
            <div
                id={`${habit.habitName},${index}`}
                onClick={(e) => handleClick(habit, index)}
                className={`${dateC.selected} ${pointerClass}`}
            >
                {state.currentWeekDates[index].justDate}
            </div>
        );
    }

    function UnSelectedDate(index) {
        const dateC = dateClasses(dateColor, index)();
        const isClickable = isDateInFuture(todayDayIndex, index);
        const pointerClass = isClickable ? dateC.pointer : dateC.noPointer;

        return (
            <div
                id={`${habit.habitName},${index}`}
                onClick={(e) => handleClick(habit, index)}
                className={`${dateC.unSelected} ${pointerClass}`}
            >
                {state.currentWeekDates[index].justDate}
            </div>
        );
    }
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
            >
                <Grid item container className={classes.habitTitleBox}>
                    <Grid item xs={6}>
                        <Typography align="left" variant="h5">
                            {habit.habitName}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            align="right"
                            className={classes.textGrey}
                            variant="subtitle1"
                        >
                            {habit.weeklyGoal.value} times a week
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction="row">
                    {weekDays.map((day, index) => {
                        return (
                            <Fragment key={index}>
                                <Grid item className={classes.titleText}>
                                    {todayDayIndex === index ? (
                                        <Typography
                                            align="center"
                                            variant="h6"
                                            className={classes.textWhite}
                                        >{`${day}`}</Typography>
                                    ) : (
                                        <Typography
                                            align="center"
                                            variant="h6"
                                            className={classes.textGrey}
                                        >{`${day}`}</Typography>
                                    )}

                                    {state.habitStatus[habit.habitName][index]
                                        ? SelectedDate(index)
                                        : UnSelectedDate(index)}
                                </Grid>
                            </Fragment>
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    );
}

export default HabitCard;
