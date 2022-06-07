import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Icon from "./Icon";
import Button, { getButtonClasses } from "./Button";
import { Menu, MenuDivider, MenuHeading, MenuItem } from "./Menu";
import Tooltip from "./Tooltip";

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
      <MenuItem icon="Gear" onClick={() => setTheme("system")}>
        System
      </MenuItem>
      <MenuItem icon="Sun" onClick={() => setTheme("light")}>
        Light
      </MenuItem>
      <MenuItem icon="Moon" onClick={() => setTheme("dark")}>
        Dark
      </MenuItem>
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
