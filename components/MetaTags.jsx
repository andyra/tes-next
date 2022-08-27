const MetaTags = ({ props }) => {
  const metaTitle = props.PageTitle
    ? `${props.PageTitle} • TES`
    : "This Evening's Show";
  const metaImage =
    props.metaImage ||
    "https://tesfm.fra1.digitaloceanspaces.com/episodes/this-evenings-show.jpg";

  return (
    <>
      <title>{metaTitle}</title>
      <meta property="og:site_name" content="This Evening's Show" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:image" content={metaImage} />
      {props.metaTypes &&
        metaTypes.map(metaType => (
          <meta property={metaType.type} content={metaType.content} />
        ))}
      {props.metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
    </>
  );
};

export default MetaTags;
