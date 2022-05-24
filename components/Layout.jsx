import Head from "next/head";
import Script from "next/script";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import Navigation from "./Navigation";
import Player from "./Player";
import ThemeSwitcher from "./ThemeSwitcher";

// Components
// ----------------------------------------------------------------------------

const Main = ({ children }) => (
  <main className="h-full overflow-y-auto bg-ground rounded-lg">
    {children}
  </main>
);

const Toolbar = () => (
  <section className="sticky top-0 z-10 p-16 grid grid-cols-[40px_1fr_40px] gap-8">
    <Input
      glass
      className="mx-auto max-w-screen-sm col-span-2 lg:col-start-2 lg:col-span-1"
      icon="search"
      placeholder="What are you looking for?"
    />
    <div className="flex items-center justify-end">
      <ThemeSwitcher />
    </div>
  </section>
);

const Container = ({ children, maxWidth }) => {
  const containerClasses = cn({
    "mx-auto p-24": true,
    [maxWidth]: maxWidth,
    "max-w-screen-lg": !maxWidth
  });

  return <div className={containerClasses}>{children}</div>;
};

// Default
// ----------------------------------------------------------------------------

export default function Layout({ children, ...props }) {
  return (
    <>
      <Head>
        <title>
          {props.pageTitle ? `${props.pageTitle} • TES` : "This Evening's Show"}
        </title>
      </Head>
      <Navigation navSection={props.navSection} />
      <Main>
        <Toaster />
        <Toolbar />
        <Container maxWidth={props.maxWidth}>{children}</Container>
      </Main>
      <Player />
      <Script
        src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"
        strategy="afterInteractive"
      />
    </>
  );
}
