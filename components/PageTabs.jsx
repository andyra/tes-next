import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import cn from "classnames";

// Tab Item
// ----------------------------------------------------------------------------

const PageTabsItem = ({ item }) => {
  const { href, title } = item;
  const router = useRouter();
  const active = router.asPath == href;

  const classes = cn({
    "font-funky font-bold text-5xl xs:text-7xl sm:text-8xl tracking-tight px-12 hover:underline rounded-full border-2 border-transparent": true,
    "text-secondary": !active,
    "underline text-accent": active,
  });

  return (
    <Link href={href} className={classes}>
      {title}
    </Link>
  );
};

// Tabs
// ----------------------------------------------------------------------------

export const PageTabs = ({ items }) => (
  <nav className="flex items-center justify-center">
    {items.map((item) => (
      <PageTabsItem key={item.href} item={item} />
    ))}
  </nav>
);

PageTabs.propTypes = {
  pageName: PropTypes.array.isRequired,
};

export default PageTabs;
