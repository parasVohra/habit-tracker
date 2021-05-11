import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import React from "react";
import * as yup from "yup";

const SignInForm = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          acceptedTerms: false,
        }}
        onSubmit={(data) => {
          console.log(data);
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <div className={classes.root}>
            <MyTextField label="First Name" name="firstName" type="input" />
          </div>
          <div className={classes.root}>
            <MyTextField label="Last Name" name="lastName" type="input" />
          </div>
          <div className={classes.root}>
            <MyTextField label="Email" name="email" type="input" />
          </div>

          <div className={classes.root}>
            <MyCheckBox
              label="I accept the terms and condition"
              name="acceptedTerms"
            />
          </div>

          <div className={classes.root}>
            <Button variant="contained" color="primary" type="submit">
              Sing Me Up
            </Button>
          </div>
        </Form>
      </Formik>
    </Card>
  );
};

const validationSchema = yup.object({
  firstName: yup.string().required().max(15, "Must be 15 character or less"),
  lastName: yup.string().required().max(20, "Must be 20 character or less"),
  email: yup.string().required().email("Invalid email address"),
  acceptedTerms: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});

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
const MyCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <FormControlLabel
      label={label}
      labelPlacement="end"
      control={
        <Checkbox {...field} helperText={errorText} error={!!errorText} />
      }
    ></FormControlLabel>
  );
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

export default SignInForm;
