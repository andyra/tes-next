import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import AudioContext from "../context/AudioContext";
import { ThemeProvider } from "../context/ThemeContext";
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
    "p-4",
    "gap-4",
    "bg-secondary",
    "text-primary"
  ];

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses);
    document.getElementById("__next").style =
      "grid-template-columns: 224px 1fr; grid-template-rows: 1fr 72px;";
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
        <ThemeProvider>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AudioContext.Provider>
    </ApolloProvider>
  );
}

export default App;
