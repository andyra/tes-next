import Link from "next/link";
import Button from "../Button";
import CoverArt from "../CoverArt";
import Icon from "../Icon";
import cn from "classnames";

// Default
// ----------------------------------------------------------------------------

export const CurrentTrack = ({
  currentTrack,
  isFullscreen,
  isMobile,
  setIsFullscreen
}) => {
  const currentTrackClasses = cn({
    "flex relative group": true,
    "items-center gap-8 w-full md:w-1/3": !isFullscreen,
    "flex-1 flex-col items-center justify-end md:text-center w-full gap-16 md:gap-48 md:mb-48": isFullscreen
  });

  const coverArtClasses = cn({
    "flex-shrink-0 bg-primary-5": true,
    "rounded w-40 h-40 md:w-64 md:h-64": !isFullscreen,
    "w-full max-w-screen-xs mx-auto my-auto md:my-0 h-auto rounded-lg md:w-1/2": isFullscreen
  });

  const trackInfoClasses = cn({
    "flex items-center gap-8 transition duration-300": true,
    "w-full mix-blend-overlay": isFullscreen
  });

  const titleClasses = cn({
    "text-primary font-medium": !isFullscreen,
    "text-4xl font-medium md:font-funky md:font-bold md:text-[8vmin] md:leading-[0.8] lg:text-[12vmin] md:mb-16": isFullscreen
  });

  const collectionClasses = cn({
    "text-sm text-primary-50 hover:text-accent": !isFullscreen,
    "text-xl md:text-3xl font-medium pointer-events-none": isFullscreen
  });

  const overflowClasses = cn({
    "opacity-0 group-hover:opacity-100 transition": !isFullscreen,
    "absolute top-0 right-0": isFullscreen
  });

  return (
    <div className={currentTrackClasses}>
      {currentTrack ? (
        <CoverArt
          className={coverArtClasses}
          height={isFullscreen ? 256 : isMobile ? 40 : 64}
          url={currentTrack.collection.coverArt}
          title={`${currentTrack.collection.title} cover art`}
          width={isFullscreen ? 256 : isMobile ? 40 : 64}
        />
      ) : (
        <figure id="cover-art" className={coverArtClasses} />
      )}
      <div className={trackInfoClasses}>
        <div className="flex-1">
          <div className={titleClasses}>
            {currentTrack ? currentTrack.title : ""}
          </div>
          <Link href={currentTrack.collection.uri}>
            <a className={collectionClasses}>
              {currentTrack ? currentTrack.collection.title : ""}
            </a>
          </Link>
        </div>
        <Button circle size="sm" variant="glass" className={overflowClasses}>
          <Icon name="Overflow" />
        </Button>
      </div>
      {isMobile && currentTrack && !isFullscreen && (
        <button
          className="absolute -top-8 right-0 -bottom-16 -left-8"
          onClick={() => {
            setIsFullscreen(true);
          }}
        />
      )}
    </div>
  );
};

export default CurrentTrack;
