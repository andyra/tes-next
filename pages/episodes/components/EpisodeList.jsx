import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  CollectionItem,
  CollectionList,
  CollectionListSkeleton
} from "../../../components/Collections";
import Empty from "../../../components/Empty";
import NiceDate from "../../../components/NiceDate";

// Queries
// ----------------------------------------------------------------------------

const QUERY_EPISODES = gql`
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
`;

// Components
// ----------------------------------------------------------------------------

const EpisodeItem = ({ episode, gridView }) => {
  const { episodeCoverArt, releaseDate, slug, title } = episode;

  return <CollectionItem collection={episode} gridView={gridView} />;
};

// Default
// ----------------------------------------------------------------------------

const EpisodeList = ({ gridView }) => {
  const { data, loading, error } = useQuery(QUERY_EPISODES);

  if (loading) {
    return <CollectionListSkeleton />;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <CollectionList gridView={gridView}>
      {data.entries.map(episode => (
        <EpisodeItem episode={episode} key={episode.slug} gridView={gridView} />
      ))}
    </CollectionList>
  ) : (
    <Empty>Ain't no episodes</Empty>
  );
};

export default EpisodeList;
