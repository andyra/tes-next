import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Empty from "./Empty";
import Input from "./Input";
import { useDebounce } from "../helpers/hooks";

// TODO: Sort results by sectionHandle
// TODO: Highlight term

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

// Components
// ----------------------------------------------------------------------------

const ResultsList = ({ debouncedSearchTerm, results }) => {
  return (
    <section className="p-16 rounded-lg border-2 border-primary-25">
      <p className="text-primary-50 text-center">
        {results.length} results for "<strong>{debouncedSearchTerm}</strong>":
      </p>
      <ul className="-mx-8 -mb-8">
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
    </section>
  );
};

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
        <ResultsList
          debouncedSearchTerm={debouncedSearchTerm}
          results={results}
        />
      ) : (
        debouncedSearchTerm.length > 0 &&
        !isSearching && <Empty>No results for {debouncedSearchTerm}</Empty>
      )}
    </>
  );
};

export default Search2;
