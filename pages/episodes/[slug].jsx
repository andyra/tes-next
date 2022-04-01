import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";
import { EPISODES } from "../../queries";

// Default
// ----------------------------------------------------------------------------

export default function Episode({ episode }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <PageTitle>Episode: {slug}</PageTitle>
    </>
  );
}

// Config
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: EPISODES
  });

  const paths = data.entries.map(entry => ({
    params: { slug: entry.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        entry(section: "episodes", slug: "${params.slug}") {
          id
          slug
          title
        }
      }
    `
  });

  return {
    props: {
      episode: data.entry
    }
  };
}
