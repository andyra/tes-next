import { useCallback, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import cn from "classnames";
import ClientOnly from "./ClientOnly";
import Input from "./Input";
import { debounce } from "../helpers";

/*

onInputChange, the searchTerm is updated and the popover opens. it also triggers a debounce

*/

// Queries
// ----------------------------------------------------------------------------

// https://stackoverflow.com/questions/58380195/how-to-execute-uselazyquery-programmatically
const QUERY_SEARCH = gql`
  query Entries {
    entries(section: "albums", search: $searchTerm) {
      title
    }
  }
`;

const QUERY_ALBUMS = gql`
  query Entries {
    entries(section: "albums") {
      title
    }
  }
`;

// Components
// ----------------------------------------------------------------------------

const Popover = ({ isOpen, isLoading, data }) => {
  const classes = cn({
    "bg-ground border border-primary-25 rounded-lg p-24 absolute top-64 right-8": true,
    hidden: !isOpen
  });

  return (
    <section className={classes}>
      {isLoading && <div className="bg-primary-10">Loading…</div>}
      {data && <div className="bg-accent">DATA HERE</div>}
    </section>
  );
};

const Search = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  // GQL Query
  // const [executeQuery, { loading, data }] = useLazyQuery(QUERY_SEARCH);
  const [executeQuery, { loading, data }] = useLazyQuery(QUERY_ALBUMS);

  const handleSearch = useCallback(
    debounce(searchTerm => {
      console.log(`Search for "${searchTerm}"`);
      // executeQuery({ variables: { searchTerm: searchTerm } });
      executeQuery();
    }, 500),
    []
  );

  if (data) {
    console.log(data);
  }

  if (loading) {
    console.log("Loading");
  }

  useEffect(() => {
    if (searchTerm.length > 0) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  function handleChange(e) {
    const value = e.target.value;
    // Open Popover
  }

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
          handleChange(e);
        }}
      />
      {/*<Popover
        isOpen={searchTerm.length > 0}
        isLoading={isLoading}
        data={data}
      />*/}
    </>
  );
};

export default Search;
