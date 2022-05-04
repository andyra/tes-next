import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";
import EpisodeList from "./components/EpisodeList";

// Default
// ----------------------------------------------------------------------------

export default function Episodes() {
  return (
    <>
      <PageTitle>This Evening's Show Podcast</PageTitle>
      <section className="flex items-center gap-48">
        <figure className="w-1/4 aspect-square bg-primary-5" />
        <h1 className="flex-1 text-xl">
          <strong>This Evening's Show</strong> is a radio broadcast transmitting
          from an abandoned monorail station outside Adobe Skyscraper. Tune in
          as your hosts guide you through a cavalcade of bizarre characters,
          historic factoids, surreal comedy, improvised news, interviews, and
          original music.
        </h1>
      </section>
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
