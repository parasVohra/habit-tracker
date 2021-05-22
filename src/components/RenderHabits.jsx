import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";

import RenderHabitsByCategory from "../components/RenderHabitsByCategory";
import { Context } from "../Store/habitStore";

const RenderHabits = () => {
  const [state] = useContext(Context);
  const classes = useStyles();
  const [isHabitEmpty, setisHabitEmpty] = useState(false);

  useEffect(() => {
    if (JSON.stringify(state.habitRestructure) === "{}") {
      setisHabitEmpty(true);
    }
  }, [state.habitRestructure]);

  return (
    <div className={classes.root}>
      <TableContainer className={classes.table} component={Paper}>
        <Table
          aria-label="simple table"
          padding="none"
          size="small"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Habits </TableCell>
              <TableCell align="center">S</TableCell>
              <TableCell align="center">M</TableCell>
              <TableCell align="center">T</TableCell>
              <TableCell align="center">W</TableCell>
              <TableCell align="center">T</TableCell>
              <TableCell align="center">F</TableCell>
              <TableCell align="center">S</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.habitRestructure && !isHabitEmpty ? (
              <>
                {state.category ? (
                  state.category.map((c, index) => {
                    return (
                      <>
                        <TableRow key={c}>
                          <TableCell>
                            <strong>{c}</strong>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>

                        <RenderHabitsByCategory category={c} />
                      </>
                    );
                  })
                ) : (
                  <TableRow>ss</TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell align="center">{`Loading ...  `} </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "5px",
    textAlign: "center",
    color: "black",
  },
  table: {
    minWidth: 350,
  },
}));
export default RenderHabits;
