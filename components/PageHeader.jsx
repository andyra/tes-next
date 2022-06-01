import { Fragment } from "react";
import Link from "next/link";
import Icon from "./Icon";

export const Breadcrumbs = ({ items }) => {
  return (
    <ul className="inline-flex items-center relative">
      {items.map((item, i) => (
        <Fragment key={i}>
          <li>
            <Link href={item.href}>
              <a className="block px-8 hover:underline">{item.title}</a>
            </Link>
          </li>
          {i + 1 < items.length && (
            <li>
              <Icon name="ChevronRight" className="text-primary-50" />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export const PageTitle = ({ children, className }) => {
  const classes = cn({
    "flex-1 font-funky text-6xl md:text-8xl tracking-tight": true,
    [className]: className
  });

  return <h1 className={classes}>{children}</h1>;
};

export const PageHeader = ({
  actions,
  breadcrumbs,
  center,
  children,
  title
}) => {
  return (
    <header className="flex items-center gap-8 justify-between mb-24 md:mb-64">
      <div className={`flex-1${center ? " text-center" : ""}`}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1 className="font-funky text-6xl md:text-8xl tracking-tight">
          {title}
        </h1>
        {children}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
};

export default PageHeader;
