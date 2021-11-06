import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    minWidth: "15rem",
    padding: "2px",
  },
  titleText: {
    margin: "auto",
  },
  habitContainer: {
    alignItems: "center",
    minWidth: "20rem",
    maxWidth: "50rem",
    minHeight: "10rem",
    margin: "auto",
    backgroundColor: "#303038",
    borderRadius: "10px",
    padding: "0.5rem",
  },
  habitTitleBox: {
    width: "100%",
    padding: "1rem 1rem 1rem 1rem",
    color: "white",
  },
  grey: {
    color: "#ffffff",
    border: "2px solid",
    borderRadius: "2rem",
    backgroundColor: "#6c6c72",
    borderColor: "#6c6c72",
  },
  white: {
    backgroundColor: "#ffffff",
  },
  black: {
    color: "#ffffff",
    border: "2px solid",
    borderRadius: "2rem",
    backgroundColor: "#000000",
    borderColor: "#000000",
  },
  yellow: {
    color: "#ffffff",
    border: "2px solid",
    borderRadius: "2rem",
    backgroundColor: "#FFB427",
    borderColor: "#FFB427",
  },
  selectedDate: {},
  unSelectedDate: {},
  blue: {
    color: "#ffffff",
    border: "2px solid",
    borderRadius: "2rem",
    backgroundColor: "#5666F3",
    borderColor: "#5666F3",
  },
  green: {
    color: "#ffffff",
    border: "2px solid",
    borderRadius: "2rem",
    backgroundColor: "#50D890",
    borderColor: "#50D890",
  },
  pink: {
    color: "#ffffff",
    border: "2px solid",
    borderRadius: "2rem",
    borderColor: "#D96383",
    backgroundColor: "#D96383",
  },
  backgroundYellow: {
    backgroundColor: "#FFB427",
    borderColor: "#FFB427",
  },
  datesBox: {
    marginTop: "10px",

    height: "2rem",
    width: "2rem",
    textAlign: "center",
    lineHeight: "2rem",
  },
}));

export default useStyles;
