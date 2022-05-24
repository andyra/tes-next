import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageTitle from "../../components/PageTitle";
import CategoryList from "./components/CategoryList";

// Default
// ----------------------------------------------------------------------------

export default function WikisPage() {
  return (
    <>
      <PageTitle center>Library</PageTitle>
      <p className="text-4xl text-center max-w-screen-lg mx-auto">
        The Grand Library of all things Akabius. Learn about, for instance,
        Multiple Mountain, Poor Ohr, and Zaso Jacquzi.
      </p>
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
      maxWidth: "max-w-full",
      pageTitle: "Library",
      spacing: "space-y-64"
    }
  };
}
