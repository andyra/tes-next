import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import cn from "classnames";
import Icon, { ICON_NAMES } from "components/Icon";
import Tooltip from "components/Tooltip";

export const BUTTON_SIZES = {
  sm: {
    height: "h-32 text-base",
    width: "w-32",
    padding: "px-12",
  },
  base: {
    height: "h-40 text-lg",
    width: "w-40",
    padding: "px-16",
  },
  lg: {
    height: "h-48 text-lg",
    width: "w-48",
    padding: "px-20",
  },
  xl: {
    height: "h-64 text-2xl",
    width: "w-64",
    padding: "px-24",
  },
};

export const BUTTON_VARIANTS = {
  ghost: "hover:bg-primary-5 focus:bg-primary-5",
  glass: "bg-primary-5 hover:bg-primary-10 focus:bg-primary-10",
  outline: "border-2 hover:border-current",
};

const Button = React.forwardRef(
  (
    {
      active,
      children,
      circle,
      className,
      disabled,
      href,
      icon,
      iconLeft,
      iconRight,
      size,
      type,
      variant,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-4 rounded-full whitespace-nowrap text-ellipsis overflow-hidden transition",
      "focus:outline-none focus:ring-2 focus:ring-primary-10",
      [BUTTON_VARIANTS[variant]],
      [BUTTON_SIZES[size].height],
      circle ? [BUTTON_SIZES[size].width] : [BUTTON_SIZES[size].padding],
      className,
      {
        "opacity-50 pointer-events-none": disabled,
        "bg-primary hover:bg-primary-75 focus:bg-primary-75 text-ground":
          active,
      }
    );

    const blankLinkAttrs = {};
    if (props.target === "_blank") {
      blankLinkAttrs["rel"] = "noopener noreferrer";
    }

    return href ? (
      (<Link href={href} {...props} className={classes} ref={ref} {...blankLinkAttrs}>

        {icon && <Icon name={icon} />}
        {iconLeft && <Icon name={iconLeft} className="-translate-x-1/4" />}
        {children}
        {iconRight && <Icon name={iconRight} className="translate-x-1/4" />}

      </Link>)
    ) : (
      <button
        {...props} // Pass in first so className isn't overwritten by spread props
        className={classes}
        disabled={disabled}
        type={type}
        ref={ref}
      >
        {icon && <Icon name={icon} />}
        {iconLeft && <Icon name={iconLeft} />}
        {children}
        {iconRight && <Icon name={iconRight} />}
      </button>
    );
  }
);

Button.propTypes = {
  active: PropTypes.bool,
  circle: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.oneOf(Object.keys(ICON_NAMES)),
  iconLeft: PropTypes.oneOf(Object.keys(ICON_NAMES)),
  iconRight: PropTypes.oneOf(Object.keys(ICON_NAMES)),
  size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)).isRequired,
  type: PropTypes.oneOf(["button", "reset", "submit"]).isRequired,
  variant: PropTypes.oneOf(Object.keys(BUTTON_VARIANTS)).isRequired,
};

Button.defaultProps = {
  size: "base",
  type: "button",
  variant: "outline",
};

Button.displayName = "Button";
export default Button;
