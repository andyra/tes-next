import { gql } from "@apollo/client";
import countryClient from "../../apollo-client";
import PageTitle from "../../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function GqlPaths({ country }) {
  return (
    <>
      <PaegTitle>GraphQL Static</PaegTitle>
      <ul className="list list-disc">
        <li className="flex items-center gap-8">
          <span>{country.name}</span>
          <span>{country.code}</span>
          <span>{country.emoji}</span>
        </li>
      </ul>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticPaths() {
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

  const paths = data.countries.slice(0, 4).map(country => ({
    params: { code: country.code }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { data } = await countryClient.query({
    query: gql`
      query Country {
        country(code: "${params.code}") {
          code
          name
          emoji
        }
      }
    `
  });

  return {
    props: {
      country: data.country
    }
  };
}
