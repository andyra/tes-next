import PageTitle from "../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function About() {
  return (
    <>
      <PageTitle>Setlist Computor</PageTitle>
      <fieldset>
        <label for="length">Songs</label>
        <input id="length" type="number" initialValue={10} />
      </fieldset>
      <fieldset>
        <label for="bleeds">Bleeds</label>
        <input id="bleeds" type="number" initialValue={10} />
      </fieldset>
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
