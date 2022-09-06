import Image from "next/image";
import Link from "next/link";
import PageHeader from "components/PageHeader";
import { ADDRESS, EMAIL, PHONE } from "../constants";
import Button from "components/Button";

// Default
// ----------------------------------------------------------------------------

export default function Contact() {
  return (
    <>
      <p className="text-2xl sm:text-4xl text-center">
        This Evening&apos;s Show is recorded from a studio in Abilene, TX,
        formerly{" "}
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

      <section className="md:w-512 mx-auto relative">
        <div className="bg-ground p-16 xs:p-24 sm:p-48 -mx-12 md:mx-auto text-center border-4 border-primary relative z-1">
          <p className="text-xl xs:text-2xl">Call-ins welcome</p>
          <p>
            <Link href={`tel:${PHONE}`}>
              <a className="font-funky font-bold text-4xl xs:text-5xl sm:text-7xl hover:text-accent transition">
                {PHONE}
              </a>
            </Link>
          </p>
          <p className="my-24 sm:my-8">
            <Link href={`mailto:${EMAIL}`}>
              <a className="xs:text-xl sm:text-2xl underline break-words hover:text-accent transition">
                {EMAIL}
              </a>
            </Link>
          </p>
          <p>
            {ADDRESS.street} • {ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}
          </p>
        </div>
        <div
          className="border-4 border-primary-50 absolute top-0 left-0 w-full h-full rotate-3"
          aria-hidden
        />
      </section>
      <figure className="text-center">
        <Image
          alt="Michael Henry Martin, former television great"
          className="rounded-xl"
          src="/images/mhm.jpg"
          width={320}
          height={244}
        />
      </figure>
      <p className="hidden text-xs text-center mt-64">
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
      metaTitle: "Contact"
    }
  };
}
