import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import * as Popover from "@radix-ui/react-popover";
import styled, { keyframes } from "styled-components";
import cn from "classnames";
import { Toaster } from "react-hot-toast";
import { usePlayerContext } from "context/PlayerContext";
import Button from "components/Button";
import Input from "components/Input";
import MetaTags from "components/MetaTags";
import Navigation from "components/Navigation";
import Player from "components/Player";

// Components
// ----------------------------------------------------------------------------

const Container = ({ children, maxWidth, spacing = true }) => {
  const containerClasses = cn(
    "mx-auto px-16 md:px-24 py-32 md:py-64",
    maxWidth ? maxWidth : "max-w-screen-lg",
    {
      "space-y-32 md:space-y-64": spacing
    }
  );

  return <div className={containerClasses}>{children}</div>;
};

const grain = keyframes`
  0%, 100% { background-position: 0% 0%; }
  20% { background-position: 50% 50%; }
  40% { background-position: 25% 25%; }
  60% { background-position: 75% 75%; }
  80% { background-position: 0% 100%; }
`;

const Grain = styled.div.attrs({
  className:
    "fixed h-screen w-screen pointer-events-none z-grain mix-blend-difference"
})`
  animation: ${grain} 0.4s steps(1) infinite;
  background-image: url(/noise-256w.png);
  opacity: 0.2;
`;

// Default
// ----------------------------------------------------------------------------

export default function Layout({ children, ...props }) {
  const {
    currentTrack,
    nextList,
    playerIsEmpty,
    prevList,
    queueList
  } = usePlayerContext();

  const nextClasses = cn(
    "h-full overflow-hidden print:overflow-visible p-4 bg-ground-dark",
    "font-sans text-primary antialiased",
    "flex flex-col gap-4"
  );

  const wrapperClasses = cn(
    "flex-1 flex items-stretch gap-4 overflow-hidden",
    "flex-col md:flex-row"
  );

  const mainClasses =
    "flex-1 overflow-y-auto print:overflow-visible bg-ground rounded-lg";

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses.split(" "));
  }, [nextClasses]);

  return (
    <>
      <Head>
        <MetaTags props={props} />
      </Head>
      <div className={wrapperClasses}>
        <Navigation
          navSection={props.navSection}
          playerIsEmpty={playerIsEmpty}
        />
        <main className={mainClasses}>
          <Toaster />
          <Container maxWidth={props.maxWidth} spacing={props.spacing}>
            {children}
          </Container>
        </main>
      </div>
      <Player />
      <Grain />
    </>
  );
}
