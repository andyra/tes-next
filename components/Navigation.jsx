import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Button from "./Button";
import Icon from "./Icon";

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
    "h-48 gap-16 border-t md:border-none": navSection === "playlists",
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

export const Navigation = ({ navSection, playerIsEmpty }) => {
  const navClasses = cn({
    "flex items-stretch print:hidden": true,
    "bg-ground rounded-lg md:row-span-1 md:flex-col md:gap-24 md:p-24 md:overflow-y-auto md:text-secondary": true,
    "row-start-3": !playerIsEmpty,
    "row-start-2": playerIsEmpty
  });

  return (
    <>
      <nav className={navClasses}>
        <Link href="/">
          <a className="hidden md:block -mx-24">
            <div className="uppercase font-funky text-9xl whitespace-nowrap flex gap-16 animate-marquee w-[929px]">
              <span>This Evening's Show</span>
              <span>This Evening's Show</span>
            </div>
          </a>
        </Link>
        <div className="grid grid-cols-5 w-full md:block">
          <NavLink title="Home" href="/" icon="Home" hide="desktop" />
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
          />
          <NavLink title="Contact" href="/contact" icon="Phone" />
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
