import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import * as Popover from "@radix-ui/react-popover";
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
  <main className="h-full overflow-y-auto bg-ground rounded-lg">
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

// Default
// ----------------------------------------------------------------------------

export default function Layout({ children, ...props }) {
  const { currentTrack, nextList, prevList, queueList } = usePlayerContext();
  const playerIsEmpty =
    !currentTrack && prevList.length + nextList.length + queueList.length === 0;

  const nextClasses = cn({
    "h-full overflow-hidden text-primary p-4 bg-ground-dark": true,
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
    </>
  );
}
