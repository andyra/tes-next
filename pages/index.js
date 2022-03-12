import { useContext } from "react";
import LanguageContext from "../components/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function Home() {
  const context = useContext(LanguageContext);
  const language = context.language;

  return (
    <>
      <h2>Current Language: <strong>{language}</strong></h2>
      <LanguageSwitcher />
    </>
  )
}
