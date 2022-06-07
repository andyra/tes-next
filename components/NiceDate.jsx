import PropTypes from "prop-types";
import Moment from "moment";

const FORMATS = {
  full: "MMM D, YYYY",
  year: "YYYY"
};

const NiceDate = ({ className, date, format = "full" }) => (
  <time className={className}>{Moment(date).format(FORMATS[format])}</time>
);

NiceDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.keys(FORMATS)).isRequired
};

export default NiceDate;
