import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Button from "./Button";
import Icon from "./Icon";

export default function Toggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme(e) {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button onClick={e => toggleTheme(e)}>
      <Icon name={theme === "dark" ? "moon" : "sunny"} />
    </Button>
  );
}
