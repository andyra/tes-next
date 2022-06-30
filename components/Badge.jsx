import PropTypes from "prop-types";
import cn from "classnames";

const BADGE_SIZES = {
  xs: "text-xs h-24 px-8",
  sm: "text-sm h-24 px-8",
  base: "text-base h-32 px-12",
  lg: "text-base h-40 px-16"
};

const Badge = ({ children, className, size }) => {
  const classes = cn(
    "flex items-center justify-center gap-4 rounded-full w-fit",
    "bg-primary-5 text-primary-75",
    BADGE_SIZES[size],
    className
  );

  return <span className={classes}>{children}</span>;
};

Badge.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(BADGE_SIZES))
};

Badge.defaultProps = {
  size: "base"
};

export default Badge;
