import PropTypes from "prop-types";
import cn from "classnames";
import styled from "styled-components";
import Button from "/components/Button";
import Icon from "/components/Icon";
import { DropdownMenu, DropdownItem } from "components/DropdownMenu";

const Trigger = styled(Button).attrs({
  className: "opacity-0 group-hover:opacity-100 focus:opacity-100"
})`
  &[aria-expanded="true"] {
    background: var(--primary-5);
    opacity: 1;
  }
`;

const TrackMenu = ({
  addToQueue,
  inDialog,
  track,
  queueable,
  removeFromQueue,
  i
}) => {
  const { audioFile, collection, title, uri } = track;

  const contentClasses = cn(
    "w-256 bg-ground border-2 rounded-lg",
    "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down"
  );

  return (
    <DropdownMenu
      asChild
      tooltip="Menu"
      trigger={<Trigger circle icon="Overflow" variant="ghost" />}
      zIndex={inDialog ? "z-dialog-dropdown" : "z-dropdown"}
    >
      {uri && <DropdownItem title="Go to Song" href={`/${uri}`} icon="Note" />}
      <DropdownItem
        title={
          <>
            Go to <span className="capitalize">{collection.type}</span>
          </>
        }
        href={`/${collection.uri}`}
        icon={collection.type === "episode" ? "Mic" : "Music"}
      />
      {queueable ? (
        <DropdownItem
          title="Add to Queue"
          icon="Plus"
          onClick={() => {
            addToQueue(track);
          }}
        />
      ) : (
        removeFromQueue && (
          <DropdownItem
            title="Remove from Queue"
            icon="X"
            onClick={() => {
              removeFromQueue(track, i);
            }}
          />
        )
      )}
      {audioFile && (
        <DropdownItem
          title="Download"
          download={title}
          href={audioFile}
          icon="Download"
          rel="noopener noreferrer"
          target="_blank"
        />
      )}
    </DropdownMenu>
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
