import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import AuthService from "../../services/authServices";
import TokenService from "../../utilities/tokenMethods";
import { Context } from "../../Store/habitStore";
import { tokenKey } from "../../config.json";
import Modal from "../modal";

import { useHistory } from "react-router-dom";
import * as yup from "yup";

const SignInForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [showModal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);

  const toggleModal = () => {
    setModal(!showModal);
  };
  return (
    <Container className={classes.root}>
      <div>{error.length ? <h3>{error[0]}</h3> : null}</div>

      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        onSubmit={async (data) => {
          setError([]);
          console.log(error);
          try {
            const response = await AuthService.signIn(data);
            console.log(response);
            if (response.status === 200) {
              const token = response.data.token;
              TokenService.setToken(token);
              dispatch({ type: "SET_TOKEN", payload: token });

              const userInfoObj = TokenService.getUserInfo(tokenKey);
              console.log(`user info ${userInfoObj} `);
              dispatch({ type: "SET_USER_INFO", payload: userInfoObj });

              dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
              console.log(state);

              return history.push("/");
            }
          } catch (err) {
            console.log(err.response);
            if (err.response.status === 401) {
              console.log(err.data);

              setMsg(err.response.data.error);
              toggleModal();
            }
          }
        }}
        validationSchema={validationSchema}
      >
        <Form className={classes.form}>
          <CardHeader title="Sign In" />
          <div className={classes.input}>
            <MyTextField label="Email" name="email" type="input" />
          </div>
          <div className={classes.input}>
            <MyTextField label="Password" name="password" type="password" />
          </div>

          <div className={classes.input}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit"
            >
              SingIn
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
    </Container>
  );
};

const validationSchema = yup.object({
  email: yup.string().required().email("Invalid email address"),
  password: yup.string().required().min(6, "Must be 6 character or more"),
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
  textInput: {
    width: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default SignInForm;
