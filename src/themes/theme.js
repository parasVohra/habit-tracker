import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto","Open Sans", "sans-serif", ',
    fontSize: 12,
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  palette: {
    type: "dark",
    primary: { main: "#3A8DFF" },
    secondary: { main: "#303038" },
    argumentColor: {
      red: { main: "#FF6B7A" },
      green: { main: "#50D890" },
      blue: { main: "#4EB1CB" },
      purple: { main: "#5666F3" },
      yellow: { main: "#FFB427" },
    },
  },
  shape: {
    borderRadius: 5,
  },
  overrides: {
    MuiPickersBasePicker: {
      container: {
        padding: "15px",
      },
      pickerView: {
        minWidth: "30rem",
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: "#303038",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: "#ff5630",
      },
      dayLabel: {
        margin: "0px 15px",
      },
    },
    MuiPickersDay: {
      day: {
        margin: "0px 15px",
      },
      daySelected: {
        color: "#fff",
        backgroundColor: "#ff5630",
      },
    },
  },
});
