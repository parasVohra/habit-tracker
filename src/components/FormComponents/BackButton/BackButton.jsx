import { Fragment } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

function BackButton() {
  const classes = useStyles();
  const history = useHistory();
  function handleClick() {
    history.goBack();
  }
  return (
    <div className={classes.backIcon} onClick={handleClick}>
      <ArrowBackIcon className={classes.icon} color="secondary" />
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  backIcon: {
    position: "absolute",
    left: "1rem",
    top: "1.5rem",
    fontWeight: "bold",
  },
  icon: {
    fill: "#ffffff",
    textAlign: "center",
  },
}));

export default BackButton;
