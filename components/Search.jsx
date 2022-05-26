import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import Input from "./Input";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false }
];

export const Search = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter(person => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        <Combobox.Input
          onChange={event => setQuery(event.target.value)}
          displayValue={person => person.name}
        />
        <Combobox.Options>
          {filteredPeople.map(person => (
            <Combobox.Option
              key={person.id}
              value={person}
              disabled={person.unavailable}
            >
              {person.name}
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
