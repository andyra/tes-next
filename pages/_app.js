import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import AudioContext from "../context/AudioContext";
import Layout from "../components/Layout";
import client from "../apollo-client";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [onDeck, setOnDeck] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [nextFrom, setNextFrom] = useState([]);
  const [prevFrom, setPrevFrom] = useState([]);

  const nextClasses = [
    "grid",
    "h-full",
    "overflow-hidden",
    "bg-ground",
    "text-primary",
    "grid",
    "grid-cols-1",
    "grid-rows-[1fr,88px,48px]",
    "md:grid-cols-[224px,1fr]",
    "md:grid-rows-[1fr,88px]"
  ];

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses);
  }, []);

  return (
    <ApolloProvider client={client}>
      <AudioContext.Provider
        value={{
          state: {
            onDeck: onDeck,
            nextFrom: nextFrom,
            playing: playing,
            queue: queue,
            prevFrom: prevFrom
          },
          setOnDeck: setOnDeck,
          setNextFrom: setNextFrom,
          setPlaying: setPlaying,
          setQueue: setQueue,
          setPrevFrom: setPrevFrom
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AudioContext.Provider>
    </ApolloProvider>
  );
}

export default App;
