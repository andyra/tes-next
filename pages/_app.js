import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { PlayerContextProvider } from "../context/PlayerContext";
import Layout from "../components/Layout";
import client from "../apollo-client";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => (
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

export default App;
