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

    bottomContainer: {
        position: "fixed",
        zIndex: 100,
        bottom: 0,
        height: "3rem",
        width: "100%",
        marginTop: "1rem",
        backgroundColor: "#272730",
    },
    icon: {
        fill: "#ffffff",
        textAlign: "center",
    },
    bottomGrid: {
        display: "flex",
        alignItems: "center",
        height: "100%",
    },
    addIcon: {
        marginRight: "0.5rem",
    },
}));

export default useStyles;
