import PropTypes from "prop-types";
import cn from "classnames";

export const QueryError = ({ children, className, error }) => {
  const classes = cn({
    "p-16 bg-accent-5 rounded-lg": true,
    [className]: className
  });

  return (
    <div className={classes}>
      <div className="font-medium">Query Error</div>
      <pre>{error}</pre>
      {children}
    </div>
  );
};

QueryError.propTypes = {
  className: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default QueryError;
