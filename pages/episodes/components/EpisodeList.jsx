import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  CollectionItem,
  CollectionList,
  CollectionListSkeleton
} from "../../../components/CollectionList";
import Empty from "../../../components/Empty";
import NiceDate from "../../../components/NiceDate";

// Queries
// ----------------------------------------------------------------------------

const QUERY_EPISODES = gql`
  query Entries {
    entries(section: "episodes") {
      slug
      title
      ... on episodes_default_Entry {
        releaseDate
        episodeCoverArt {
          url
        }
      }
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const EpisodeItem = ({ episode }) => {
  const { episodeCoverArt, releaseDate, slug, title } = episode;

  return (
    <CollectionItem
      coverArt={episodeCoverArt}
      href={`/episodes/${encodeURIComponent(slug)}`}
      key={slug}
      releaseDate={releaseDate}
      title={title}
    />
  );
};

// Default
// ----------------------------------------------------------------------------

export default function EpisodeList() {
  const { data, loading, error } = useQuery(QUERY_EPISODES);

  if (loading) {
    return <CollectionListSkeleton />;
  }

  if (error) {
    console.error(error);
    return `Query error! ${error.message}`;
  }

  return data.entries ? (
    <CollectionList>
      {data.entries.map(episode => (
        <EpisodeItem episode={episode} key={episode.slug} />
      ))}
    </CollectionList>
  ) : (
    <Empty>Ain't no episodes</Empty>
  );
}
