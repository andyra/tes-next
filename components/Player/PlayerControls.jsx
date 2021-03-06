import * as Slider from "@radix-ui/react-slider";
import cn from "classnames";
import Button from "components/Button";
import Icon from "components/Icon";
import Loader from "components/Loader";
import { Menu, MenuDivider, MenuHeading, MenuItem } from "components/Menu";
import Tooltip from "components/Tooltip";
import { formatTime } from "helpers/utils";

const RATES = [
  { badge: "4", label: "+50%", rate: 1.5 },
  { badge: "3", label: "+25%", rate: 1.25 },
  { badge: "2", label: "+10%", rate: 1.1 },
  { badge: "1", label: "+5%", rate: 1.05 },
  { badge: "1⨉", label: "Normal", rate: 1 },
  { badge: "1", label: "–5%", rate: 0.95 },
  { badge: "2", label: "–10%", rate: 0.9 },
  { badge: "3", label: "–25%", rate: 0.75 },
  { badge: "4", label: "–50%", rate: 0.5 }
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
    "w-full transition duration-300 mb-8 relative mix-blend-overlayXXX": isFullscreen
  });

  const controlClasses = cn({
    "flex items-center justify-center gap-2": true,
    "absolute z-10 left-1/2 -translate-x-1/2 -bottom-16 translate-y-full": isFullscreen
  });

  const extraButtonClasses = cn({
    "hidden md:flex": !isFullscreen
  });

  const rateClasses = cn({
    [extraButtonClasses]: true,
    "text-sm font-medium": true,
    "text-accent": rate !== 1
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
        <Menu
          disabled={playerIsEmpty}
          tooltip="Playback Speed"
          trigger={
            <Button
              className={rateClasses}
              circle
              disabled={playerIsEmpty}
              label="Change playback speed"
              variant="ghost"
            >
              {rate > 1 && (
                <>
                  <Icon name="ArrowUp" />
                  {RATES[index].badge}
                </>
              )}
              {rate === 1 && <>{RATES[index].badge}</>}
              {rate < 1 && (
                <>
                  <Icon name="ArrowDown" />
                  {RATES[index].badge}
                </>
              )}
            </Button>
          }
        >
          <MenuHeading>Playback Speed</MenuHeading>
          {RATES.map((item, i) => (
            <MenuItem
              className={item.rate === rate ? "text-accent" : ""}
              key={`${i}-${rate}`}
              onClick={() => {
                handleRateChange(item.rate);
              }}
            >
              {item.label}
              <Icon
                name="Check"
                className={`ml-auto ${item.rate === rate ? "" : "opacity-0"}`}
              />
            </MenuItem>
          ))}
        </Menu>
        <Button
          circle
          className={extraButtonClasses}
          disabled={playerIsEmpty}
          icon="SkipPrev"
          label="Skip Back"
          onClick={skipBack}
          variant="ghost"
        />
        <Button
          active={isPlaying && !isLoading}
          circle
          className={isLoading ? "relative" : ""}
          disabled={playerIsEmpty}
          label={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
          variant="glass"
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
          label="Skip Next"
          onClick={skipNext}
          variant="ghost"
        />
        <Tooltip content="Loop">
          <Button
            circle
            className={loopClasses}
            disabled={playerIsEmpty}
            icon="Loop"
            label="Toggle looping"
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
