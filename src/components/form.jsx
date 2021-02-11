import {
  Button,
  Card,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Formik, useField } from "formik";
import React, { useContext } from "react";
import * as yup from "yup";
import { HabitContext } from "../context/HabitContext";

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
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
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
    value: "blue",
    label: "Blue",
  },
  {
    value: "black",
    label: "Black",
  },
  {
    value: "green",
    label: "Green",
  },
];

const Form = () => {
  const { habit, setHabit } = useContext(HabitContext);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <h2>Add New Habit</h2>
      <Formik
        initialValues={{
          category: "General",
          habitName: "",
          types: "checkbox",
          color: "black",
        }}
        onSubmit={data => {
          console.log(data);
          setHabit([...habit, data]);
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

            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default Form;
