import Image from "next/image";
import Link from "next/Link";
import PageTitle from "../components/PageTitle";
import { ADDRESS, EMAIL, PHONE } from "../constants";

// Default
// ----------------------------------------------------------------------------

export default function Contact() {
  return (
    <>
      <p className="text-2xl text-center">
        This Evening's Show is recorded from a studio in Abilene, TX, formerly{" "}
        <a
          className="underline"
          href="http://castlesound.mysite.com/"
          target="_blank"
          noopener
          noreferrer
        >
          Castle
        </a>{" "}
        <a
          className="underline"
          href="http://static-21.sinclairstoryline.com/resources/media/1daced1e-52ff-4ec5-beb3-ae929cde076a-large16x9_ImportedfromLakana.jpg?1514554316874"
          target="_blank"
          noopener
          noreferrer
        >
          Sound
        </a>{" "}
        <a
          className="underline"
          href="https://www.youtube.com/watch?v=kTNJJ1Bomoc"
          target="_blank"
          noopener
          noreferrer
        >
          Productions
        </a>
        .
      </p>
      <div className="space-y-8 text-lg text-center py-64 my-64 border-y-4 border-primary-50">
        <p className="text-2xl">Call-ins welcome</p>
        <p>
          <Link href={`tel:${PHONE}`}>
            <a className="font-serif text-6xl font-bold tracking-tight">
              {PHONE}
            </a>
          </Link>
        </p>
        <p className="pt-24">
          <Link href={`mailto:${EMAIL}`}>
            <a className="font-mono underline">{EMAIL}</a>
          </Link>
        </p>
        <p>
          {ADDRESS.street} • {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
        </p>
      </div>
      <div className="text-center">
        <Image className="rounded-xl" src="/mhm.jpg" width={320} height={244} />
      </div>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-screen-sm",
      pageTitle: "Contact"
    }
  };
}
