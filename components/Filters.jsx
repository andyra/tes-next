import cn from "classnames";

// Functions
// ----------------------------------------------------------------------------

export function getDefaultFilters(filterGroups) {
  let defaultFilters = {};
  for (let filterGroup of filterGroups) {
    defaultFilters[filterGroup.value] = "all";
  }
  return defaultFilters;
}

// Components
// ----------------------------------------------------------------------------

const FilterOption = ({ group, label, value, filters, setFilters }) => {
  const active = filters[group] === value;
  const optionClasses = cn({
    "flex items-center w-full justify-between gap-8 h-32 px-12 rounded-lg hover:bg-primary-5 -mx-12 whitespace-nowrap": true,
    "bg-accent hover:bg-accent": active
  });

  function handleClick(value) {
    const newFilters = Object.assign({}, filters);
    newFilters[group] = value;
    setFilters(newFilters);
  }

  return (
    <button
      className={optionClasses}
      onClick={() => {
        handleClick(value);
      }}
    >
      {label}
    </button>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Filters({ filterGroups, filters, setFilters }) {
  return (
    <section className="flex gap-16">
      {filterGroups.map(filterGroup => (
        <div className="p-16 border" key={filterGroup.value}>
          <div className="text-sm text-primary-50">{filterGroup.label}</div>
          <FilterOption
            group={filterGroup.value}
            label="All"
            value="all"
            key="all"
            filters={filters}
            setFilters={setFilters}
          />
          {filterGroup.options.map(option => (
            <FilterOption
              filters={filters}
              group={filterGroup.value}
              key={option.value}
              label={option.label}
              setFilters={setFilters}
              value={option.value}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
