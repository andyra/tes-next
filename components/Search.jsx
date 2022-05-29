import { useCallback, useEffect, useRef, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Empty from "./Empty";
import Input from "./Input";
import Loader from "./Loader";
import { useDebounce } from "../helpers/hooks";

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

const ResultsPopover = ({ isOpen, results, setIsOpen }) => {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <Transition
      as="section"
      className="bg-ground p-16 rounded-lg border-2 border-primary-25 w-320 absolute right-8 top-56 z-10"
      show={isOpen}
      enter="transition-opacity duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {results.length ? (
        <ul className="-mx-8 -mb-8" ref={ref}>
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
        <Empty>No results</Empty>
      )}
    </Transition>
  );
};

const Search = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Constants
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [executeQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH);
  const noResults = debouncedSearchTerm.length > 0 && results.length === 0;

  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      setIsOpen(true);
      executeQuery({ variables: { searchTerm: debouncedSearchTerm } }).then(
        data => {
          const sortedResults = sortResults(data.data.entries);
          setIsSearching(false);
          setResults(sortedResults);
        }
      );
    } else {
      setResults([]);
      setIsSearching(false);
      setIsOpen(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <Input
        className="w-full md:w-256 bg-ground"
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
      <ResultsPopover isOpen={isOpen} results={results} setIsOpen={setIsOpen} />
    </>
  );
};

export default Search;
