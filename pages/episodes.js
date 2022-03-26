export default function Episodes() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Episodes</h1>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Episodes"
    },
  };
}
