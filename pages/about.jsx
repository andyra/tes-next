import PageTitle from "../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function About() {
  return (
    <>
      <PageTitle>About</PageTitle>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "About"
    }
  };
}
