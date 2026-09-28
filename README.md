
# Fundoo Frontend

The frontend application for Fundoo, a full-stack note-taking application inspired by Google Keep. It provides a user-friendly interface for managing notes, labels, collaborators, and reminders.

## Related Repositories

- **Frontend:** https://github.com/GauravMittal2712/Fundoo_Frontend_IN_MERN_Stack.git
- **Backend:** https://github.com/GauravMittal2712/Fundoo_Backend_IN_MERN_Stack.git

## Tech Stack

- React
- JavaScript
- Vite
- HTML5
- CSS3
- Axios or Fetch API for HTTP requests (depending on implementation)

## Features

- User registration and login
- User authentication
- Create, view, edit, and delete notes
- Labels management
- Collaborators
- Reminders
- Integration with backend REST APIs

## Project Structure

```text
Fundoo_Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .env.example
├── .gitignore
└── README.md
```

Note: The structure above is illustrative. Your actual files and folders may differ.

## Prerequisites

- Node.js
- npm
- Git

## Installation

### 1. Clone the frontend repository

```bash
git clone https://github.com/YOUR_USERNAME/Fundoo-Frontend.git
```

### 2. Navigate to the project folder

```bash
cd Fundoo-Frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

If your frontend uses environment variables, create a local `.env` file using `.env.example` as a reference.

For Vite, frontend environment variables exposed to browser code generally use the `VITE_` prefix.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Use the actual backend URL and port configured in your project. Never put private secrets in frontend environment variables.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, typically:

```text
http://localhost:5173
```

## Backend Integration

The frontend communicates with the Fundoo backend through HTTP requests to REST API endpoints.

Backend repository:
https://github.com/YOUR_USERNAME/Fundoo-Backend

Ensure the backend server is running, the API base URL is configured correctly, and CORS allows requests from the frontend origin.

## Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Author

YOUR NAME

## License

This project is for learning and demonstration purposes.
```

## Before pushing to GitHub

1. Replace `YOUR_USERNAME` with your GitHub username.
2. Replace `YOUR NAME` with your name.
3. Verify the backend repository link.
4. Adjust the project structure section to match your actual frontend folders.
5. Ensure `.env` and `node_modules/` are not uploaded.

Once saved, your frontend repository will clearly explain what the project does and direct visitors to the related backend repository.