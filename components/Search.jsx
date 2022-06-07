import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { gql, useLazyQuery } from "@apollo/client";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Transition } from "@headlessui/react";
import cn from "classnames";
import { getButtonClasses } from "./Button";
import ClientOnly from "./ClientOnly";
import Empty from "./Empty";
import Icon from "./Icon";
import Input from "./Input";
import Loader from "./Loader";
import { useDebounce, useKeypress } from "../helpers/hooks";

// TODO: Highlight term
// TODO: Hotkey arrow down focus on results
// TODO: Don't show noresults until results come back
// TODO: On esacpe
//       • Close popover
//       • Clear input value
//       • Blur focus on input
// TODO: Accessibility for popover

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

  return (
    <>
      <Popover.Root>
        <Popover.Trigger
          className={getButtonClasses({ circle: true, variant: "glass" })}
          onClick={() => {
            clearResults();
          }}
        >
          <Icon name="Search" />
        </Popover.Trigger>
        <Popover.Content
          className="bg-ground p-16 rounded-lg border-2 border-primary-25"
          sideOffset={8}
        >
          <Input
            className="w-full md:w-320 bg-ground -mt-[74px] mb-24"
            hideLabel
            icon="Search"
            isLoading={isSearching}
            label="Search"
            placeholder="Search for…"
            rounded
            glass
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          />
          {results.length ? (
            <ul className="-mx-8 -my-8">
              {results.map(result => (
                <li key={result.title}>
                  <Link href={`/${result.uri}/`}>
                    <a className="flex items-center justify-between gap-8 h-40 px-8 rounded-lg hover:bg-primary-10 transition">
                      {result.title}
                      <span className="flex items-center rounded-full border border-primary-25 px-8 h-24">
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
                ? "What are you looking for, exactly?"
                : isSearching
                ? "What are you looking for, exactly?"
                : "No results"}
            </div>
          )}
        </Popover.Content>
      </Popover.Root>
    </>
  );
};

export default Search;
