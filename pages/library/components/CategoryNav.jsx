import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import Icon from "components/Icon";
import { categoryHref } from "helpers";

const CategoryLink = ({ collapsible, title, href, icon }) => {
  const router = useRouter();
  const active = router.asPath === href;

  const classes = cn(
    "flex items-center justify-center gap-8 px-8 xs:px-12 py-8 rounded-t-lg h-full border-x border-t border-secondary",
    "font-serif text-center leading-tight overflow-hidden break-words transition",
    active
      ? "bg-secondary text-ground"
      : "text-secondary hover:bg-secondary hover:text-ground",
    collapsible && !active ? "hidden" : ""
  );

  return (
    (<Link href={href} className={classes}>

      {icon && <Icon name={icon} />}
      {title}

    </Link>)
  );
};

const CategoryNav = ({ backLink, categories, className, collapsible }) => {
  const classes = cn(
    "border-b border-secondary font-serif",
    "grid grid-cols-3 gap-x-4",
    "sm:flex sm:justify-center sm:flex-wrap sm:gap-x-4",
    className
  );

  return (
    <nav className={classes}>
      {backLink && (
        <CategoryLink
          title={backLink.title}
          icon="ArrowLeft"
          href={backLink.href}
        />
      )}
      {!!categories &&
        categories.map(category => (
          <CategoryLink
            title={category.title}
            href={categoryHref(category.slug)}
            key={category.slug}
            collapsible={collapsible}
          />
        ))}
    </nav>
  );
};

export default CategoryNav;
