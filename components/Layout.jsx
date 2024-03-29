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
import { DEFAULT_EPISODE_IMAGE } from "../constants";

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
    "fixed h-screen w-screen pointer-events-none z-grain mix-blend-difference",
})`
  animation: ${grain} 0.4s steps(1) infinite;
  background-image: url(/images/noise-256w.png);
  opacity: 0.2;
`;

// Default
// ----------------------------------------------------------------------------

export default function Layout({ children, ...props }) {
  const { currentTrack, nextList, playerIsEmpty, prevList, queueList } =
    usePlayerContext();

  const metaUrl = "https://tes.fm";
  const metaSiteName = "This Evening's Show";
  const metaTitle = props.metaTitle
    ? `${props.metaTitle} • TES`
    : "This Evening's Show";

  const metaDescription = props.metaDescription
    ? props.metaDescription
    : "Music and mayhem from the abandoned monorail station";

  const metaImage = props.metaImage || DEFAULT_EPISODE_IMAGE;

  const nextClasses = cn(
    "h-full overflow-hidden print:overflow-visible p-4 bg-ground-dark",
    "flex flex-col gap-4"
  );

  const wrapperClasses = cn(
    "flex flex-col md:flex-row items-stretch gap-4 overflow-hidden",
    "h-[100vh] md:h-auto md:flex-1"
  );

  const mainClasses = cn(
    "flex-1 overflow-y-auto overflow-x-hidden print:overflow-visible relative",
    "bg-ground rounded-lg p-24 md:py-48 lg:py-64"
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
        <title key="meta-title">{metaTitle}</title>
        <meta name="application-name" content={metaSiteName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={metaSiteName} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#442694"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/favicons/apple-touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/favicons/apple-touch-icon-ipad-retina.png"
        />
        <link
          rel="alternate icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="alternate icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content={metaDescription} />
        <meta name="twitter:url" content={metaUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
        <meta name="twitter:creator" content="@ThisEveningsShow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content={metaSiteName} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:image" content={metaImage} />
      </Head>

      <div className={wrapperClasses}>
        <Navigation
          navSection={props.navSection}
          playerIsEmpty={playerIsEmpty}
        />
        <main id="main" className={mainClasses}>
          <Toaster />
          <div className={containerClasses}>{children}</div>
        </main>
      </div>
      <Player />
      <FilmGrain />
    </>
  );
}
