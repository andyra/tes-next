export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // The request should contain the entry being saved.
  // For all entries, build the slug and rebuild the index
  // For albums and episodes, also rebuild the home page
  // For albums, also rebuild each song page featured on the album

  // New Entry
  // • Rebuild index
  // Delete Entry
  // • Rebuilt index
  // Save Entry
  // • Rebuild slug

  const { sectionId, canonicalId, isRevision, uri, slug } = req.body.sender;
  const eventType = req.body.name;
  const entryType = uri.split("/")[0];

  try {
    if (eventType === afterSave) {
      await res.revalidate(`/${uri}`);
    }

    if (entryType === "albums") {
      await res.revalidate(`/`);
      await res.revalidate(`/albums`);
      // TODO: Rebuilt specific song slugs
    }
    if (entryType === "episodes") {
      await res.revalidate(`/`);
      await res.revalidate(`/episodes`);
    }
    if (entryType === "library") {
      await res.revalidate(`/library`);
      // TODO Rebuild category pages
    }
    if (entryType === "songs") {
      await res.revalidate(`/songs`);
    }
    if (entryType === "videos") {
      await res.revalidate(`/videos`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
