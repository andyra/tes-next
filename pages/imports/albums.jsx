import ALBUMS from "./data/albums.json";
import SONGS_ID_MAP from "./data/songs-id-map.json";

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-full",
      PageTitle: "Album Data"
    }
  };
}

// Components
// ----------------------------------------------------------------------------

function replaceIds() {
  let jsonString = JSON.stringify(ALBUMS);

  for (const item of SONGS_ID_MAP.data) {
    const { craftId, slug, statamicId } = item;

    let re = new RegExp(statamicId, "g");
    let newJson = jsonString.replace(re, craftId);

    jsonString = newJson;
  }

  // At this point, only the IDs of the songs have been replaced.
  // Original needs slug and ID
  // Cover needs Title
  // Segment needs Title
  // {
  //   "track": {
  //     "slug": "toppy-or-topei",
  //     "title": "Toppy or Topei",
  //     "type": "original",
  //     "id": "1583"
  //   },
  //   "audio_file": "https://thiseveningsshow.s3.amazonaws.com/albums/live-1-1-12/08%20Toppy%20or%20Topei.mp3"
  // },
  // {
  //   "track": {
  //     "slug": "soothsayer-segment",
  //     "title": "Soothsayer Segment",
  //     "type": "segment",
  //     "id": "99083e83-beb0-4b3e-a366-fbf06fbacec4"
  //   },
  //   "audio_file": "https://thiseveningsshow.s3.amazonaws.com/albums/live-1-1-12/09%20Soothsayer%20Segment.mp3"
  // },

  return jsonString;
}

// Page
// ----------------------------------------------------------------------------

const AlbumData = ({}) => {
  return <pre>{replaceIds()}</pre>;
};

export default AlbumData;
