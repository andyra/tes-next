import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "./Button";
import Icon from "./Icon";
import { Menu, MenuDivider, MenuHeading, MenuItem } from "./Menu";
import Tooltip from "./Tooltip";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Menu
      trigger={
        <Button circle size="lg">
          <Icon name="cog" />
        </Button>
      }
    >
      <MenuHeading>Theme</MenuHeading>
      <MenuItem iconLeft="cog" onClick={() => setTheme("system")}>
        System
      </MenuItem>
      <MenuItem iconLeft="sunny" onClick={() => setTheme("light")}>
        Light
      </MenuItem>
      <MenuItem iconLeft="moon" onClick={() => setTheme("dark")}>
        Dark
      </MenuItem>
      <MenuDivider />
      <MenuItem href="/videos">Videos</MenuItem>
      <MenuItem href="/setlist">Setlist Computor</MenuItem>
    </Menu>
  );
};

export default ThemeSwitcher;
