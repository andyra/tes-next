import cn from "classnames";

export default function PageTitle({ actions, center, children }) {
  const classes = cn({
    "flex-1 font-serif font-medium text-6xl tracking-tight": true,
    "text-center": center
  });

  return (
    <header className="flex items-center gap-16 justify-between mb-64">
      <h1 className={classes}>{children}</h1>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
}
