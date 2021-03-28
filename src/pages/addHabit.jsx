import React, { useContext, useState } from "react";
import RenderHabits from "../components/RenderHabits";
import { Context } from "../Store/habitStore";

export function AddHabit() {
  return (
    <div>
      <RenderHabits />
    </div>
  );
}
