import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";
import Countries from "./components/Countries";

export default function ClientSide() {
  return (
    <>
      <PageTitle>GraphQL Client-Side</PageTitle>
      <ClientOnly>
        <Countries />
      </ClientOnly>
    </>
  );
}
