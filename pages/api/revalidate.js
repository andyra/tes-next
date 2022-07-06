export default async function handler(req, res) {
  // Check for POST request
  if (req.method !== "POST") {
    res
      .status(400)
      .json({ error: "Invalid HTTP method. Only POST requests allowed." });
  }

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Check that body is not empty
  const body = req.body;
  if (!body) {
    res.status(400).send("Bad request (no body)");
  }

  // Get the slug to revalidate from the body
  const revalidatePath = body.sender.uri;

  try {
    console.log(`Revalidate ${revalidatePath}`);
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(`/${revalidatePath}`);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
