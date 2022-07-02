import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageHeader from "components/PageHeader";
import { querySlugs } from "helpers/index";

// Components
// ----------------------------------------------------------------------------

const VideoEmbed = ({ id }) => {
  const [embedHtml, setEmbedHtml] = useState(null);

  // Get the thumbnail from Vimeo
  useEffect(() => {
    return fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`
    )
      .then(response => response.json())
      .then(data => {
        setEmbedHtml(data.html);
      });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

// Default
// ----------------------------------------------------------------------------

export default function Video({ videoEntry }) {
  const { title, vimeoId } = videoEntry;

  return (
    <>
      <PageHeader back={{ href: "/videos", title: "Videos" }} title={title} />
      <VideoEmbed id={vimeoId} />
    </>
  );
}

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("videos")
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
        entry(section: "videos", slug: "${params.slug}") {
          title
          ... on videos_default_Entry {
            vimeoId
          }
        }
      }
    `
  });

  return {
    props: {
      videoEntry: data.entry,
      navSection: "Videos",
      PageTitle: data.entry.title
    }
  };
}
