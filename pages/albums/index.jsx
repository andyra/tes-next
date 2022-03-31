import Albums from "../../components/Albums";
import ClientOnly from "../../components/ClientOnly";

export default function Albums() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Albums</h1>
      <ClientOnly>
        <Albums />
      </ClientOnly>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Albums",
    },
  };
}
