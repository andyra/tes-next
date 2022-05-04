import Link from "next/link";
import Button from "../components/Button";

// Default
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <section className="flex items-center gap-48">
        <figure className="w-1/4 aspect-square bg-primary-5" />
        <h1 className="flex-1 text-xl">
          <strong>This Evening's Show</strong> is a radio broadcast transmitting
          from an abandoned monorail station outside Adobe Skyscraper. Tune in
          as your hosts guide you through a cavalcade of bizarre characters,
          historic factoids, surreal comedy, improvised news, interviews, and
          original music.
        </h1>
      </section>
      <Button>Play TES Radio</Button>
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
    </>
  );
}
