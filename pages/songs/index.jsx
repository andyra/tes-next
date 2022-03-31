export default function Songs() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Songs</h1>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Songs",
    },
  };
}
