import { Fragment } from "react";
import PropTypes from "prop-types";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import cn from "classnames";
import { getButtonClasses } from "./Button";
import Icon from "./Icon";

export const DialogOverlay = () => (
  <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 z-20 backdrop-blur-md bg-ground/30 radix-state-open:animate-fade-in" />
);

export const DialogContent = ({ animationClass, className }) => {
  const classes = cn({
    "rounded-lg bg-ground border-2 relative z-30": true,
    "p-24": !className,
    "radix-state-open:animate-slide-up-fade": !animationClass,
    [className]: className
  });

  return <Dialog.Content className={classes}>{children}</Dialog.Content>;
};

export const Dialog = ({
  animationClass,
  children,
  className,
  title,
  titleClassName
}) => {
  const closeClasses = cn(
    "absolute top-12 right-12",
    getButtonClasses({ circle: true, variant: "ghost" })
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger />
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent animationClass={animationClass} className={className}>
          <Dialog.Title className={titleClassName}>{title}</Dialog.Title>
          <Dialog.Close className={closeClasses}>
            <Icon name="X" />
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string
};

export default Dialog;
