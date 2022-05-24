import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import Button from "../components/Button";
import Icon from "../components/Icon";

const AnimatedLetter = ({ children, src }) => {
  const Letter = styled.span.attrs({
    className: "font-bold text-white"
  })`
    background-clip: text;
    -webkit-background-clip: text;
    background-size: cover;
    background-position: center center;
    background-image: url(${src});
    font-size: 25vh;
    line-height: 1;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
  `;

  return <Letter>{children}</Letter>;
};

// Default
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <div className="space-y-64">
      <h1 className="text-center">
        <AnimatedLetter src="/vhs-02.webp">TES</AnimatedLetter>
        <p className="font-mono text-sm text-center max-w-screen-sm mx-auto">
          <strong>This Evening's Show</strong> is a radio broadcast transmitting
          from an abandoned monorail station outside Adobe Skyscraper. Tune in
          as your hosts guide you through a cavalcade of bizarre characters,
          historic factoids, surreal comedy, improvised news, interviews, and
          original music.
        </p>
      </h1>

      <section>
        <h2>Recent Additions</h2>
        <ul className="grid grid-cols-3 gap-16">
          {[...Array(6)].map((item, i) => (
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
    </div>
  );
}
