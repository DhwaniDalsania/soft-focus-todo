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
</p>

---

## 🚀 Getting Started

To run this application, you need to have **Node.js** and **MongoDB** installed and running on your machine.

### 1. Prerequisites
-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Running locally on default port 27017)

### 2. Installation

**Frontend Setup:**
```bash
# Install frontend dependencies
npm install
```

**Backend Setup:**
```bash
# Go to backend folder
cd backend

# Install backend dependencies
npm install

# Return to root
cd ..
```

---

## 🏃‍♂️ Running the Application

You need to run **two terminals** simultaneously: one for the Backend and one for the Frontend.

### Terminal 1: Backend API
```bash
cd backend
npm start
```
*You should see "Server running on port 5000" and "MongoDB connected".*

### Terminal 2: Frontend Client
```bash
# In the root directory
npm run dev
```
*The app will be accessible at `http://localhost:5173` (or similar).*

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
