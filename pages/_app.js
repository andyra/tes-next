import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AppContext from "../components/AppContext";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [currentTrack, setCurrentTrack] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [nextFrom, setNextFrom] = useState([]);

  useEffect(() => {
    // document.getElementById("__next").style = "font-feature-settings: 'cv02','cv03','cv04','cv11'";
    document.getElementById("__next").classList.add("h-full", "flex", "flex-col");
  }, []);

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
