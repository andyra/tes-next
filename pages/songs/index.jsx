import { useState } from "react";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Button from "@/components/Button";
import ClientOnly from "@/components/ClientOnly";
import GridListToggle from "@/components/GridListToggle";
import MusicTabs from "@/components/MusicTabs";
import SongList from "./components/SongList";

// Default
// ----------------------------------------------------------------------------

export default function Songs() {
  const [gridView, setGridView] = useState(true);

  return (
    <>
      <header className="relative mb-32 md:mb-64">
        <MusicTabs pageName="Songs" />
      </header>
      <div className="flex items-center gap-8 justify-end mb-24">
        <GridListToggle gridView={gridView} setGridView={setGridView} />
      </div>
      <ClientOnly>
        <SongList gridView={gridView} />
      </ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-none",
      navSection: "Music",
      PageTitle: "Songs"
    }
  };
}
