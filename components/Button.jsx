import Link from "next/link";
import cn from "classnames";

const SIZES = {
  base: {
    h: "h-32 text-lg",
    w: "w-32",
    p: "px-12"
  },
  lg: {
    h: "h-40 text-xl",
    w: "w-40",
    p: "px-24"
  }
};

export default function Button({
  active,
  children,
  circle,
  className,
  disabled,
  size = "base",
  type = "button",
  variant = "border",
  url,
  ...other
}) {
  const buttonClasses = cn({
    "flex items-center justify-center gap-4 rounded-full hover:bg-primary-10 transition": true,
    "border border-primary-10": variant === "border",
    "bg-primary-5 hover:bg-primary-10 focus:bg-primary-10": variant === "glass",
    "hover:bg-primary-5 focus:bg-primary-5": variant === "ghost",
    "opacity-50 pointer-events-none": disabled,
    "bg-primary hover:bg-primary-75 text-ground": active,
    [SIZES[size].h]: true,
    [SIZES[size].p]: !circle,
    [SIZES[size].w]: circle,
    [className]: className
  });

  return url ? (
    <Link className={buttonClasses} href={url} {...other}>
      <a className={buttonClasses}>{children}</a>
    </Link>
  ) : (
    <button
      className={buttonClasses}
      disabled={disabled}
      type={type}
      {...other}
    >
      {children}
    </button>
  );
}
