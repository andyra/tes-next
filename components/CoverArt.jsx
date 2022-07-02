import Image from "next/image";
import PropTypes from "prop-types";
import cn from "classnames";

export const CoverArt = ({
  className,
  height,
  title,
  url,
  width,
  ...props
}) => {
  const coverArtClasses = cn({
    "bg-primary-10 overflow-hidden": true,
    "rounded-lg": !className,
    [className]: className
  });

  const placeholderClasses = cn({
    "aspect-square bg-primary-5 flex items-center justify-center text-primary-50 overflow-hidden relative": true,
    "text-sm": width < 128,
    "text-lg": width > 128,
    "rounded-lg": !className,
    [className]: className
  });

  return url ? (
    <figure className={coverArtClasses}>
      <Image
        alt={`${title} cover art`}
        src={url}
        width={width}
        height={height}
        layout="responsive"
      />
    </figure>
  ) : (
    <figure className={placeholderClasses}>
      <span className="absolute top-1/2 left-1/2 w-full h-1 bg-primary-5 transform rotate-45 -translate-x-1/2 -translate-y-1/2" />
      <span className="absolute top-1/2 left-1/2 w-full h-1 bg-primary-5 transform -rotate-45 -translate-x-1/2 -translate-y-1/2" />
    </figure>
  );

  return <figure className={placeholderClasses}>n/a</figure>;
};

CoverArt.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  width: PropTypes.number.isRequired
};

export default CoverArt;
