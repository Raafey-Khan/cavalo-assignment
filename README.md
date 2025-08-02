
#  Simple Blog Platform

A full-stack blogging system where users can:
- Register and Login using JWT authentication
- Create, edit, delete their blog posts
- View all blog posts

---

##  Project Structure

```
 simple-blog-platform
├── frontend/      # Next.js + TypeScript + Redux
└── backend/       # Node.js + Express + MongoDB
```

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/simple-blog-platform.git
cd simple-blog-platform
```

---

## 🧩 Backend Setup (`/backend`)

### Prerequisites:
- Node.js installed
- MongoDB running locally or via MongoDB Atlas

### Setup

```bash
cd backend
npm install
```

### Create `.env` File

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your_jwt_secret
```

### Run the Backend Server

```bash
npm run dev
```

Runs at: `http://localhost:5000`

---

## 🔐 Seed User Credentials

Use the following to login:

```
Username: testuser
Password: test123
```

(You can also register a new user via frontend.)

---

##  Frontend Setup (`/frontend`)

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:3000`

The frontend talks to the backend at `http://localhost:5000`. Ensure both servers are running.

---

##  Features

###  Authentication
- Register / Login with JWT token
- Protected dashboard route

###  Blog Features
- Create blog with title, content, image (optional)
- Update or delete your own blogs
- View all blogs on dashboard

### Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Redux Toolkit, TailwindCSS | React Custom Hook
- **Backend**: Express.js, MongoDB, JWT
- **Extras**: React Toastify, Postman, Vercel (optional)


### Sample API Endpoints:
```
POST    /api/auth/register
POST    /api/auth/login
GET     /api/blogs
POST    /api/blogs
PUT     /api/blogs/:id
DELETE  /api/blogs/:id
```

---

##  Requirements Checklist

| Feature                                | 
|----------------------------------------|
| JWT-based login/register               |    
| Blog CRUD operations (REST API)        |     
| MongoDB models for User and Blog       |     
| Redux Toolkit for frontend state       |    
| Next.js pages and routing              |    
| Protected `/dashboard` route           |    
| Seed user credentials in README        |    
| Postman collection included            |    

---



