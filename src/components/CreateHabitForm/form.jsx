import {
    Button,
    Card,
    CardContent,
    CardHeader,
    makeStyles,
    TextField,
    MenuItem,
    Grid,
    Container,
    Paper,
    Fab,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "./useStyles";
import * as yup from "yup";
import habitService from "../../services/habitService";
import Modal from "../modal";
import { useHistory } from "react-router-dom";
import FormInputLabel from "../FormComponents/InputLabel/InputLabel";
import BackButton from "../FormComponents/BackButton/BackButton";
import NumberCounter from "../FormComponents/NumberCounter/NumberCounter";
import { FormContext } from "../../Store/habitFormContext";

const CreateHabitForm = () => {
    const [habit, setHabit] = useState(null);
    const [habitForm, dispatch] = useContext(FormContext);
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();
    const [msg, setMsg] = useState(null);
    const history = useHistory();
    const [habitSaved, setHabitSaved] = useState(false);
    const [activeCategoryIndex, setCategoryIndex] = useState(0);
    const [activeColorIndex, setColorIndex] = useState(0);
    const [weeklyGoalInputType, setWeeklyGoalInputType] = useState(
        habitForm.weeklyInputType
    );
    const [unityType, setUnitType] = useState(habitForm.habitUnitType);
    const [trackType, setTrackType] = useState(habitForm.inputType);

    const [showModal, setModal] = useState(false);

    useEffect(() => {
        if (habitSaved && !showModal) {
            history.push("/");
        }
    }, [habitSaved, history, showModal]);

    const handleCategoryClick = (index, value) => {
        setCategoryIndex(index);
        dispatch({ type: "SET_CATEGORY", payload: value });
    };
    const handleColorClick = (index, value) => {
        setColorIndex(index);
        dispatch({ type: "SET_COLOR", payload: value });
    };

    const handleWeeklyInput = (type) => {
        setWeeklyGoalInputType(type);
        dispatch({ type: "SET_WEEKLY_INPUT_TYPE", payload: type });
    };

    const handleUnitInput = (type) => {
        setUnitType(type);
        dispatch({ type: "SET_HABIT_UNIT_TYPE", payload: type });
    };
    const handleTrackInput = (type) => {
        setTrackType(type);
        dispatch({ type: "SET_INPUT_TYPE", payload: type });
    };

    const toggleModal = () => {
        setModal(!showModal);
        setHabitSaved(true);
    };

    return (
        <Container>
            <BackButton />
            <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                className={classes.title}
            >
                CREATE A NEW HABIT
            </Typography>
            <Formik
                initialValues={{
                    category: habitForm.category,
                    habitName: habitForm.habitName,
                    dailyGoal: habitForm.dailyGoal,
                    weeklyGoal: habitForm.weeklyGoal,
                    habitUnit: habitForm.habitUnit,
                    inputType: habitForm.inputType,
                    color: habitForm.color,
                }}
                onSubmit={async (data) => {
                    try {
                        //setSubmitting(true);
                        dispatch({
                            type: "SET_HABIT_NAME",
                            payload: data.habitName,
                        });
                        dispatch({
                            type: "SET_HABIT_UNIT",
                            payload: data.habitUnit,
                        });

                        console.log("form data", data);
                        console.log(habitForm);
                        // setHabit(data);
                        // const res = await saveHabit(data);
                        // if (res) {
                        //     setMsg(res.msg);
                        //     toggleModal();
                        // }
                    } catch (err) {
                        console.log(err);
                        if (err.response.status === 400) {
                            console.log(err.response);

                            setMsg(err.response.data.error);
                            toggleModal();
                        }
                    }
                }}
                validationSchema={validationSchema}
            >
                <Form className={classes.form}>
                    <Grid className={classes.pos}>
                        <FormInputLabel label="HABIT NAME" />
                        <MyTextField
                            name="habitName"
                            type="text"
                            placeholder="e.g. Cold Shower, Read Book"
                        />
                    </Grid>
                    <Grid className={classes.pos}>
                        <FormInputLabel label="CATEGORY" />
                        {categories.map((category, index) => {
                            return (
                                <Button
                                    size="large"
                                    key={index}
                                    className={
                                        activeCategoryIndex === index
                                            ? `${classes.activeButton} ${classes.buttonMargin}`
                                            : `${classes.disabledButton} ${classes.buttonMargin}`
                                    }
                                    onClick={() =>
                                        handleCategoryClick(
                                            index,
                                            category.value
                                        )
                                    }
                                >
                                    {category.label}
                                </Button>
                            );
                        })}
                    </Grid>
                    <Grid className={classes.pos}>
                        <FormInputLabel label="HOW MANY TIMES PER DAY?" />
                        <NumberCounter type="daily" />
                    </Grid>
                    <Grid className={`${classes.pos}`}>
                        <FormInputLabel label="HOW MANY DAYS PER WEEK?" />
                        <Grid className={`${classes.directionRow}`}>
                            <Button
                                size="large"
                                className={
                                    weeklyGoalInputType === "daily"
                                        ? `${classes.activeButton} ${classes.buttonMargin}`
                                        : `${classes.disabledButton} ${classes.buttonMargin}`
                                }
                                onClick={() => handleWeeklyInput("daily")}
                            >
                                DAILY
                            </Button>
                            <Button
                                size="large"
                                className={
                                    weeklyGoalInputType === "custom"
                                        ? `${classes.activeButton} ${classes.buttonMargin}`
                                        : `${classes.disabledButton} ${classes.buttonMargin}`
                                }
                                onClick={() => handleWeeklyInput("custom")}
                            >
                                CUSTOM
                            </Button>
                            {weeklyGoalInputType === "custom" ? (
                                <NumberCounter type="weekly" />
                            ) : (
                                <></>
                            )}
                        </Grid>
                    </Grid>
                    <Grid className={classes.pos}>
                        <Grid item>
                            <FormInputLabel label="COLOR" />
                        </Grid>
                        <Grid container xs={12}>
                            {colorCode.map((color, index) => {
                                return (
                                    <Grid xs={2} className={classes.colorBox}>
                                        <div
                                            key={index}
                                            className={
                                                activeColorIndex === index
                                                    ? `${classes.activeColor} 
                                                ${classes.colorCircle} ${
                                                          classes[
                                                              `${color.name}`
                                                          ]
                                                      }`
                                                    : ` ${
                                                          classes.colorCircle
                                                      } ${
                                                          classes[
                                                              `${color.name}`
                                                          ]
                                                      }`
                                            }
                                            onClick={() =>
                                                handleColorClick(index, color)
                                            }
                                        ></div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                    <Grid className={classes.pos}>
                        <FormInputLabel label="HABIT UNIT" />
                        <Button
                            size="large"
                            name="habitUnit"
                            className={
                                unityType === "noUnit"
                                    ? `${classes.activeButton} ${classes.buttonMargin}`
                                    : `${classes.disabledButton} ${classes.buttonMargin}`
                            }
                            onClick={() => handleUnitInput("noUnit")}
                        >
                            NO UNIT
                        </Button>
                        <Button
                            size="large"
                            className={
                                unityType === "custom"
                                    ? `${classes.activeButton} ${classes.buttonMargin}`
                                    : `${classes.disabledButton} ${classes.buttonMargin}`
                            }
                            onClick={() => handleUnitInput("custom")}
                        >
                            CUSTOM
                        </Button>
                        {unityType === "custom" ? (
                            <MyTextField
                                name="habitUnit"
                                type="text"
                                placeholder="e.g. Km, Pages, glasses"
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                    <Grid className={classes.pos}>
                        <FormInputLabel label="TRACK INPUT TYPE" />
                        <Button
                            size="large"
                            name="inputType"
                            className={
                                trackType === "number"
                                    ? `${classes.activeButton} ${classes.buttonMargin}`
                                    : `${classes.disabledButton} ${classes.buttonMargin}`
                            }
                            onClick={() => handleTrackInput("number")}
                        >
                            NUMBER
                        </Button>
                        <Button
                            size="large"
                            className={
                                trackType === "text"
                                    ? `${classes.activeButton} ${classes.buttonMargin}`
                                    : `${classes.disabledButton} ${classes.buttonMargin}`
                            }
                            onClick={() => handleTrackInput("text")}
                        >
                            TEXT
                        </Button>
                        <Button
                            size="large"
                            name="inputType"
                            className={
                                trackType === "time"
                                    ? `${classes.activeButton} ${classes.buttonMargin}`
                                    : `${classes.disabledButton} ${classes.buttonMargin}`
                            }
                            onClick={() => handleTrackInput("time")}
                        >
                            TIME
                        </Button>
                    </Grid>
                    <div className={classes.submitButton}>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {isSubmitting ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <Typography>CREATE</Typography>
                            )}
                        </Button>
                    </div>
                </Form>
            </Formik>

            {showModal ? (
                <Modal>
                    <Card raised={true}>
                        <CardContent>
                            <div>{msg}</div>
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                type="button"
                                onClick={toggleModal}
                            >
                                OK
                            </Button>
                        </CardContent>
                    </Card>
                </Modal>
            ) : null}
        </Container>
    );
};

const MyTextField = ({ placeholder, value, func, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            {...field}
            variant="outlined"
            placeholder={placeholder ? placeholder : " "}
            helperText={errorText}
            size="small"
            error={!!errorText}
        />
    );
};

const validationSchema = yup.object({
    category: yup.string().required("Category is Required").max(30),
    habitName: yup.string().required("Habit Name is Required").max(30),
    dailyGoal: yup.number().min(1).max(15),
    weeklyGoal: yup.number().min(1).max(7),
    habitUnit: yup.mixed(),
    types: yup.string(),
    color: yup.string(),
});

const saveHabit = async (habit) => {
    //make a object of habit in order to send post

    let habitData = {
        category: habit.category,
        habitName: habit.habitName,
        inputType: habit.types,
        color: habit.color,
    };
    console.log("in save habit");

    const response = await habitService.saveHabit(habitData);

    return response.data;
};

const colorCode = [
    { name: "yellow", color: "#FFB427" },
    { name: "lightblue", color: "#4EB1CB" },
    { name: "green", color: "#50D890" },
    { name: "black", color: "#000000" },
    { name: "red", color: "#FF6B7A" },
    { name: "purple", color: "#5666F3" },
    { name: "blue", color: "#3a8dff" },
    { name: "orange", color: "#FF8C00" },
];

const types = [
    {
        value: "checkbox",
        label: "Check Box",
    },
    {
        value: "text",
        label: "Text",
    },
    {
        value: "number",
        label: "Number",
    },
];

const categories = [
    {
        value: "General",
        label: "General",
    },
    {
        value: "Health/Nutrition",
        label: "Health/Nutrition",
    },
    {
        value: "Skills",
        label: "Skills",
    },
    {
        value: "Work/Study",
        label: "Work/Study",
    },
    {
        value: "House Hold",
        label: "House Hold",
    },
    {
        value: "Quit Habit",
        label: "Quit Habit",
    },
];

const colors = [
    {
        value: "red",
        label: "Red",
    },
    {
        value: "yellow",
        label: "Yellow",
    },
    {
        value: "lightblue",
        label: "Light Blue",
    },
    {
        value: "black",
        label: "Black",
    },
    {
        value: "green",
        label: "Green",
    },
    {
        value: "orange",
        label: "Orange",
    },
    {
        value: "blue",
        label: "Blue",
    },
    {
        value: "purple",
        label: "Purple",
    },
];

export default CreateHabitForm;
