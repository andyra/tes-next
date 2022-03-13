import React, { useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import "../styles/globals.css";

const defaultTrack = {
  id: 0,
  title: "Default Title",
  url: "https://example.com/url",
  album: "Album A"
}

function App({ Component, pageProps }) {
  const [currentTrack, setCurrentTrack] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [nextFrom, setNextFrom] = useState([]);

  return (
    <AppContext.Provider value={{
      state: {
        currentTrack: currentTrack,
        nextFrom: nextFrom,
        playing: playing,
        queue: queue,
      },
      setCurrentTrack: setCurrentTrack,
      setNextFrom: setNextFrom,
      setPlaying: setPlaying,
      setQueue: setQueue,
    }}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default App
