import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { PlayerContextProvider } from "../context/PlayerContext";
import Layout from "../components/Layout";
import client from "../apollo-client";
import "../styles/globals.css";

function App({ Component, pageProps }) {
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
      <PlayerContextProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PlayerContextProvider>
    </ApolloProvider>
  );
}

export default App;
