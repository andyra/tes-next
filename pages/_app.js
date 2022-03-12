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
  const [current, setCurrent] = useState(defaultTrack);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  return (
    <AppContext.Provider value={{
      state: {
        current: current,
        playing: playing,
        queue: queue,
      },
      setCurrent: setCurrent,
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
