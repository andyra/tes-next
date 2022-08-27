import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Button from "components/Button";
import ThemeSwitcher from "components/ThemeSwitcher";
import Icon from "components/Icon";
import { Menu, MenuDivider, MenuItem } from "components/Menu";
import Search from "components/Search";

export const NavLink = ({ className, count, navSection, title, href }) => {
  const router = useRouter();
  const active = router.asPath == href || navSection === title;
  const linkClasses = cn(
    "flex items-center relative",
    "md:flex-row md:justify-start md:gap-8 md:px-12 md:-ml-12 md:hover:underline",
    "flex-col justify-center",
    "font-funky text-2xl md:text-5xl",
    className,
    { "text-accent": active }
  );

  return (
    <li>
      <Link href={href}>
        <a className={linkClasses}>{title}</a>
      </Link>
    </li>
  );
};

const TitleMarquee = () => {
  const classes = cn(
    "h-[36px] md:h-128 relative w-screen overflow-hidden -ml-8 md:-mx-24 relative"
  );

  const innerClasses = cn(
    "uppercase font-funky text-4xl md:text-9xl hover:text-accent transition",
    "absolute whitespace-nowrap animate-marquee"
  );

  return (
    <Link href="/">
      <a className={classes} title="This Evening's Show">
        <div className="absolute z-10 w-24 h-full top-0 left-0 bg-gradient-to-r from-ground pointer-events-none md:hidden" />
        <div className={innerClasses}>
          {[...Array(4)].map(i => (
            <>This Evening&apos;s Show </>
          ))}
        </div>
        <div className="absolute z-10 w-24 h-full top-0 right-0 bg-gradient-to-l from-ground pointer-events-none md:hidden" />
      </a>
    </Link>
  );
};

export const Navigation = ({ navSection, playerIsEmpty }) => {
  const classes = cn(
    "flex items-stretch bg-ground gap-16 p-8 rounded-lg print:hidden",
    "md:w-192 md:flex-shrink-0 md:flex-col md:p-24 md:overflow-y-auto"
  );

  return (
    <>
      <nav className={classes}>
        <TitleMarquee />

        <ul className="hidden md:block md:mb-auto text-left">
          <NavLink title="Music" href="/albums" navSection={navSection} />
          <NavLink title="Podcast" href="/episodes" navSection={navSection} />
          <NavLink title="Library" href="/library" navSection={navSection} />
          <NavLink
            title="Videos"
            href="/videos"
            navSection={navSection}
            className="md:hidden"
          />
          <NavLink
            title="Setlist Computor"
            href="/setlist"
            navSection={navSection}
            className="md:hidden"
          />
          <NavLink title="Contact" href="/contact" navSection={navSection} />
          <Menu
            trigger={<div>&</div>}
            triggerClassName="font-funky text-2xl md:text-5xl cursor-pointer hover:underline"
          >
            <MenuItem href="/videos" icon="Video">
              Videos
            </MenuItem>
            <MenuItem href="/setlist" icon="Note">
              Setlist Computor
            </MenuItem>
            <MenuDivider />
            <MenuItem href="/">Sign In</MenuItem>
          </Menu>
        </ul>

        <div
          id="mobile-menu"
          className="flex items-center gap-8 ml-auto md:fixed md:top-12 md:right-12 md:z-10"
        >
          <Search />
          <ThemeSwitcher />
          <Menu
            tooltip="Main Menu"
            trigger={<Button circle iconLeft={"Menu"} variant="glass" />}
            triggerClassName="md:hidden"
          >
            <MenuItem href="/albums" icon="Music" className="md:hidden">
              Music
            </MenuItem>
            <MenuItem href="/episodes" icon="Mic" className="md:hidden">
              Podcast
            </MenuItem>
            <MenuItem href="/library" icon="Book" className="md:hidden">
              Library
            </MenuItem>
            <MenuItem href="/videos" icon="Video">
              Videos
            </MenuItem>
            <MenuItem href="/setlist" icon="Note">
              Setlist Computor
            </MenuItem>
            <MenuItem href="/contact" icon="Phone">
              Contact
            </MenuItem>
            <MenuDivider />
            <MenuItem href="/">Sign In</MenuItem>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
