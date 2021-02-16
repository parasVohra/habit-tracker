/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import http from "./httpService";
import { apiUrl } from "../config.json";

export async function saveHabit(data) {
  return await http.post(apiUrl + "addHabit", data);
}
export async function getHabits() {
  return await http.get(apiUrl + "getHabits");
}

export async function getHabitStatus(data) {
  return await http.get(apiUrl + "getHabitStatus");
}

export default {
  saveHabit,
};
