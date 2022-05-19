import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Button from "./Button";
import Icon from "./Icon";
import { Menu, MenuItem, MenuHeading } from "./Menu";

// Functions
// ----------------------------------------------------------------------------

export function getDefaultFilters(filterGroups) {
  let defaultFilters = {};
  for (let filterGroup of filterGroups) {
    defaultFilters[filterGroup.value] = "all";
  }
  return defaultFilters;
}

function isFiltering(filters) {
  let filtering = false;

  for (const [key, value] of Object.entries(filters)) {
    if (value !== "all") {
      filtering = true;
    }
  }
  return filtering;
}

// Components
// ----------------------------------------------------------------------------

const FilterOption = ({ group, label, value, filters, setFilters }) => {
  const active = filters[group] === value;

  function handleClick(value) {
    const newFilters = Object.assign({}, filters);
    newFilters[group] = value;
    setFilters(newFilters);
  }

  return (
    <MenuItem
      className={active ? "text-accent" : ""}
      onClick={() => {
        handleClick(value);
      }}
    >
      {label}
      <Icon name="checkmark" solid className={active ? "" : "opacity-0"} />
    </MenuItem>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Filters({
  className,
  filterGroups,
  filters,
  setFilters
}) {
  const containerClasses = cn({
    [className]: className
  });

  const triggerClasses = cn({
    "flex items-center gap-8 h-32 px-12 border border-primary-10 rounded-full": true,
    "bg-accent-5 hover:bg-accent-10 border-accent-25 text-accent": isFiltering(
      filters
    )
  });

  return (
    <section className={containerClasses}>
      <Menu
        trigger={
          <Button>
            Filters
            <Icon name="chevron-down" />
          </Button>
        }
      >
        {filterGroups.map(filterGroup => (
          <>
            <MenuHeading>{filterGroup.label}</MenuHeading>
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
          </>
        ))}
      </Menu>
    </section>
  );
}
