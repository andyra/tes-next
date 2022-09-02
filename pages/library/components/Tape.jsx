import cn from "classnames";
import styled from "styled-components";

const Tape = ({ rotate = "-rotate-2" }) => (
  <span
    aria-hidden
    className={cn(
      "h-32 w-96 bg-secondary-25 absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 z-1",
      rotate
    )}
  />
);

export default Tape;
