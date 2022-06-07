import PropTypes from "prop-types";
import cn from "classnames";

export const Empty = ({ children, className }) => {
  const classes = cn({
    "p-16 bg-primary-5 rounded-lg text-primary-50 text-center": true,
    [className]: className
  });

  return <div className={classes}>{children}</div>;
};

Empty.propTypes = {
  className: PropTypes.string.isRequired
};

export default Empty;
