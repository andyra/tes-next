import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Button from "components/Button";
import {
  DropdownMenu,
  DropdownDivider,
  DropdownItem
} from "components/DropdownMenu";
import Icon from "components/Icon";
import Search from "components/Search";
import ThemeSwitcher from "components/ThemeSwitcher";

export const NavLink = ({ className, count, navSection, title, href }) => {
  const router = useRouter();
  const active = router.asPath == href || navSection === title;
  const linkClasses = cn(
    "flex items-center relative",
    "md:flex-row md:justify-start md:gap-8 md:px-12 md:-ml-12 md:hover:underline",
    "flex-col justify-center",
    "font-funky font-bold text-2xl md:text-5xl",
    active ? "text-accent" : "text-secondary",
    className
  );

  return (
    <li>
      <Link href={href}>
        <a className={linkClasses}>{title}</a>
      </Link>
    </li>
  );
};

const TitleMarquee = () => (
  <Link href="/">
    <a className="h-24 md:h-160 relative w-screen overflow-hidden -ml-8 md:-mx-24 text-primary md:text-secondary hover:text-accent relative">
      <span
        className="ml-16 font-funky text-9xl leading-none hidden md:block transition"
        aria-hidden
      >
        TES
      </span>
      <div className="absolute z-10 w-24 h-full top-0 left-0 bg-gradient-to-r from-ground pointer-events-none md:hidden" />
      <div className="flex items-center gap-12 absolute animate-marquee transition">
        <span className="sr-only">This Evening&apos;s Show</span>
        {[...Array(4)].map(i => (
          <Icon name="MarqueeTypewriter" size="h-24" key={i} />
        ))}
      </div>
      <div className="absolute z-10 w-24 h-full top-0 right-0 bg-gradient-to-l from-ground pointer-events-none md:hidden" />
    </a>
  </Link>
);

export const Navigation = ({ navSection, playerIsEmpty }) => {
  const classes = cn(
    "flex items-center md:items-stretch bg-ground gap-16 p-8 rounded-lg print:hidden",
    "md:w-192 md:flex-shrink-0 md:flex-col md:p-24 overflow-hidden"
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
          <DropdownMenu
            trigger={
              <div className="font-funky font-bold text-2xl md:text-5xl cursor-pointer text-secondary hover:underline">
                &amp;&hellip;
              </div>
            }
          >
            <DropdownItem title="Videos" href="/videos" icon="Video" />
            <DropdownItem
              title="Setlist Computor"
              href="/setlist"
              icon="Note"
            />
            <DropdownDivider />
            <DropdownItem
              title="Sign In"
              href="https://content.tes.fm/admin"
              target="_blank"
              rel="noopener noreferrer"
            />
          </DropdownMenu>
        </ul>

        <div
          id="mobile-menu"
          className="flex items-center gap-8 ml-auto md:fixed md:top-12 md:right-12 md:z-20"
        >
          <Search />
          <ThemeSwitcher />
          <DropdownMenu
            asChild
            tooltip="Main Menu"
            trigger={
              <Button
                circle
                icon="Menu"
                variant="glass"
                className="md:hidden"
              />
            }
            triggerClassName="md:hidden"
          >
            <DropdownItem
              title="Music"
              href="/albums"
              icon="Music"
              className="md:hidden"
            />
            <DropdownItem
              title="Podcast"
              href="/episodes"
              icon="Mic"
              className="md:hidden"
            />
            <DropdownItem
              title="Library"
              href="/library"
              icon="Book"
              className="md:hidden"
            />
            <DropdownItem title="Videos" href="/videos" icon="Video" />
            <DropdownItem
              title="Setlist Computor"
              href="/setlist"
              icon="Note"
            />
            <DropdownItem title="Contact" href="/contact" icon="Phone" />
            <DropdownDivider />
            <DropdownItem
              href="https://content.tes.fm/admin"
              target="_blank"
              rel="noopener noreferrer"
              title="Sign In"
            />
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
