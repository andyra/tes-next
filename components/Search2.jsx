import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Input from "./Input";
import { useDebounce } from "../helpers/hooks";

// Queries
// ----------------------------------------------------------------------------

const QUERY_SEARCH = gql`
  query Entries($searchTerm: String) {
    entries(section: "albums", search: $searchTerm) {
      title
    }
  }
`;

const QUERY_ALBUMS = gql`
  query Entries {
    entries(section: "albums", search: "golden") {
      title
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const Search2 = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [executeQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH);

  // Effect for API call
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      executeQuery({ variables: { searchTerm: debouncedSearchTerm } }).then(
        stuff => {
          setIsSearching(false);
          setResults(stuff.data.entries);
        }
      );
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <Input
        className="w-full md:w-256 bg-ground"
        hideLabel
        icon="Search"
        label="Search"
        placeholder="Search for…"
        rounded
        type="search"
        glass
        onChange={e => {
          setSearchTerm(e.target.value);
        }}
      />
      {isSearching && <div>Searching ...</div>}
      {results.length ? (
        <ul>
          {results.map(result => (
            <li key={result.title}>
              <h4>{result.title}</h4>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Search2;
