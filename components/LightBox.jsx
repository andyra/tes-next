import { Fragment } from "react";
import PropTypes from "prop-types";
import * as Dialog from "@radix-ui/react-dialog";
import cn from "classnames";
import { getButtonClasses } from "components/Button";
import Icon from "components/Icon";

const LightBox = ({ children, className, title, titleClassName, trigger }) => {
  const contentClasses = cn(
    "bg-ground w-full h-full p-24 z-dialog-content",
    "fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center",
    "radix-state-open:animate-slide-up-fade"
  );

  const closeClasses = cn(
    "absolute top-12 right-12",
    getButtonClasses({ circle: true, variant: "ghost" })
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 z-dialog backdrop-blur-md bg-ground/30 radix-state-open:animate-fade-in" />
        <Dialog.Content className={contentClasses}>
          {children}
          <Dialog.Close className={closeClasses}>
            <Icon name="X" />
          </Dialog.Close>
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
