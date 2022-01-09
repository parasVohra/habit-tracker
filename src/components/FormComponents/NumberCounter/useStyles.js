import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    count: {
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    countText: {
        margin: "0rem 1rem",
        fontWeight: "bold",
    },
}));

export default useStyles;
