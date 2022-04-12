import Link from "next/link";
import cn from "classnames";

const SIZES = {
  base: {
    h: "h-32",
    w: "w-32",
    p: "px-12"
  },
  lg: {
    h: "h-48",
    w: "w-48",
    p: "px-24"
  }
};

export default function Button({
  children,
  circle,
  className,
  disabled,
  onClick,
  size = "base",
  type = "button",
  url
}) {
  const buttonClasses = cn({
    "flex items-center justify-center transition": true,
    "border dark:border-white/20 rounded-full hover:bg-hover": true,
    "opacity-50 pointer-events-none": disabled,
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
