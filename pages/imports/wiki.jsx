import WIKI_VALIDATED from "./data/wiki-validated.json";
import WIKI_ID_MAP from "./data/wiki-id-map.json";

// Config
// ----------------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      maxWidth: "max-w-full",
      PageTitle: "Wiki Data"
    }
  };
}

// Components
// ----------------------------------------------------------------------------

// Loop through WIKI_ID_MAP. For each item, replace the Statamic link with the
// one from Craft.
// Statamic: {{ link:796cdd38-d02a-4689-97a7-7ef428e59b75 }}
// Craft     {entry:463:url||/library/[slug]}

function replaceIds() {
  let jsonString = JSON.stringify(WIKI_VALIDATED);

  for (const item of WIKI_ID_MAP.data) {
    const { craftId, slug, statamicId } = item;

    let re = new RegExp(`{{ link:${statamicId} }}`, "g");
    let newJson = jsonString.replace(
      re,
      `{entry:${craftId}:url||/library/${slug}}`
    );

    jsonString = newJson;
  }

  return jsonString;
}

// Page
// ----------------------------------------------------------------------------

const WikiData = ({}) => {
  return <pre>{replaceIds()}</pre>;
};

const WIKI_DATA = "dfh";

export default WikiData;
