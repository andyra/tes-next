import ClientOnly from "../../components/ClientOnly";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import PageHeader from "../../components/PageHeader";
import EpisodeList from "./components/EpisodeList";

// Default
// ----------------------------------------------------------------------------

export default function Episodes() {
  return (
    <>
      <PageHeader title="This Evening's Show Podcast" center />
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
              <Button circle variant="ghost" iconLeft="Rss" />
              <Button circle variant="ghost" iconLeft="ApplePodcasts" />
              <Button circle variant="ghost" iconLeft="Spotify" />
              <Button circle variant="ghost" iconLeft="GooglePodcasts" />
            </div>
          </footer>
        </div>
      </section>
      <hr className="border border-primary-10" />
      <section>
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
      PageTitle: "Episodes",
      spacing: true
    }
  };
}
