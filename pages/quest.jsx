import { useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import CoverArt from "components/CoverArt";
import Icon from "components/Icon";
import Input from "components/Input";
import Loader from "components/Loader";
import { getCollectionCoverArtUrl } from "helpers/index";
import { debounce } from "helpers/utils";

// Queries
// ----------------------------------------------------------------------------

const SEARCH_QUERY = gql`
  query Entries($searchTerm: String) {
    entries(
      search: $searchTerm
      section: ["albums", "episodes", "songs", "library"]
    ) {
      title
      slug
      uri
      sectionHandle
      ... on albums_default_Entry {
        albumCoverArt {
          url
        }
      }
      ... on episodes_default_Entry {
        episodeCoverArt {
          url
        }
      }
    }
  }
`;

// Functions
// ----------------------------------------------------------------------------

function compareSectionHandles(a, b) {
  if (a.sectionHandle < b.sectionHandle) {
    return -1;
  }
  if (a.sectionHandle > b.sectionHandle) {
    return 1;
  }
  return 0;
}

function sortResults(results) {
  const sortedResults = [...results];
  return sortedResults.sort(compareSectionHandles);
}

function groupBy(arr, property) {
  return arr.reduce(function(memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

// Components
// ----------------------------------------------------------------------------

const SearchImage = ({ item }) => {
  const ICONS = {
    songs: "Note",
    library: "Book"
  };

  return item.albumCoverArt || item.episodeCoverArt ? (
    <CoverArt
      className="h-40 w-40 rounded"
      height={100}
      layout="responsive"
      title={item.title}
      url={getCollectionCoverArtUrl(item)}
      width={100}
    />
  ) : (
    <figure className="h-40 w-40 rounded-full bg-primary-5 flex items-center justify-center">
      <Icon name={ICONS[item.sectionHandle]} />
    </figure>
  );
};

const Results = ({ searchTerm }) => {
  const { data, error, loading } = useQuery(SEARCH_QUERY, {
    variables: { searchTerm }
  });

  if (loading) {
    return <Loader className="h-20 w-20 opacity-50" />;
  }

  if (error) {
    return `Error: ${error}`;
  }

  const groupedResults = groupBy(data?.entries, "sectionHandle");

  return Object.keys(groupedResults).length ? (
    <ul>
      {Object.keys(groupedResults).map(category => (
        <li key={category}>
          <h3 className="font-mono text-xs uppercase tracking-wider text-secondary-50 py-4 bg-ground sticky top-40">
            {category}
          </h3>
          <ul className="-mx-8">
            {groupedResults[category].map((item, i) => (
              <li key={`${i}-${item.title}`}>
                <Link href={`/${item.uri}/`}>
                  <a
                    className="flex items-center gap-16 px-8 py-8 rounded-lg hover:bg-primary-10 text-xl text-primary transition"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <SearchImage item={item} />
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  ) : (
    "No results"
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Quest({ entries }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = debounce(e => {
    setSearchTerm(e.target.value);
  }, 500);

  return (
    <>
      <Input
        label="Search"
        isLoading={isSearching}
        onChange={e => {
          handleInputChange(e);
        }}
      />
      {searchTerm.length > 0 && <Results searchTerm={searchTerm} />}
    </>
  );
}
