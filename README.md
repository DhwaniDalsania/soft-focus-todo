# Soft Focus To-Do List App

A beautiful, aesthetic To-Do List application built with a modern **MERN Stack** (MongoDB, Express, React, Node.js). It features a soft pastel UI, user authentication, and persistent data storage.

Try it:https://soft-focus-todo.vercel.app/
## ✨ Features

-   **Authentication**: Secure Signup and Login (JSON Web Tokens).
-   **Guest Mode**: Try the app without creating an account (tasks stored locally).
-   **Cloud Persistence**: Logged-in users have their tasks saved to the database.
-   **Profile Management**: View your profile details and sign out.
-   **Task Management**: Add, Edit, Delete, and Toggle completion status.
-   **Responsive Design**: Soft, glassmorphism-inspired UI with Tailwind CSS.

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</p>

### Frontend
- **React (v19)**: Core UI Library
- **Vite**: Build tool & Development Server
- **Tailwind CSS (v4)**: Utility-first CSS framework
- **Axios**: HTTP Client

### Backend
- **Node.js**: Runtime Environment
- **Express.js**: Web Framework
- **MongoDB & Mongoose**: Database & ODM
- **JWT (JSON Web Tokens)**: Authentication mechanism

### Deployment
- **Frontend**: Deployed on [Vercel](https://vercel.com)
- **Backend**: Hosted on [Render](https://render.com)

---

## 🚀 Getting Started

To run this application, you need to have **Node.js** and **MongoDB** installed and running on your machine.

### 1. Prerequisites
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Only required for local backend development)

### 2. Installation

**Frontend Setup:**
```bash
# Install frontend dependencies
npm install
```

**Backend Setup (Optional):**
*Only needed if you want to run the server locally.*
```bash
# Go to backend folder
cd backend
npm install
cd ..
```

---

## 🏃‍♂️ Running the Application

You have two options for running the app:

### Option A: Frontend Only (Connects to Deploy Backend)
This is the easiest way. The frontend will automatically connect to the live Render backend.

```bash
# In the root directory
npm run dev
```
*The app will be accessible at `http://localhost:5173`.*

### Option B: Full Stack Local Development
Run both the backend and frontend locally. ensuring you have a local `.env` file in the root with `VITE_API_URL=http://localhost:5000` and `frontend` configured to point to it (default fallback).

**Terminal 1: Backend API**
```bash
cd backend
npm start
```

**Terminal 2: Frontend Client**
```bash
# In the root directory
npm run dev
```

---

## 📂 Project Structure

```
todo/
├── backend/            # Express Server & Database Models
│   ├── models/         # Mongoose Schemas (User, Todo)
│   ├── routes/         # API Endpoints (Auth, Todos)
│   └── server.js       # Server Entry Point
├── src/                # React Frontend
│   ├── components/     # UI Components (Auth, etc.)
│   ├── App.jsx         # Main Application Logic
│   └── main.jsx        # React Entry Point
└── README.md           # Documentation
```

## 📝 Usage

1.  **Guest Mode**: Simply start typing tasks. They are saved in your browser (Local Storage) and will be lost if you clear cache or sign in.
2.  **Sign Up**: Create an account to enable cloud syncing.
3.  **Sign In**: Access your tasks from any device connected to this backend.
4.  **Profile**: Click your Avatar in the top right to view details or Sign Out.

---

## 📄 License
This project is open-source and free to use.
