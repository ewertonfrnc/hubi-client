import { DateTime } from "luxon";

export function countReleaseDays(date: string) {
  const releaseDate = DateTime.fromISO(date);
  const today = DateTime.now();

  return Math.floor(releaseDate.diff(today, "days").days);
}
