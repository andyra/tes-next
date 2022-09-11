import cn from "classnames";

const Info = ({ className, label, children, ...props }) => {
  return (
    <dl className={cn("p-4", className)} {...props}>
      <dt className="font-base font-medium text-xs uppercase tracking-wider">
        {label}
      </dt>
      <dd>{children}</dd>
    </dl>
  );
};

export default Info;
