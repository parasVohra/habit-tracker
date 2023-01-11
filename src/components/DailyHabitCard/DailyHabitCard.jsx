import React, { useContext, useEffect, useState } from "react";
import useStyles from "./useStyles";
import { Grid, Container, Paper, Typography } from "@material-ui/core";
import { Context } from "../../Store/habitStore";
import { makeStyles } from "@material-ui/core/styles";
import { getDay, format } from "date-fns";
import { calculateCurrentStreak } from "../../utilities/calculateStreak";
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
import { compose } from "ramda";

function DailyHabitCard({ habit }) {
    const classes = useStyles();
    const [state, dispatch] = useContext(Context);
    const todayDayIndex = getDay(new Date());

    const [streak, setStreak] = useState({
        currentStreak: 0,
        longestStreak: 0,
        previousDate: null,
    });
    const dateColor = {
        color: habit.color,
    };

    useEffect(() => {
        if (state.habits) {
            setStreak(calculateCurrentStreak(habit.habitTrack));
        }
    }, [habit.habitTrack, state.habits]);

    const dateClasses = (dateColor) =>
        makeStyles(() => ({
            selected: {
                alignItems: "center",
                minWidth: "20rem",
                maxWidth: "50rem",
                minHeight: "4rem",
                margin: "auto",
                // backgroundColor: "#303038",
                borderRadius: "10px",
                padding: "0.5rem",
                borderStyle: "solid",
                borderWidth: "1px",
                //backgroundColor: dateColor.color,
                background: `linear-gradient(to right, ${
                    dateColor.color
                } 0%,  ${dateColor.color}  ${
                    state.habitStatus[habit.habitName][todayDayIndex]
                        .percentageDone
                }%, rgba(0,0,0,0) ${
                    state.habitStatus[habit.habitName][todayDayIndex]
                        .percentageDone
                }%,rgba(0,0,0,0) 100%)`,
                borderColor: dateColor.color,
                cursor: "pointer",
                boxShadow: "1px 1px 10px 0px #000000ab",
            },
            unSelected: {
                alignItems: "center",
                minWidth: "20rem",
                maxWidth: "50rem",
                minHeight: "4rem",
                margin: "auto",
                backgroundColor: "#303038",
                borderRadius: "10px",
                borderColor: dateColor.color,
                borderStyle: "solid",
                borderWidth: "1px",
                padding: "0.5rem",
                cursor: "pointer",
            },
        }));

    const dateC = dateClasses(dateColor)();

    function handleClick(habit, index) {
        // getting status of clicked habit
        const clickedHabitStatus =
            state.habitStatus[`${habit.habitName}`][index];
        // get daily goal of habit
        const dailyGoalOfCurrentHabit = habit.dailyGoal;

        // initializing track obj
        const trackObj = {
            id: habit._id,
            date: format(state.currentDate, "ddMMyyyy"),
            day: format(state.currentDate, "EEE"),
            data: "",
            isFullyComplete: false,
            isPartialComplete: false,
            done: 0,
        };

        if (isHabitFullyDone(clickedHabitStatus, habit)) {
            const resetStatusObj = {
                isFullyComplete: false,
                isPartialComplete: false,
                done: 0,
                percentageDone: 0,
            };

            // mutate the habit status object
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
        // if habit does not meet daily goal
        // if the habit daily goal meet after updating clicking the habit -> update update Partial and fully complete status obj
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
        return (
            <Container
                className={classes.root}
                onClick={() => handleClick(habit, index)}
            >
                <Grid
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={12}
                    elevation={6}
                    className={dateC.selected}
                    component={Paper}
                    item
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
                                className={classes.textStreak}
                                variant="h5"
                            >
                                {streak.currentStreak} 🔥
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container direction="row">
                        <Typography
                            align="left"
                            variant="subtitle2"
                            className={classes.doneText}
                        >
                            {`DONE ${
                                state.habitStatus[habit.habitName][index].done
                            } / ${habit.dailyGoal} `}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    function UnSelectedDate(index) {
        return (
            <Container
                className={classes.root}
                onClick={() => handleClick(habit, index)}
            >
                <Grid
                    container
                    direction="column"
                    xs={12}
                    sm={12}
                    md={12}
                    elevation={6}
                    className={dateC.unSelected}
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
                                className={classes.textStreak}
                                variant="h5"
                            >
                                {streak.currentStreak} 🔥
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container direction="row">
                        <Typography
                            align="left"
                            variant="subtitle2"
                            className={classes.doneText}
                        >
                            DONE: 0 / 2
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }
    return state.habitStatus[habit.habitName][todayDayIndex]
        ? SelectedDate(todayDayIndex)
        : UnSelectedDate(todayDayIndex);
}

export default DailyHabitCard;
