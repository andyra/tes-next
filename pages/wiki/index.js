export default function Wiki() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Wiki</h1>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Wiki"
    },
  };
}
