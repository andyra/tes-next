import { Fragment } from "react";
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
      className={className ? className : "absolute top-12 right-12"}
      circle
      icon="X"
      variant="ghost"
    />
  </DialogPrimitive.Close>
);
