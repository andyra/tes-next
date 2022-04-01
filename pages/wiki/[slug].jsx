import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageTitle from "../../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function Article() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <PageTitle>Article: {slug}</PageTitle>
    </>
  );
}
