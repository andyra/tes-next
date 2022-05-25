import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const Tooltip = ({
  asChild,
  children,
  content,
  delayDuration = 700,
  side = "top"
}) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild={asChild}>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        className="bg-primary text-ground rounded px-8 py-4 text-sm"
        sideOffset={4}
        side={side}
      >
        <TooltipPrimitive.Arrow className="fill-primary" offset={12} />
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

export default Tooltip;
