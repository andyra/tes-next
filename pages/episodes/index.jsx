import ClientOnly from "../../components/ClientOnly";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import PageTitle from "../../components/PageTitle";
import EpisodeList from "./components/EpisodeList";

// Default
// ----------------------------------------------------------------------------

export default function Episodes() {
  return (
    <>
      <PageTitle center>This Evening's Show Podcast</PageTitle>
      <section className="flex items-center gap-48">
        <figure className="w-1/4 aspect-square bg-primary-5" />
        <div className="flex-1 text-xl">
          <p>
            <strong>This Evening's Show</strong> is a radio broadcast
            transmitting from an abandoned monorail station outside Adobe
            Skyscraper. Tune in as your hosts guide you through a cavalcade of
            bizarre characters, historic factoids, surreal comedy, improvised
            news, interviews, and original music.
          </p>
          <footer className="mt-24">
            <p className="font-medium">Subscribe to the podcast</p>
            <div className="flex items-center gap-2">
              <Button size="lg" circle variant="ghost">
                <Icon name="Rss" />
              </Button>
              <Button size="lg" circle variant="ghost">
                <Icon name="ApplePodcasts" />
              </Button>
              <Button size="lg" circle variant="ghost">
                <Icon name="Spotify" />
              </Button>
              <Button size="lg" circle variant="ghost">
                <Icon name="GooglePodcasts" />
              </Button>
            </div>
          </footer>
        </div>
      </section>
      <hr />
      <section>
        <h2 className="font-medium text-2xl text-center">Episodes</h2>
        <ClientOnly>
          <EpisodeList />
        </ClientOnly>
      </section>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Episodes",
      spacing: true
    }
  };
}
