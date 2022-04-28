import Moment from "moment";

export default function NiceDate({ className, date }) {
  if (!date) {
    console.error("Invalid date for NiceDate");
    return false;
  }

  return (
    <time className={className}>{Moment(date).format("MMM D, YYYY")}</time>
  );
}
