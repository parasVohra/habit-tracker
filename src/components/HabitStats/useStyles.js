import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "0.5rem",
        maxWidth: "50rem",
        minWidth: "10rem",
    },
    title: {
        marginTop: "3rem",
        marginBottom: "2rem",
    },
    titleText: {
        margin: "auto",
    },
    box: {
        margin: "auto",
    },
    habitContainer: {
        alignItems: "center",
        minHeight: "4rem",
        backgroundColor: "#303038",
        borderRadius: "10px",
        padding: "0.5rem",
    },
}));

export default useStyles;
