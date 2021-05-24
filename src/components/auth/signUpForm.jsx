import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import AuthService from "../../services/authServices";
import TokenService from "../../utilities/tokenMethods";
import { Context } from "../../Store/habitStore";
import { tokenKey } from "../../config.json";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Modal from "../modal";

const SignUpForm = () => {
  const [state, dispatch] = useContext(Context);
  const [showModal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const toggleModal = () => {
    setModal(!showModal);
  };
  return (
    <Card raised={true} className={classes.root}>
      <CardHeader title="SignUp" />
      <CardContent>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            termsOfServices: false,
          }}
          onSubmit={async (data) => {
            try {
              const response = await AuthService.signUp(data);
              console.log(response);
              if (response.status === 200) {
                const token = response.data.token;
                console.log(`token  from response ${token}`);
                TokenService.setToken(token);
                dispatch({ type: "SET_TOKEN", payload: token });

                const userInfoObj = TokenService.getUserInfo(tokenKey);
                console.log(`user info ${userInfoObj} `);
                dispatch({ type: "SET_USER_INFO", payload: userInfoObj });

                dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
                console.log(state);

                return history.push("/form");

                //then save the token to the local storage
                // dispatch token action and  take user to signIn page
              } else if (response.status === 401) {
                // else dispatch set error action and display error on screen
                const responseError = response.data.error;
                console.log(response);
                console.log(state);

                dispatch({ type: "SET_ERROR", payload: responseError });
              } else {
                dispatch({ type: "SET_ERROR", payload: "Unknown error" });
              }
            } catch (err) {
              if (err.response.status === 401) {
                setMsg(err.response.data.error);
                toggleModal();
              }
              dispatch({ type: "SET_ERROR", payload: err });
            }
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
              <MyTextField label="Password" name="password" type="password" />
            </div>

            <div className={classes.root}>
              <MyCheckBox
                label="I accept the terms and condition"
                name="termsOfServices"
              />
            </div>

            <div className={classes.root}>
              <Button variant="contained" color="primary" type="submit">
                Sing Me Up
              </Button>
            </div>
          </Form>
        </Formik>
        {showModal ? (
          <Modal>
            <Card raised={true}>
              <CardContent>
                <div style={{ margin: "20px" }}>{msg}</div>
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
      </CardContent>
    </Card>
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required()
    .min(3, "First name must have at least 3 character")
    .max(15, "First name must be 15 character or less"),
  lastName: yup
    .string()
    .required()
    .min(3, "Last name must have at least 3 character")
    .max(20, "Last name must be 20 character or less"),
  email: yup.string().required().email("Invalid email address"),
  password: yup.string().required().min(6, "Must be 6 character or more"),
  termsOfServices: yup
    .boolean()
    .required()
    .oneOf([true], "You must accept the terms and conditions."),
});

const MyTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={label}
      {...field}
      type={props.type}
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
      control={<Checkbox {...field} error={!!errorText} />}
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
export default SignUpForm;
