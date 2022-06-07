import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "./Icon";
import Button, { getButtonClasses } from "./Button";
import { Menu, MenuDivider, MenuHeading, MenuItem } from "./Menu";
import Tooltip from "./Tooltip";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Menu
      trigger={<Icon name="Overflow" />}
      triggerClassName={getButtonClasses({
        circle: true,
        variant: "glass"
      })}
    >
      <MenuHeading>Theme</MenuHeading>
      <MenuItem iconLeft="Gear" onClick={() => setTheme("system")}>
        System
      </MenuItem>
      <MenuItem iconLeft="Sun" onClick={() => setTheme("light")}>
        Light
      </MenuItem>
      <MenuItem iconLeft="Moon" onClick={() => setTheme("dark")}>
        Dark
      </MenuItem>
      <MenuDivider />
      <MenuItem iconLeft="Video" href="/videos">
        Videos
      </MenuItem>
      <MenuItem iconLeft="Music" href="/setlist">
        Setlist Computor
      </MenuItem>
    </Menu>
  );
};

export default ThemeSwitcher;
