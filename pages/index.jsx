import Link from "next/link";
import Button from "../components/Button";

// Default
// ----------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <h1>TES</h1>
      <Button>Play TES Radio</Button>
      <section>
        <h2>Recent Additions</h2>
        <ul className="grid grid-cols-3 gap-16">
          {[...Array(6)].map((item, i) => (
            <li>
              <Link href="/">
                <a className="block h-128 bg-gray-100">Item {i} here</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
