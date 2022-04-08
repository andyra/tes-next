import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageTitle from "../../components/PageTitle";
import CategoryList from "./components/CategoryList";

// Default
// ----------------------------------------------------------------------------

export default function WikisPage() {
  return (
    <>
      <PageTitle>Wiki</PageTitle>
      <ClientOnly>
        <CategoryList />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Wiki"
    }
  };
}
