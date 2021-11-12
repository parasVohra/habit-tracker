import { parse, differenceInDays, isYesterday, isToday } from "date-fns";

const testData = [
  { date: "11112021", isComplete: true },
  { date: "10112021", isComplete: true },
  { date: "08112021", isComplete: true },
  { date: "12102021", isComplete: true },
  { date: "11102021", isComplete: true },
  { date: "09102021", isComplete: true },
  { date: "06102021", isComplete: true },
];

/**
 *
 * @param {Array} habitTrack
 * @returns Object with streak data
 */
function calculateLongestStreak(habitTrack) {
  const sortedDates = sortByDates(habitTrack, "asc");
  let result = sortedDates.reduce(
    (streak, habit) => {
      if (streak.previousDate === null) {
        streak.previousDate = habit.date;
      } else {
        if (habit.isComplete) {
          let preDate = parse(streak.previousDate, "ddMMyyyy", new Date());
          let currDate = parse(habit.date, "ddMMyyyy", new Date());
          let diff = differenceInDays(currDate, preDate);
          if (diff === 1) {
            if (streak.tempStartDate === null) {
              streak.tempStartDate = preDate;
            }

            streak.count = streak.count + 1;
            streak.longestStreak = Math.max(streak.count, streak.longestStreak);
            if (streak.count >= streak.longestStreak) {
              streak.startDate = streak.tempStartDate;
              streak.endDate = currDate;
            }
          } else {
            if (streak.count >= streak.longestStreak) {
              streak.endDate = preDate;
            }
            streak.tempStartDate = null;

            streak.count = 1;
          }

          streak.previousDate = habit.date;
        }
      }
      return streak;
    },
    {
      count: 1,
      longestStreak: 0,
      previousDate: null,
      tempStartDate: null,
      tempEndDate: null,
      startDate: null,
      endDate: null,
    }
  );
  return result;
}

/**
 *
 * @param {Array} habitTrack
 * @description
 *
 * This function will  calculate the current streak of a habit
 * First sort the habit tracker date in descending order
 * check if the latest date of habit tracked data is yesterday || today
 * run reducer to calculate the count of the continues streak
 *
 *
 * @returns Object with streak data
 */
function calculateCurrentStreak(habitTrack) {
  const sortedDates = sortByDates(habitTrack, "desc");
  const isLatestDateIsYesterday = isYesterday(
    parse(sortedDates[0].date, "ddMMyyyy", new Date())
  );
  const isLatestDateIsToday = isToday(
    parse(sortedDates[0].date, "ddMMyyyy", new Date())
  );

  if (isLatestDateIsYesterday || isLatestDateIsToday) {
    return calculateRecentContinuousStreak(sortedDates);
  }

  if (!isLatestDateIsToday && !isLatestDateIsYesterday) {
    return {
      currentStreak: 0,
      startDate: null,
      endDate: null,
    };
  }
}

/**
 *
 * @param {Array} trackData
 * @returns
 */
function calculateRecentContinuousStreak(trackData) {
  const result = trackData.reduce(
    (streak, trackData) => {
      if (streak.previousDate === null) {
        streak.previousDate = trackData.date;
      } else {
        if (trackData.isComplete) {
          let preDate = parse(streak.previousDate, "ddMMyyyy", new Date());
          let currDate = parse(trackData.date, "ddMMyyyy", new Date());
          let diff = differenceInDays(preDate, currDate);
          if (diff === 1) {
            if (streak.tempStartDate === null) {
              streak.tempStartDate = preDate;
            }
            streak.count += 1;
            streak.currentStreak = Math.max(streak.count, streak.currentStreak);
            streak.startDate = currDate;
            streak.endDate = streak.tempStartDate;
          } else {
            return streak;
          }
          streak.previousDate = trackData.date;
        }
      }
      return streak;
    },
    {
      count: 1,
      tempStartDate: null,
      previousDate: null,
      currentStreak: 1,
      startDate: null,
      endDate: null,
    }
  );

  return result;
}

/**
 *
 * @param {Array} habitTrack
 * @param {String} option  "asc" || "desc"
 * @returns Sorted Array by dates
 */
function sortByDates(habitTrack, option) {
  if (option === "asc") {
    const res = habitTrack.sort(
      (a, b) =>
        parse(a.date, "ddMMyyyy", new Date()) -
        parse(b.date, "ddMMyyyy", new Date())
    );
    return res;
  }
  if (option === "desc") {
    const res = habitTrack.sort(
      (a, b) =>
        parse(b.date, "ddMMyyyy", new Date()) -
        parse(a.date, "ddMMyyyy", new Date())
    );
    return res;
  }
}

export {
  calculateLongestStreak,
  calculateCurrentStreak,
  calculateRecentContinuousStreak,
  sortByDates,
};
