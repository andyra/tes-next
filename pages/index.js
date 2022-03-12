import Head from "next/head";

// Song title
// Song file
// Album ID (for album title, cover art, url)

const FAKE_DATA = [
  {
    title: "Mercy in Approbrium",
    url: "https://thiseveningsshow.com/music",
    album: 1
  },
  {
    title: "Flickering Cnadle Light",
    url: "https://thiseveningsshow.com/albums",
    album: 2
  },
  {
    title: "Dog & Pony Show",
    url: "https://thiseveningsshow.com/songs",
    album: 3
  }
];

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">
        List
      </h1>
      <ul>
        {FAKE_DATA.map((item, i) =>
          <li className="flex items-center justify-between">
            {item.title}
            <button className="h-32 w-32 rounded-full border flex items-center justify-center text-xl">
              +
            </button>
          </li>
        )}
      </ul>
    </>
  )
}
