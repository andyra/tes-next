import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex items-center justify-center border-b">
      <Link href="/">
        <a className="px-12 py-16 hover:gray-100">
          Home
        </a>
      </Link>
      <Link href="/about">
        <a className="px-12 py-16 hover:gray-100">
          About
        </a>
      </Link>
    </nav>
  )
}
