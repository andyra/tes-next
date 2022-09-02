import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Icon from "components/Icon";
import { categoryHref } from "helpers";

const CategoryLink = ({ title, href, icon }) => {
  const router = useRouter();
  const active = router.asPath == href;

  const classes = cn(
    "flex items-center gap-8 px-12 py-8 rounded-t-lg h-full border-x border-t border-secondary",
    "font-mono",
    active ? "bg-secondary text-ground" : "text-secondary hover:bg-secondary-5"
  );

  return (
    <Link href={href}>
      <a className={classes}>
        {icon && <Icon name={icon} />}
        {title}
      </a>
    </Link>
  );
};

const CategoryNav = ({ backLink, categories, className }) => {
  return (
    <nav
      className={cn(
        "flex justify-center flex-wrap gap-x-4 border-b border-secondary bg-ground sticky top-0 z-10",
        className
      )}
    >
      {backLink ? (
        <CategoryLink title="Back" href="/library" icon="ArrowLeft" />
      ) : null}
      {categories.map(category => (
        <CategoryLink
          title={category.title}
          href={categoryHref(category.slug)}
          key={category.slug}
        />
      ))}
    </nav>
  );
};

export default CategoryNav;
