import PropTypes from "prop-types";
import Moment from "moment";

const FORMATS = {
  full: "MMM D, YYYY",
  year: "YYYY",
  monthYear: "MMM YYYY",
};

const NiceDate = ({ className, date, format }) => (
  <time className={className}>{Moment(date).format(FORMATS[format])}</time>
);

NiceDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.keys(FORMATS)).isRequired,
};

NiceDate.defaultProps = {
  format: "full",
};

export default NiceDate;
