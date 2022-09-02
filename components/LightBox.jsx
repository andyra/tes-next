import React from "react";
import PropTypes from "prop-types";
import * as Dialog from "@radix-ui/react-dialog";
import cn from "classnames";
import Button from "components/Button";
import { DialogClose, DialogOverlay } from "components/Dialog";

const LightBox = React.forwardRef(
  (
    {
      children,
      className,
      title,
      titleClassName,
      trigger,
      triggerClassName,
      ...props
    },
    forwardedRef
  ) => {
    const contentClasses = cn(
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-dialog-content",
      "w-full max-w-screen-lg p-24",
      "radix-state-open:animate-slide-up-fade"
    );

    const triggerClasses = cn("cursor-pointer", triggerClassName);

    return (
      <Dialog.Root>
        <Dialog.Trigger className={triggerClasses}>{trigger}</Dialog.Trigger>
        <Dialog.Portal>
          <DialogOverlay />
          <Dialog.Content
            className={contentClasses}
            {...props}
            ref={forwardedRef}
          >
            {children}
            <DialogClose className="absolute top-0 -right-16 translate-x-full" />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

LightBox.displayName = "LightBox";
export default LightBox;
