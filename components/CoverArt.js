import cn from "classnames";
import Image from "next/image";

export const CoverArt = ({
  className,
  height,
  src,
  title,
  width,
  ...props
}) => {
  const coverArtClasses = cn({
    "rounded-lg overflow-hidden": true,
    [className]: className
  });

  const placeholderClasses = cn({
    "aspect-square bg-primary-10 rounded-lg flex items-center justify-center text-primary-50": true,
    [className]: className
  });

  return src.length ? (
    <figure className={coverArtClasses}>
      <Image
        alt={`${title} cover art`}
        src={src[0].url}
        width={256}
        height={256}
        layout="responsive"
      />
    </figure>
  ) : (
    <figure className={placeholderClasses}>n/a</figure>
  );
};

export default CoverArt;
