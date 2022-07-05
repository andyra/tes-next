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
import Navigation from "components/Navigation";
import Player from "components/Player";
import Toolbar from "components/Toolbar";

// Components
// ----------------------------------------------------------------------------

const Main = ({ children }) => (
  <main className="h-full overflow-y-auto print:overflow-visible bg-ground rounded-lg relative">
    {children}
  </main>
);

const Container = ({ children, maxWidth, spacing }) => {
  const containerClasses = cn({
    "mx-auto px-16 md:px-24 pb-48 md:pb-64": true,
    [maxWidth]: maxWidth,
    "max-w-screen-lg": !maxWidth,
    "space-y-32 md:space-y-64": spacing
  });

  return <div className={containerClasses}>{children}</div>;
};

const grain = keyframes`
  0%, 100% { background-position: 0% 0%; }
  20% { background-position: 50% 50%; }
  40% { background-position: 25% 25%; }
  60% { background-position: 75% 75%; }
  80% { background-position: 0% 100%; }
`;

const Grain = styled.div`
  animation: ${grain} 0.4s steps(1) infinite;
  background-image: url(/grain-dark.webp);
`;

// Default
// ----------------------------------------------------------------------------

export default function Layout({ children, ...props }) {
  const {
    currentTrack,
    isFullscreen,
    nextList,
    prevList,
    queueList
  } = usePlayerContext();
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;

  const nextClasses = cn(
    "h-full overflow-hidden print:overflow-visible text-primary p-4 bg-ground-dark",
    "grid grid-cols-1 md:grid-cols-[224px,1fr] grid-rows-[1fr,64px,56px] md:grid-rows-[1fr,80px] gap-4"
  );

  const grainClasses = cn({
    "fixed top-0 left-0 h-screen w-screen pointer-events-none z-grain": true,
    "invert mix-blend-multiply dark:mix-blend-screen dark:invert-0": true,
    "opacity-30": !isFullscreen,
    "opacity-60": isFullscreen
  });

  const title = props.pageTitle
    ? `${props.pageTitle} • TES`
    : "This Evening's Show";

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses.split(" "));
  }, []);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title key="title">{title}</title>
        <meta
          name="description"
          content={
            props.pageDescription
              ? props.pageDescription
              : "This Evening's Show is a radio broadcast transmitting from an abandoned monorail station outside Adobe Skyscraper. Tune in as your hosts guide you through a cavalcade of bizarre characters, historic factoids, surreal comedy, improvised news, interviews, and original music."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
      </Head>
      <Navigation navSection={props.navSection} playerIsEmpty={playerIsEmpty} />
      <Main>
        <Toaster />
        <Toolbar />
        <Container maxWidth={props.maxWidth} spacing={props.spacing}>
          {children}
        </Container>
        <div className="sticky z-10 bottom-0 left-0 w-full h-48 bg-gradient-to-t from-ground opacity-75 pointer-events-none" />
      </Main>
      <Player />
      <Grain className={grainClasses} />
    </>
  );
}
