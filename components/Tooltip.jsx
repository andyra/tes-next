import * as Tooltip from "@radix-ui/react-tooltip";

export default function TooltipComponent({
  asChild,
  children,
  content,
  delayDuration = 700,
  side = "top"
}) {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>
        <Tooltip.Content
          className="bg-primary text-ground rounded px-8 py-4 text-sm"
          sideOffset={4}
          side={side}
        >
          <Tooltip.Arrow className="fill-primary" offset={12} />
          {content}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
