import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import Filters, { getDefaultFilters } from "components/Filters";
import NiceDate from "components/NiceDate";
import { slugify } from "helpers/utils";

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

const Event = ({ event, filters }) => {
  const visible =
    filters.timeline === "all" ||
    event.tags.filter((tag) => slugify(tag.title) === filters.timeline).length >
      0;

  const lineClasses = cn(
    "absolute top-0 bottom-0 left-4 -translate-x-1/2",
    "w-2 bg-accent-25"
  );

  return (
    visible && (
      <li className="flex items-center gap-8">
        <NiceDate
          date={event.date}
          className="flex items-center justify-end gap-8 w-128"
        />
        <div className="relative self-stretch flex items-center justify-center py-16">
          <div className="h-8 w-8 rounded-full bg-accent" aria-hidden />
          <div className={lineClasses} aria-hidden />
        </div>
        <div className="flex-1">{event.description}</div>
      </li>
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
      <h1>Timeline</h1>

      <Filters
        filterGroups={timelineFilters}
        filters={filters}
        setFilters={setFilters}
      />

      <ol className="">
        {events.map((event, index) => (
          <Event event={event} filters={filters} key={index} />
        ))}
      </ol>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await client.query({
    query: gql`
      query Entry {
        entry(section: "timeline") {
          ... on timeline_timeline_Entry {
            timeline {
              ... on timeline_event_BlockType {
                date
                description
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

  return {
    props: {
      events: data.entry.timeline,
    },
  };
}
