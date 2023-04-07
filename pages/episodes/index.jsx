import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Image from "next/legacy/image";
import { CollectionItem, CollectionList } from "components/Collections";
import Button from "components/Button";
import GridListToggle from "components/GridListToggle";
import Icon from "components/Icon";
import PageHeader from "components/PageHeader";
import { DEFAULT_EPISODE_IMAGE, PODCAST_LINKS } from "constants";

// Components
// ----------------------------------------------------------------------------

const EpisodeItem = ({ episode, gridView }) => {
  const { episodeCoverArt, releaseDate, slug, title } = episode;

  return <CollectionItem collection={episode} gridView={gridView} />;
};

// Default
// ----------------------------------------------------------------------------

export default function Episodes({ episodes }) {
  const [gridView, setGridView] = useState(true);

  return (
    <>
      <PageHeader title="This Evening's Show Podcast" center />
      <section className="flex  items-center gap-24 md:flex-row md:gap-24 xl:gap-48">
        <figure className="hidden sm:block md:hidden lg:block w-1/3 lg:w-1/4 rounded-lg self-start mx-auto md:mx-0 overflow-hidden">
          <Image
            alt="Cover for This Evening's Show podcast"
            height={300}
            src={DEFAULT_EPISODE_IMAGE}
            width={300}
          />
        </figure>
        <div className="flex-1">
          <p className="text-xl mb-24">
            <strong>This Evening&apos;s Show</strong> is a radio broadcast
            transmitting from an abandoned monorail station outside Adobe
            Skyscraper. Tune in as your hosts guide you through a cavalcade of
            bizarre characters, historic factoids, surreal comedy, improvised
            news, interviews, and original music.
          </p>
          <footer className="flex flex-wrap items-center gap-8">
            {PODCAST_LINKS.map((link) => (
              <Button
                href={link.href}
                iconLeft={link.icon}
                key={link.title}
                target="_blank"
                variant="glass"
              >
                {link.title}
              </Button>
            ))}
          </footer>
        </div>
      </section>
      <hr className="border" />
      <section>
        <div className="flex items-center gap-8 justify-end mb-24">
          <GridListToggle gridView={gridView} setGridView={setGridView} />
        </div>
        <CollectionList gridView={gridView}>
          {episodes.map((episode) => (
            <EpisodeItem
              episode={episode}
              key={episode.slug}
              gridView={gridView}
            />
          ))}
        </CollectionList>
      </section>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "episodes", orderBy: "releaseDate DESC") {
          slug
          title
          uri
          ... on episodes_default_Entry {
            releaseDate
            description
            episodeAudio {
              url
            }
            episodeCoverArt {
              height
              url
              width
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      episodes: data.entries,
      maxWidth: "max-w-screen-xl",
      metaTitle: "Episodes",
    },
  };
}
