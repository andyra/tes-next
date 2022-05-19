import Moment from "moment";

export function formatTime(time) {
  const t = Moment.duration(time, "seconds");
  const { hours, minutes, seconds } = t._data;

  const h = hours > 0 ? `${hours}:` : "";
  const m = minutes > 0 ? `${minutes}:` : "0:";
  const s = seconds > 9 ? seconds : `0${seconds}`;

  return `${h}${m}${s}`;
}
