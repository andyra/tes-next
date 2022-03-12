import Head from "next/head";
import Navigation from "./Navigation";
import Player from "./Player";

const Tasks = () => (
  <section className="bg-yellow-100 p-24 rounded mb-24">
    <h2 className="font-medium">Tasks</h2>
    <ul className="list list-decimal pl-24">
      <li className="line-through">Pass selected song to context</li>
      <li className="line-through">Only show "Playing" for actively playing song</li>
      <li className="line-through">Persist between pages</li>
      <li className="">Add Items to queue</li>
    </ul>
  </section>
);

const QueueList = () => {
  return (
    <section className="bg-blue-50 p-24 mb-24">
      <h2 className="font-medium mb-8">Queue List</h2>
      <ul className="list-decimal pl-24">
        <li>sdfg</li>
      </ul>
    </section>
  )
}

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
          <Tasks />
          <QueueList />
          {children}
        </div>
      </main>
      <Player />
    </>
  )
}

export default Layout;
