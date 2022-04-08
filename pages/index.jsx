import Queue from "../components/Queue";
import Tracklist from "../components/Tracklist";
import { ITEMS_TEST } from "../constants.js";

// Default
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <Tracklist items={ITEMS_TEST} />
    </>
  );
}
