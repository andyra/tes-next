import Head from "next/head";
import cn from "classnames";
import Button from "./Button";
import Navigation from "./Navigation";
import Player from "./Player";
import Script from "next/script";

// Components
// ----------------------------------------------------------------------------

const Main = ({ children }) => (
  <main className="bg-white dark:bg-gray-800 rounded-lg overflow-y-auto">
    {children}
  </main>
);

const Toolbar = () => (
  <section className="sticky top-0 z-10 p-16 flex items-center justify-between gap-8 bg-white dark:bg-gray-800 rounded-lg">
    <input
      placeholder="What are you looking for?"
      className="flex-1 bg-gray-100 h-32 rounded-full mx-auto w-full max-w-screen-sm px-16"
    />
    <Button>Enter</Button>
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
      <Navigation />
      <Main>
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