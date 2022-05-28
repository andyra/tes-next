import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Input from "./Input";
import { useDebounce } from "../helpers/hooks";

// Queries
// ----------------------------------------------------------------------------

const QUERY_ALBUMS = gql`
  query Entries {
    entries(section: "albums") {
      title
    }
  }
`;

// Functions
// ----------------------------------------------------------------------------

// API search function
function searchCharacters(search) {
  const apiKey = "f9dfb1e8d466d36c27850bedd2047687";
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: "GET"
    }
  )
    .then(r => r.json())
    .then(r => r.data.results)
    .catch(error => {
      console.error(error);
      return [];
    });
}

// Components
// ----------------------------------------------------------------------------

const Search2 = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [executeQuery, { loading, data }] = useLazyQuery(QUERY_ALBUMS);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        // executeQuery();
        executeQuery().then(stuff => {
          setIsSearching(false);
          setResults(stuff.data.entries);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <>
      <Input
        className="w-full md:w-256 bg-ground"
        hideLabel
        icon="Search"
        label="Search"
        placeholder="What are you looking for?"
        rounded
        type="search"
        glass
        onChange={e => {
          setSearchTerm(e.target.value);
        }}
      />
      {isSearching && <div>Searching ...</div>}
      {console.log(results)}
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
