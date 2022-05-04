import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Menu, Transition } from "@headlessui/react";
import Icon from "./Icon";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const MenuItem = ({ icon, theme }) => (
    <Menu.Item>
      {({ active }) => (
        <button
          className="flex items-center gap-8 h-32 px-12 w-full rounded-lg hover:bg-primary-10"
          onClick={() => setTheme(theme.toLowerCase())}
        >
          <Icon name={icon} className="opacity-50" />
          {theme}
        </button>
      )}
    </Menu.Item>
  );

  return (
    <Menu>
      <Menu.Button className="flex items-center justify-center h-32 w-32 rounded-full bg-primary-5 hover:bg-primary-10">
        <Icon
          name={
            theme === "system" ? "cog" : theme === "dark" ? "moon" : "sunny"
          }
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="bg-ground absolute right-0 top-48 w-128 p-8 origin-top-right overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem icon="cog" theme="System" />
          <MenuItem icon="sunny" theme="Light" />
          <MenuItem icon="moon" theme="Dark" />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
