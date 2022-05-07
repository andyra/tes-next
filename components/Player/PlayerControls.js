import cn from "classnames";
import Button from "../Button";
import Icon from "../Icon";

// Default
// ----------------------------------------------------------------------------

export default function PlayerControls({
  isFullscreen,
  isLooped,
  isPlaying,
  isRandom,
  playerIsEmpty,
  skipBack,
  skipNext,
  toggleLoop,
  togglePlay,
  toggleRandom
}) {
  const playerControlClasses = cn({
    "flex flex-col gap-4": true,
    "md:w-1/3": !isFullscreen,
    "w-full transition duration-300": isFullscreen
  });

  const extraButtonClasses = cn({
    "hidden md:flex": !isFullscreen
  });

  const randomClasses = cn({
    [extraButtonClasses]: true,
    "text-accent": isRandom
  });

  const loopClasses = cn({
    [extraButtonClasses]: true,
    "text-accent": isLooped
  });

  const playbackBarClasses = cn({
    "grid gap-8 items-center col-span-2 transition": true,
    "grid-cols-[1fr] grid-rows-[4px] md:grid-cols-[40px,1fr,40px] md:grid-rows-[8px,1fr] absolute left-0 bottom-0 right-0 w-auto md:static": !isFullscreen,
    "w-full order-first": isFullscreen
  });

  const timeClasses = cn({
    "min-w-40 text-xs text-primary-50": true,
    "hidden md:block row-span-2": !isFullscreen
  });

  const elapsedClasses = cn({
    [timeClasses]: true,
    "text-right": !isFullscreen,
    "col-start-1 row-start-2": isFullscreen
  });

  const durationClasses = cn({
    [timeClasses]: true,
    "col-start-3 row-start-2 text-right": isFullscreen
  });

  const barClasses = cn({
    "flex-1 h-4 bg-primary-25 rounded-full relative": true,
    "md:col-span-1 md:row-span-2": !isFullscreen,
    "col-start-1 col-span-3": isFullscreen
  });

  return (
    <div className={playerControlClasses}>
      <div className="flex items-center justify-center gap-8">
        <Button
          circle
          className={randomClasses}
          disabled={playerIsEmpty}
          onClick={toggleRandom}
          variant="ghost"
        >
          <Icon name="shuffle" solid />
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          onClick={skipBack}
          variant="ghost"
        >
          <Icon name="play-skip-back" solid />
        </Button>
        <Button
          active={isPlaying}
          circle
          disabled={playerIsEmpty}
          onClick={togglePlay}
          size="lg"
        >
          <Icon name={isPlaying ? "pause" : "play"} solid />
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          onClick={skipNext}
          variant="ghost"
        >
          <Icon name="play-skip-forward" solid />
        </Button>
        <Button
          circle
          className={loopClasses}
          disabled={playerIsEmpty}
          onClick={toggleLoop}
          variant="ghost"
        >
          <Icon name="infinite" solid />
        </Button>
      </div>
      <div className={playbackBarClasses}>
        <time className={`${elapsedClasses}`}>0:00</time>
        <div className={barClasses}>
          <span className="bg-accent absolute left-0 top-0 bottom-0 right-1/2 rounded-full" />
        </div>
        <time className={durationClasses}>0:00</time>
      </div>
    </div>
  );
}
