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
      <Navigation />
      <main className={`flex-1 overflow-y-auto`}>
        <div className={`mx-auto ${maxWidth} ${padding}`}>
          {children}
        </div>
      </main>
      <Player />
    </>
  )
}

export default Layout;
