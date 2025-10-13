# 🖼️ NC Exhibition Curator Project 🖼️

A web application built with **React** + **Vite**, allowing users to search, filter and explore artworks from multiple museum APIs.

Users can also:
- view more info on the artwork with a modal 
- view even more info with the museum URLs tailored to each artwork
- add/remove artwork in a temporary collection
- create an exhibition page from the temporary collection, adding a custom title & description



## 📦 Tech Stack & Packages

- **React** – Frontend library
- **Vite** – Development & build tool
- **Vitest** - Unit test framework powered by Vite (requires Vite >=v3.0.0 and Node >=v14.18)
- **@testing-library/react** - Render & test React components in a simulated DOM environment (via jsdom) and query for elements (e.g. screen.getByText).
- **@mui/material** (^7.3.2) – UI components for search bar, filtering, and layout
- **@mui/icons-material** – Icon set for UI elements
- **react-router-dom** (^7.9.1) – Client-side routing and navigation


## 🔗 APIs Used

- V&A (Victoria and Albert Museum)
- AIC (The Art Institute of Chicago)

This app fetches and displays data using IIIF-compliant image endpoints and normalises fields for consistent UI rendering.

## 🚀 Clone this project

If you would like to clone this project locally, please fork this repo on GitHub: https://github.com/AmyYukiBlip/NC_exhibition-curator-project

Make sure you install all required dependencies with ```npm install```

Run the app with ```npm run dev```

Build the project via vite with ```npm run build```

### Versions Needed

- Node.js: ^v20 or ^v24.8.0
- npm: Comes with Node.js



