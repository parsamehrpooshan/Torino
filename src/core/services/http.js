import QueryString from "qs";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const serverFetch = async (
  endpoint,
  query,
  options = { cache: "force-cache" }
) => {
  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_BASE_URL is not configured.");
    return false;
  }

  let url = BASE_URL;

  if (endpoint) {
    url += endpoint;
  }

  if (query && Object.keys(query).length > 0) {
    const queryString = QueryString.stringify(query);
    if (queryString) {
      url += `${url.includes("?") ? "&" : "?"}${queryString}`;
    }
  }

  try {
    const response = await fetch(url, options);

    // Keep the existing return contract: callers receive the parsed API
    // payload, including for non-2xx responses when the server returns JSON.
    const responseText = await response.text();

    if (!responseText) {
      return false;
    }

    try {
      const data = JSON.parse(responseText);

      if (!response.ok) {
        return data;
      }

      return data;
    } catch {
      return false;
    }
  } catch {
    // Network errors and fetch failures retain the previous `false` fallback.
    return false;
  }
};

export { serverFetch };
