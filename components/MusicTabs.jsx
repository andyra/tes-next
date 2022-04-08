import Link from "next/link";

const TabItem = ({ title, url, page }) => (
  <Link href={url}>
    <a
      className={`text-6xl font-bold tracking-tighter${
        page === title ? " underline" : ""
      }`}
    >
      {title}
    </a>
  </Link>
);

export default function MusicTabs({ page }) {
  return (
    <nav className="flex items-center justify-center gap-24 mb-64">
      <TabItem title="Albums" url="/albums" page={page} />
      <TabItem title="Songs" url="/songs" page={page} />
    </nav>
  );
}
