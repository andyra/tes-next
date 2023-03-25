import { useState } from "react";
import Link from "next/link";
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

  return (
    visible && (
      <li className="flex gap-8">
        <NiceDate date={event.date} className="w-1/5" />
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

      <ol className="list-decimal">
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
