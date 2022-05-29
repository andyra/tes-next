import { Transition } from "@headlessui/react";
import cn from "classnames";
import Icon from "./Icon";
import Loader from "./Loader";

export const Input = ({
  className,
  hideLabel,
  icon,
  defaultValue,
  glass,
  inputClassName,
  isLoading = false,
  label,
  labelClassName,
  name,
  placeholder,
  ref,
  required,
  rounded,
  type = "text",
  ...props
}) => {
  const wrapperClasses = cn({
    relative: true,
    "rounded-full": rounded,
    [className]: className
  });

  const labelClasses = cn({
    block: true,
    "sr-only": hideLabel,
    [labelClassName]: labelClassName
  });

  const inputClasses = cn({
    "block w-full h-40": true,
    "bg-ground outline-none": true,
    "focus:border-accent focus:ring focus:ring-accent-25": true,
    "border border-primary-25": !glass,
    "bg-primary-5 focus:bg-primary-5": glass,
    "px-12": !icon,
    "pl-32 pr-12": icon,
    rounded: !rounded,
    "rounded-full": rounded,
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
          placeholder={placeholder}
          ref={ref}
          required={required}
          type={type}
          {...props}
        />
        {icon && (
          <Icon
            name={icon}
            className="absolute top-1/2 left-12 transform -translate-y-1/2 opacity-50"
          />
        )}
        {isLoading && (
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2 flex items-center">
            <Loader className="h-20 w-20 opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
