import Image from "next/legacy/image";
import Link from "next/link";
import LeadSheet from "components/LeadSheet";
import PageHeader from "components/PageHeader";
import { ADDRESS, EMAIL, PHONE } from "../constants";

const song = {
  notation: null,
  leadSheet: `{subtitle: Key of G}

{c: Verse}
[F]Couch Man sitting there 'cause he's always there [F]Ask him what and
he'll [Gm]tell you why [Bb] [F]Couch Man helping all who wander in to
[F]learn about [Gm]Adobe Sky [Bb]

{c: Chorus}
[F][Fsus4]Couch [F]Man [Gm]on the couch [Bb]every day [F][Fsus4]Couch
[F]Man [Gm]never leaves [Bb]always stays [F][Fsus4]Couch [F]Man [Gm]ask
him what [Bb]ask him why [F][Fsus4]Couch [F]Man [Gm]knobs about
[Bb]Adobe Sky
`
};

// Default
// ----------------------------------------------------------------------------

export default function WritingLeadSheets() {
  return (
    <>
      <header className="space-y-16">
        <h1 className="font-medium text-4xl">Writing Lead Sheets</h1>
        <p className="text-xl">
          The site uses a{" "}
          <a
            className="underline"
            href="https://github.com/martijnversluis/ChordSheetJS"
            rel="noopener noreferrer"
            target="_blank"
          >
            JavaScript library
          </a>{" "}
          to parse leadsheets using the fairly standard ChordPro syntax. Not
          everything from the ChordPro spec is included in the library (no tabs,
          unfortunately), but here are the basics:
        </p>
        <p className="text-lg text-primary-75">
          <strong className="text-accent">Hot Tip</strong>: You can print a lead
          sheet by going to the{" "}
          <Link href="/songs/couch-man">
            <a className="underline">song page</a>
          </Link>{" "}
          and printing from there.
        </p>
      </header>

      <section>
        <p className="font-medium text-xl mb-16">Type out this…</p>
        <pre className="font-mono pl-16 border-l-2 max-w-full overflow-x-auto">
          {song.leadSheet}
        </pre>
      </section>

      <section>
        <p className="font-medium text-xl mb-16">
          And it will be formatted as such…
        </p>
        <LeadSheet song={song} />
      </section>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-screen-md",
      metaTitle: "Writing Lead Sheets"
    }
  };
}
