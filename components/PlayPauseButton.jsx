import Icon from "./Icon"

const PlayPauseButton = ({ track, i }) => {
  const active = highlightTrack(track) && isPlaying;
  const buttonClasses = cn({
    "absolute top-0 left-0": true,
    "opacity-0 group-hover:opacity-100": !active
  });

  return (
    <Button
      active={active}
      className={buttonClasses}
      circle
      onClick={() => {
        selectTrack(track, i);
      }}
      size="sm"
      variant="ghost"
    >
      <Icon
        name={
          highlightTrack(track) ? (isPlaying ? "Pause" : "Play") : "Play"
        }
      />
    </Button>
  );
};
