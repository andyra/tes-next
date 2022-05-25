import Moment from "moment";

export const NiceDate = ({ className, date, format = "full" }) => {
  if (!date) {
    console.error("Invalid date for NiceDate");
    return false;
  }

  const FORMATS = {
    full: "MMM D, YYYY",
    year: "YYYY"
  };

  return (
    <time className={className}>{Moment(date).format(FORMATS[format])}</time>
  );
};

export default NiceDate;
