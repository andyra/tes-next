import Link from "next/link";
import cn from "classnames";

export default function Button({
  children,
  circle,
  className,
  onClick,
  url
}) {
  const buttonClasses = cn({
    "flex items-center justify-center h-32 transition": true,
    "border rounded-full hover:bg-gray-100 dark:hover:bg-white/10": true,
    "w-32": circle,
    "px-12": !circle,
    [className]: className
  });

  return (
    url ? (
      <Link href={url}>
        <a className={buttonClasses}>
          {children}
        </a>
      </Link>
    ) : (
      <button className={buttonClasses} onClick={onClick}>
        {children}
      </button>
    )
  )
}
