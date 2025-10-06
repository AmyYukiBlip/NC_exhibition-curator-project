# My App

A web application in React + Vite, showcasing artwork from two public museum APIs.

## Packages & Frameworks

Run NPM Install to download latest packages used:

- MUI Material (@mui/material: ^7.3.2) – UI components for search bar, filtering, and layout
- MUI Icons (@mui/icons-material) – Icon set for buttons and UI elements
- React Router (react-router-dom: ^7.9.1) – Page navigation and routing
- Axios (axios: ^1.12.2) – Promise-based HTTP client for API requests
- Netlify CLI – Local development and deployment support for Netlify Functions

### Netlify Function (Proxying the Met Museum API)
The Met Museum API does not support CORS, which means it cannot be accessed directly from the browser. To solve this, the app uses a Netlify Function as a server-side proxy.

What the function does:
- Accepts a request from the frontend with an artwork ID
- Fetches artwork details from the Met Museum API server-side
- Returns the data to the frontend without triggering CORS errors

The function lives in: 

```/netlify/functions/met.js```

### Deployment
When deployed to Netlify, the function is automatically included and accessible via:

```/.netlify/functions/met?id=123```

## Clone this project

If you would like to clone this project locally, please fork this repo on GitHub: [  ]

Make sure you install all required dependencies with `npm install`

Build the project via vite with `npm run build`

Run the app and netlify function locally with ```netlify dev```

---

### Versions Needed

To run this project please ensure you're using **Node ^v24.8.0**
