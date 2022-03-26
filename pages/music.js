export default function Music() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Music</h1>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Music"
    },
  };
}
