import React, { useState } from "react";
import Layout from "../components/Layout";
import LanguageContext from "../components/LanguageContext";
import "../styles/globals.css";

function App({ Component, pageProps }) {
  const [language, setLanguage] = useState("en");
  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </LanguageContext.Provider>
  )
}

export default App
