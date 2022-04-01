import { gql } from "@apollo/client";
import PageTitle from "../../components/PageTitle";
import countryClient from "../../apollo-client";

// Default
// ----------------------------------------------------------------------------

export default function GqlServer({ countries }) {
  return (
    <>
      <PageTitle>GraphQL Server-Side</PageTitle>
      <ul>
        {countries.map(country => (
          <li className="flex items-center gap-8" key={country.code}>
            <span>{country.name}</span>
            <span>{country.code}</span>
            <span>{country.emoji}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getServerSideProps() {
  const { data } = await countryClient.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `
  });

  return {
    props: {
      countries: data.countries.slice(0, 4)
    }
  };
}
