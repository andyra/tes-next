import Image from "next/image";
import cn from "classnames";

// Default
// ----------------------------------------------------------------------------

export default function CurrentTrack({
  currentTrack,
  isFullscreen,
  isMobile,
  setIsFullscreen
}) {
  const currentTrackClasses = cn({
    "flex relative": true,
    "items-center gap-8 w-full md:w-1/3": !isFullscreen,
    "flex-1 flex-col justify-end md:justify-start md:flex-row md:items-end w-full gap-16 md:gap-48 md:mb-48": isFullscreen
  });

  const coverArtClasses = cn({
    "aspect-square bg-primary-10 rounded flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden": true,
    "w-40 h-40 md:w-64 md:h-64": !isFullscreen,
    "w-full max-w-screen-xs mx-auto h-auto mt-auto md:my-0 md:w-256 md:h-256": isFullscreen
  });

  const trackInfoClasses = cn({
    "flex gap-8 transition duration-300": true,
    "my-auto md:my-0 md:flex-1": isFullscreen
  });

  const titleClasses = cn({
    "text-sm font-medium": !isFullscreen,
    "text-3xl md:text-5xl lg:text-7xl font-bold md:mb-16": isFullscreen
  });

  const artistClasses = cn({
    "text-xs text-primary-50": !isFullscreen,
    "text-xl md:text-3xl font-medium": isFullscreen
  });

  return (
    <div className={currentTrackClasses}>
      <figure id="cover-art" className={coverArtClasses}>
        {currentTrack && (
          <Image
            alt={`${currentTrack.collection.title} cover art`}
            src={currentTrack.collection.coverArtUrl}
            width={isFullscreen ? 256 : isMobile ? 40 : 64}
            height={isFullscreen ? 256 : isMobile ? 40 : 64}
          />
        )}
      </figure>
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
}
