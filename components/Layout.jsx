import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
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

const grain = keyframes`
  0%, 100% { background-position: 0% 0%; }
  20% { background-position: 50% 50%; }
  40% { background-position: 25% 25%; }
  60% { background-position: 75% 75%; }
  80% { background-position: 0% 100%; }
`;

const FilmGrain = styled.div.attrs({
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

  const metaTitle = props.metaTitle
    ? `${props.metaTitle} • TES`
    : "This Evening's Show";

  const metaImage =
    props.metaImage ||
    "https://tesfm.fra1.digitaloceanspaces.com/episodes/this-evenings-show.jpg";

  const nextClasses = cn(
    "h-full overflow-hidden print:overflow-visible p-4 bg-ground-dark",
    "font-sans text-primary antialiased selection:text-ground selection:bg-primary",
    "flex flex-col gap-4"
  );

  const wrapperClasses = cn(
    "flex-1 flex flex-col md:flex-row items-stretch gap-4 overflow-hidden"
  );

  const mainClasses = cn(
    "flex-1 overflow-y-auto print:overflow-visible bg-ground rounded-lg",
    "p-24 md:py-48 lg:py-64"
  );

  const containerClasses = cn(
    "mx-auto",
    props.maxWidth ? props.maxWidth : "max-w-screen-lg",
    props.spacing ? props.spacing : "space-y-32 md:space-y-64"
  );

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
        {/* Favicons and PWA Manifest */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#49249a" />
      </Head>
      <div className={wrapperClasses}>
        <Navigation
          navSection={props.navSection}
          playerIsEmpty={playerIsEmpty}
        />
        <main className={mainClasses}>
          <Toaster />
          <div className={containerClasses}>{children}</div>
        </main>
      </div>
      <Player />
      <FilmGrain />
    </>
  );
}
