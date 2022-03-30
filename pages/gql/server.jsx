import { gql } from "@apollo/client";
import countryClient from "../../apollo-client";

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
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}

export default function GqlServer({ countries }) {
  return (
    <>
      <h1 className="text-6xl font-bold tracking-tighter">
        GraphQL Server-Side
      </h1>
      <ul>
        {countries.map((country) => (
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
