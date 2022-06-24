import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import * as Popover from "@radix-ui/react-popover";
import styled, { keyframes } from "styled-components";
import cn from "classnames";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Navigation from "./Navigation";
import Player from "./Player";
import Toolbar from "./Toolbar";
import { usePlayerContext } from "../context/PlayerContext";

// Components
// ----------------------------------------------------------------------------

const Main = ({ children }) => (
  <main className="h-full overflow-y-auto print:overflow-visible bg-ground rounded-lg">
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
  const { currentTrack, nextList, prevList, queueList } = usePlayerContext();
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;

  const nextClasses = cn({
    "h-full overflow-hidden print:overflow-visible text-primary p-4 bg-ground-dark": true,
    "grid grid-cols-1 md:grid-cols-[224px,1fr] gap-4": true,
    "grid-rows-[1fr,64px,48px] md:grid-rows-[1fr,80px]": !playerIsEmpty,
    "grid-rows-[1fr,48px] md:grid-rows-[1fr]": playerIsEmpty
  });

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses.split(" "));
  }, []);

  return (
    <>
      <Head>
        <title>
          {props.PageTitle ? `${props.PageTitle} • TES` : "This Evening's Show"}
        </title>
      </Head>
      <Navigation navSection={props.navSection} playerIsEmpty={playerIsEmpty} />
      <Main>
        <Toaster />
        <Toolbar />
        <Container maxWidth={props.maxWidth} spacing={props.spacing}>
          {children}
        </Container>
      </Main>
      <Player />
      <Grain />
    </>
  );
}
