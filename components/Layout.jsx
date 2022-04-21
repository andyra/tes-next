import Head from "next/head";
import Script from "next/script";
import cn from "classnames";
import { Toaster } from "react-hot-toast";
import Button from "./Button";
import Input from "./Input";
import Navigation from "./Navigation";
import Player from "./Player";
import ThemeSwitcher from "./ThemeSwitcher";

// Components
// ----------------------------------------------------------------------------

const Main = ({ children }) => (
  <main className="h-full bg-base rounded-lg overflow-y-auto">{children}</main>
);

const Toolbar = () => (
  <section className="sticky top-0 z-10 p-16 grid grid-cols-[128px_1fr_128px] gap-8 bg-base rounded-lg">
    <Input
      className="mx-auto max-w-screen-sm col-start-2"
      icon="search"
      placeholder="What are you looking for?"
    />
    <div className="flex items-center justify-end gap-8">
      <ThemeSwitcher />
      <Button>Enter</Button>
    </div>
  </section>
);

const Container = ({ children, maxWidth }) => {
  const containerClasses = cn({
    "mx-auto p-64": true,
    [maxWidth]: maxWidth,
    "max-w-screen-md": !maxWidth
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
