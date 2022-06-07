import Search from "./Search";
import ExtrasMenu from "./ExtrasMenu";

const Toolbar = () => (
  <section className="flex justify-end sticky top-0 z-10 bg-gradient-to-b from-ground p-8">
    <div className="flex items-center gap-8 bg-ground rounded-full">
      <Search />
      <ExtrasMenu />
    </div>
  </section>
);

export default Toolbar;
