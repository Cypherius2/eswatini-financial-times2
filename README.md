# Eswatini Financial Times

A comprehensive financial news platform for Eswatini, built with modern web technologies.

## Project Structure

```text
.
├── .gitignore               # Git ignore rules
├── createsetup.sh           # Script to generate setup.sh and .gitignore
├── package.json             # Root scripts for multi-app dev/build
├── README.md                # Project documentation
├── setup.sh                 # Setup script for installing dependencies
├── admin-dashboard/         # Admin dashboard (React + Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js           # Main app entry (JS/JSX)
│       ├── main.js          # Vite entry point
│       ├── components/      # Shared UI components (Sidebar, Header, Layout)
│       ├── context/         # React context (Auth, etc.)
│       ├── pages/           # Dashboard, Articles, Users, Categories, Tags, Media, Settings, Login
│       └── styles/          # CSS for dashboard
├── client/                  # Public website (React + Vite)
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js           # Main app entry (JS/JSX)
│       ├── main.jsx         # Vite entry point
│       ├── components/      # Shared UI components (Header, Footer, ArticleGrid, etc.)
│       ├── context/         # React context (ArticleContext, etc.)
│       ├── pages/           # Home, News, Business, Economy, Markets, Banking, Technology, Opinion, About, Contact, Subscription, Article, Category, Search, NotFound
│       └── styles/          # CSS for client site
├── server/                  # Node.js/Express backend API
│   ├── package.json
│   ├── server.js            # Main Express server entry
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── controllers/         # Route controllers (articleController.js, userController.js, etc.)
│   ├── middleware/          # Express middleware (auth, error handling, etc.)
│   ├── models/              # Mongoose models (Article.js, User.js, Category.js, Subscription.js, Page.js)
│   ├── routes/              # API route definitions (auth.js, articles.js, categories.js, users.js, etc.)
│   └── uploads/             # Uploaded media files (images, etc.)
```

### Key Folders

- **client/**: The main user-facing React app. Contains all UI pages, components, and styles for the public site.
- **admin-dashboard/**: The admin interface for managing articles, users, categories, tags, media, and site settings.
- **server/**: The backend API built with Express and MongoDB. Handles authentication, CRUD operations, and file uploads.

### How to Use

- **Setup**: Run `./setup.sh` to install dependencies for all apps and create necessary folders.
- **Development**: Use `npm run dev` from the root to start client, server, and admin dashboard in parallel.
- **Build**: Use `npm run build` to build client and admin dashboard for production.
- **Start Server**: Use `npm run start` to run the backend API.

### Additional Notes

- **Environment Variables**: Configure your MongoDB URI and other secrets in `.env`.
- **Uploads**: Media files are stored in `server/uploads/` (with `.gitkeep` to keep the folder in git).
- **Styling**: Each app has its own styles folder for CSS.

---

For more details, see the documentation in each subfolder and the comments in source files.