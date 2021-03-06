import { Fragment } from "react";
import PropTypes from "prop-types";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cn from "classnames";
import Button from "components/Button";

const Dialog = ({
  animationClass,
  children,
  className,
  title,
  titleClassName,
  trigger
}) => {
  const contentClasses = cn({
    "w-full max-w-screen-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ground rounded-lg border-2 z-dialog-content": true,
    "p-24": !className,
    "radix-state-open:animate-slide-up-fade": !animationClass,
    [className]: className
  });

  const titleClasses = cn({
    "font-medium text-2xl mb-16": !titleClassName,
    [titleClassName]: titleClassName
  });

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-md bg-primary-5 radix-state-open:animate-fade-in z-dialog" />
        <DialogPrimitive.Content className={contentClasses}>
          <DialogPrimitive.Title className={titleClasses}>
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <Button
              label="Close dialog"
              className="absolute top-12 right-12"
              circle
              icon="X"
              variant="ghost"
            />
          </DialogPrimitive.Close>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

DialogPrimitive.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string
};

export default Dialog;
