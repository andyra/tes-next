import Link from "next/link";
import cn from "classnames";

const TabItem = ({ title, url, page }) => {
  const active = page === title;
  const classes = cn({
    "flex-1 flex items-center justify-center font-funky text-4xl md:text-6xl lg:text-8xl tracking-tight hover:text-accent rounded-full border-2 border-transparent": true,
    "text-secondary": !active,
    "border-accent text-accent": active
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
