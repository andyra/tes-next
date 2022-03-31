export default function About() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">About</h1>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "About"
    },
  };
}
