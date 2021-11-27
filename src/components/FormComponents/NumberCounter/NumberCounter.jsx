import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Fab, TextField, Typography } from "@material-ui/core";
import useStyles from "./useStyles";

function NumberCounter() {
    const classes = useStyles();
    return (
        <div className={classes.count}>
            <Fab size="small" color="secondary">
                <RemoveIcon />
            </Fab>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.countText}
            >
                1
            </Typography>
            <Fab size="small" color="secondary">
                <AddIcon />
            </Fab>
        </div>
    );
}

export default NumberCounter;
