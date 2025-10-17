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
- **Vitest** - Unit test framework powered by Vite
- **@testing-library/react** - Test React components in a simulated DOM environment
- **react-router-dom** - Client-side routing and navigation
- **Lighthouse CLI** - Accessibility & audit performance tool
- **@mui/material** - Component library used for layout, forms, modals, and design consistency
- **@mui/icons-material** – Icon set for UI elements
- **Netfify's CLI** - Performing common operations on their hosting service

## 🔗 APIs Used

- V&A (Victoria and Albert Museum)
- AIC (The Art Institute of Chicago)

This app fetches and displays data using IIIF-compliant image endpoints and normalises fields for consistent UI rendering.

## 🚀 Clone this project

If you would like to clone this project locally, please fork this repo on GitHub: https://github.com/AmyYukiBlip/NC_exhibition-curator-project

Next, make sure you install all required dependencies with `npm install`

Then run the app with `npm run dev`

Build the project via vite with `npm run build`

#### Versions Needed

- Node.js: ^v24.8.0
- npm: Comes with Node.js

### Vitest Testing

To run Vitest and see the tests in this repo: `npm run test`

> Vitest provides mocks (vi.mock, vi.fn, etc.) and helpers around running tests, assertions, setting globals. Vitest supports both happy-dom or jsdom for mocking DOM and browser APIs. However, they don't come with Vitest and needed to be installed separately. The environment in the config file is then updated for jsdom. (https://vitest.dev/guide/features.html)

> @testing-library/react is included to be able to render and test React components in the simulated DOM environment (via jsdom) and query for elements (e.g. screen.getByText).

### Lighthouse Accessibility Audit

To run an audit via CLI and see the report in the browser:

First run: `npm run dev`

Next, in a second terminal, run: `lighthouse <dev url> --view`

To see all the options: `lighthouse --help`

