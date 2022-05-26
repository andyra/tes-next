import Search from "./Search";
import ThemeSwitcher from "./ThemeSwitcher";

const Toolbar = () => (
  <section className="flex items-center justify-end gap-8 sticky top-0 z-10 bg-gradient-to-b from-ground p-8">
    <Search />
    <ThemeSwitcher />
  </section>
);

export default Toolbar;
