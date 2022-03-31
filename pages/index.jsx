import Queue from "../components/Queue";
import Tracklist from "../components/Tracklist";
import { ITEMS_TEST } from "../constants.js";

export default function Home() {
  return (
    <>
      <Tracklist items={ITEMS_TEST} />
      <Queue modal={false} />
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
