import cn from "classnames";
import Moment from "moment";
import Button from "../Button";
import Icon from "../Icon";

// Functions
// ----------------------------------------------------------------------------

function formatDuration(duration) {
  const d = Moment.duration(duration, "seconds");
  const { hours, minutes, seconds } = d._data;
  const h = hours > 0 ? `${hours}:` : "";
  const m = `${minutes > 0 ? minutes : "0"}:`;
  const s = seconds > 9 ? seconds : `0${seconds}`;
  return `${h}${m}${s}`;
}

function formatElapsed(elapsed, duration) {
  const e = Moment.duration(elapsed, "seconds");
  const d = Moment.duration(duration, "seconds");
  const { hours, minutes, seconds } = e._data;

  const hoursPlaceholder =
    d._data.hours > 9 ? "00:" : d._data.hours > 0 ? "0:" : "";
  const minutesPlaceholder = d._data.minutes > 9 ? "00:" : "0:";

  const h = hours > 0 ? `${hours}:` : hoursPlaceholder;
  const m = minutes > 0 ? minutes : minutesPlaceholder;
  const s = seconds > 9 ? seconds : `0${seconds}`;
  return `${h}${m}${s}`;
}

// Default
// ----------------------------------------------------------------------------

export default function PlayerControls({
  duration,
  elapsed,
  isFullscreen,
  isLooped,
  isPlaying,
  isRandom,
  onScrub,
  onScrubEnd,
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
    "font-mono min-w-40 text-xs text-primary-50": true,
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
        <time className={`${elapsedClasses}`}>{formatElapsed(elapsed)}</time>
        <input
          className="h-8 w-320 bg-accent cursor-pointer appearance-none"
          type="range"
          value={elapsed}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={e => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
        />
        {/*<div className={barClasses}>
          <span className="bg-accent absolute left-0 top-0 bottom-0 right-1/2 rounded-full" />
        </div>*/}
        <time className={durationClasses}>{formatDuration(duration)}</time>
      </div>
    </div>
  );
}
