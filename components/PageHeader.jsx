import { Fragment } from "react";
import cn from "classnames";
import Button from "components/Button";

export const PageTitle = ({ children, className }) => {
  const classes = cn({
    "flex-1 font-funky font-bold text-6xl md:text-8xl md:leading-[0.8]": true,
    [className]: className
  });

  return <h1 className={classes}>{children}</h1>;
};

export const PageHeader = ({
  actions,
  back,
  center,
  className,
  children,
  font = "font-funky",
  h1ClassName,
  subtitle,
  title
}) => {
  const classes = cn(
    "flex items-center gap-8 justify-between mb-24 md:mb-64",
    className
  );

  return (
    <header className={classes}>
      <div className={`flex-1${center ? " text-center" : ""}`}>
        {back && (
          <Button
            className="hidden md:inline-flex relative"
            href={back.href}
            iconLeft="ChevronLeft"
            size="sm"
            variant="glass"
          >
            {back.title}
          </Button>
        )}
        <PageTitle className={h1ClassName}>{title}</PageTitle>
        {children}
      </div>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
};

export default PageHeader;
