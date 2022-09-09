import { Slot } from "@radix-ui/react-slot";
import cn from "classnames";
import styled from "styled-components";

const Tearaway = styled.div.attrs({
  className:
    "hidden sm:block w-40 self-stretch text-secondary border-r border-dashed border-secondary",
  "aria-hidden": true
})`
  background-image: radial-gradient(currentColor 8px, transparent 8px);
  background-size: 40px 40px;
  background-repeat: repeat;
`;

const DotMatrix = ({ asChild, children, className }) => {
  const Comp = asChild ? Slot : "section";

  return (
    <section className={cn("flex sm:border sm:border-secondary", className)}>
      <Tearaway />
      <Comp className="flex-1 sm:p-24 lg:p-48 xl:p-64 font-base text-secondary">
        {children}
      </Comp>
      <Tearaway className="rotate-180" />
    </section>
  );
};

export default DotMatrix;
