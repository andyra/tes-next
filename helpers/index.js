import { gql } from "@apollo/client";
import Moment from "moment";

export function formatTime(time) {
  const t = Moment.duration(time, "seconds");
  const { hours, minutes, seconds } = t._data;

  const h = hours > 0 ? `${hours}:` : "";
  const m = minutes > 0 ? `${minutes}:` : "0:";
  const s = seconds > 9 ? seconds : `0${seconds}`;

  return `${h}${m}${s}`;
}

export function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// A clean way of building a GraphQL query to get a list of slugs for a section
export function querySlugs(section) {
  return gql`
    query Entries {
      entries(section: "${section}") {
        slug
      }
    }
  `;
}
