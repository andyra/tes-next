import PropTypes from "prop-types";
import * as Dialog from "@radix-ui/react-dialog";
import cn from "classnames";
import Button from "components/Button";
import { DialogClose, DialogOverlay } from "components/Dialog";

const LightBox = ({ children, className, title, titleClassName, trigger }) => {
  const contentClasses = cn(
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-dialog-content",
    "w-full max-w-screen-lg p-24",
    "radix-state-open:animate-slide-up-fade"
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content className={contentClasses}>
          {children}
          <DialogClose className="absolute top-0 -right-16 translate-x-full" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string
};

export default LightBox;
