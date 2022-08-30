export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // https://docs.craftcms.com/api/v3/craft-base-element.html#events
  // New Entry
  // Delete Entry
  // Save Entry

  const eventName = req.body.name;
  const uri = req.body.sender.uri;
  const entryType = uri.split("/")[0];

  console.log("====================");
  console.log(`${eventName} for ${uri}`);

  try {
    // Edit entry
    if (eventName === "afterSave") {
      console.log("--------------------");
      console.log(`Rebuild slug page`);
      await res.revalidate(`/${uri}`);
    }

    // Edit, New, or Delete entry
    if (entryType === "albums") {
      console.log("--------------------");
      console.log(`Rebuild home and albums index`);
      await res.revalidate(`/`);
      await res.revalidate(`/albums`);
      // TODO: Rebuilt specific song slugs
    }
    if (entryType === "episodes") {
      console.log("--------------------");
      console.log(`Rebuild home and episodes index`);
      await res.revalidate(`/`);
      await res.revalidate(`/episodes`);
    }
    if (entryType === "library") {
      console.log("--------------------");
      console.log(`Rebuild library index`);
      await res.revalidate(`/library`);
      // TODO Rebuild category pages
    }
    if (entryType === "songs") {
      console.log("--------------------");
      console.log(`Rebuild songs index`);
      await res.revalidate(`/songs`);
    }
    if (entryType === "videos") {
      console.log("--------------------");
      console.log(`Rebuild videos index`);
      await res.revalidate(`/videos`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
