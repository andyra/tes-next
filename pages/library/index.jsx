import ClientOnly from "../../components/ClientOnly";
import Empty from "../../components/Empty";
import PageHeader from "../../components/PageHeader";
import CategoryList from "./components/CategoryList";

// Default
// ----------------------------------------------------------------------------

export default function Library() {
  return (
    <>
      <PageHeader title="Library" center />
      <p className="text-2xl md:text-4xl md:text-center max-w-screen-lg mx-auto">
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
      PageTitle: "Library",
      spacing: true
    }
  };
}
