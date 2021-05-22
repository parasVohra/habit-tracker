import React, { useContext, useState } from "react";
import {
  Button,
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
    <Card raised={true} className={classes.root}>
      <div>{error.length ? <h3>{error[0]}</h3> : null}</div>
      <CardHeader title="SignIn" />
      <CardContent>
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
          <Form>
            <div className={classes.root}>
              <MyTextField label="Email" name="email" type="input" />
            </div>
            <div className={classes.root}>
              <MyTextField label="Password" name="password" type="password" />
            </div>

            <div className={classes.root}>
              <Button variant="contained" color="primary" type="submit">
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
      </CardContent>
    </Card>
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
      {...field}
      type={props.type}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: 10,
    marginTop: 20,
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
