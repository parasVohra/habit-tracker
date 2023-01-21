import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0.5rem",
        maxWidth: "30rem",
        minWidth: "10rem",
    },
    title: {
        marginTop: "3rem",
        marginBottom: "2rem",
    },
    titleText: {
        margin: "auto",
    },
    activeButton: {
        background: "rgba(196, 196, 196, 0.19)",
        color: "#FFFFFF",
    },
    disabledButton: {
        background: "rgba(196, 196, 196, 0.04)",
        color: "#8F8E8E",
    },
    box: {
        margin: "auto",
    },
    habitContainer: {
        alignItems: "center",
        minHeight: "6rem",
        backgroundColor: "#303038",
        borderRadius: "10px",
        borderStyle: "solid",
        borderWidth: "1px",
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
    statsText: {
        padding: "2px",
        margin: "auto",
    },
}));

export default useStyles;
