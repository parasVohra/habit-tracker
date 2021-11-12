import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.5rem",
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
    minHeight: "4rem",
    margin: "auto",
    backgroundColor: "#303038",
    borderRadius: "10px",
    padding: "0.5rem",
  },
  textGrey: {
    color: "#6c6c72",
  },
  textStreak: {
    color: "#FFFFFF",
  },
  habitTitleBox: {
    width: "100%",
    padding: "0rem 0.5rem 0rem 0.5rem",
    fontWeight: "bold",
    color: "white",
  },
  datesBox: {
    marginTop: "10px",
    height: "2rem",
    width: "2rem",
    textAlign: "center",
    lineHeight: "2rem",
  },
  doneText: {
    paddingLeft: "0.6rem",
    color: "#6c6c72",
  },
}));

export default useStyles;
