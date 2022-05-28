import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import { querySlugs } from "../../helpers";

// Default
// ----------------------------------------------------------------------------

export default function Song({ song }) {
  const { lyrics, notation, songType, title } = song;

  return (
    <>
      <PageTitle>{title}</PageTitle>
    </>
  );
}

// Paths
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("songs")
  });

  const paths = data.entries.map(entry => ({
    params: { slug: entry.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        entry(section: "songs", slug: "${params.slug}") {
          title
          ... on songs_default_Entry {
            lyrics
            notation
            songType
          }
        }
      }
    `
  });

  return {
    props: {
      song: data.entry,
      navSection: "Music",
      pageTitle: data.entry.title
    }
  };
}
