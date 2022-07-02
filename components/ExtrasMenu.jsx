import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "components/Icon";
import Button, { getButtonClasses } from "components/Button";
import { Menu, MenuDivider, MenuHeading, MenuItem } from "components/Menu";
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

export const ExtrasMenu = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Menu
      tooltipContent="Menu"
      trigger={<Icon name="Overflow" />}
      triggerClassName={getButtonClasses({
        circle: true,
        variant: "glass"
      })}
    >
      <MenuHeading>Theme</MenuHeading>
      <ThemeItem icon="Gear" label="system" setTheme={setTheme} theme={theme} />
      <ThemeItem icon="Sun" label="light" setTheme={setTheme} theme={theme} />
      <ThemeItem icon="Moon" label="dark" setTheme={setTheme} theme={theme} />
      <MenuDivider />
      <MenuItem icon="Video" href="/videos">
        Videos
      </MenuItem>
      <MenuItem icon="Music" href="/setlist">
        Setlist Computor
      </MenuItem>
    </Menu>
  );
};

export default ExtrasMenu;
