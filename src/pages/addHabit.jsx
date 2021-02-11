import React, { useContext, useState } from "react";
import Form from "../components/form";
import { HabitContext } from "../context/HabitContext";

export function AddHabit() {
  const [newHabit, setNewHabit] = useState([]);
  const [habitCategory, setHabitCategory] = useState("");
  const [habitName, setHabitName] = useState("");
  const [habitType, setHabitType] = useState("");
  const [habitColor, setHabitColor] = useState("");
  const [habitDays, setHabitDays] = useState("");

  const { habit, setHabit } = useContext(HabitContext);

  console.log(typeof habit);

  console.log(habit);

  return (
    <div>
      <div>
        <input
          name="habitCategory"
          placeholder="Category"
          value={habitCategory}
          onChange={e => setHabitCategory(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          name="habitName"
          placeholder="Name"
          value={habitName}
          onChange={e => setHabitName(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          name="habitType"
          placeholder="Type"
          value={habitType}
          onChange={e => setHabitType(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          name="habitColor"
          placeholder="Color"
          value={habitColor}
          onChange={e => setHabitColor(e.target.value)}
        ></input>
      </div>
      <div>
        <input
          name="habitDays"
          placeholder="Days"
          type="number"
          value={habitDays}
          onChange={e => setHabitDays(e.target.value)}
        ></input>
      </div>
      <button onClick={() => setNewHabit([...newHabit, { name: habitName }])}>
        Add Habit
      </button>
      <button
        onClick={() =>
          setHabit([
            ...habit,
            { name: habitName, category: habitCategory, inputType: habitType },
          ])
        }
      >
        send Habit
      </button>

      <Form />

      <pre>
        {newHabit
          ? newHabit.map(h => {
              return <div key={h.name}>{h.name}</div>;
            })
          : " "}
      </pre>
    </div>
  );
}
