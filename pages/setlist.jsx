import Input from "../components/Input";
import PageTitle from "../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function About() {
  return (
    <>
      <PageTitle>Setlist Computor</PageTitle>
      <Input label="Length" name="length" type="number" value={10} />
      <Input label="Bleeds" name="bleeds" type="number" value={10} />
      <Input label="Strategies" name="strategies" type="number" value={10} />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Setlist Computor"
    }
  };
}
