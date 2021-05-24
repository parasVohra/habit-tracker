import { signOut } from "../../services/authServices";
import React, { useEffect, useContext, useState } from "react";
import { tokenKey } from "../../config.json";
import { Button, Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Context } from "../../Store/habitStore";
import Modal from "../modal";
import { is } from "date-fns/locale";

const SignOut = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(Context);
  const [showModal, setModal] = useState(false);
  const [msg, setMsg] = useState(null);

  const toggleModal = () => {
    setModal(!showModal);
  };

  useEffect(() => {
    dispatch({ type: "SET_TOKEN", payload: "" });
    dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
    dispatch({ type: "SET_USER_INFO", payload: {} });
    signOut(tokenKey);

    if (!state.isAuthenticated) {
      setModal(true);
    }

    let timeOut = setTimeout(() => {
      history.push("/signIn");
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [dispatch, history, state.isAuthenticated]);

  return (
    <div>
      {showModal ? (
        <Modal>
          <Card raised={true}>
            <CardContent>
              <div style={{ margin: "20px" }}>{`Your are Signed Out`}</div>
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
    </div>
  );
};

export default SignOut;
