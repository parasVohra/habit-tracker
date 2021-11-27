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
    Typography,
} from "@material-ui/core";
import { Formik, useField } from "formik";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "./useStyles";
import * as yup from "yup";
import habitService from "../../services/habitService";
import Modal from "../modal";
import { useHistory } from "react-router-dom";
import FormInputLabel from "../FormComponents/InputLabel/InputLabel";
import BackButton from "../FormComponents/BackButton/BackButton";
import NumberCounter from "../FormComponents/NumberCounter/NumberCounter";

const Form = () => {
    const [habit, setHabit] = useState(null);
    const classes = useStyles();
    const [msg, setMsg] = useState(null);
    const history = useHistory();
    const [habitSaved, setHabitSaved] = useState(false);
    const [activeCategoryIndex, setCategoryIndex] = useState(0);
    const [activeColorIndex, setColorIndex] = useState(0);

    const [showModal, setModal] = useState(false);

    useEffect(() => {
        if (habitSaved && !showModal) {
            history.push("/");
        }
    }, [habitSaved, history, showModal]);

    const handleCategoryClick = (index, value) => {
        setCategoryIndex(index);
        console.log(value);
    };
    const handleColorClick = (index, value) => {
        setColorIndex(index);
        console.log(value);
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
                    category: "General",
                    habitName: "",
                    types: "checkbox",
                    color: "black",
                }}
                onSubmit={async (data) => {
                    try {
                        console.log(data);
                        setHabit(data);
                        const res = await saveHabit(data);
                        if (res) {
                            setMsg(res.msg);
                            toggleModal();
                        }
                    } catch (err) {
                        if (err.response.status === 400) {
                            console.log(err.response);

                            setMsg(err.response.data.error);
                            toggleModal();
                        }
                    }
                }}
                validationSchema={validationSchema}
            >
                {({ values, handleSubmit, handleChange, handleBlur }) => (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Grid>
                            <FormInputLabel label="HABIT NAME" />
                            <MyTextField
                                name="habitName"
                                type="text"
                                placeholder="e.g. Cold Shower, Read Book"
                            />
                        </Grid>
                        <Grid>
                            <FormInputLabel label="CATEGORY" />
                            {categories.map((category, index) => {
                                return (
                                    <Button
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
                        <Grid>
                            <FormInputLabel label="HOW MANY TIMES PER DAY?" />
                            <NumberCounter />
                        </Grid>
                        <Grid>
                            <FormInputLabel label="HOW MANY TIMES PER WEEK?" />
                            <Button
                                className={`${classes.activeButton} ${classes.buttonMargin}`}
                            >
                                DAILY
                            </Button>
                            <Button
                                className={`${classes.disabledButton} ${classes.buttonMargin}`}
                            >
                                CUSTOM
                            </Button>
                            <NumberCounter />
                        </Grid>
                        <Grid>
                            <Grid item>
                                <FormInputLabel label="COLOR" />
                            </Grid>
                            <Grid container xs={12}>
                                {colorCode.map((color, index) => {
                                    return (
                                        <Grid
                                            xs={2}
                                            className={classes.colorBox}
                                        >
                                            <div
                                                key={index}
                                                className={
                                                    activeColorIndex === index
                                                        ? `${
                                                              classes.activeColor
                                                          } 
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
                                                    handleColorClick(
                                                        index,
                                                        color
                                                    )
                                                }
                                            ></div>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        <Grid>
                            <FormInputLabel label="HABIT UNIT" />
                            <Button
                                className={`${classes.activeButton} ${classes.buttonMargin}`}
                            >
                                NO UNIT
                            </Button>
                            <Button
                                className={`${classes.disabledButton} ${classes.buttonMargin}`}
                            >
                                CUSTOM
                            </Button>
                            <MyTextField
                                name="unit"
                                type="text"
                                placeholder="e.g. Km, Pages, glasses"
                            />
                        </Grid>
                        <Grid>
                            <FormInputLabel label="TRACK INPUT TYPE" />
                            <Button
                                className={`${classes.activeButton} ${classes.buttonMargin}`}
                            >
                                NUMBER
                            </Button>
                            <Button
                                className={`${classes.disabledButton} ${classes.buttonMargin}`}
                            >
                                TEXT
                            </Button>
                            <Button
                                className={`${classes.disabledButton} ${classes.buttonMargin}`}
                            >
                                TIME
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary"
                            >
                                CREATE
                            </Button>
                        </Grid>
                    </form>
                )}
            </Formik>

            {showModal ? (
                <Modal>
                    <Card raised={true}>
                        <CardContent>
                            <div>{msg}</div>
                            <Button
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

const MyTextField = ({ placeholder, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
        <TextField
            {...field}
            variant="outlined"
            placeholder={placeholder ? placeholder : " "}
            helperText={errorText}
            error={!!errorText}
        />
    );
};

const validationSchema = yup.object({
    category: yup.string().required("Category is Required").max(30),
    habitName: yup.string().required("Habit Name is Required").max(30),
    types: yup.string().required(),
    color: yup.string().required(),
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

export default Form;
