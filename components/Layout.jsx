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

const Container = ({ children, maxWidth, spacing = true }) => {
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

  const nextClasses = cn(
    "h-full overflow-hidden print:overflow-visible text-primary p-4 bg-ground-dark",
    "grid grid-cols-1 md:grid-cols-[224px,1fr] grid-rows-[1fr,64px,56px] md:grid-rows-[1fr,80px] gap-4"
  );

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
        <div className="sticky z-10 bottom-0 left-0 w-full h-48 bg-gradient-to-t from-ground opacity-75 pointer-events-none" />
      </Main>
      <Player />
      <Grain />
    </>
  );
}
