import React, { useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import "../styles/globals.css";

const defaultTrack = {
  title: "Default Title",
  url: "https://example.com/url",
  album: 0
}

function App({ Component, pageProps }) {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  return (
    <AppContext.Provider value={{
      state: {
        currentTrack: currentTrack,
        playing: playing,
        queue: queue,
      },
      setCurrentTrack: setCurrentTrack,
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
