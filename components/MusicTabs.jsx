import Link from "next/link";
import cn from "classnames";

const TabItem = ({ title, url, page }) => {
  const classes = cn({
    "font-serif text-4xl md:text-8xl tracking-tight hover:text-accent": true,
    underline: page === title
  });

  return (
    <Link href={url}>
      <a className={classes}>{title}</a>
    </Link>
  );
};

export default function MusicTabs({ page }) {
  return (
    <nav className="flex items-center lg:justify-center gap-24">
      <TabItem title="Albums" url="/albums" page={page} />
      <TabItem title="Songs" url="/songs" page={page} />
    </nav>
  );
}
