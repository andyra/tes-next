import cn from "classnames";

export default function Icon({ className, name, solid }) {
  const classes = cn({
    "text-current flex": true,
    [className]: className
  });

  return (
    <span className={classes}>
      <ion-icon name={solid ? name : `${name}-outline`} />
    </span>
  );
}
