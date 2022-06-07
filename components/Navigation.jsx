import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import AnimatedLetter from "./AnimatedLetter";
import Button from "./Button";
import Icon from "./Icon";
import { Menu } from "./Menu";

export const NavLink = ({
  className,
  count,
  hide,
  icon,
  navSection,
  title,
  href
}) => {
  const router = useRouter();
  const active = router.asPath == href || navSection === title;
  const linkClasses = cn({
    "flex items-center relative": true,
    "flex-1 flex-col justify-center": navSection !== "playlists",
    "md:flex-row md:justify-start md:gap-8 md:px-12 md:-ml-12 md:hover:underline": true,
    "text-accent": active,
    "h-48 gap-16 border-t border-primary-10 md:border-none":
      navSection === "playlists",
    "md:hidden": hide === "desktop",
    "hidden md:flex": hide === "mobile",
    [className]: className
  });

  const titleClasses = cn({
    "text-xs opacity-50 md:font-funky md:text-5xl md:opacity-100":
      navSection !== "playlists",
    "text-lg md:text-base": navSection === "playlists"
  });

  return (
    <Link href={href}>
      <a className={linkClasses}>
        {icon && (
          <span className="w-16 flex items-center justify-center text-xl md:text-base md:hidden">
            <Icon name={icon} />
          </span>
        )}
        <span className={titleClasses}>{title}</span>
      </a>
    </Link>
  );
};

const NavLinkPopover = ({ href, title }) => (
  <Link href={href}>
    <a className="flex p-8 rounded-lg hover:bg-primary-5">{title}</a>
  </Link>
);

const Footer = () => {
  const max = 2022;
  const min = 1930;
  const randomYear = Math.floor(Math.random() * (max - min + 1) + min);

  return (
    <footer className="mt-auto text-xs tracking-wide opacity-50 hidden md:block">
      &copy; {randomYear} T.E.S.
    </footer>
  );
};

export const Navigation = ({ navSection }) => {
  const navClasses = cn({
    "row-start-3 flex items-stretch": true,
    "bg-ground rounded-lg md:row-span-1 md:flex-col md:gap-24 md:p-24 md:overflow-y-auto md:text-secondary": true
  });

  return (
    <>
      <nav className={navClasses}>
        <Link href="/">
          <a className="font-funky text-5xl text-primary hidden md:block">
            This
            <br />
            Evening's
            <br />
            Show
          </a>
        </Link>
        <div className="grid grid-cols-5 w-full md:block">
          <NavLink title="Home" href="/" icon="Home" hide="desktop" />
          <NavLink title="Search" href="/" icon="Search" hide="desktop" />
          <NavLink
            title="Music"
            href="/albums"
            icon="Music"
            navSection={navSection}
          />
          <NavLink
            title="Podcast"
            href="/episodes"
            icon="Mic"
            navSection={navSection}
          />
          <NavLink
            title="Library"
            href="/library"
            icon="Book"
            navSection={navSection}
            hide="mobile"
          />
          <NavLink title="Contact" href="/contact" icon="Phone" hide="mobile" />
          <Menu
            side="top"
            trigger={
              <div className="w-full h-full flex flex-col items-center justify-center md:hidden">
                <Icon name="Overflow" />
                <span className="text-xs opacity-50">More</span>
              </div>
            }
          >
            <NavLinkPopover title="Library" href="/library" />
            <NavLinkPopover title="Videos" href="/videos" />
            <NavLinkPopover title="Setlist Computor" href="/setlist" />
            <NavLinkPopover title="Contact" href="contact" />
          </Menu>
          <NavLink
            className="hidden"
            title="Videos"
            href="/videos"
            icon="Video"
            navSection={navSection}
          />
          <NavLink
            className="hidden"
            title="Setlist Computor"
            href="/setlist"
            icon="Music"
            navSection={navSection}
          />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
