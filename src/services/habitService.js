/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import http from "./httpService";
import { apiUrl } from "../config.json";

export async function saveHabit(data) {
  return await http.post(apiUrl + "habitList", data);
}
export async function getHabits() {
  return await http.get(apiUrl + "habitList");
}

export async function getHabitStatus() {
  return await http.get(apiUrl + "habitStatus");
}
export async function updateHabitStatus(data) {
  return await http.put(apiUrl + "habitStatus/" + data.habitID, data.status);
}

export default {
  saveHabit,
  getHabits,
  getHabitStatus,
  updateHabitStatus,
};
