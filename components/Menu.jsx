import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Icon from "./Icon";

// Components
// ----------------------------------------------------------------------------

export const MenuItem = ({
  children,
  className,
  href,
  iconLeft,
  iconRight,
  ...other
}) => {
  const itemClasses = cn({
    "flex items-center gap-8 h-32 px-12 w-full rounded hover:bg-primary-5 transition": true,
    [className]: className
  });

  return href ? (
    <a href={href} className={itemClasses} {...other}>
      {iconLeft && <Icon name={iconLeft} className="opacity-50" />}
      {children}
      {iconRight && <Icon name={iconRight} className="opacity-50" />}
    </a>
  ) : (
    <button className={itemClasses} {...other}>
      {iconLeft && <Icon name={iconLeft} className="opacity-50" />}
      {children}
      {iconRight && <Icon name={iconRight} className="opacity-50" />}
    </button>
  );
};

export const MenuHeading = ({ children }) => (
  <header className="flex items-center h-32 px-12 text-sm text-primary-50">
    {children}
  </header>
);

export const MenuDivider = () => <hr className="mx-12 my-8" />;

// Base
// ----------------------------------------------------------------------------

export const Menu = ({ children, side = "bottom", trigger, width }) => {
  const contentClasses = cn({
    "bg-ground border border-primary-10 rounded-lg p-8 shadow-lg": true,
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down": true,
    [width]: width
  });

  return (
    <Popover.Root>
      <Popover.Anchor>
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      </Popover.Anchor>
      <Popover.Content side={side} className={contentClasses} sideOffset={4}>
        {children}
      </Popover.Content>
    </Popover.Root>
  );
};
