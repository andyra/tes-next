import { Fragment } from "react";
import PropTypes from "prop-types";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Button from "components/Button";
import Icon from "components/Icon";
import { Menu, MenuDivider, MenuItem, MenuHeading } from "components/Menu";

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
      className={`capitalize ${active ? "text-accent" : ""}`}
      onClick={() => {
        handleClick(value);
      }}
    >
      {label}
      <Icon name="Check" className={`ml-auto ${active ? "" : "opacity-0"}`} />
    </MenuItem>
  );
};

export const Filters = ({ className, filterGroups, filters, setFilters }) => {
  const triggerClasses = cn({
    "bg-accent-5 hover:bg-accent-10 border-accent-25 text-accent": isFiltering(
      filters
    )
  });

  return (
    <section className={className}>
      <Menu
        trigger={
          <Button iconRight="ChevronDown" className={triggerClasses}>
            Filters
          </Button>
        }
      >
        {filterGroups.map((filterGroup, i) => (
          <Fragment key={filterGroup.label}>
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
            {i + 1 < filterGroups.length && <MenuDivider />}
          </Fragment>
        ))}
      </Menu>
    </section>
  );
};

Filters.propTypes = {
  className: PropTypes.string,
  filterGroups: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default Filters;
