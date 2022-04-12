import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import Icon from "./Icon";

// Default
// ----------------------------------------------------------------------------

export default function NewPlaylistButton() {
  let [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Button circle onClick={openModal}>
        <Icon name="add" />
      </Button>

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
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as="section"
            className="relative bg-white rounded-lg p-48 w-full max-w-screen-sm"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Button
              className="absolute top-16 right-16"
              circle
              onClick={closeModal}
            >
              <Icon name="close" />
            </Button>
            <Dialog.Title className="font-bold text-2xl">
              New Playlist
            </Dialog.Title>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
