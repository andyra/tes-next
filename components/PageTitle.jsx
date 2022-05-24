export default function PageTitle({ actions, children }) {
  return (
    <header className="flex items-center gap-16 justify-between mb-64">
      <h1 className="font-serif font-medium text-6xl tracking-tight">
        {children}
      </h1>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </header>
  );
}
