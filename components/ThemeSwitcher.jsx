import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "components/Button";
import Icon from "components/Icon";
import { DropdownMenu, DropdownItem } from "components/DropdownMenu";
import Tooltip from "components/Tooltip";

const ThemeItem = ({ icon, setTheme, theme, themeName }) => {
  const active = themeName === theme;

  return (
    <DropdownItem
      className="capitalize"
      icon={icon}
      onClick={() => setTheme(themeName)}
      selectable
      selected={active}
      title={themeName}
    />
  );
};

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <DropdownMenu
      asChild
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
      <ThemeItem
        icon="Gear"
        themeName="system"
        setTheme={setTheme}
        theme={theme}
      />
      <ThemeItem
        icon="Sun"
        themeName="light"
        setTheme={setTheme}
        theme={theme}
      />
      <ThemeItem
        icon="Moon"
        themeName="dark"
        setTheme={setTheme}
        theme={theme}
      />
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
