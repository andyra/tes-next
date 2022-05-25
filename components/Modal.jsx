import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";

export const Modal = ({ children, isOpen, closeModal, title }) => (
  <Transition appear show={isOpen} as={Fragment}>
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
    >
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-500/10 backdrop-blur-md" />
      </Transition.Child>
      <Transition.Child
        as="section"
        className="relative bg-ground rounded-lg p-48 w-full max-w-screen-sm"
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Dialog.Title className="font-bold text-2xl">{title}</Dialog.Title>
        {children}
        <Button
          className="absolute top-16 right-16"
          circle
          iconLeft="X"
          onClick={closeModal}
        />
      </Transition.Child>
    </Dialog>
  </Transition>
);

export default Modal;
