import Popover from "@material-ui/core/Popover";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@material-ui/core";
import React, { useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function TrackHabit() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Habits </TableCell>
                <TableCell align="center">Track Habit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </div>
      </Popover>

      <Fab
        aria-describedby={id}
        size="small"
        color="primary"
        onClick={handleClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default TrackHabit;
