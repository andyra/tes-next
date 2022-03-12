import { useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AppContext from "./AppContext";

export default function Player () {
  const value = useContext(AppContext);

  function togglePlay() {
    value.state.playing ? value.setPlaying(false) : value.setPlaying(true)
  }

  const CurrentlyPlaying = () => {
    return (
      <div className="flex items-center gap-8 w-1/4">
        <figure className="h-48 w-48 bg-blue-200 rounded flex items-center justify-center text-2xl">
          {value.state.currentTrack.id}
        </figure>
        <div>
          <div className="text-sm font-medium">{value.state.currentTrack.title}</div>
          <div className="text-xs text-gray-500">Artist</div>
        </div>
      </div>
    )
  }

  const PlayerControls = () => {
    return (
      <div className="flex-1 flex items-center justify-center gap-8">
        <button onClick={togglePlay} className={`border px-12 py-8 ${value.state.playing ? "bg-green-200" : ""}`}>
          {value.state.playing ? "PAUSE" : "PLAY"}
        </button>
      </div>
    )
  }

  const ExtraControls = () => {
    return (
      <div className="flex items-center justify-end gap-8 w-1/4">
        <Dialog.Root>
          <Dialog.Trigger className="flex items-center px-12 h-32 border rounded-full">
            Queue
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/50 absolute top-0 left-0 h-screen w-screen p-24">
              <Dialog.Content className="p-24 bg-white relative">
                <Dialog.Title>QUEUE</Dialog.Title>
                <Dialog.Close className="absolute top-16 right-16 p-8">
                  Close
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    )
  }

  return (
    <aside className="absolute bottom-0 left-0 w-full border-t p-8 flex items-center justify-between">
      <CurrentlyPlaying />
      <PlayerControls />
      <ExtraControls />
    </aside>
  )
}
