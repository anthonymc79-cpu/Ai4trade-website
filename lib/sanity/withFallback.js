// Fills any field Sanity left empty with the built-in wording, so a blank
// field in the editor never leaves a gap on the website.
export function withFallback(data, fallback) {
  if (data === null || data === undefined || data === "") return fallback;
  if (Array.isArray(fallback)) return Array.isArray(data) && data.length ? data : fallback;
  if (typeof fallback === "object" && fallback !== null) {
    if (typeof data !== "object") return fallback;
    const result = {};
    for (const key of Object.keys(fallback)) {
      result[key] = withFallback(data[key], fallback[key]);
    }
    return result;
  }
  return data;
}
