import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2rem",
    minWidth: "15rem",
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
    padding: "1.5rem",
  },
  habitTitleBox: {
    width: "100%",
    padding: "1rem 1rem 1rem 1rem",
    color: "white",
  },
  textGrey: {
    color: "#6c6c72",
  },
  textWhite: {
    color: "#FFFFFF",
  },
  textYellow: {
    color: "#FFB427",
  },
  backgroundYellow: {
    backgroundColor: "#FFB427",
  },
  datesBox: {
    marginTop: "10px",
    border: "2px solid",
    borderColor: "#FFB427",
    borderRadius: "2rem",
    height: "2rem",
    width: "2rem",
    textAlign: "center",
    lineHeight: "2rem",
  },
}));

export default useStyles;
