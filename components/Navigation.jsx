import Link from "next/link";
import { useRouter } from "next/router";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import Icon from "./Icon";
import MediaQuery from "./MediaQuery";

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
          <span className="w-16 flex items-center justify-center text-xl md:text-base">
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

export const MobileNav = ({ navSection }) => (
  <MediaQuery mobile>
    <nav className="row-start-3 flex items-stretch border-t border-primary-10">
      <NavLink title="Home" url="/" icon="home" navSection={navSection} />
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
        icon="musical-notes"
        navSection={navSection}
      />
      <Popover.Root>
        <Popover.Trigger className="flex-1 flex flex-col items-center justify-center">
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
    </nav>
  </MediaQuery>
);

export const DesktopNav = ({ navSection }) => (
  <MediaQuery desktop>
    <nav className="row-span-1 flex flex-col gap-24 pl-24 pr-12 border-r border-primary-10 overflow-y-auto text-secondary">
      <Link href="/">
        <a className="text-3xl my-24 leading-tight">
          This
          <br />
          Evening's
          <br />
          Show
          <br />
        </a>
      </Link>
      <ul>
        <li>
          <NavLink
            title="Episodes"
            url="/episodes"
            // icon="mic"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Music"
            url="/albums"
            // icon="musical-notes"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Wiki"
            url="/wiki"
            // icon="book"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Videos"
            url="/videos"
            // icon="videocam"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="Setlist Computor"
            url="/setlist"
            // icon="musical-note"
            navSection={navSection}
          />
        </li>
        <li>
          <NavLink
            title="About"
            url="/about"
            // icon="information"
          />
        </li>
      </ul>
    </nav>
  </MediaQuery>
);

// Default
// ----------------------------------------------------------------------------

export default function Navigation({ navSection }) {
  return (
    <>
      <DesktopNav navSection={navSection} />
      <MobileNav navSection={navSection} />
    </>
  );
}
