import Moment from "moment";

export default function NiceDate({ className, date }) {
  return (
    <time className={className}>{Moment(date).format("MMM D, YYYY")}</time>
  );
}
