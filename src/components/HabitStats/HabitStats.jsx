import React from "react";
import BackButton from "../FormComponents/BackButton/BackButton";
import { Bar } from "react-chartjs-2";

function HabitStats(props) {
  return (
    <div>
      <BackButton />
      <Bar
        data={{
          labels: ["red", "blue"],
          datasets: [
            {
              label: "first label",
              data: [30],
              backgroundColor: "orange",
            },
          ],
        }}
        height={400}
        width={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}

export default HabitStats;
