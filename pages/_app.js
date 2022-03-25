import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import "../styles/globals.css";

const testTrack = {
  track: {
    id: 99,
    title: "Test Title",
    url: "https://example/com/track/99",
    album: 9
  },
  listType: "queue"
}

function App({ Component, pageProps }) {
  const [onDeck, setOnDeck] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [nextFrom, setNextFrom] = useState([]);
  const [history, setHistory] = useState([]);

  const nextClasses = [
    "flex",
    "flex-col",
    "h-full",
    "p-4",
    "gap-4",
    "bg-gray-100",
    "text-blue-800",
    "dark:bg-black",
    "dark:text-gray-100",
  ];

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses);
  }, []);

  return (
    <AppContext.Provider value={{
      state: {
        onDeck: onDeck,
        nextFrom: nextFrom,
        playing: playing,
        queue: queue,
        history: history,
      },
      setOnDeck: setOnDeck,
      setNextFrom: setNextFrom,
      setPlaying: setPlaying,
      setQueue: setQueue,
      setHistory: setHistory,
    }}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default App
