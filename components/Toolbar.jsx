import Search from "./Search";
import ExtrasMenu from "./ExtrasMenu";

const Toolbar = () => (
  <section className="flex justify-end sticky top-0 z-10 bg-gradient-to-b from-ground p-8 print:hidden">
    <ul className="flex items-center gap-8">
      <li className="bg-ground rounded-full">
        <Search />
      </li>
      <li className="bg-ground rounded-full">
        <ExtrasMenu />
      </li>
    </ul>
  </section>
);

export default Toolbar;
