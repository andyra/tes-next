import cn from "classnames";

const Badge = ({ children, className }) => {
  const classes = cn("px-12 relative", className);
  return (
    <span className={classes}>
      <span className="absolute top-0 left-0 w-full h-full rounded-full border border-current opacity-25 pointer-events-none" />
      {children}
    </span>
  );
};

export default Badge;
