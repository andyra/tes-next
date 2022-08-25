import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "components/Icon";
import Button from "components/Button";
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
        <div className="bg-ground rounded-full">
          <Button
            circle
            iconLeft={resolvedTheme === "dark" ? "Moon" : "Sun"}
            variant="glass"
          />
        </div>
      }
    >
      <ThemeItem icon="Gear" label="system" setTheme={setTheme} theme={theme} />
      <ThemeItem icon="Sun" label="light" setTheme={setTheme} theme={theme} />
      <ThemeItem icon="Moon" label="dark" setTheme={setTheme} theme={theme} />
    </Menu>
  );
};

export default ThemeSwitcher;
