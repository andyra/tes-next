import { gql } from "@apollo/client";
import Moment from "moment";

// Format Time
// ----------------------------------------------------------------------------

export function formatTime(time) {
  const t = Moment.duration(time, "seconds");
  const { hours, minutes, seconds } = t._data;

  const h = hours > 0 ? `${hours}:` : "";
  const m =
    minutes > 0 ? (minutes < 10 ? `0${minutes}:` : `${minutes}:`) : "0:";
  const s = seconds > 9 ? seconds : `0${seconds}`;

  return `${h}${m}${s}`;
}

// Debounce
// ----------------------------------------------------------------------------

export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// Shuffle
// Pass in an array and get it back all mixed-up
// https://bost.ocks.org/mike/shuffle/
// ----------------------------------------------------------------------------

export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
}

// Slugify
// ----------------------------------------------------------------------------

export function slugify(str) {
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Split up camelCase strings
// ----------------------------------------------------------------------------

export function camelCaseToWords(str) {
  return str.replace(/([A-Z])/g, " $1").trim();
}
