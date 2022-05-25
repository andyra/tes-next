import * as Slider from "@radix-ui/react-slider";
import cn from "classnames";
import Button from "../Button";
import Icon from "../Icon";
import { formatTime } from "../../helpers/time.helpers";

export const PlayerControls = ({
  duration,
  elapsed,
  isFullscreen,
  isLooped,
  isPlaying,
  isRandom,
  handleScrub,
  handleScrubEnd,
  playerIsEmpty,
  skipBack,
  skipNext,
  toggleLoop,
  togglePlay,
  toggleRandom
}) => {
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

  const sliderClasses = cn({
    "flex items-center w-full h-16 relative group": true,
    "md:col-span-1 md:row-span-2": !isFullscreen,
    "col-start-1 col-span-3": isFullscreen
  });

  const timeClasses = cn({
    "font-mono min-w-40 text-xs text-primary-75 transition": true,
    "opacity-0": playerIsEmpty,
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

  return (
    <div className={playerControlClasses}>
      <div className="flex items-center justify-center gap-2">
        <Button
          circle
          className={randomClasses}
          disabled={playerIsEmpty}
          onClick={toggleRandom}
          variant="ghost"
        >
          <Icon name="Shuffle" />
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          onClick={skipBack}
          variant="ghost"
        >
          <Icon name="SkipPrev" />
        </Button>
        <Button
          active={isPlaying}
          circle
          disabled={playerIsEmpty}
          onClick={togglePlay}
          size="lg"
          variant="ghost"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} />
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          onClick={skipNext}
          variant="ghost"
        >
          <Icon name="SkipNext" />
        </Button>
        <Button
          circle
          className={loopClasses}
          disabled={playerIsEmpty}
          onClick={toggleLoop}
          variant="ghost"
        >
          <Icon name="Loop" />
        </Button>
      </div>
      <div className={playbackBarClasses}>
        <time className={elapsedClasses}>{formatTime(elapsed)}</time>
        <Slider.Root
          className={sliderClasses}
          disabled={playerIsEmpty}
          max={duration}
          min={0}
          onValueChange={e => handleScrub(e)}
          value={[elapsed]}
        >
          <Slider.Track className="flex-1 h-4 bg-primary-25 rounded-full">
            <Slider.Range className="bg-primary absolute rounded-full h-4 left-0" />
          </Slider.Track>
          <Slider.Thumb className="block h-16 w-16 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Slider.Root>
        <time className={durationClasses}>{formatTime(duration)}</time>
      </div>
    </div>
  );
};

export default PlayerControls;
