export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // https://docs.craftcms.com/api/v4/craft-base-element.html#public-methods
  // New Entry
  // Delete Entry
  // Save Entry

  const eventName = req.body.name;
  const uri = req.body.sender.uri;
  const entryType = uri.split("/")[0];

  console.log("==================================================");
  console.log(`URL: ${uri}`);
  console.log(`eventName: ${eventName}`);
  console.log(`entryType: ${entryType}`);

  try {
    // Create any new entry or Edit any existing entry
    if (eventName === "afterPropagate" || eventName === "afterDelete") {
      console.log("revalidate: /uri");
      await res.revalidate(`/${uri}`);
    }

    // Edit, New, or Delete entries
    if (entryType === "albums") {
      console.log("revalidate: /");
      console.log("revalidate: /albums");
      await res.revalidate(`/`);
      await res.revalidate(`/albums`);
      // TODO: Rebuilt specific song slugs
    }
    if (entryType === "episodes") {
      console.log("revalidate: /");
      console.log("revalidate: /episodes");
      await res.revalidate(`/`);
      await res.revalidate(`/episodes`);
    }
    if (entryType === "library") {
      console.log("revalidate: /library");
      await res.revalidate(`/library`);
      // TODO Rebuild category pages
    }
    if (entryType === "songs") {
      console.log("revalidate: /songs");
      await res.revalidate(`/songs`);

      // If either the title or the slug have changed, we need to rebuild anything that might link to them :()
      // req.body.sender.title
      // req.body.sender.slug
    }
    if (entryType === "videos") {
      console.log("revalidate: video");
      await res.revalidate(`/videos`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
