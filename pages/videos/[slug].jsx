import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "helpers/apollo-client";
import Loader from "components/Loader";
import PageHeader from "components/PageHeader";
import { querySlugs } from "helpers/index";

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("videos"),
  });

  const paths = data.entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: true,
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
    `,
  });

  // Return 404 if the entry has been deleted
  if (!data.entry) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      metaTitle: data.entry.title,
      navSection: "Videos",
      video: data.entry,
    },
  };
}

// Components
// ----------------------------------------------------------------------------

const VideoEmbed = ({ id }) => {
  const [embedHtml, setEmbedHtml] = useState(null);

  // Get the thumbnail from Vimeo
  useEffect(() => {
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmbedHtml(data.html);
      });
  }, [id]);

  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
};

// Default
// ----------------------------------------------------------------------------

export default function Video({ video }) {
  if (!video) return <Loader />;
  const { title, vimeoId } = video;

  return (
    <>
      <PageHeader back={{ href: "/videos", title: "Videos" }} title={title} />
      <VideoEmbed id={vimeoId} />
    </>
  );
}
