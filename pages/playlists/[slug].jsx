import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import client from "../../apollo-client";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import { querySlugs } from "../../helpers/query.helpers";

import DataRow from "../../components/DataRow";

// Components
// ----------------------------------------------------------------------------

const DELETE_PLAYLIST = gql`
  mutation deletePlaylist($id: Int!) {
    deleteEntry(id: $id)
  }
`;

// Default
// ----------------------------------------------------------------------------

export default function Playlist({ playlist }) {
  const router = useRouter();

  const [deletePlaylist, { data, loading, error }] = useMutation(
    DELETE_PLAYLIST,
    {
      onCompleted(data) {
        loading = false;
        toast.success("Deleted playlist");
        router.replace("/"); // redirect to home via Next.js
        // • Refresh the playlists listing in the nav
      }
    }
  );

  if (error) {
    console.error(error);
    toast(`Mutation error! ${error.message}`);
  }

  function handleDelete(id) {
    deletePlaylist({
      variables: {
        id: parseInt(id)
      }
    });
  }

  return (
    <>
      <PageTitle
        actions={
          <>
            <Button>Edit</Button>
            <Button
              onClick={() => {
                handleDelete(playlist.id);
              }}
            >
              {loading ? "..." : "Delete"}
            </Button>
          </>
        }
      >
        {playlist.title}
      </PageTitle>
      <section className="divide-y divide-subtle">
        <DataRow title="title" value={playlist.title} />
        <DataRow title="private" value={`${playlist.private}`} />
        <DataRow title="author" value={playlist.author.username} />
        <DataRow title="length" value={playlist.playlist.length} />
        <DataRow title="playlist">
          {playlist.playlist[0].addedBy && (
            <DataRow
              title="└ addedBy"
              value={playlist.playlist[0].addedBy[0].username}
            />
          )}
          <DataRow
            title="└ album title"
            value={playlist.playlist[0].album[0].title}
          />
          <DataRow
            title="└ albumCoverArt"
            value={playlist.playlist[0].album[0].albumCoverArt[0].url}
          />
          <DataRow
            title="└ album artist"
            value={playlist.playlist[0].album[0].artist[0].title}
          />
          <DataRow title="└ dateAdded" value={playlist.playlist[0].dateAdded} />
          <DataRow title="└ filePath" value={playlist.playlist[0].filePath} />
          <DataRow title="└ song" value={playlist.playlist[0].song[0].title} />
        </DataRow>
      </section>
    </>
  );
}

// Paths
// -----------------------------------------------------------------------------

export async function getStaticPaths() {
  const { data } = await client.query({
    query: querySlugs("playlists")
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
        entry(section: "playlists", slug: "${params.slug}") {
          author {
            username
          }
          id
          title
          ... on playlists_default_Entry {
            private
            playlist {
              ... on playlist_BlockType {
                addedBy {
                  username
                }
                album {
                  slug
                  title
                  ... on albums_default_Entry {
                    albumCoverArt { url }
                    artist {
                      slug
                      title
                    }
                  }
                }
                dateAdded
                filePath
                song {
                  slug
                  title
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      playlist: data.entry,
      pageTitle: data.entry.title
    }
  };
}
