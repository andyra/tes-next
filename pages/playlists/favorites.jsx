import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import PageHeader from "components/PageHeader";

// Default
// ----------------------------------------------------------------------------

export default function Favorites() {
  return (
    <>
      <PageHeader title="Favorites" />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Favorites"
    }
  };
}
