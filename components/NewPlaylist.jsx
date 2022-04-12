import { Fragment, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";
import Icon from "./Icon";

// Components
// ----------------------------------------------------------------------------

// https://www.apollographql.com/docs/react/v2/data/mutations/
// https://hasura.io/learn/graphql/nextjs-fullstack-serverless/mutations-variables/2-query-variables/
// https://www.apollographql.com/docs/react/data/mutations/

// TODO
// - Pass in authorId once we can figure that out
// - Return success message

const NEW_PLAYLIST = gql`
  mutation newPlaylist($title: String) {
    save_playlists_default_Entry(title: $title, authorId: 1) {
      title
    }
  }
`;

const NewPlaylistForm = () => {
  let input;
  const [title, setTitle] = useState("");
  const [newPlaylist, { data, loading, error }] = useMutation(NEW_PLAYLIST, {
    onCompleted(data) {
      console.log("COMPLETED!");
      console.log(data);
      loading = false;
      // close here
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    newPlaylist({
      variables: {
        title: title
      }
    });
  }

  return (
    <form className="space-y-24" onSubmit={e => handleSubmit(e)}>
      <label htmlFor="title" className="sr-only">
        Playlist Title
      </label>
      <input
        className="border rounded block w-full p-8"
        id="title"
        name="title"
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        ref={n => (input = n)}
        type="text"
        value={title}
      />
      {error && (
        <div className="text-red-500">Mutation error! {error.message}</div>
      )}
      <Button type="submit">{loading ? "Creating…" : "Create Playlist"}</Button>
    </form>
  );
};

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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/10 backdrop-blur-md" />
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
            <NewPlaylistForm />
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
