import Popover from "@material-ui/core/Popover";
import { Context } from "../Store/habitStore";
import HabitService from "../services/habitService";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Checkbox,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function TrackHabit() {
  const [state, dispatch] = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);

  const [habitTracked, setHabitTracked] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event) => {
    let data = {
      id: event.target.id,
      isTracked: event.target.checked,
    };

    // update is track is also need to extracted
    async function updateIsTracked() {
      const res = await HabitService.updateIsTracked(data);
      if (res.status === 200 && res.data.nModified === 1) {
        // here i want to fetch the updated habit data from the server
        // and also i want want to render the habits
      }
    }

    updateIsTracked();
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
            <TableBody>
              {state.habits
                ? state.habits.map((h, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{h.habitName}</TableCell>
                        <TableCell align="center">
                          <Checkbox
                            id={h._id}
                            onChange={(e) => handleChange(e)}
                            checked={h.isTracked}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
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
