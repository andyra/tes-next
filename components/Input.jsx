import cn from "classnames";
import Icon from "./Icon";

export default function Input({
  className,
  hideLabel,
  icon,
  inputClassName,
  label,
  labelClassName,
  name,
  onChange,
  placeholder,
  ref,
  required,
  type = "text",
  value
}) {
  const wrapperClasses = cn({
    [className]: className
  });

  const labelClasses = cn({
    "sr-only": hideLabel,
    [labelClassName]: labelClassName
  });

  const inputClasses = cn({
    "block w-full h-40 px-12": true,
    "bg-primary border border-strong rounded": true,
    [inputClassName]: inputClassName
  });

  return (
    <div className={wrapperClasses}>
      <label className={labelClasses} for={name}>
        {label}
      </label>
      <div className="relative">
        <input
          className={inputClasses}
          id={name}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          required={required}
          type={type}
          value={value}
        />
        {icon && (
          <Icon
            name={icon}
            className="absolute top-1/2 left-8 transform -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
}
