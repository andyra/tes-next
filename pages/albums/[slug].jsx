import { gql } from "@apollo/client";
import client from "../../apollo-client";

export default function AlbumPage() {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">Album Single</h1>
    </>
  );
}

// Page Config
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        entries(section: "albums") {
          slug
        }
      }
    `,
  });

  const paths = data.entries.map((entry) => ({
    params: { slug: entry.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
