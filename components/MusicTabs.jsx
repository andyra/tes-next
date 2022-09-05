import PropTypes from "prop-types";
import Link from "next/link";
import cn from "classnames";

// Tab Item
// ----------------------------------------------------------------------------

const MusicTabsItem = ({ href, pageName, title }) => {
  const active = pageName === title;
  const classes = cn({
    "font-funky font-bold text-6xl md:text-8xl tracking-tight px-12 hover:underline rounded-full border-2 border-transparent": true,
    "text-secondary": !active,
    "underline text-accent": active
  });

  return (
    <Link href={href}>
      <a className={classes}>{title}</a>
    </Link>
  );
};

MusicTabsItem.propTypes = {
  href: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

// Tabs
// ----------------------------------------------------------------------------

export const MusicTabs = ({ pageName }) => {
  return (
    <nav className="flex items-center justify-center">
      <MusicTabsItem title="Albums" href="/albums" pageName={pageName} />
      <MusicTabsItem title="Songs" href="/songs" pageName={pageName} />
    </nav>
  );
};

MusicTabs.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default MusicTabs;
