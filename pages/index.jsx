import { useContext } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import styled from "styled-components";
import AnimatedLetter from "../components/AnimatedLetter";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { H1 } from "../components/PageTitle";
import { CollectionItem } from "../components/Collections";

// Queries
// ----------------------------------------------------------------------------

const QUERY_LATEST_COLLECTIONS = gql`
  query Entries {
    albums: entries(section: "albums", limit: 3, orderBy: "dateCreated DESC") {
      title
      slug
      ... on albums_default_Entry {
        artist {
          slug
          title
        }
        albumCoverArt {
          url
        }
        albumType
        releaseDate
      }
    }
    episodes: entries(
      section: "episodes"
      limit: 1
      orderBy: "dateCreated DESC"
    ) {
      title
      slug
      ... on episodes_default_Entry {
        episodeCoverArt {
          url
        }
        releaseDate
      }
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const PlayerButton = ({ children }) => (
  <button className="text-3xl flex items-center justify-center border-2 border-primary-10 hover:border-accent hover:text-accent rounded-xl p-48 w-full transition">
    {children}
  </button>
);

// Default
// ----------------------------------------------------------------------------

export default function Home({ albums, episodes }) {
  console.log(albums);
  return (
    <>
      <header className="text-center space-y-16">
        <h1>
          <AnimatedLetter src="/vhs-02.webp">TES</AnimatedLetter>
        </h1>
        <p className="font-mono text-sm text-center max-w-screen-sm mx-auto">
          <strong className="font-bold underline">T</strong>his{" "}
          <strong className="font-bold underline">E</strong>vening's{" "}
          <strong className="font-bold underline">S</strong>how is a radio
          broadcast transmitting from an abandoned monorail station outside
          Adobe Skyscraper. Tune in as your hosts guide you through a cavalcade
          of bizarre characters, historic factoids, surreal comedy, improvised
          news, interviews, and original music.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <PlayerButton>Play Latest Episode</PlayerButton>
        <PlayerButton>Listen to the Radio</PlayerButton>
      </section>

      <section>
        <h2 className="text-2xl text-center mb-16">What's New</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 -mx-8 relative">
          {albums.map(album => (
            <CollectionItem
              coverArt={album.albumCoverArt}
              key={album.slug}
              releaseDate={album.releaseDate}
              slug={album.slug}
              title={album.title}
              type="albums"
            />
          ))}
          <li className="p-8">
            <Link href="/albums">
              <a className="flex items-center justify-center gap-8 aspect-square border-2 border-primary-10 hover:border-accent hover:text-accent rounded-lg transition group">
                View All
                <Icon
                  name="ArrowRight"
                  className="transition-transform duration-300 group-hover:transform group-hover:translate-x-4"
                />
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: QUERY_LATEST_COLLECTIONS
  });

  return {
    props: {
      albums: data.albums,
      episodes: data.episodes,
      spacing: "space-y-64"
    }
  };
}
