export default function DataRow({ child, children, title, value }) {
  return (
    <dl className={`flex gap-16 ${child ? "" : "py-8"}`}>
      <dt
        className={`${
          child ? "w-128" : "w-192"
        } font-mono font-bold flex-shrink-0`}
      >
        {title}
      </dt>
      <dd>{value ? value : children}</dd>
    </dl>
  );
}
