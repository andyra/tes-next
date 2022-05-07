import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import AudioContext from "../context/AudioContext";
import Layout from "../components/Layout";
import client from "../apollo-client";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [currentTrack, setCurrentTrack] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextList, setNextList] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const [queueList, setQueueList] = useState([]);

  const nextClasses = [
    "grid",
    "h-full",
    "overflow-hidden",
    "bg-ground",
    "text-primary",
    "grid",
    "grid-cols-1",
    "grid-rows-[1fr,64px,48px]",
    "md:grid-cols-[224px,1fr]",
    "md:grid-rows-[1fr,80px]"
  ];

  useEffect(() => {
    document.getElementById("__next").classList.add(...nextClasses);
  }, []);

  return (
    <ApolloProvider client={client}>
      <AudioContext.Provider
        value={{
          state: {
            currentTrack: currentTrack,
            isPlaying: isPlaying,
            nextList: nextList,
            prevList: prevList,
            queueList: queueList
          },
          setCurrentTrack: setCurrentTrack,
          setIsPlaying: setIsPlaying,
          setNextList: setNextList,
          setPrevList: setPrevList,
          setQueueList: setQueueList
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
