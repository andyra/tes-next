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
  onClick,
  size = "base",
  type = "button",
  variant = "border",
  url
}) {
  const buttonClasses = cn({
    "flex items-center justify-center gap-4 rounded-full hover:bg-primary-10 transition": true,
    "border border-primary-10": variant === "border",
    "bg-primary-5 hover:bg-primary-10 focus:bg-primary-10": variant === "glass",
    "opacity-50 pointer-events-none": disabled,
    "bg-primary hover:bg-primary-75 text-ground": active,
    [SIZES[size].h]: true,
    [SIZES[size].p]: !circle,
    [SIZES[size].w]: circle,
    [className]: className
  });

  return url ? (
    <Link href={url}>
      <a className={buttonClasses}>{children}</a>
    </Link>
  ) : (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
