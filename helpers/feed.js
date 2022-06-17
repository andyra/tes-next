import { EMAIL } from "../constants";

const BASE_URL = "https://tes.fm/";
const TITLE = "This Evening's Show";
const DESCRIPTION =
  "This Evening's Show is a radio broadcast transmitting from an abandoned monorail station outside Adobe Skyscraper. Tune in as your hosts guide you through a cavalcade of bizarre characters, historic factoids, surreal comedy, improvised news, interviews, and original music";
const IMAGE_URL =
  "https://tesfm.fra1.digitaloceanspaces.com/episodes/this-evenings-show.jpg";
const CATEGORY = "Comedy";
const OWNER = "Andy Smith";

function truncateDescription(str) {
  return str.split(" ").splice(0, 10).join(" ");
}

export async function generateFeedItem(episode) {
  const {
    description,
    episodeAudio,
    episodeCoverArt,
    releaseDate,
    slug,
    title,
  } = episode;
  const buildDate = new Date(releaseDate).toUTCString();

  return `
    <item>
      <title>${title}</title>
      <link>${BASE_URL}episodes/${slug}</link>
      <guid>${BASE_URL}episodes/${slug}</guid>
      <pubDate>${buildDate}</pubDate>
      <itunes:summary>${description}</itunes:summary>
      <itunes:subtitle>${
        description ? truncateDescription(description) : ""
      }</itunes:subtitle>
      <description>${description}</description>
      <enclosure
        url="https://dts.podtrac.com/redirect.mp3/${
          episodeAudio.length ? episodeAudio[0].url : ""
        }"
        type="audio/mpeg"
        length="1024"
      />
      <itunes:author>${TITLE}</itunes:author>
      <itunes:duration>00:59:59</itunes:duration>
      <itunes:explicit>no</itunes:explicit>
    </item>
  `;
}

export async function generateFeed(episodes) {
  const items = await Promise.all(episodes.map(generateFeedItem));
  const lastBuildDate = new Date(episodes[0].releaseDate).toUTCString();

  return `
    <rss
      xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
      xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      version="2.0"
    >
      <channel>
        <title>${TITLE}</title>
        <link>${BASE_URL}</link>
        <language>en</language>
        <atom:link href="${BASE_URL}feed" rel="self" type="application/rss+xml" />
        <description>${DESCRIPTION}</description>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <pubDate>${lastBuildDate}</pubDate>
        <copyright>All rights reserved</copyright>
        <webMaster>${EMAIL} (${OWNER})</webMaster>
        <itunes:subtitle>${truncateDescription(DESCRIPTION)}</itunes:subtitle>
        <itunes:author>${TITLE}</itunes:author>
        <itunes:summary>${DESCRIPTION}</itunes:summary>
        <itunes:owner>
          <itunes:name>${OWNER}</itunes:name>
          <itunes:email>${EMAIL}</itunes:email>
        </itunes:owner>
        <itunes:explicit>no</itunes:explicit>
        <itunes:category text="${CATEGORY}" />
        <itunes:image href="${IMAGE_URL}" />
        <image>
          <url>${IMAGE_URL}</url>
          <title>${TITLE}</title>
          <link>${BASE_URL}</link>
        </image>
        ${items.join("")}
      </channel>
    </rss>
  `;
}
