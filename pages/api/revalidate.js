import { gql } from "@apollo/client";
import client from "../../apollo-client";

// https://docs.craftcms.com/api/v4/craft-base-element.html#public-methods
export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const eventName = req.body.name;
  const url = req.body.sender.ref;
  const entryType = url.split("/")[0];

  const hasEntryPage =
    ["afterPropagate", "afterDelete"].includes(eventName) &&
    !["artists", "setlistComputor", "timeline"].includes(entryType);

  try {
    // All entry types: rebuild entry when creating, editing, or deleting
    if (hasEntryPage) {
      await res.revalidate(`/${url}`);
    }

    if (entryType === "albums") {
      await res.revalidate(`/`);
      await res.revalidate(`/albums`);
    }

    if (entryType === "episodes") {
      await res.revalidate(`/`);
      await res.revalidate(`/episodes`);
    }

    if (entryType === "library") {
      await res.revalidate(`/library`);

      // Fetch and rebuild all categories
      const { data } = await client.query({
        query: gql`
          query Category {
            categories(group: "library", level: 1) {
              slug
              url
            }
          }
        `,
      });

      if (!data.categories) {
        throw new Error(
          `Failed to fetch Library categories, received status ${data.error}`
        );
      }

      for (const category of data.categories) {
        await res.revalidate(`/${category.url}`);
      }
    }

    if (entryType === "artists") {
      await res.revalidate(`/albums`);
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

    if (entryType === "setlistComputor") {
      await res.revalidate(`/setlist`);
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
