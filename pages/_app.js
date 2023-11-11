import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import client from "helpers/apollo-client";
import { PlayerContextProvider } from "context/PlayerContext";
import Layout from "components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", (url, { shallow }) => {
      console.log(`App is changing to ${url}`);
    });

    router.events.on("routeChangeComplete", (url, { shallow }) => {
      console.log(`App is Changed to ${url}`);
      var main = document.getElementById("main");
      main.scrollTop = 0;
    });

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      <Component />;
    };
  }, [router.events]);

  return (
    <ApolloProvider client={client}>
      <PlayerContextProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </PlayerContextProvider>
    </ApolloProvider>
  );
};

export default App;
