export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // https://docs.craftcms.com/api/v4/craft-base-element.html#events
  // New Entry
  // Delete Entry
  // Save Entry

  const eventName = req.body.name;
  const uri = req.body.sender.uri;
  const entryType = uri.split("/")[0];

  try {
    // Edit entry
    if (eventName === "afterSave") {
      await res.revalidate(`/${uri}`);
    }

    // Edit, New, or Delete entry
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
    if (entryType === "timeline") {
      await res.revalidate(`/timeline`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
