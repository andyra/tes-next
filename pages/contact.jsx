import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
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
          rel="noopener noreferrer"
        >
          Castle
        </a>{" "}
        <a
          className="underline"
          href="http://static-21.sinclairstoryline.com/resources/media/1daced1e-52ff-4ec5-beb3-ae929cde076a-large16x9_ImportedfromLakana.jpg?1514554316874"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sound
        </a>{" "}
        <a
          className="underline"
          href="https://www.youtube.com/watch?v=kTNJJ1Bomoc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Productions
        </a>
        .
      </p>
      <section className="flex items-center gap-24">
        <div className="w-1/2 py-48 space-y-8 text-lg text-center border-y-4 border-primary">
          <p className="text-2xl">Call-ins welcome</p>
          <p>
            <Link href={`tel:${PHONE}`}>
              <a className="font-funky text-7xl">{PHONE}</a>
            </Link>
          </p>
          <p className="pt-24">
            <Link href={`mailto:${EMAIL}`}>
              <a className="text-2xl underline">{EMAIL}</a>
            </Link>
          </p>
          <p>
            {ADDRESS.street} • {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
          </p>
        </div>
        <div className="w-1/2 text-center">
          <Image
            className="rounded-xl"
            src="/mhm.jpg"
            width={320}
            height={244}
          />
        </div>
      </section>
      <p className="text-xs text-center mt-64">
        Thank you for choosing the Fertile Crescent Telephone Co. to be your
        neighborhood land-line provider. We have been dedicated to providing{" "}
        <em>good-quality</em> service to Adobega County, Monorail City, and
        surrounding area for over 40 years. ➪ CKNWR RADIO HITS
      </p>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      // maxWidth: "max-w-screen-lg",
      PageTitle: "Contact",
      spacing: true
    }
  };
}
