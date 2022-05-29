import cn from "classnames";

const Loader = ({ className = "h-20 w-20" }) => {
  const classes = cn({
    "border-2 border-current border-b-transparent rounded-full block animate-spin": true,
    [className]: className
  });

  return <span className={classes} />;
};

export default Loader;
