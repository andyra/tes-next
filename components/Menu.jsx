import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";

// Menu Item
// ----------------------------------------------------------------------------

export const MenuItem = ({ children, className, href, icon, ...props }) => {
  const itemClasses = cn({
    "flex items-center gap-8 h-32 px-12 w-full rounded-full hover:bg-primary-5 transition": true,
    [className]: className
  });

  return href ? (
    <a href={href} className={itemClasses} {...props}>
      {icon && <Icon name={icon} className="opacity-50" />}
      {children}
    </a>
  ) : (
    <button className={itemClasses} {...props} type="button">
      {icon && <Icon name={icon} className="opacity-50" />}
      {children}
    </button>
  );
};

MenuItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.string
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

export const Menu = ({
  children,
  side,
  tooltipContent,
  tooltipSide,
  trigger,
  triggerClassName,
  width
}) => {
  const contentClasses = cn(
    "bg-ground border rounded-lg p-8 shadow-lg",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
    width
  );

  return (
    <Popover.Root>
      <Popover.Anchor>
        {tooltipContent ? (
          <Tooltip content={tooltipContent} side={tooltipSide} asChild>
            <Popover.Trigger className={triggerClassName}>
              {trigger}
            </Popover.Trigger>
          </Tooltip>
        ) : (
          <Popover.Trigger className={triggerClassName}>
            {trigger}
          </Popover.Trigger>
        )}
      </Popover.Anchor>
      <Popover.Content side={side} className={contentClasses} sideOffset={4}>
        {children}
      </Popover.Content>
    </Popover.Root>
  );
};

Menu.propTypes = {
  side: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  tooltipContent: PropTypes.string,
  tooltipSide: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  width: PropTypes.string
};

Menu.defaultProps = {
  side: "bottom"
};
