import React, { forwardRef } from "react";
import Link from "next/link";
import cn from "classnames";
import Icon from "./Icon";

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

export function getButtonClasses({
  active,
  circle,
  className,
  disabled,
  size = "base",
  variant = "border"
} = {}) {
  return cn({
    "inline-flex items-center justify-center gap-4 rounded-full hover:bg-primary-10 transition": true,
    "border border-primary-10": variant === "border",
    "bg-primary-5 hover:bg-primary-10 focus:bg-primary-10": variant === "glass",
    "hover:bg-primary-5 focus:bg-primary-5": variant === "ghost",
    "opacity-50 pointer-events-none": disabled,
    "bg-primary hover:bg-primary-75 focus:bg-primary-75 text-ground": active,
    [SIZES[size].h]: true,
    [SIZES[size].p]: !circle,
    [SIZES[size].w]: circle,
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
