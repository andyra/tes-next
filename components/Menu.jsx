import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Icon from "./Icon";

// Menu Item
// ----------------------------------------------------------------------------

export const MenuItem = ({
  children,
  className,
  href,
  iconLeft,
  iconRight,
  ...props
}) => {
  const itemClasses = cn({
    "flex items-center gap-8 h-32 px-12 w-full rounded hover:bg-primary-5 transition": true,
    [className]: className
  });

  return href ? (
    <a href={href} className={itemClasses} {...props}>
      {iconLeft && <Icon name={iconLeft} className="opacity-50" />}
      {children}
      {iconRight && <Icon name={iconRight} className="opacity-50" />}
    </a>
  ) : (
    <button className={itemClasses} {...props}>
      {iconLeft && <Icon name={iconLeft} className="opacity-50" />}
      {children}
      {iconRight && <Icon name={iconRight} className="opacity-50" />}
    </button>
  );
};

MenuItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string
};

// Menu Heading
// ----------------------------------------------------------------------------

export const MenuHeading = ({ children }) => (
  <header className="flex items-center h-32 px-12 text-sm text-primary-50">
    {children}
  </header>
);

// Menu Divider
// ----------------------------------------------------------------------------

export const MenuDivider = () => (
  <hr className="mx-12 my-8 border-t-primary-10" />
);

// Menu
// ----------------------------------------------------------------------------

export const Menu = ({ children, side, trigger, triggerClassName, width }) => {
  const contentClasses = cn(
    "bg-ground border border-primary-10 rounded-lg p-8 shadow-lg",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
    width
  );

  return (
    <Popover.Root>
      <Popover.Anchor>
        <Popover.Trigger className={triggerClassName}>
          {trigger}
        </Popover.Trigger>
      </Popover.Anchor>
      <Popover.Content side={side} className={contentClasses} sideOffset={4}>
        {children}
      </Popover.Content>
    </Popover.Root>
  );
};

Menu.propTypes = {
  side: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  width: PropTypes.string
};

Menu.defaultProps = {
  side: "bottom"
};
