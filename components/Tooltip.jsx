import * as Tooltip from "@radix-ui/react-tooltip";

export default function TooltipComponent({
  children,
  content,
  delayDuration = 700
}) {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Content
          className="bg-primary text-ground rounded px-8 py-4 text-sm"
          sideOffset={4}
        >
          <Tooltip.Arrow className="fill-primary" offset={12} />
          {content}
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
