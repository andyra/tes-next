import { useContext } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import NiceDate from "components/NiceDate";

// Default
// ----------------------------------------------------------------------------

export default function Timeline({ timelineEvents }) {
  return (
    <>
      <h1>Timeline</h1>
      <ol class="list-decimal">
        {timelineEvents.map((event, index) => (
          <li className="flex gap-8" key={index}>
            <NiceDate date={event.date} className="w-1/5" />
            <div className="flex-1">{event.description}</div>
          </li>
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
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      timelineEvents: data.entry.timeline,
    },
  };
}
