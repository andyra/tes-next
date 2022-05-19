import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";

export default function Menu({ children, trigger }) {
  const contentClasses = cn({
    "bg-ground border border-primary-10 rounded-lg p-8 shadow-lg": true,
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down": true
  });

  return (
    <Popover.Root>
      <Popover.Anchor>
        <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      </Popover.Anchor>
      <Popover.Content className={contentClasses} sideOffset={4}>
        {children}
      </Popover.Content>
    </Popover.Root>
  );
}
