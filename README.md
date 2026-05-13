# LeaveFlow — Leave Management System

A full-stack Leave Management System built with React, Express.js, PostgreSQL (Neon), and TailwindCSS.

---

## Live Demo

- Frontend: https://leaveflow-frontend-seven.vercel.app/
- Backend API: https://leaveflow-backend-l4wo.onrender.com/api
- API Docs: https://leaveflow-backend-l4wo.onrender.com/api-docs/

---

## Tech Stack

### Frontend

- React (Vite)
- TailwindCSS
- Axios
- React Router
- Lucide Icons
- React Hot Toast

### Backend

- Node.js
- Express.js
- JWT Authentication
- Swagger API Docs
- Helmet
- Express Rate Limit
- bcryptjs
- CORS

### Database

- PostgreSQL (Neon)

---

## Features

### Authentication

- User registration & login
- JWT-based authentication
- Persistent sessions

### Leave Management

- Create leave requests
- View personal leave history
- Status tracking (Pending / Approved / Rejected)

### Admin Panel

- View all requests
- Approve or reject requests
- Role-based access control

### UI/UX

- Modern glassmorphism UI
- Responsive design
- Loading states
- Toast notifications

---

## Roles

- **Employee**
  - Create leave requests
  - View own requests

- **Admin**
  - Manage all leave requests
  - Approve / reject requests

---

## Installation

### Backend

```bash
npm install
npm run dev
```
