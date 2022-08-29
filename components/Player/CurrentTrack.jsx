import Link from "next/link";
import cn from "classnames";
import Button from "components/Button";
import CoverArt from "components/CoverArt";
import Icon from "components/Icon";
import TrackMenu from "components/TrackMenu";

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
    "flex-1 min-w-0 flex items-center gap-8 transition duration-300": true,
    "w-full mix-blend-overlay": isFullscreen
  });

  const titleClasses = cn({
    "text-primary font-medium truncate overflow-hidden": !isFullscreen,
    "font-funky font-bold text-7xl uppercase leading-[0.75] md:text-[8vmin] lg:text-[12vmin] mb-16": isFullscreen
  });

  const collectionClasses = cn({
    "text-sm text-primary-50 hover:text-accent": !isFullscreen,
    "text-xl md:text-3xl font-medium pointer-events-none": isFullscreen
  });

  return (
    <div className={currentTrackClasses}>
      {currentTrack ? (
        <>
          <CoverArt
            className={coverArtClasses}
            height={isFullscreen ? 256 : isMobile ? 40 : 64}
            url={currentTrack.collection.coverArt}
            title={`${currentTrack.collection.title} cover art`}
            width={isFullscreen ? 256 : isMobile ? 40 : 64}
          />
          <div className={trackInfoClasses}>
            <div className="flex-1 min-w-0">
              <div className={titleClasses}>{currentTrack.title}</div>
              <div className="truncate overflow-hidden">
                <Link href={currentTrack.collection.uri}>
                  <a className={collectionClasses}>
                    {currentTrack.collection.title}
                  </a>
                </Link>
              </div>
            </div>
            <TrackMenu
              track={currentTrack}
              queueable={false}
              i={currentTrack.position}
            />
          </div>
        </>
      ) : (
        <figure id="cover-art" className={coverArtClasses} />
      )}
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
