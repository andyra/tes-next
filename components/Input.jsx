import cn from "classnames";
import Icon from "./Icon";

export default function Input({
  className,
  hideLabel,
  icon,
  defaultValue,
  inputClassName,
  label,
  labelClassName,
  name,
  onChange,
  placeholder,
  ref,
  required,
  type = "text"
}) {
  const wrapperClasses = cn({
    "w-full relative": true,
    [className]: className
  });

  const labelClasses = cn({
    block: true,
    "sr-only": hideLabel,
    [labelClassName]: labelClassName
  });

  const inputClasses = cn({
    "block w-full h-40": true,
    "bg-base border border-default-25 rounded outline-none": true,
    "focus:border-primary focus:ring focus:ring-primary-25": true,
    "px-12": !icon,
    "pl-32 pr-12": icon,
    [inputClassName]: inputClassName
  });

  return (
    <div className={wrapperClasses}>
      <label className={labelClasses} htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          className={inputClasses}
          id={name}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          required={required}
          type={type}
        />
        {icon && (
          <Icon
            name={icon}
            className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-50"
          />
        )}
      </div>
    </div>
  );
}
