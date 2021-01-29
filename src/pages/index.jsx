import React, { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

export function Index() {
  const { habit } = useContext(HabitContext);

  console.dir(habit);

  return (
    <div>
      <h2>Home</h2>
      <pre>
        {habit
          ? habit.map(h => {
              return <div key={h.name}>{h.name}</div>;
            })
          : " "}
      </pre>
    </div>
  );
}
