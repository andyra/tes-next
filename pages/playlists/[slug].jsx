import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function Playlist() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <PageTitle>Playlist: {slug}</PageTitle>
    </>
  );
}
