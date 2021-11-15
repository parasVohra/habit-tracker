import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topProfileButton: {
    position: "fixed",
    right: "2rem",
    top: "1rem",
    fontWeight: "bold",
  },
  bottomAddButton: {
    position: "fixed",
    right: "2rem",
    bottom: "1rem",
    fontWeight: "bold",
  },
  bottomSummaryButton: {
    position: "fixed",
    left: "2rem",
    bottom: "1rem",
    fontWeight: "bold",
  },

  addIcon: {
    marginRight: "0.5rem",
  },
}));

export default useStyles;
