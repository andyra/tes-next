import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cn from "classnames";
import Button from "components/Button";

export const DialogOverlay = () => {
  const classes = cn(
    "fixed top-0 right-0 bottom-0 left-0 z-dialog",
    "bg-primary-50 dark:bg-ground-75 backdrop-blur-md radix-state-open:animate-fade-in"
  );

  return <DialogPrimitive.Overlay className={classes} />;
};

export const DialogClose = ({ className }) => (
  <DialogPrimitive.Close asChild>
    <Button
      className={className ? className : "fixed top-12 right-12 z-10"}
      circle
      aria-label="Close"
      icon="X"
      variant="ghost"
    />
  </DialogPrimitive.Close>
);

export const DialogContent = React.forwardRef(
  ({ children, closeButton = true, ...props }, forwardedRef) => {
    const classes = cn(
      "absolute z-dialog-content overflow-y-auto",
      "p-16 md:p-24 rounded-lg bg-ground border-2 border-primary-25 radix-state-open:animate-slide-up-fade",
      "top-4 right-4 bottom-4 left-4 max-h-screen",
      "md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-screen-sm md:h-[90vh]"
    );

    return (
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={classes}
          {...props}
          ref={forwardedRef}
        >
          {children}
          {!!closeButton && <DialogClose />}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  }
);

DialogContent.displayName = "DialogContent";

export const Dialog = DialogPrimitive.Root;
export const DialogTitle = DialogPrimitive.Title;
export const DialogTrigger = DialogPrimitive.Trigger;
