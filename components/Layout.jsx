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

// Components
// ----------------------------------------------------------------------------

const Container = ({
  children,
  maxWidth,
  spacing = "space-y-32 md:space-y-64"
}) => {
  const containerClasses = cn(
    "mx-auto px-16 md:px-24 py-32 md:py-64 h-full",
    maxWidth ? maxWidth : "max-w-screen-lg",
    spacing
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
    "font-sans text-primary antialiased selection:text-ground selection:bg-primary",
    "flex flex-col gap-4"
  );

  const metaTitle = props.metaTitle
    ? `${props.metaTitle} • TES`
    : "This Evening's Show";

  const metaImage =
    props.metaImage ||
    "https://tesfm.fra1.digitaloceanspaces.com/episodes/this-evenings-show.jpg";

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses.split(" "));
  }, [nextClasses]);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta property="og:site_name" content="This Evening's Show" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:image" content={metaImage} />
        {props.metaTypes &&
          metaTypes.map(metaType => (
            <meta
              property={metaType.type}
              content={metaType.content}
              key={metaType.type}
            />
          ))}
        {props.metaDescription && (
          <meta property="og:description" content={metaDescription} />
        )}
      </Head>
      <div className="flex-1 flex flex-col md:flex-row items-stretch gap-4 overflow-hidden">
        <Navigation
          navSection={props.navSection}
          playerIsEmpty={playerIsEmpty}
        />
        <main className="flex-1 overflow-y-auto print:overflow-visible bg-ground rounded-lg">
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
