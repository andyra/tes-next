import React, { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styled from "styled-components";
import { gql } from "@apollo/client";
import client from "helpers/apollo-client";
import Filters, { getDefaultFilters } from "components/Filters";
import NiceDate from "components/NiceDate";
import PageHeader from "components/PageHeader";
import { slugify } from "helpers/utils";

const Item = styled.div`
  &:first-child .item__line {
    top: 0;
  }

  &:last-child .item__line {
    bottom: 0;
  }
`;

// Filters
// ----------------------------------------------------------------------------

function normalizeTimelineFilters(events) {
  let [options, uniqueTags] = [[], []];

  for (const event of events) {
    if (event.tags.length) {
      for (const tag of event.tags) {
        if (!uniqueTags.includes(tag.title)) {
          uniqueTags.push(tag.title);
          options.push({
            label: tag.title,
            value: slugify(tag.title),
          });
        }
      }
    }
  }

  return [
    {
      label: "Timeline",
      value: "timeline",
      options: options,
    },
  ];
}

const Event = ({ event, filters, first, last }) => {
  const visible =
    filters.timeline === "all" ||
    event.tags.filter((tag) => slugify(tag.title) === filters.timeline).length >
      0;

  const lineClasses = cn(
    "item__line",
    "absolute left-4 -translate-x-1/2 w-2 bg-secondary-25 -top-999 -bottom-999"
  );

  return (
    visible && (
      <Item className="flex flex-wrap items-baseline gap-8 md:gap-16 py-16 overflow-hidden transition group">
        <div
          className="h-8 w-8 rounded-full bg-secondary -translate-y-2 relative"
          aria-hidden
        >
          <div className={lineClasses} />
        </div>
        <NiceDate
          date={event.date}
          className="w-128 font-mono text-base text-secondary md:text-right md:order-first"
          format="monthYear"
        />
        <div className="w-full pl-16 md:w-auto md:flex-1 md:pl-0">
          {event.linkTo.length > 0 ? (
            <Link className="underline" href={event.linkTo[0].uri}>
              {event.description}
            </Link>
          ) : (
            event.description
          )}
          <div className="text-sm text-primary-50 font-mono text-base">
            {event.tags.map((tag, index) => (
              <React.Fragment key={tag.title}>
                {tag.title}
                {index !== event.tags.length - 1 && <>, </>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Item>
    )
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Timeline({ events }) {
  const timelineFilters = normalizeTimelineFilters(events);
  const [filters, setFilters] = useState(getDefaultFilters(timelineFilters));

  return (
    <>
      <PageHeader
        title="Akabius Timeline"
        actions={
          <Filters
            filterGroups={timelineFilters}
            filters={filters}
            setFilters={setFilters}
          />
        }
      />

      <ol className="text-xl divide-y divide-dashed divide-secondary-10 border-y border-dashed border-secondary-10">
        {events.map((event, index) => (
          <Event
            event={event}
            filters={filters}
            key={index}
            first={index === 0}
            last={index === events.length - 1}
          />
        ))}
      </ol>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data, error } = await client.query({
    query: gql`
      query Entry {
        entry(section: "timeline") {
          ... on timeline_timeline_Entry {
            timeline {
              ... on timeline_event_BlockType {
                date
                description
                linkTo {
                  uri
                }
                tags {
                  title
                }
              }
            }
          }
        }
      }
    `,
  });

  if (error) {
    return;
  }

  return {
    props: {
      events: data.entry.timeline,
      navSection: "Library",
    },
  };
}
