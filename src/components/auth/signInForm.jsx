import React, { useContext } from "react";
import { Button, Card, makeStyles, TextField } from "@material-ui/core";
import { Formik, Form, useField } from "formik";
import AuthService from "../../services/authServices";
import TokenService from "../../utilities/tokenMethods";
import { Context } from "../../Store/habitStore";
import { tokenKey } from "../../config.json";

import { useHistory } from "react-router-dom";
import * as yup from "yup";

const SignInForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  return (
    <Card className={classes.root}>
      <Formik
        initialValues={{
          password: "",
          email: "",
        }}
        onSubmit={async (data) => {
          try {
            const response = await AuthService.signIn(data);
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
            console.log(err);
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
