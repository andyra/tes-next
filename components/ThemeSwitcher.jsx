import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "components/Button";
import Icon from "components/Icon";
import { Menu, MenuItem } from "components/Menu";
import Tooltip from "components/Tooltip";

const ThemeItem = ({ icon, label, setTheme, theme }) => {
  const active = label === theme;

  return (
    <MenuItem
      icon={icon}
      className={`capitalize ${active ? "text-accent" : ""}`}
      onClick={() => setTheme(label)}
    >
      {label}
      <Icon name="Check" className={`ml-auto ${active ? "" : "opacity-0"}`} />
    </MenuItem>
  );
};

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Menu
      tooltip="Theme"
      trigger={
        <Button
          circle
          variant="glass"
          icon={resolvedTheme === "dark" ? "Moon" : "Sun"}
          className="relative"
        >
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-ground -z-10" />
        </Button>
      }
    >
      <ThemeItem icon="Gear" label="system" setTheme={setTheme} theme={theme} />
      <ThemeItem icon="Sun" label="light" setTheme={setTheme} theme={theme} />
      <ThemeItem icon="Moon" label="dark" setTheme={setTheme} theme={theme} />
    </Menu>
  );
};

export default ThemeSwitcher;
