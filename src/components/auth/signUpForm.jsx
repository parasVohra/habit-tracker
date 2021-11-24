import {
  Button,
  Card,
  Container,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import AuthService from "../../services/authServices";
import TokenService from "../../utilities/tokenMethods";
import { Context } from "../../Store/habitStore";
import { tokenKey } from "../../config.json";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Modal from "../modal";

const SignUpForm = () => {
  const [state, dispatch] = useContext(Context);
  const [showModal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const [isSubmitting, setSubmitting] = useState(false);

  const toggleModal = () => {
    setModal(!showModal);
  };
  return (
    <Container className={classes.root}>
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
            setSubmitting(true);
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
              setSubmitting(false);
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
        <Form className={classes.form}>
          <CardHeader title="Sign Up" />
          <div className={classes.input}>
            <MyTextField label="First Name" name="firstName" type="input" />
          </div>
          <div className={classes.input}>
            <MyTextField label="Last Name" name="lastName" type="input" />
          </div>
          <div className={classes.input}>
            <MyTextField label="Email" name="email" type="input" />
          </div>
          <div className={classes.input}>
            <MyTextField label="Password" name="password" type="password" />
          </div>

          <div className={classes.input}>
            <MyCheckBox
              label="I accept the terms and condition"
              name="termsOfServices"
            />
          </div>

          <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              {isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Typography>Sing Me Up</Typography>
              )}
            </Button>
          </div>
          <div className={classes.singUpWrapper}>
            <Typography variant="subtitle2">Already a member? </Typography>
            <Link to="/signIn" color="primary" className={classes.link}>
              <Typography color="primary" variant="subtitle2">
                Sign In
              </Typography>
            </Link>
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
                size="large"
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
      variant="outlined"
      {...field}
      style={{ width: "100%" }}
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
      control={<Checkbox color="primary" {...field} error={!!errorText} />}
    ></FormControlLabel>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    minWidth: "20rem",
    minHeight: "7rem",
    margin: "5rem auto 0 auto",
    padding: "0.5rem",
    color: "#ffffff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  input: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.5rem",
    minWidth: "20rem",
    padding: "2px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    marginTop: "2rem",
  },
  singUpWrapper: {
    display: "flex",
    alignItems: "center",
    minWidth: "20rem",
    justifyContent: "center",
    marginTop: "1rem",
  },
  link: {
    paddingLeft: "0.5rem",
    textDecoration: "none",
  },
  textInput: {
    width: "100%",
  },
  pos: {
    marginBottom: 12,
  },
});
export default SignUpForm;
