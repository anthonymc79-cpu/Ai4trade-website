import { createClient } from "next-sanity";

const isDev = process.env.NODE_ENV === "development";

let client;

// Created on first use, inside the try block below, so a missing or
// mistyped project ID can never crash the whole site.
function getClient() {
  if (!client) {
    client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2026-10-01",
      // Live site: Sanity's fast cached CDN. On your computer: always the
      // freshest content, so edits show up on the next refresh.
      useCdn: !isDev,
    });
  }
  return client;
}

// Fetch from Sanity, but never let a Sanity problem take the page down.
// Returns null on failure so the page falls back to its built-in copy.
// `revalidate` = how many seconds the live site may reuse a result.
export async function sanityFetch(query, params = {}, revalidate = 60) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.warn("Sanity: NEXT_PUBLIC_SANITY_PROJECT_ID is not set, using built-in wording");
    return null;
  }
  try {
    return await getClient().fetch(query, params, {
      next: { revalidate: isDev ? 0 : revalidate },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error.message);
    return null;
  }
}
