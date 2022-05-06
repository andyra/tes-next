import Link from "next/link";
import { useRouter } from "next/router";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Icon from "./Icon";

// Components
// ----------------------------------------------------------------------------

export const NavLink = ({ className, count, icon, navSection, title, url }) => {
  const router = useRouter();
  const active = router.asPath == url || navSection === title;
  const linkClasses = cn({
    "flex items-center relative": true,
    "flex-1 flex-col justify-center": navSection !== "playlists",
    "md:flex-row md:justify-start md:h-32 md:gap-8 md:px-12 md:-ml-12 md:py-16 md:rounded-lg md:hover:bg-secondary-10": true,
    "text-accent": active,
    "h-48 gap-16 border-t border-primary-10 md:border-none":
      navSection === "playlists",
    [className]: className
  });

  const titleClasses = cn({
    "text-xs opacity-50 md:text-base md:opacity-100":
      navSection !== "playlists",
    "text-lg md:text-base": navSection === "playlists"
  });

  return (
    <Link href={url}>
      <a className={linkClasses}>
        {icon && (
          <span className="w-16 flex items-center justify-center text-xl md:text-base md:hidden">
            <Icon name={icon} solid />
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

// Default
// ----------------------------------------------------------------------------

export default function Navigation({ navSection }) {
  const navClasses = cn({
    "row-start-3 flex items-stretch border-t border-primary-10": true,
    "md:row-span-1 md:flex-col md:gap-24 md:pl-24 md:pr-12 md:border-r md:border-primary-10 md:overflow-y-auto md:text-secondary": true
  });

  return (
    <>
      <nav className={navClasses}>
        <Link href="/">
          <a className="text-3xl my-24 leading-tight hidden md:block">
            This
            <br />
            Evening's
            <br />
            Show
            <br />
          </a>
        </Link>
        <div className="flex w-full md:block">
          <NavLink title="Home" url="/" icon="home" />
          <NavLink
            title="Episodes"
            url="/episodes"
            icon="mic"
            navSection={navSection}
          />
          <NavLink
            title="Music"
            url="/albums"
            icon="musical-notes"
            navSection={navSection}
          />
          <NavLink
            title="Wiki"
            url="/wiki"
            icon="book"
            navSection={navSection}
          />
          <Popover.Root>
            <Popover.Trigger className="flex-1 flex flex-col items-center justify-center md:hidden">
              <Icon name="ellipsis-horizontal" solid />
              <span className="text-xs opacity-50">More</span>
            </Popover.Trigger>
            <Popover.Content
              className="bg-ground p-8 border border-primary-10 rounded-lg shadow-lg w-192"
              side="top"
            >
              <NavLinkPopover title="Videos" href="videos" />
              <NavLinkPopover title="Setlist Computor" href="setlist" />
              <NavLinkPopover title="About" href="about" />
            </Popover.Content>
          </Popover.Root>
          <NavLink
            className="hidden md:flex"
            title="Videos"
            url="/videos"
            icon="videocam"
            navSection={navSection}
          />
          <NavLink
            className="hidden md:flex"
            title="Setlist Computor"
            url="/setlist"
            icon="musical-note"
            navSection={navSection}
          />
          <NavLink
            className="hidden md:flex"
            title="About"
            url="/about"
            icon="information"
          />
        </div>
      </nav>
    </>
  );
}
