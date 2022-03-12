import React, { useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  return (
    <AppContext.Provider value={{
      state: {
        playing: playing,
        queue: queue,
      },
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
