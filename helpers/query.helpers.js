import { gql } from "@apollo/client";

// A clean way of building a GraphQL query to get a list of slugs for a section
export function querySlugs(section) {
  return gql`
    query Entries {
      entries(section: "${section}") {
        slug
      }
    }
  `;
}

export function queryEntry(section, slug, content) {
  return gql`
    query Entry {
      entry(section: "${section}", slug: "${slug}") {
        title
        ${content}
      }
    }
  `;
}