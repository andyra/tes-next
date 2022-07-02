import PropTypes from "prop-types";
import cn from "classnames";
import { getButtonClasses } from "/components/Button";
import Icon from "/components/Icon";
import { Menu, MenuItem } from "components/Menu";

const TrackMenu = ({ addToQueue, track, queueable, removeFromQueue, i }) => {
  const { audioFile, collection, title, uri } = track;
  const overflowMenuClasses = cn(
    getButtonClasses({
      variant: "ghost",
      circle: true
    }),
    "opacity-0 group-hover:opacity-100 focus:opacity-100"
  );

  const contentClasses = cn(
    "w-256 bg-ground border-2 rounded-lg",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
  );

  return (
    <Menu
      trigger={<Icon name="Overflow" />}
      triggerClassName={overflowMenuClasses}
    >
      {uri && (
        <MenuItem href={`/${uri}`} icon="Note">
          Go to Song
        </MenuItem>
      )}
      <MenuItem
        href={`/${collection.uri}`}
        icon={collection.type === "episode" ? "Mic" : "Music"}
      >
        Go to <span className="capitalize">{collection.type}</span>
      </MenuItem>
      {queueable ? (
        <MenuItem
          icon="Plus"
          onClick={() => {
            addToQueue(track);
          }}
        >
          Add to Queue
        </MenuItem>
      ) : (
        removeFromQueue && (
          <MenuItem
            icon="X"
            onClick={() => {
              removeFromQueue(track, i);
            }}
          >
            Remove from Queue
          </MenuItem>
        )
      )}
      {audioFile && (
        <MenuItem
          download={title}
          href={audioFile}
          icon="Download"
          rel="noopener noreferrer"
          target="_blank"
        >
          Download
        </MenuItem>
      )}
    </Menu>
  );
};

TrackMenu.propTypes = {
  addToQueue: PropTypes.func,
  i: PropTypes.number.isRequired,
  queueable: PropTypes.bool,
  removeFromQueue: PropTypes.func,
  track: PropTypes.object.isRequired
};

export default TrackMenu;
