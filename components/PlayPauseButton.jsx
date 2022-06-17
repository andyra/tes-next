import PropTypes from "prop-types";
import { usePlayerContext } from "../context/PlayerContext";
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button";
import Icon from "./Icon";

// Pass in a track play it in the player
const PlayPauseButton = ({
  className,
  size = "base",
  track,
  tracklist,
  variant,
  i
}) => {
  const {
    currentTrack,
    isPlaying,
    setCurrentTrack,
    setIsPlaying,
    setNextList,
    setPrevList,
    setQueueList
  } = usePlayerContext();
  const active = trackIsSelected(track) && isPlaying;

  function trackIsSelected(track) {
    return (
      currentTrack &&
      currentTrack.id === track.id &&
      !track.addedViaQueue &&
      !currentTrack.addedViaQueue
    );
  }

  function selectTrack(track, i) {
    const selectedTrackIsCurrent =
      currentTrack && currentTrack.id === track.id && !track.addedViaQueue;

    if (selectedTrackIsCurrent) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);

      if (tracklist && tracklist.length) {
        updateList(track, i);
      }
    }
  }

  // Shorten or add to queue listTypes
  function updateList(selectedTrack, i) {
    // Filter out tracks with no audioFile
    const tracksBefore = [...tracklist].splice(0, i).filter(track => {
      return track.audioFile;
    });
    const tracksAfter = [...tracklist].splice(i + 1).filter(track => {
      return track.audioFile;
    });

    if (selectedTrack.addedViaQueue) {
      setQueueList(tracksAfter);
    } else {
      setPrevList(tracksBefore);
      setNextList(tracksAfter);
    }
  }

  return (
    <Button
      active={active}
      className={className}
      circle
      onClick={() => {
        selectTrack(track, i);
      }}
      size={size}
      variant={variant}
    >
      <Icon
        name={trackIsSelected(track) ? (isPlaying ? "Pause" : "Play") : "Play"}
      />
    </Button>
  );
};

PlayPauseButton.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),
  track: PropTypes.object.isRequired,
  tracklist: PropTypes.array,
  variant: PropTypes.oneOf(Object.keys(BUTTON_VARIANTS))
};

export default PlayPauseButton;
