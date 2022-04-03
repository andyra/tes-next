import Queue from "../components/Queue";
import Tracklist from "../components/Tracklist";
import { ITEMS_TEST } from "../constants.js";

import { useState } from "react";
import { Transition } from "@headlessui/react";

function MyComponent() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <button onClick={() => setIsShowing(isShowing => !isShowing)}>
        Toggle
      </button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        I will fade in and out
      </Transition>
    </>
  );
}

// Default
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <MyComponent />
      <Tracklist items={ITEMS_TEST} />
    </>
  );
}
