import React from "react";

// Set defaults for context
const LanguageContext = React.createContext({
  language: "en",
  setLanguage: () => {}
});

export default LanguageContext;
