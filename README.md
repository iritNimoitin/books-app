# Books App – TDD Assignment

This project is a simple React-based Book Management App built for a technical home assignment. It demonstrates principles of clean code, state management with MobX, async data fetching, and test-driven development (TDD) using Jest.

---

## Features

- View all books or only private books
- Add a random book (added as private)
- Display error messages and confirmation messages to the user
- Display total number of private books
- Persistent filter state using `localStorage`
- Full test coverage using Jest

---

## Prerequisites

This project requires Node.js version 16.x in order to run properly.
Versions above 16 (like Node 18 or 20) might cause conflicts with react-scripts and jest.

```bash
nvm use 16
```

If you don’t have it installed:
```bash
nvm install 16
```

## Tech Stack

- **React 16.8**
- **MobX 6** for state management
- **Jest** for unit testing
- **Plain CSS** for basic styling

---

## Project Structure

```
src/
├── App.jsx                # Main app entry
├── Books/
│   ├── Books.controller.js  # MobX controller
│   ├── Books.repository.js  # API gateway logic
│   ├── Books.view.jsx       # UI component
│   ├── Books.mock.js        # Random mock book generator
│   └── Books.test.js        # Full test suite
├── Shared/
│   └── ApiGateway.js        # Shared HTTP abstraction
├── styles.css            # Basic CSS
```

---

## Running Tests

Make sure you have installed all dependencies:

```bash
npm install
```

Then run tests:

```bash
npm test
```

---

## Build & Run

To start the app locally:

```bash
npm start
```

To build for production:

```bash
npm run build
```

---

