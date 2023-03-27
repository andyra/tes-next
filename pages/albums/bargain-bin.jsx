import { useState } from "react";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import cn from "classnames";
import NiceDate from "components/NiceDate";
import PageHeader from "components/PageHeader";
import { getArtistInfo } from "helpers/index";
import { camelCaseToWords } from "helpers/utils";

// Default
// ----------------------------------------------------------------------------

export default function Albums({ albums }) {
  console.log(albums);
  return (
    <>
      <PageHeader title="Bargain Bin" />
      <div className="grid grid-cols-3 gap-24">
        <ul>
          {albums.map((album) => (
            <li key={album.slug}>
              <button className="flex items-center gap-16 w-full text-left p-8 border-2 border-transparent hover:border-accent-50 rounded-lg transition">
                <figure className="flex items-center justify-center h-64 w-64 rounded bg-accent-25 font-funky font-bold text-5xl text-accent-50 relative">
                  <span className="absolute top-0 left-12 leading-none">B</span>
                  <span className="absolute top-12 left-32 leading-none">
                    B
                  </span>
                </figure>
                <div className="text-lg">
                  <NiceDate date={album.postDate} />
                  <div className="text-primary-50">
                    {album.albumTracklist.length} tracks
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <ul className="col-span-2 rounded-lg p-16 border">
          <li>List tracks here</li>
        </ul>
      </div>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "albums", search: "albumType:bargain-bin") {
          postDate
          slug
          title
          uri
          ... on albums_default_Entry {
            albumType
            albumTracklist {
              ... on albumTracklist_song_BlockType {
                song {
                  slug
                  title
                  uri
                }
                audioFile {
                  url
                }
              }
              ... on albumTracklist_segment_BlockType {
                description
                audioFile {
                  url
                }
              }
              ... on albumTracklist_coverSong_BlockType {
                songTitle
                audioFile {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      albums: data.entries,
      metaTitle: "Bargain Bin",
      navSection: "Music",
    },
  };
}
