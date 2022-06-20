import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import cn from "classnames";
import Icon, { ICON_NAMES } from "./Icon";

export const BUTTON_SIZES = {
  sm: {
    height: "h-32 text-base",
    width: "w-32",
    padding: "px-16"
  },
  base: {
    height: "h-40 text-lg",
    width: "w-40",
    padding: "px-20"
  },
  lg: {
    height: "h-48 text-lg",
    width: "w-48",
    padding: "px-24"
  },
  xl: {
    height: "h-64 text-2xl",
    width: "w-64",
    padding: "px-32"
  }
};

export const BUTTON_VARIANTS = {
  ghost: "hover:bg-primary-5 focus:bg-primary-5",
  glass: "bg-primary-5 hover:bg-primary-10 focus:bg-primary-10",
  outline: "border-2 hover:border-current"
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
    "inline-flex items-center justify-center gap-4 rounded-full whitespace-nowrap text-ellipsis overflow-hidden transition": true,
    [BUTTON_VARIANTS[variant]]: true,
    "opacity-50 pointer-events-none": disabled,
    "bg-primary hover:bg-primary-75 focus:bg-primary-75 text-ground": active,
    [BUTTON_SIZES[size].height]: true,
    [BUTTON_SIZES[size].padding]: !circle,
    [BUTTON_SIZES[size].width]: circle,
    [className]: className
  });
}

const Button = ({
  active,
  children,
  circle,
  className,
  disabled,
  href,
  iconLeft,
  iconRight,
  size,
  type,
  variant,
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

Button.propTypes = {
  active: PropTypes.bool,
  circle: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconLeft: PropTypes.oneOf(Object.keys(ICON_NAMES)),
  iconRight: PropTypes.oneOf(Object.keys(ICON_NAMES)),
  size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)).isRequired,
  type: PropTypes.oneOf(["button", "reset", "submit"]).isRequired,
  variant: PropTypes.oneOf(Object.keys(BUTTON_VARIANTS)).isRequired
};

Button.defaultProps = {
  size: "base",
  type: "button",
  variant: "outline"
};

export default Button;
