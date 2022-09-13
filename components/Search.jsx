import { useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import cn from "classnames";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "components/Dialog";
import Icon from "components/Icon";
import Input from "components/Input";
import Loader from "components/Loader";
import Tooltip from "components/Tooltip";
import { getCollectionCoverArtUrl } from "helpers/index";
import { debounce } from "helpers/utils";

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

const ResultIcon = ({ item }) => {
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

const Results = ({ searchTerm, setIsOpen }) => {
  const { data, error, loading } = useQuery(
    gql`
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
    `,
    {
      variables: { searchTerm }
    }
  );

  if (loading) {
    return null;
  }

  if (error) {
    return `Error: ${error}`;
  }

  const groupedResults = groupBy(data?.entries, "sectionHandle");

  return Object.keys(groupedResults).length ? (
    <ul className="mt-8">
      {Object.keys(groupedResults).map(category => (
        <li key={category}>
          <h3 className="font-medium text-xs uppercase tracking-widest text-primary py-8 bg-ground sticky top-40">
            {category}
          </h3>
          <ul className="-mx-8">
            {groupedResults[category].map((item, i) => (
              <li key={`${i}-${item.title}`}>
                <Link href={`/${item.uri}/`}>
                  <a
                    className="flex items-center gap-16 px-8 py-8 rounded-lg hover:bg-primary-10 text-xl text-primary focus:relative focus-visible:relative transition"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <ResultIcon item={item} />
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
    <div className="mt-24 text-primary-50">Can&apos;t find that thing!</div>
  );
};

// Default
// ----------------------------------------------------------------------------

const Search = ({ entries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = debounce(e => {
    setSearchTerm(e.target.value);
  }, 500);

  return (
    <Dialog open={isOpen}>
      <Tooltip content="Search" asChild>
        <DialogTrigger asChild>
          <Button
            circle
            className="relative"
            icon="Search"
            variant="glass"
            onClick={() => {
              setSearchTerm("");
              setIsOpen(true);
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-ground -z-10" />
          </Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent
        closeButton={false}
        onEscapeKeyDown={() => {
          setIsOpen(false);
        }}
        onInteractOutside={() => {
          setIsOpen(false);
        }}
        onPointerDownOutside={() => {
          setIsOpen(false);
        }}
      >
        <header className="flex gap-8 sticky -top-24 z-10 bg-ground pt-24 px-24 -mt-24 -mx-24">
          <Input
            className="flex-1"
            glass
            hideLabel
            icon="Search"
            isLoading={isSearching}
            label="Search"
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
            placeholder="What are you looking for?"
            rounded
          />
          <DialogClose
            className="-mr-8"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </header>
        {searchTerm.length > 0 && (
          <Results searchTerm={searchTerm} setIsOpen={setIsOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Search;
