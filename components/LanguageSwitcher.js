import { useContext } from "react";
import LanguageContext from "./LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <button onClick={() => setLanguage("jp")} className="border px-12 py-8">
      Switch Language (Current: {language})
    </button>
  );
};

export default LanguageSwitcher;
