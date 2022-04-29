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
  ghost,
  onClick,
  size = "base",
  type = "button",
  url
}) {
  const buttonClasses = cn({
    "flex items-center justify-center gap-4 transition": true,
    "rounded-full hover:bg-primary-10": true,
    "border border-primary-25": !ghost,
    "opacity-50 pointer-events-none": disabled,
    "bg-accent hover:bg-accent-75": active,
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
