import { Fragment } from "react";
import cn from "classnames";
import Button from "./Button";

export const PageTitle = ({ children, className }) => {
  const classes = cn({
    "flex-1 font-funky text-6xl md:text-8xl tracking-tight": true,
    [className]: className
  });

  return <h1 className={classes}>{children}</h1>;
};

export const PageHeader = ({
  actions,
  back,
  center,
  children,
  subtitle,
  title
}) => {
  return (
    <header className="flex items-center gap-8 justify-between mb-24 md:mb-64">
      <div className={`flex-1${center ? " text-center" : ""}`}>
        {back && (
          <Button
            variant="ghost"
            iconLeft="ChevronLeft"
            href={back.href}
            className="-ml-16"
          >
            {back.title}
          </Button>
        )}
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
