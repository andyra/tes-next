import Head from "next/head";
import Navigation from "./Navigation";
import Player from "./Player";

const Layout = ({ children, ...props }) => {
  const maxWidth = props.maxWidth ? props.maxWidth : "max-w-screen-md";
  const padding = props.padding ? props.padding : "p-16";

  return (
    <>
      <Head>
        <title>{props.pageTitle ? `${props.pageTitle} • TES` : "This Evening's Show"}</title>
      </Head>
      <div className="flex items-stretch gap-4 flex-1">
        <Navigation />
        <main className="bg-white dark:bg-gray-800 rounded-lg flex-1 overflow-y-auto">
          <div className={`mx-auto ${maxWidth} ${padding}`}>
            {children}
          </div>
        </main>
      </div>
      <Player />
    </>
  )
}

export default Layout;
