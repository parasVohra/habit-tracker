import { InputLabel } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import { Fragment } from "react";

function FormInputLabel({ label }) {
    const classes = useStyles();
    return (
        <Fragment>
            <InputLabel>
                <Typography variant="subtitle1" className={classes.label}>
                    {label}
                </Typography>
            </InputLabel>
        </Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    label: {
        fontWeight: "bold",
        marginBottom: "0.5rem",
    },
}));

export default FormInputLabel;
