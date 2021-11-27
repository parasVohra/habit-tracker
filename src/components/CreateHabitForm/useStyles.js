import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
        maxWidth: "20rem",
        margin: "auto",
    },
    title: {
        fontWeight: "bold",
        marginTop: "1.5rem",
        marginBottom: "2rem",
    },
    pos: {
        marginBottom: 12,
    },
    buttonMargin: {
        margin: "0.5rem 1rem 0 0",
    },
    activeButton: {
        background: "rgba(196, 196, 196, 0.19)",
        color: "#FFFFFF",
    },
    disabledButton: {
        background: "rgba(196, 196, 196, 0.04)",
        color: "#8F8E8E",
    },
    colorWrapper: {
        display: "flex",
        flexDirection: "row",
    },
    colorBox: {
        margin: "0.5rem",
    },
    activeColor: {
        border: "2px solid white",
    },
    colorCircle: {
        width: "1.5rem",
        height: "1.5rem",
        borderRadius: "4rem",
        boxSizing: "border-box",
    },
    yellow: { backgroundColor: "#FFB427" },
    lightblue: { backgroundColor: "#4EB1CB" },
    green: { backgroundColor: "#50D890" },
    black: { backgroundColor: "#000000" },
    red: { backgroundColor: "#FF6B7A" },
    purple: { backgroundColor: "#5666F3" },
    blue: { backgroundColor: "#3a8dff" },
    orange: { backgroundColor: "#FF8C00" },
}));

export default useStyles;
