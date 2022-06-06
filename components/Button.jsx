import React, { forwardRef } from "react";
import Link from "next/link";
import cn from "classnames";
import Icon from "./Icon";

const SIZES = {
  sm: {
    height: "h-32",
    width: "w-32",
    padding: "px-16",
  },
  base: {
    height: "h-48 text-lg",
    width: "w-48",
    padding: "px-24",
  },
  lg: {
    height: "h-64 text-2xl",
    width: "w-64",
    padding: "px-32",
  },
};

export function getButtonClasses({
  active,
  circle,
  className,
  disabled,
  size = "base",
  variant = "outline"
} = {}) {
  return cn({
    "inline-flex items-center justify-center gap-4 rounded-full transition": true,
    "border-2 border-primary-10 hover:border-current": variant === "outline",
    "bg-primary-5 hover:bg-primary-10 focus:bg-primary-10": variant === "glass",
    "hover:bg-primary-5 focus:bg-primary-5": variant === "ghost",
    "opacity-50 pointer-events-none": disabled,
    "bg-primary hover:bg-primary-75 focus:bg-primary-75 text-ground": active,
    [SIZES[size].height]: true,
    [SIZES[size].padding]: !circle,
    [SIZES[size].width]: circle,
    [className]: className
  });
}

export const TestButton = ({
  active,
  children,
  circle,
  className,
  disabled,
  size,
  variant
}) => {
  const classes = getButtonClasses({
    variant: variant,
    disabled: disabled,
    active: active,
    circle: circle,
    className: className,
    size: size
  });

  return <button className={classes}>{children}</button>;
};

const Button = ({
  active,
  children,
  circle,
  className,
  disabled,
  iconLeft,
  iconRight,
  size,
  type = "button",
  variant,
  href,
  ...props
}) => {
  const classes = getButtonClasses({
    variant: variant,
    disabled: disabled,
    active: active,
    circle: circle,
    className: className,
    size: size
  });

  return href ? (
    <Link className={classes} href={href} {...props}>
      <a className={classes}>
        {iconLeft && <Icon name={iconLeft} />}
        {children}
        {iconRight && <Icon name={iconRight} />}
      </a>
    </Link>
  ) : (
    <button className={classes} disabled={disabled} type={type} {...props}>
      {iconLeft && <Icon name={iconLeft} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
};

export default Button;
