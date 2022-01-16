import {
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "./useStyles";
import * as yup from "yup";
import habitService from "../../services/habitService";
import Modal from "../modal";
import { useHistory, useLocation } from "react-router-dom";
import FormInputLabel from "../FormComponents/InputLabel/InputLabel";
import NumberCounter from "../FormComponents/NumberCounter/NumberCounter";
import { FormContext } from "../../Store/habitFormContext";

const HabitForm = () => {
  const [habitForm, dispatch] = useContext(FormContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const classes = useStyles();
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const [habitSaved, setHabitSaved] = useState(false);
  const [activeCategoryIndex, setCategoryIndex] = useState(0);
  const [activeColorIndex, setColorIndex] = useState(0);
  const [weeklyGoalInputType, setWeeklyGoalInputType] = useState(
    habitForm.weeklyInputType
  );
  const [unityType, setUnitType] = useState(habitForm.habitUnitType);
  const [trackType, setTrackType] = useState(habitForm.inputType);
  const [habitText, setHabitText] = useState(habitForm.habitName);

  console.log("habit form context", habitForm);

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
    if (type === "daily") {
      dispatch({ type: "SET_WEEKLY_GOAL", payload: 7 });
    }
  };

  const handleUnitInput = (type) => {
    setUnitType(type);
    dispatch({ type: "SET_HABIT_UNIT_TYPE", payload: type });
    if (type === "custom") {
      dispatch({ type: "SET_HABIT_UNIT", payload: "" });
    } else {
      dispatch({ type: "SET_HABIT_UNIT", payload: null });
    }
  };
  const handleTrackInput = (type) => {
    setTrackType(type);
    dispatch({ type: "SET_INPUT_TYPE", payload: type });
  };
  const handleHabitName = (value) => {
    setHabitText(value);
    dispatch({ type: "SET_HABIT_NAME", payload: value });
  };
  const handleHabitUnit = (value) => {
    setHabitText(value);
    dispatch({ type: "SET_HABIT_UNIT", payload: value });
  };

  const toggleModal = () => {
    setModal(!showModal);
    setHabitSaved(true);
  };

  return (
    <>
      <Formik
        initialValues={habitForm}
        onSubmit={async (data) => {
          try {
            setSubmitting(true);
            const res = await saveHabit(data);
            if (res) {
              setMsg(res.msg);
              dispatch({
                type: "RESET_HABIT_FORM",
              });
              setSubmitting(false);
              toggleModal();
            }
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
        enableReinitialize
      >
        <Form className={classes.form}>
          <Grid className={classes.pos}>
            <FormInputLabel label="HABIT NAME" />
            <MyTextField
              name="habitName"
              type="text"
              placeholder="e.g. Cold Shower, Read Book"
              onChange={(event) => handleHabitName(event.target.value)}
            />
          </Grid>
          <Grid className={classes.pos}>
            <FormInputLabel label="CATEGORY" />
            {categories.map((category, index) => {
              return (
                <Button
                  size="large"
                  key={category.label}
                  className={
                    category.label === habitForm.category
                      ? `${classes.activeButton} ${classes.buttonMargin}`
                      : `${classes.disabledButton} ${classes.buttonMargin}`
                  }
                  onClick={() => handleCategoryClick(index, category.value)}
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
            <Grid container xs={12} item>
              {colorCode.map((color, index) => {
                return (
                  <Grid
                    xs={2}
                    className={classes.colorBox}
                    key={color.color}
                    item
                  >
                    <div
                      key={color.color}
                      className={
                        color.color === habitForm.color
                          ? `${classes.activeColor} 
                                                ${classes.colorCircle} ${
                              classes[`${color.name}`]
                            }`
                          : ` ${classes.colorCircle} ${
                              classes[`${color.name}`]
                            }`
                      }
                      onClick={() => handleColorClick(index, color.color)}
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
                unityType === ""
                  ? `${classes.activeButton} ${classes.buttonMargin}`
                  : `${classes.disabledButton} ${classes.buttonMargin}`
              }
              onClick={() => handleUnitInput(null)}
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
                onChange={(event) => handleHabitUnit(event.target.value)}
                placeholder="e.g. Km, Pages, glasses"
              />
            ) : (
              <></>
            )}
          </Grid>
          <Grid className={classes.pos}>
            <FormInputLabel label="TRACK INPUT TYPE" />
            {inputTypes.map((type) => {
              return (
                <Button
                  size="large"
                  name="inputType"
                  key={type.value}
                  className={
                    trackType === type.value
                      ? `${classes.activeButton} ${classes.buttonMargin}`
                      : `${classes.disabledButton} ${classes.buttonMargin}`
                  }
                  onClick={() => handleTrackInput(type.value)}
                >
                  {type.label}
                </Button>
              );
            })}
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
              ) : pathname === "/createHabit" ? (
                <Typography>CREATE</Typography>
              ) : (
                <Typography>UPDATE</Typography>
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
    </>
  );
};

const MyTextField = ({ placeholder, value, onChange, func, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      variant="outlined"
      placeholder={placeholder ? placeholder : " "}
      helperText={errorText}
      size="small"
      onChange={onChange}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  category: yup.string().required("Category is Required").max(30),
  habitName: yup.string().required("Habit Name is Required").max(30).trim(),
  dailyGoal: yup.number().min(1).max(15),
  weeklyGoal: yup.number().min(1).max(7),
  habitUnit: yup
    .string()
    .min(2, "must be minimum 2 characters")
    .max(10)
    .nullable(true)
    .trim(),
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
    habitUnit: { type: habit.habitUnitType, value: habit.habitUnit },
    weeklyGoal: {
      type: habit.weeklyInputType,
      value: habit.weeklyGoal,
    },
    dailyGoal: habit.dailyGoal,
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

const inputTypes = [
  {
    value: "Checkbox",
    label: "CHECK BOX",
  },
  {
    value: "text",
    label: "TEXT",
  },
  {
    value: "number",
    label: "NUMBER",
  },
  {
    value: "time",
    label: "TIME",
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

export default HabitForm;
