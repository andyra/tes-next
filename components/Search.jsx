import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { gql, useLazyQuery } from "@apollo/client";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cn from "classnames";
import { getButtonClasses } from "./Button";
import Badge from "./Badge";
import ClientOnly from "./ClientOnly";
import Empty from "./Empty";
import Icon from "./Icon";
import Input from "./Input";
import Loader from "./Loader";
import Tooltip from "./Tooltip";
import useDebounce from "../hooks/useDebounce";

// TODO: Close when navigating to new page
// TODO: Highlight term
// TODO: Hotkey arrow down focus on results

// Queries
// ----------------------------------------------------------------------------

const QUERY_SEARCH = gql`
  query Entries($searchTerm: String) {
    entries(search: $searchTerm, section: ["albums", "episodes", "library"]) {
      title
      slug
      uri
      sectionHandle
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
          console.log(groupedResults);
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
    "fixed top-[5vh] left-1/2 transform -translate-x-1/2 z-dialog-content",
    "w-full max-w-screen-sm max-h-[90vh] overflow-y-auto",
    "p-24 rounded-lg bg-ground border-2 radix-state-open:animate-slide-up-fade"
  );

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        console.log("changed");
      }}
    >
      <Tooltip content="Search" asChild>
        <Dialog.Trigger
          className={getButtonClasses({ circle: true, variant: "glass" })}
          onClick={() => {
            clearResults();
            setIsOpen(true);
          }}
        >
          <Icon name="Search" />
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
              placeholder="What are you looking for, exactly?"
              rounded
            />
            <Dialog.Close
              className={getButtonClasses({ circle: true, variant: "ghost" })}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Icon name="X" />
            </Dialog.Close>
          </header>
          {Object.keys(results).length ? (
            <ul className="flex flex-col gap-16 -mb-8 mt-24">
              {Object.keys(results).map(category => (
                <li>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-secondary-50 py-4 bg-ground sticky top-40">
                    {category}
                  </h3>
                  <ul className="-mx-8">
                    {results[category].map((result, i) => (
                      <li key={`${i}-${result.title}`}>
                        <Link href={`/${result.uri}/`}>
                          <a
                            className="block px-8 py-8 rounded-lg hover:bg-primary-10 text-xl text-primary transition"
                            onClick={() => {
                              setIsOpen(false);
                            }}
                          >
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : debouncedSearchTerm.length === 0 ? (
            ""
          ) : isSearching ? (
            ""
          ) : (
            <div className="text-center text-primary-50">No results</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Search;
