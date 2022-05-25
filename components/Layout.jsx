import Head from "next/head";
import Script from "next/script";
import * as Popover from "@radix-ui/react-popover";
import cn from "classnames";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Navigation from "./Navigation";
import Player from "./Player";
import ThemeSwitcher from "./ThemeSwitcher";

// Components
// ----------------------------------------------------------------------------

const Toolbar = () => (
  <section className="sticky top-0 z-10 p-16 bg-ground">
    <div className="flex items-center justify-end">
      <ThemeSwitcher />
    </div>
  </section>
);

const Main = ({ children }) => (
  <main className="h-full overflow-y-auto bg-ground rounded-lg">
    {children}
  </main>
);

const Container = ({ children, maxWidth, spacing }) => {
  const containerClasses = cn({
    "mx-auto p-24": true,
    [maxWidth]: maxWidth,
    "max-w-screen-lg": !maxWidth,
    [spacing]: spacing
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
        <Container maxWidth={props.maxWidth} spacing={props.spacing}>
          {children}
        </Container>
      </Main>
      <Player />
    </>
  );
}
