import { Fragment } from "react";
import PropTypes from "prop-types";
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

export const DialogContent = ({ className, children, ...delegated }) => {
  const classes = cn(
    "w-full max-w-screen-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-dialog-content",
    "bg-ground rounded-lg border-2",
    "radix-state-open:animate-slide-up-fade",
    className
  );

  return (
    <DialogPrimitive.Content className={classes}>
      {children}
    </DialogPrimitive.Content>
  );
};

export const DialogClose = ({ className }) => (
  <DialogPrimitive.Close asChild>
    <Button
      className={className ? className : "absolute top-12 right-12"}
      circle
      iconLeft="X"
      variant="ghost"
    />
  </DialogPrimitive.Close>
);

const Dialog = ({ children, className, title, titleClassName, trigger }) => {
  const titleClasses = cn({
    "font-medium text-2xl mb-16": !titleClassName,
    [titleClassName]: titleClassName
  });

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogContent className={className}>
          <DialogPrimitive.Title className={titleClasses}>
            {title}
          </DialogPrimitive.Title>
          <DialogClose />
          {children}
        </DialogContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

DialogPrimitive.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string
};

export default Dialog;
