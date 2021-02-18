/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import http from "./httpService";
import { apiUrl } from "../config.json";

export async function saveHabit(data) {
  return await http.post(apiUrl + "habitList", data);
}
export async function getHabits() {
  return await http.get(apiUrl + "habitList");
}

export async function getHabitStatus(data) {
  return await http.get(apiUrl + "habitStatus");
}

export default {
  saveHabit,
  getHabits,
  getHabitStatus,
};
