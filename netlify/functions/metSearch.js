// Proxy Met API search endpoint to resolve CORS issue

export async function handler(event) {
    const query = event.queryStringParameters?.q;
    if (!query) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing search query" }),
      };
    }
  
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}&hasImages=true`)
      .then((res) => {
        if (!res.ok) {
          return {
            statusCode: res.status,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: `Met API error ${res.status}` }),
          };
        }
        return res.json().then((data) => ({
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }));
      })
      .catch((err) => ({
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: err.message }),
      }));
  }
  