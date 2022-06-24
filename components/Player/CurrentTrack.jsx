import CoverArt from "../CoverArt";
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
    "flex relative": true,
    "items-center gap-8 w-full md:w-1/3": !isFullscreen,
    "flex-1 flex-col items-center justify-end text-center w-full gap-16 md:gap-48 md:mb-48 mix-blend-overlayXXX": isFullscreen
  });

  const coverArtClasses = cn({
    "flex-shrink-0 bg-primary-5": true,
    "rounded w-40 h-40 md:w-64 md:h-64": !isFullscreen,
    "w-full max-w-screen-xs mx-auto h-auto mt-auto md:w-1/2 rounded-full overflow-hidden animate-slow-spin": isFullscreen
  });

  const trackInfoClasses = cn({
    "flex gap-8 transition duration-300": true,
    "my-auto md:my-0": isFullscreen
  });

  const titleClasses = cn({
    "text-sm font-medium": !isFullscreen,
    "text-3xl md:text-5xl lg:text-[6vw] font-funky md:mb-16": isFullscreen
  });

  const artistClasses = cn({
    "text-xs text-primary-50": !isFullscreen,
    "text-xl md:text-3xl font-medium": isFullscreen
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
          <div className={artistClasses}>
            {currentTrack ? currentTrack.artist.title : ""}
          </div>
        </div>
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
