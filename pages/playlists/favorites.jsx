import { gql, useQuery } from "@apollo/client";
import ClientOnly from "../../components/ClientOnly";
import PageTitle from "../../components/PageTitle";

// Components
// ----------------------------------------------------------------------------

// mutation MyMutation($id: ID, $title: String) {
//   save_playlists_favorites_Entry(id: $id, title: $title) {
//     id
//     title
//   }
// }

// Query Variables
// {
//   "id": "12345",
//   "title": "My title update"
// }

// const FavoritesThing = () => {
//   const { data, loading, error } = useQuery(
//     gql`
//       mutation saveEntry($title: String, $slug: String) {
//         save_playlists_favorites_Entry(title: $title, slug: $slug) {
//           title
//           slug
//           dateCreated @formatDateTime (format: "Y-m-d")
//         }
//       }
//     `
//   );

//   if (loading) {
//     return <mark>Loading...</mark>;
//   }

//   if (error) {
//     console.error(error);
//     return null;
//   }

//   return data.entries ? (
//     <ul className="grid grid-cols-3 -mx-8">
//       {data.entries.map(album => (
//         <li key={album.slug}>
//           <Link href={`/albums/${encodeURIComponent(album.slug)}`}>
//             <a className="block hover:bg-hover rounded p-8 transition">
//               {album.albumCoverArt[0].url && (
//                 <Image
//                   alt={`${album.title} cover art`}
//                   src={album.albumCoverArt[0].url}
//                   width={256}
//                   height={256}
//                 />
//               )}
//               <div>{album.title}</div>
//               <NiceDate date={album.releaseDate} className="opacity-50" />
//             </a>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     "Nothing to show"
//   );
// }

// Default
// ----------------------------------------------------------------------------

export default function Favorites() {
  return (
    <>
      <PageTitle>Favorites</PageTitle>
      <ClientOnly>{/*<FavoritesThing />*/}</ClientOnly>
    </>
  );
}

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      pageTitle: "Favorites"
    }
  };
}
