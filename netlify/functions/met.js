// Proxy Met API with Netlify Function (a serverless function) to resolve CORS issue on objectID

export async function handler(event) {
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Missing artwork ID" }),
    };
  }

  return fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  )
    .then((res) => {
      if (!res.ok) {
        return {
          statusCode: res.status,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ error: `Met API error ${res.status}` }),
        };
      }
      return res.json().then((data) => {
        if (
          !data ||
          !data.objectID ||
          (!data.primaryImage && !data.primaryImageSmall)
        ) {
          return {
            statusCode: 204,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(null),
          };
        }
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        };
      });
    })
    .catch((error) => {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Failed to fetch Met artwork",
          details: error.message,
        }),
      };
    });
}
