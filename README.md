# Employee Task Management System

A full stack web application for managing employees, assigning tasks, and tracking productivity through an admin dashboard.

## 🌐 Live Demo
- **Frontend:** https://employee-task-manager-ten.vercel.app
- **Backend API:** https://employee-task-manager-backend-m1nh.onrender.com

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Deployment
- Backend → Render
- Frontend → Vercel
- Database → Render PostgreSQL

## 👥 User Roles

### Admin Can:
- Manage employees (Add, Edit, Delete)
- Create and assign tasks
- View all tasks and update status
- View dashboard analytics

### Employee Can:
- Login to their account
- View assigned tasks
- Update task status

## 📋 Features
- JWT based authentication and authorization
- Role based access control (Admin / Employee)
- Employee CRUD operations
- Task creation and assignment
- Task status tracking (Pending → In Progress → Completed)
- Admin dashboard with live statistics
- Responsive UI with Tailwind CSS

## 🗄️ Database Tables
- **users** — stores login credentials and roles
- **employees** — stores employee details
- **tasks** — stores tasks with priority, status and assignments

## 🚀 How to Run Locally

### Prerequisites
- Node.js installed
- PostgreSQL installed

### Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the backend folder:
```
PORT=5000
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/employee_db
JWT_SECRET=yoursecretkey
```
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 📁 Project Structure