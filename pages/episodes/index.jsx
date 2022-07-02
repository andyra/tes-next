import { useState } from "react";
import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";
import Button from "@/components/Button";
import GridListToggle from "@/components/GridListToggle";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import EpisodeList from "./components/EpisodeList";

// Default
// ----------------------------------------------------------------------------

export default function Episodes() {
  const [gridView, setGridView] = useState(true);

  return (
    <>
      <PageHeader title="This Evening's Show Podcast" center />
      <section className="flex  items-center gap-24 md:flex-row md:gap-24 xl:gap-48">
        <figure className="hidden sm:block md:hidden lg:block w-1/3 lg:w-1/4 rounded-lg self-start mx-auto md:mx-0 overflow-hidden">
          <Image
            height={300}
            src="https://tesfm.fra1.digitaloceanspaces.com/episodes/this-evenings-show.jpg"
            width={300}
          />
        </figure>
        <div className="flex-1">
          <p className="text-xl mb-24">
            <strong>This Evening's Show</strong> is a radio broadcast
            transmitting from an abandoned monorail station outside Adobe
            Skyscraper. Tune in as your hosts guide you through a cavalcade of
            bizarre characters, historic factoids, surreal comedy, improvised
            news, interviews, and original music.
          </p>
          <footer className="flex flex-wrap items-center justify-center sm:justify-start gap-8">
            <Button variant="glass" iconLeft="Rss">
              RSS
            </Button>
            <Button variant="glass" iconLeft="ApplePodcasts">
              Apple Podcasts
            </Button>
            <Button variant="glass" iconLeft="Spotify">
              Spotify
            </Button>
            <Button variant="glass" iconLeft="GooglePodcasts">
              Google Podcasts
            </Button>
          </footer>
        </div>
      </section>
      <hr className="border" />
      <section>
        <div className="flex items-center gap-8 justify-end mb-24">
          <GridListToggle gridView={gridView} setGridView={setGridView} />
        </div>
        <ClientOnly>
          <EpisodeList gridView={gridView} />
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
      spacing: true,
      maxWidth: "max-w-screen-xl"
    }
  };
}
