import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import "../styles/globals.css";

// Icons: Ionic is great, but there's some weird framework thing


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
  const [prevFrom, setPrevFrom] = useState([]);

  const nextClasses = [
  "grid",
    "h-full",
    "overflow-hidden",
    "p-4",
    "gap-4",
    "bg-gray-100",
    "text-blue-800",
    "dark:bg-black",
    "dark:text-gray-100",
  ];

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses);
    document.getElementById("__next").style = "grid-template-columns: 224px 1fr; grid-template-rows: 1fr 64px;";
  }, []);

  return (
    <AppContext.Provider value={{
      state: {
        onDeck: onDeck,
        nextFrom: nextFrom,
        playing: playing,
        queue: queue,
        prevFrom: prevFrom,
      },
      setOnDeck: setOnDeck,
      setNextFrom: setNextFrom,
      setPlaying: setPlaying,
      setQueue: setQueue,
      setPrevFrom: setPrevFrom,
    }}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default App
