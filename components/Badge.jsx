import PropTypes from "prop-types";
import cn from "classnames";

const Badge = ({ children, className }) => {
  const classes = cn(
    "flex items-center justify-center gap-4 px-8 rounded-full w-fit relative",
    className
  );

  return (
    <span className={classes}>
      <span className="absolute top-0 left-0 w-full h-full rounded-full border border-current opacity-25 pointer-events-none" />
      {children}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string
};

export default Badge;
