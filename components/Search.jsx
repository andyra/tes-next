import { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import Link from "next/link";
import Input from "./Input";

// Functions
// ----------------------------------------------------------------------------

function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

// Components
// ----------------------------------------------------------------------------

const Popover = ({ isOpen, isLoading }) => {
  const classes = cn({
    "bg-ground border border-primary-25 rounded-lg p-24 absolute top-64 right-8": true,
    hidden: !isOpen
  });

  return <section className={classes}>Loading: {`${isLoading}`}</section>;
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const doSearch = useCallback(
    debounce(searchTerm => {
      console.log(searchTerm);
    }, 500),
    []
  );

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      doSearch(searchTerm);
    } else {
      setIsLoading(false);
    }
  }, [searchTerm]);

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
      <Popover isOpen={searchTerm.length > 0} isLoading={isLoading} />
    </>
  );
};

export default Search;
