import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { gql, useLazyQuery } from "@apollo/client";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cn from "classnames";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import Empty from "components/Empty";
import Icon from "components/Icon";
import Input from "components/Input";
import Loader from "components/Loader";
import Tooltip from "components/Tooltip";
import useDebounce from "hooks/useDebounce";
import { getCollectionCoverArtUrl } from "helpers/index";

// TODO: Close when navigating to new page
// TODO: Highlight term
// TODO: Hotkey arrow down focus on results

// Queries
// ----------------------------------------------------------------------------

const QUERY_SEARCH = gql`
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
      url={getCollectionCoverArtUrl(item)}
      height={100}
      width={100}
      layout="responsive"
      alt={item.title}
    />
  ) : (
    <figure className="h-40 w-40 rounded-full bg-primary-5 flex items-center justify-center">
      <Icon name={ICONS[item.sectionHandle]} />
    </figure>
  );
};

const Search = () => {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Constants
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [executeQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH);

  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      executeQuery({ variables: { searchTerm: debouncedSearchTerm } }).then(
        results => {
          setIsSearching(false);
          // const sortedResults = sortResults(results.data.entries);
          const groupedResults = groupBy(results.data.entries, "sectionHandle");
          setResults(groupedResults);
        }
      );
      setIsSearching(true);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  function clearResults() {
    setSearchTerm("");
    setResults([]);
  }

  const overlayClasses =
    "fixed top-0 right-0 bottom-0 left-0 z-dialog backdrop-blur-md bg-primary-5 radix-state-open:animate-fade-in";

  const contentClasses = cn(
    "fixed z-dialog-content overflow-y-auto",
    "p-24 rounded-lg bg-ground border-2 radix-state-open:animate-slide-up-fade",
    "top-4 right-4 bottom-4 left-4 max-h-screen",
    "md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-screen-sm md:h-[90vh]"
  );

  return (
    <Dialog.Root open={isOpen}>
      <Tooltip content="Search" asChild>
        <Dialog.Trigger asChild>
          <div className="bg-ground rounded-full">
            <Button
              circle
              iconLeft="Search"
              onClick={() => {
                clearResults();
                setIsOpen(true);
              }}
              variant="glass"
            />
          </div>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClasses} />
        <Dialog.Content
          className={contentClasses}
          onEscapeKeyDown={() => {
            setIsOpen(false);
          }}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Search</Dialog.Title>
          </VisuallyHidden.Root>
          <header className="flex gap-16 sticky -top-24 z-10 bg-ground pt-24 px-24 -mt-24 -mx-24">
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
              placeholder="What are you looking for, exactly?"
              rounded
            />
            <Dialog.Close asChild>
              <Button
                circle
                iconLeft="X"
                onClick={() => {
                  setIsOpen(false);
                }}
                variant="ghost"
              />
            </Dialog.Close>
          </header>
          {Object.keys(results).length ? (
            <ul className="flex flex-col gap-16 -mb-8 mt-24">
              {Object.keys(results).map(category => (
                <li key={category}>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-secondary-50 py-4 bg-ground sticky top-40">
                    {category}
                  </h3>
                  <ul className="-mx-8">
                    {results[category].map((result, i) => (
                      <li key={`${i}-${result.title}`}>
                        <Link href={`/${result.uri}/`}>
                          <a
                            className="flex items-center gap-16 px-8 py-8 rounded-lg hover:bg-primary-10 text-xl text-primary transition"
                            onClick={() => {
                              setIsOpen(false);
                            }}
                          >
                            <SearchImage item={result} />
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : debouncedSearchTerm.length && !isSearching ? (
            <div className="text-center text-primary-50 mt-24">No results</div>
          ) : (
            ""
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Search;
