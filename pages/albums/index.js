export default function Albums() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Wiki</h1>
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
