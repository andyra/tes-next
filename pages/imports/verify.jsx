import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";
import ClientOnly from "components/ClientOnly";
import { getTrackType } from "helpers/index";

// Page
// ----------------------------------------------------------------------------

const AlbumData = ({ albums, episodes }) => {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold">Albums</h2>
        {albums.map(album => (
          <>
            <div>{album.slug}</div>
            <ol className="list list-decimal pl-48">
              {album.albumTracklist.map(track => (
                <li>
                  <ul className="pl-16">
                    {getTrackType(track) === "song" ? (
                      <>
                        <li>
                          <strong>song</strong>:{" "}
                          {track.song && track.song.length > 0 ? (
                            track.song[0].slug
                          ) : (
                            <mark>HELPME: album {album.slug} Song Link</mark>
                          )}
                        </li>
                        <li>
                          <strong>audioFile</strong>:{" "}
                          {track.audioFile && track.audioFile.length > 0 ? (
                            <Link href={track.audioFile[0].url}>
                              <a className="text-blue-500">
                                {track.audioFile[0].url}
                              </a>
                            </Link>
                          ) : (
                            <mark>HELPME: album {album.slug} Song Audio</mark>
                          )}
                        </li>
                      </>
                    ) : getTrackType(track) === "coverSong" ? (
                      <>
                        <li>
                          <strong>songTitle</strong>:{" "}
                          {track.songTitle ? (
                            track.songTitle
                          ) : (
                            <mark>
                              HELPME: album {album.slug} Cover Song Title
                            </mark>
                          )}
                        </li>
                        <li>
                          <strong>audioFile</strong>:{" "}
                          {track.audioFile && track.audioFile.length > 0 ? (
                            <Link href={track.audioFile[0].url}>
                              <a className="text-blue-500">
                                {track.audioFile[0].url}
                              </a>
                            </Link>
                          ) : (
                            <mark>
                              HELPME: album {album.slug} Cover Song Audio
                            </mark>
                          )}
                        </li>
                      </>
                    ) : getTrackType(track) === "segment" ? (
                      <>
                        <li>
                          <strong>description</strong>:{" "}
                          {track.description ? (
                            track.description
                          ) : (
                            <mark>
                              HELPME: album {album.slug} Segment Description
                            </mark>
                          )}
                        </li>
                        <li>
                          <strong>audioFile</strong>:{" "}
                          {track.audioFile && track.audioFile.length > 0 ? (
                            <Link href={track.audioFile[0].url}>
                              <a className="text-blue-500">
                                {track.audioFile[0].url}
                              </a>
                            </Link>
                          ) : (
                            <mark>
                              HELPME: album {album.slug} Cover Song Audio
                            </mark>
                          )}
                        </li>
                      </>
                    ) : (
                      <li className="bg-red-500">
                        <strong>Missing Track type</strong>
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </>
        ))}
      </section>
      <section>
        <h2 className="text-2xl font-bold">Episodes</h2>
        {episodes.map(episode => (
          <>
            <div>{episode.slug}</div>
            <ol className="list list-decimal pl-48">
              {episode.episodeTracklist.map(track => (
                <li>
                  <ul className="pl-16">
                    {getTrackType(track) === "song" ? (
                      <>
                        <li>
                          <strong>song</strong>:{" "}
                          {track.song && track.song.length > 0 ? (
                            track.song[0].slug
                          ) : (
                            <mark>
                              HELPME: episode {episode.slug} Song Link
                            </mark>
                          )}
                        </li>
                        <li>
                          <strong>audioFile</strong>:{" "}
                          {track.audioFile && track.audioFile.length > 0 ? (
                            <Link href={track.audioFile[0].url}>
                              <a className="text-blue-500">
                                {track.audioFile[0].url}
                              </a>
                            </Link>
                          ) : (
                            <mark>
                              HELPME: episode {episode.slug} Song Audio
                            </mark>
                          )}
                        </li>
                      </>
                    ) : getTrackType(track) === "coverSong" ? (
                      <>
                        <li>
                          <strong>songTitle</strong>:{" "}
                          {track.songTitle ? (
                            track.songTitle
                          ) : (
                            <mark>
                              HELPME: episode {episode.slug} Cover Song Title
                            </mark>
                          )}
                        </li>
                        <li>
                          <strong>audioFile</strong>:{" "}
                          {track.audioFile && track.audioFile.length > 0 ? (
                            <Link href={track.audioFile[0].url}>
                              <a className="text-blue-500">
                                {track.audioFile[0].url}
                              </a>
                            </Link>
                          ) : (
                            <mark>
                              HELPME: episode {episode.slug} Cover Song Audio
                            </mark>
                          )}
                        </li>
                      </>
                    ) : getTrackType(track) === "segment" ? (
                      <>
                        <li>
                          <strong>description</strong>:{" "}
                          {track.description ? (
                            track.description
                          ) : (
                            <mark>
                              HELPME: episode {episode.slug} Segment Description
                            </mark>
                          )}
                        </li>
                        <li>
                          <strong>audioFile</strong>:{" "}
                          {track.audioFile && track.audioFile.length > 0 ? (
                            <Link href={track.audioFile[0].url}>
                              <a className="text-blue-500">
                                {track.audioFile[0].url}
                              </a>
                            </Link>
                          ) : (
                            <mark>
                              HELPME: episode {episode.slug} Cover Song Audio
                            </mark>
                          )}
                        </li>
                      </>
                    ) : (
                      <li className="bg-red-500">
                        <strong>Missing Track type</strong>
                      </li>
                    )}
                  </ul>
                </li>
              ))}
            </ol>
          </>
        ))}
      </section>
    </>
  );
};

export default AlbumData;

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Entries {
        episodes: entries(section: "episodes", orderBy: "releaseDate DESC") {
          slug
          title
          uri
          ... on episodes_default_Entry {
            companionAlbum {
              slug
              title
              ... on albums_default_Entry {
                albumCoverArt {
                  url
                }
              }
            }
            description
            episodeAudio {
              url
            }
            episodeCoverArt {
              url
            }
            episodeTracklist {
              ... on episodeTracklist_song_BlockType {
                song {
                  slug
                  title
                  uri
                }
                audioFile {
                  url
                }
              }
              ... on episodeTracklist_segment_BlockType {
                description
                audioFile {
                  url
                }
              }
              ... on episodeTracklist_coverSong_BlockType {
                songTitle
                audioFile {
                  url
                }
              }
            }
            releaseDate
          }
        }
        albums: entries(section: "albums", orderBy: "releaseDate DESC") {
          id
          slug
          title
          uri
          ... on albums_default_Entry {
            albumCoverArt {
              url
            }
            albumType
            artist {
              slug
              title
            }
            releaseDate
            albumTracklist {
              ... on albumTracklist_song_BlockType {
                song {
                  slug
                  title
                  uri
                }
                audioFile {
                  url
                }
              }
              ... on albumTracklist_segment_BlockType {
                description
                audioFile {
                  url
                }
              }
              ... on albumTracklist_coverSong_BlockType {
                songTitle
                audioFile {
                  url
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    props: {
      PageTitle: "Verify Collections",
      albums: data.albums,
      episodes: data.episodes
    }
  };
}
