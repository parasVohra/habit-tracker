import React, { useContext, useState } from "react";
import RenderHabits from "../components/RenderHabits";
import { HabitContext } from "../context/HabitContext";

export function AddHabit() {
  return (
    <div>
      <RenderHabits />
    </div>
  );
}
