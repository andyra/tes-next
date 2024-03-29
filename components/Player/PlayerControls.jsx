import * as Slider from "@radix-ui/react-slider";
import cn from "classnames";
import Button from "components/Button";
import Icon from "components/Icon";
import Loader from "components/Loader";
import {
  DropdownMenu,
  DropdownHeading,
  DropdownItem
} from "components/DropdownMenu";
import Tooltip from "components/Tooltip";
import { formatTime } from "helpers/utils";

const RATES = [
  { label: "+50%", rate: 1.5 },
  { label: "+25%", rate: 1.25 },
  { label: "+10%", rate: 1.1 },
  { label: "+5%", rate: 1.05 },
  { label: "1⨉", rate: 1 },
  { label: "–5%", rate: 0.95 },
  { label: "–10%", rate: 0.9 },
  { label: "–25%", rate: 0.75 },
  { label: "–50%", rate: 0.5 }
];

export const PlayerControls = ({
  duration,
  elapsed,
  handleOnSeek,
  handleRateChange,
  isFullscreen,
  isLoading,
  isLooped,
  isPlaying,
  isRandom,
  playerIsEmpty,
  rate,
  skipBack,
  skipNext,
  toggleLoop,
  togglePlay,
  toggleRandom
}) => {
  const classes = cn({
    "flex flex-col gap-4": true,
    "md:w-1/3": !isFullscreen,
    "w-full transition duration-300 relative mb-8 mix-blend-overlayXXX": isFullscreen
  });

  const controlClasses = cn({
    "flex items-center justify-center gap-2": true,
    "absolute z-10 left-1/2 -bottom-16 -translate-x-1/2 translate-y-full": isFullscreen
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
    "col-start-1 col-span-3": isFullscreen,
    "opacity-0": playerIsEmpty
  });

  const timeClasses = cn({
    "font-mono min-w-40 text-xs text-primary-75 transition": true,
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

  const index = RATES.findIndex(item => {
    return item.rate === rate;
  });

  return (
    <div className={classes}>
      <div className={controlClasses}>
        <DropdownMenu
          asChild
          disabled={playerIsEmpty}
          tooltip="Playback Speed"
          trigger={
            <Button
              className={`text-sm font-semibold ${extraButtonClasses}`}
              circle
              disabled={playerIsEmpty}
              variant="ghost"
            >
              {rate > 1 && RATES[index].label}
              {rate === 1 && RATES[index].label}
              {rate < 1 && RATES[index].label}
            </Button>
          }
        >
          <DropdownHeading title="Playback Speed" />
          {RATES.map((item, i) => (
            <DropdownItem
              title={item.label}
              key={`${i}-${rate}`}
              onClick={() => {
                handleRateChange(item.rate);
              }}
              selectable
              selected={item.rate === rate}
            />
          ))}
        </DropdownMenu>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          icon="SkipPrev"
          onClick={skipBack}
          variant="ghost"
        />
        <Button
          active={isPlaying && !isLoading}
          circle
          className={isLoading ? "relative" : ""}
          disabled={playerIsEmpty}
          onClick={togglePlay}
          variant="ghost"
        >
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            className={isLoading ? "opacity-0" : ""}
          />
          {isLoading && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader />
            </span>
          )}
        </Button>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          icon="SkipNext"
          onClick={skipNext}
          variant="ghost"
        />
        <Tooltip content="Loop">
          <Button
            circle
            className={loopClasses}
            disabled={playerIsEmpty}
            icon="Loop"
            onClick={toggleLoop}
            variant="ghost"
          />
        </Tooltip>
      </div>
      <div className={playbackBarClasses}>
        <time className={elapsedClasses}>{formatTime(elapsed)}</time>
        <Slider.Root
          className={sliderClasses}
          max={duration}
          min={0}
          onValueChange={e => handleOnSeek(e)}
          value={[elapsed]}
        >
          <Slider.Track className="flex-1 h-4 bg-primary-25 rounded-full">
            <Slider.Range className="bg-primary absolute rounded-full h-4 left-0" />
          </Slider.Track>
          <Slider.Thumb className="block h-16 w-16 rounded-full bg-accent transition duration-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Slider.Root>
        <time className={durationClasses}>{formatTime(duration)}</time>
      </div>
    </div>
  );
};

export default PlayerControls;
