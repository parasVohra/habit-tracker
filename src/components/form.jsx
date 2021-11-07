import {
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Formik, useField } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import habitService from "../services/habitService";
import Modal from "./modal";
import { useHistory } from "react-router-dom";

const Form = () => {
  const [habit, setHabit] = useState(null);
  const classes = useStyles();
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const [habitSaved, setHabitSaved] = useState(false);

  const [showModal, setModal] = useState(false);

  useEffect(() => {
    if (habitSaved && !showModal) {
      history.push("/");
    }
  }, [habitSaved, history, showModal]);

  const toggleModal = () => {
    setModal(!showModal);
    setHabitSaved(true);
  };

  return (
    <Card raised={true} dark className={classes.root}>
      <CardHeader title="Add New Habit" />
      <CardContent>
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
            <form onSubmit={handleSubmit}>
              <div className={classes.root}>
                <MySelectField
                  value={values.category}
                  select
                  label="Category"
                  name="category"
                  options={categories}
                />
              </div>
              <div className={classes.root}>
                <MyTextField label="Habit Name" name="habitName" type="input" />
              </div>

              <div className={classes.root}>
                <MySelectField
                  value={values.types}
                  select
                  label="Types"
                  name="types"
                  options={types}
                />
              </div>

              <div className={classes.root}>
                <MySelectField
                  value={values.color}
                  select
                  label="Color"
                  name="color"
                  options={colors}
                />
              </div>
              <div>
                <Button variant="contained" color="primary" type="submit">
                  Save Habit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </CardContent>
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
    </Card>
  );
};

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const MySelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      select
      label={label}
      {...field}
      helperText={errorText}
      error={!!errorText}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: colorCode[option.value],
              height: "10px",
              width: "10px",
              borderRadius: "10px",
              marginRight: "4px",
            }}
          >
            {"   "}
          </div>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

const validationSchema = yup.object({
  category: yup.string().required().max(30),
  habitName: yup.string().required().max(30),
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

const colorCode = {
  yellow: "#FFB427",
  lightblue: "#4EB1CB",
  green: "#50D890",
  black: "#000000",
  red: "#FF6B7A",
  purple: "#5666F3",
  blue: "#3a8dff",
  orange: "#FF8C00",
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
