/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import http from "./httpService";
import { apiUrl } from "../config.json";

console.log("*************************In Services");

export async function saveHabit(data) {
  return await http.post(apiUrl + "saveHabit", data);
}
export async function getHabits() {
  return await http.get(apiUrl + "getHabits");
}

export async function updateHabitStatus(data) {
  return await http.post(apiUrl + "updateHabit", data);
}

export async function updateIsTracked(data) {
  return await http.post(apiUrl + "updateIsTracked", data);
}

export default {
  saveHabit,
  getHabits,
  updateHabitStatus,
  updateIsTracked,
};
