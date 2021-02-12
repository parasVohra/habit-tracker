/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

import http from "./httpService";
import { apiUrl } from "../config.json";

export async function saveHabit(data) {
  return await http.post(apiUrl + "addHabit", data);
}

export default {
  saveHabit,
};
