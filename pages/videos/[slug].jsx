import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import PageHeader from "../../components/PageHeader";

// Default
// ----------------------------------------------------------------------------

export default function Video() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <PageHeader title={slug} />
    </>
  );
}
