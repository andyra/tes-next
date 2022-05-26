import { useEffect, useState } from "react";
import Link from "next/link";
import { Combobox } from "@headlessui/react";
import Input from "./Input";

const results = [
  {
    itemType: "episode",
    title: "Urban Legends of Adobega County",
    href: "/episodes/foo"
  },
  { itemType: "album", title: "Live at the Golden Owl", href: "/albums/foo" },
  { itemType: "song", title: "Bunnies are Enjoyable", href: "/songs/foo" },
  { itemType: "article", title: "Dr. Xing", href: "/library/foo" },
  { itemType: "video", title: "Pope's Brand Coffee", href: "/videos/foo" }
];

export const Search = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [query, setQuery] = useState("");

  const filteredResults =
    query === ""
      ? results
      : results.filter(item => {
          return item.title.toLowerCase().includes(query.toLowerCase());
        });

  function handleSelect(selectedItem) {
    console.log("Go to the thing!");
    console.log(selectedItem);
  }

  return (
    <>
      <Combobox value={selectedItem} onChange={setSelectedItem}>
        <Combobox.Input
          onChange={e => setQuery(e.target.value)}
          displayValue={person => person.name}
        />
        <Combobox.Options>
          {filteredResults.map(item => (
            <Combobox.Option key={item.title} value={item}>
              <Link href={item.href}>
                <a>
                  {item.itemType}: {item.title}
                </a>
              </Link>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      {/*      <Input
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
      />*/}
    </>
  );
};

export default Search;
