import PropTypes from "prop-types";
import cn from "classnames";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { slugify } from "helpers/utils";

export const Input = ({
  className,
  defaultValue,
  glass,
  hideLabel,
  height = "h-40",
  icon,
  inputClassName,
  isLoading,
  label,
  labelClassName,
  placeholder,
  ref,
  required,
  rounded,
  type = "text",
  ...props
}) => {
  const name = slugify(label);
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

  const inputClasses = cn(
    "block w-full outline-none text-primary placeholder-primary-50",
    "focus:border-accent focus:ring focus:ring-accent-25",
    height,
    glass ? "bg-primary-5 focus:bg-primary-5" : "bg-ground border-2",
    icon ? "pl-32 pr-12" : "px-12",
    rounded ? "rounded-full" : "rounded",
    inputClassName
  );

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
            className="absolute top-1/2 left-12 -translate-y-1/2 text-primary-50"
          />
        )}
        {isLoading && (
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex items-center">
            <Loader className="h-20 w-20 opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  glass: PropTypes.bool,
  hideLabel: PropTypes.bool,
  icon: PropTypes.string,
  inputClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rounded: PropTypes.bool,
  type: PropTypes.string.isRequired
};

Input.defaultProps = {
  type: "text"
};

export default Input;
