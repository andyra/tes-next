import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function Favorites() {
  return (
    <>
      <PageTitle>Favorites</PageTitle>
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
