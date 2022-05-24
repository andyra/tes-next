import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import AnimatedLetter from "../components/AnimatedLetter";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { H1 } from "../components/PageTitle";

// Default
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <header className="text-center space-y-16">
        <h1>
          <AnimatedLetter src="/vhs-02.webp">TES</AnimatedLetter>
        </h1>
        <p className="font-mono text-sm text-center max-w-screen-sm mx-auto">
          This Evening's Show is a radio broadcast transmitting from an
          abandoned monorail station outside Adobe Skyscraper. Tune in as your
          hosts guide you through a cavalcade of bizarre characters, historic
          factoids, surreal comedy, improvised news, interviews, and original
          music.
        </p>
      </header>

      <button className="text-4xl flex items-center justify-center border-2 border-accent-10 hover:border-accent rounded-xl p-48 w-full">
        Play the Radio
      </button>

      <section>
        <h2 className="text-2xl text-center">Recent Additions</h2>
        <ul className="grid grid-cols-3 gap-16">
          {[...Array(3)].map((item, i) => (
            <li>
              <Link href="/">
                <a className="flex items-center justify-center aspect-square rounded-lg bg-primary-5">
                  Item {i} here
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps(context) {
  return {
    props: {
      spacing: "space-y-64"
    }
  };
}
