import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { gql, useLazyQuery } from "@apollo/client";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import cn from "classnames";
import { getButtonClasses } from "./Button";
import ClientOnly from "./ClientOnly";
import Empty from "./Empty";
import Icon from "./Icon";
import Input from "./Input";
import Loader from "./Loader";
import Tooltip from "./Tooltip";
import useDebounce from "../hooks/useDebounce";

// TODO: Highlight term
// TODO: Hotkey arrow down focus on results

// Queries
// ----------------------------------------------------------------------------

const QUERY_SEARCH = gql`
  query Entries($searchTerm: String) {
    entries(search: $searchTerm) {
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

// Components
// ----------------------------------------------------------------------------

const Search = () => {
  // State
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
          const sortedResults = sortResults(results.data.entries);
          setResults(sortedResults);
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

  const contentClasses = cn(
    "fixed top-0 right-0 left-0 bottom-0 sm:left-auto sm:w-480 z-30",
    "m-4 p-16 rounded-lg bg-ground border-2 border-primary-10 radix-state-open:animate-enter-from-right"
  );

  return (
    <Dialog.Root>
      <Tooltip side="bottom" content="Search">
        <Dialog.Trigger
          className={getButtonClasses({ circle: true, variant: "glass" })}
          onClick={() => {
            clearResults();
          }}
        >
          <Icon name="Search" />
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 z-20 backdrop-blur-md bg-ground/30 radix-state-open:animate-fade-in" />
        <Dialog.Content className={contentClasses}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Search</Dialog.Title>
          </VisuallyHidden.Root>
          <header className="flex gap-8 mb-16">
            <Input
              className="flex-1"
              hideLabel
              icon="Search"
              isLoading={isSearching}
              label="Search"
              placeholder="What are you looking for, exactly?"
              rounded
              glass
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
            />
            <Dialog.Close
              className={getButtonClasses({ circle: true, variant: "ghost" })}
            >
              <Icon name="X" />
            </Dialog.Close>
          </header>
          {results.length ? (
            <ul className="-mx-8">
              {results.map(result => (
                <li key={result.title}>
                  <Link href={`/${result.uri}/`}>
                    <a className="flex items-center justify-between gap-8 h-40 px-8 rounded-lg hover:bg-primary-10 text-xl transition">
                      {result.title}
                      <span className="flex items-center rounded-full border border-primary-25 px-8 h-24 text-sm">
                        {result.sectionHandle}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-primary-50">
              {debouncedSearchTerm.length === 0
                ? ""
                : isSearching
                ? ""
                : "No results"}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Search;
