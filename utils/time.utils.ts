import { DateTime } from "luxon";

export function countReleaseDays(date: string) {
  const releaseDate = DateTime.fromISO(date);
  const today = DateTime.now();

  return Math.floor(releaseDate.diff(today, "days").days);
}

export function formatDate(date: Date | string) {
  const dateToFormat = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "short",
    dateStyle: "medium",
  }).format(dateToFormat);
}
