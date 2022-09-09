import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import cn from "classnames";
import Icon from "components/Icon";
import Tooltip from "components/Tooltip";

// Components
// ----------------------------------------------------------------------------

export const DropdownItem = ({
  className,
  href,
  icon,
  selectable,
  selected,
  title,
  ...props
}) => {
  const classes = cn(
    "flex items-center gap-8 h-40 md:h-32 px-12 w-full min-w-[128px] rounded-full transition",
    "hover:bg-ground-5",
    selected
      ? "text-accent hover:text-accent"
      : "text-ground hover:text-ground",
    className
  );

  return href ? (
    <a href={href} className={classes} {...props}>
      {!!icon && <Icon name={icon} className="opacity-50 -ml-4" />}
      {title}
      {!!selectable && (
        <Icon
          name="Check"
          className={`ml-auto ${selected ? "" : "opacity-0"}`}
        />
      )}
    </a>
  ) : (
    <button className={classes} {...props} type="button">
      {!!icon && <Icon name={icon} className="opacity-50 -ml-4" />}
      {title}
      {!!selectable && (
        <Icon
          name="Check"
          className={`ml-auto ${selected ? "" : "opacity-0"}`}
        />
      )}
    </button>
  );
};

export const DropdownHeading = ({ title }) => (
  <header className="flex items-center h-32 px-12 text-sm text-ground-50">
    {title}
  </header>
);

export const DropdownDivider = () => (
  <hr className="mx-12 my-8 border-t-ground-10" />
);

export const DropdownMenu = ({
  asChild,
  children,
  className,
  tooltip,
  trigger,
  zIndex = "z-dropdown"
}) => {
  const classes = cn(
    "bg-primary rounded-lg p-8 shadow-lg font-base",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
    zIndex,
    className
  );

  return (
    <DropdownMenuPrimitive.Root>
      {tooltip ? (
        <Tooltip content={tooltip} asChild>
          <DropdownMenuPrimitive.Trigger asChild={asChild}>
            {trigger}
          </DropdownMenuPrimitive.Trigger>
        </Tooltip>
      ) : (
        <DropdownMenuPrimitive.Trigger asChild={asChild}>
          {trigger}
        </DropdownMenuPrimitive.Trigger>
      )}
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className={classes}
          arrowPadding={8}
          collisionPadding={4}
        >
          {children}
          <DropdownMenuPrimitive.Arrow
            width={16}
            height={8}
            className="fill-primary z-10 -translate-y-1"
          />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};
