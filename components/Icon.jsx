import PropTypes from "prop-types";
import cn from "classnames";
import ApplePodcasts from "../public/icons/ApplePodcasts.svg";
import ArrowDown from "../public/icons/ArrowDown.svg";
import ArrowLeft from "../public/icons/ArrowLeft.svg";
import ArrowRight from "../public/icons/ArrowRight.svg";
import ArrowUp from "../public/icons/ArrowUp.svg";
import Book from "../public/icons/Book.svg";
import Check from "../public/icons/Check.svg";
import ChevronDown from "../public/icons/ChevronDown.svg";
import ChevronLeft from "../public/icons/ChevronLeft.svg";
import ChevronRight from "../public/icons/ChevronRight.svg";
import ChevronUp from "../public/icons/ChevronUp.svg";
import Download from "../public/icons/Download.svg";
import Edit from "../public/icons/Edit.svg";
import Email from "../public/icons/Email.svg";
import Eye from "../public/icons/Eye.svg";
import EyeOff from "../public/icons/EyeOff.svg";
import Gear from "../public/icons/Gear.svg";
import GooglePodcasts from "../public/icons/GooglePodcasts.svg";
import Heart from "../public/icons/Heart.svg";
import Home from "../public/icons/Home.svg";
import Loop from "../public/icons/Loop.svg";
import Menu from "../public/icons/Menu.svg";
import Mic from "../public/icons/Mic.svg";
import Moon from "../public/icons/Moon.svg";
import Music from "../public/icons/Music.svg";
import Overflow from "../public/icons/Overflow.svg";
import Pause from "../public/icons/Pause.svg";
import Person from "../public/icons/Person.svg";
import Phone from "../public/icons/Phone.svg";
import Play from "../public/icons/Play.svg";
import Plus from "../public/icons/Plus.svg";
import Podcast from "../public/icons/Podcast.svg";
import Queue from "../public/icons/Queue.svg";
import Rss from "../public/icons/Rss.svg";
import Search from "../public/icons/Search.svg";
import Shuffle from "../public/icons/Shuffle.svg";
import SignIn from "../public/icons/SignIn.svg";
import SignOut from "../public/icons/SignOut.svg";
import SkipNext from "../public/icons/SkipNext.svg";
import SkipPrev from "../public/icons/SkipPrev.svg";
import Spotify from "../public/icons/Spotify.svg";
import Stitcher from "../public/icons/Stitcher.svg";
import Sun from "../public/icons/Sun.svg";
import Trash from "../public/icons/Trash.svg";
import Video from "../public/icons/Video.svg";
import X from "../public/icons/X.svg";

export const ICON_NAMES = {
  ApplePodcasts: ApplePodcasts,
  ArrowDown: ArrowDown,
  ArrowLeft: ArrowLeft,
  ArrowRight: ArrowRight,
  ArrowUp: ArrowUp,
  Book: Book,
  Check: Check,
  ChevronDown: ChevronDown,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  ChevronUp: ChevronUp,
  Download: Download,
  Edit: Edit,
  Email: Email,
  Eye: Eye,
  EyeOff: EyeOff,
  Gear: Gear,
  GooglePodcasts: GooglePodcasts,
  Heart: Heart,
  Home: Home,
  Loop: Loop,
  Menu: Menu,
  Mic: Mic,
  Moon: Moon,
  Music: Music,
  Overflow: Overflow,
  Pause: Pause,
  Person: Person,
  Phone: Phone,
  Play: Play,
  Plus: Plus,
  Podcast: Podcast,
  Queue: Queue,
  Rss: Rss,
  Search: Search,
  Shuffle: Shuffle,
  SignIn: SignIn,
  SignOut: SignOut,
  SkipNext: SkipNext,
  SkipPrev: SkipPrev,
  Spotify: Spotify,
  Stitcher: Stitcher,
  Sun: Sun,
  Trash: Trash,
  Video: Video,
  X: X
};

export const Icon = ({ className, name, size, ...props }) => {
  let IconComponent = ICON_NAMES[name];
  const classes = cn({
    "w-em h-em pointer-events-none": !size,
    [className]: className
  });

  return <IconComponent className={classes} {...props} />;
};

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(Object.keys(ICON_NAMES)).isRequired,
  size: PropTypes.string
};

export default Icon;
