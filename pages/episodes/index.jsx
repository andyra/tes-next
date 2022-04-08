import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";
import EpisodeList from "./components/EpisodeList";

// Default
// ----------------------------------------------------------------------------

export default function Episodes() {
  return (
    <>
      <PageTitle>Episodes</PageTitle>
      <ClientOnly>
        <EpisodeList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Episodes"
    }
  };
}
