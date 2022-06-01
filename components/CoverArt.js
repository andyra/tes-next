import cn from "classnames";
import Image from "next/image";

export const CoverArt = ({
  className,
  height,
  title,
  url,
  width,
  ...props
}) => {
  const coverArtClasses = cn({
    "overflow-hidden": true,
    "rounded-lg": !className,
    [className]: className
  });

  const placeholderClasses = cn({
    "aspect-square bg-primary-5 flex items-center justify-center text-primary-50": true,
    "text-sm": width < 128,
    "text-lg": width > 128,
    "rounded-lg": !className,
    [className]: className
  });

  return url.length > 0 ? (
    <figure className={coverArtClasses}>
      <Image
        alt={`${title} cover art`}
        src={url[0].url}
        width={width}
        height={height}
        layout="responsive"
      />
    </figure>
  ) : (
    <figure className={placeholderClasses}>n/a</figure>
  );

  return <figure className={placeholderClasses}>n/a</figure>;
};

export default CoverArt;
