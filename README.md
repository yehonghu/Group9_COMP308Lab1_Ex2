# COMP308 Lab Assignment #1 - Exercise 2: Game Library Management System

- **Group:** Group 9
- **Members:** Yehong Hu, Larry Yu, Khaleda Islam
- **Project:** `Group9_COMP308Lab1_Ex2`

## 1. Project Overview

This project is a comprehensive Game Library Management System developed using the **MERN stack** (MongoDB, Express.js, React, Node.js). It features a full-fledged REST API for backend operations and a modern, responsive React frontend. A key highlight of this project is the integration of **`three.js`** to create a visually appealing and interactive user interface, including a dynamic 3D background and interactive 3D game cards.

## 2. Features

### 2.1. Backend (Express REST API)

- **MVC Architecture:** Organized and maintainable codebase following the Model-View-Controller pattern.
- **Authentication:** Secure user authentication using **JWT (JSON Web Tokens)** stored in **HTTPOnly cookies**.
- **Database:** MongoDB with Mongoose for data modeling and interaction.
- **API Endpoints:**
    - Full CRUD (Create, Read, Update, Delete) operations for games.
    - User registration and login.
    - Management of personal game collections (adding/removing games).
    - Game search functionality.

### 2.2. Frontend (React)

- **Modern UI:** Built with functional components, React Hooks, and React-Bootstrap.
- **User-Friendly Experience:**
    - User registration and login forms with validation.
    - A gallery to browse all available games with a real-time search filter.
    - A personal collection page to view and manage owned games.
    - Detailed game information modals.
    - Ability for authenticated users to add new games to the library.
- **Enhanced UI with `three.js`:**
    - **Dynamic 3D Background:** An animated particle system and floating geometric shapes create an immersive background across the application.
    - **3D Game Cards:** On the collection page, featured games are displayed as interactive 3D cards that animate on hover, showcasing the potential of WebGL in a web application.

## 3. Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 3.1. Prerequisites

Make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (v7.0 or later recommended)

### 3.2. Installation & Setup

1.  **Clone the repository** or download and unzip the project folder `Group9_COMP308Lab1_Ex2`.

2.  **Setup the Backend Server:**

    ```bash
    # Navigate to the server directory
    cd Group9_COMP308Lab1_Ex2/server

    # Install dependencies
    npm install
    ```

3.  **Setup the Frontend Client:**

    ```bash
    # Navigate to the client directory from the root
    cd ../client

    # Install dependencies
    npm install
    ```

### 3.3. Running the Application

1.  **Start MongoDB:**
    - Ensure your MongoDB server is running. If you installed it as a service, it might start automatically. Otherwise, you may need to start it manually.

2.  **Seed the Database (Optional but Recommended):**
    - To populate the database with some sample game data, run the seed script from the `server` directory.

    ```bash
    # From the /server directory
    node seed.js
    ```

3.  **Start the Backend Server:**

    ```bash
    # From the /server directory
    npm run dev
    ```

    The server will start on `http://localhost:5000`.

4.  **Start the Frontend Client:**

    ```bash
    # From the /client directory
    npm run dev
    ```

    The React development server will start, and your browser should automatically open to `http://localhost:5173`.

## 4. Project Structure

The project is organized into two main parts: `client` and `server`, following a standard MERN stack monorepo structure.

### 4.1. Backend (`/server`)

```
/server
  /config          # Configuration (db, express, etc.)
  /controllers     # Request handling logic (MVC)
  /middleware      # Custom middleware (e.g., auth)
  /models          # Mongoose schemas
  /routes          # API route definitions
  .env             # Environment variables
  package.json     # Dependencies and scripts
  seed.js          # Database seeder script
  server.js        # Main server entry point
```

### 4.2. Frontend (`/client`)

```
/client
  /src
    /components    # Reusable UI components
    /hooks         # Custom React hooks (e.g., useAuth)
    /pages         # Page components
    /services      # API call functions
    /three         # Three.js components
    App.jsx        # Main app component with routing
    main.jsx       # React entry point
  vite.config.js   # Vite configuration (including proxy)
  package.json     # Dependencies and scripts
```

## 5. Submission Details

- **Project Folder Name:** `Group9_COMP308Lab1_Ex2`
- **Submission File Name:** `Group9_COMP308Lab1_Ex2.zip`
- **Note:** The `node_modules` folder must be removed before zipping.
