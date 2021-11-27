import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Fab, TextField } from "@material-ui/core";

function NumberCounter() {
    return (
        <div>
            <Fab size="small" color="secondary">
                <RemoveIcon />
            </Fab>
            <TextField type="number" variant="outlined" />
            <Fab size="small" color="secondary">
                <AddIcon />
            </Fab>
        </div>
    );
}

export default NumberCounter;
