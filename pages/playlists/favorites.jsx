import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Button from "components/Button";
import ClientOnly from "components/ClientOnly";
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
      PageTitle: "Favorites"
    }
  };
}
