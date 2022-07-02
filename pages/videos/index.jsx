import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Empty from "components/Empty";
import QueryError from "components/QueryError";
import PageHeader from "components/PageHeader";

// Components
// ----------------------------------------------------------------------------

const ulClasses = "grid grid-cols-2 lg:grid-cols-3 gap-8 -mx-8";

const VideoItem = ({ video }) => {
  const { slug, title, vimeoId } = video;
  const [thumbnail, setThumbnail] = useState(null);

  // Get the thumbnail from Vimeo
  useEffect(() => {
    return fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`
    )
      .then(response => response.json())
      .then(data => {
        setThumbnail({
          src: data.thumbnail_url,
          height: data.thumbnail_height,
          width: data.thumbnail_width
        });
      });
  }, []);

  return (
    <li className="flex items-center gap-8">
      <Link href={`/videos/${encodeURIComponent(slug)}`}>
        <a className="block w-full h-full text-lg p-8 rounded-lg hover:ring-2 hover:ring-accent transition">
          {thumbnail && (
            <>
              <figure className="rounded-lg overflow-hidden mb-8">
                <Image
                  height={thumbnail.height}
                  layout="responsive"
                  src={thumbnail.src}
                  width={thumbnail.width}
                />
              </figure>
            </>
          )}
          {title}
        </a>
      </Link>
    </li>
  );
};

const VideoList = () => {
  const { data, loading, error } = useQuery(
    gql`
      query Entries {
        entries(section: "videos") {
          id
          slug
          title
          ... on videos_default_Entry {
            vimeoId
          }
        }
      }
    `
  );

  if (loading) {
    return (
      <ul className={ulClasses}>
        {[...Array(8)].map((e, i) => (
          <li className="p-8" key={i}>
            <div className="w-full aspect-video rounded-lg mb-16 bg-primary animate-loading" />
            <div className="h-24 w-full rounded bg-primary animate-loading" />
          </li>
        ))}
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-t from-ground" />
      </ul>
    );
  }

  if (error) {
    console.error(error);
    return <QueryError error={error.message} />;
  }

  return data.entries ? (
    <ul className={ulClasses}>
      {data.entries.map(video => (
        <VideoItem video={video} key={video.slug} />
      ))}
    </ul>
  ) : (
    <Empty>Ain't no videos</Empty>
  );
};

// Default
// ----------------------------------------------------------------------------

export default function Videos() {
  return (
    <>
      <PageHeader title="Videos" />
      <VideoList />
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      PageTitle: "Videos"
    }
  };
}
