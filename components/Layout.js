import Head from "next/head";
import cn from "classnames";
import Button from "./Button";
import Navigation from "./Navigation";
import Player from "./Player";

const Layout = ({ children, ...props }) => {
  const containerClasses = cn({
    "mx-auto p-64": true,
    [props.maxWidth]: props.maxWidth,
    "max-w-screen-md": !props.maxWidth
  });

  return (
    <>
      <Head>
        <title>{props.pageTitle ? `${props.pageTitle} • TES` : "This Evening's Show"}</title>
      </Head>
      <div className="flex items-stretch gap-4 flex-1">
        <Navigation />
        <main className="bg-white dark:bg-gray-800 rounded-lg flex-1 overflow-y-auto">
          <nav className="p-16 flex items-center justify-between gap-8">
            <input placeholder="What are you looking for?" className="flex-1 bg-gray-100 h-32 rounded-full mx-auto w-full max-w-screen-sm px-16" />
            <Button>
              Enter
            </Button>
          </nav>
          <div className={containerClasses}>
            {children}
          </div>
        </main>
      </div>
      <Player />
    </>
  )
}

export default Layout;
