# Todo App

A full-stack Todo application built with **React**, **Node.js/Express**, and **MySQL**.

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Set priority levels (low, medium, high)
- Assign due dates with overdue highlighting
- Organize with categories (with color coding)
- Search todos by title or description
- Filter by status, priority, and category
- Sort by date, priority, or title
- Dashboard stats (total, completed, pending, high priority)
- Responsive design

## Project Structure

```
todo/
├── client/          # React frontend
│   └── src/
│       ├── components/   # UI components
│       ├── hooks/        # Custom React hooks
│       └── services/     # API service layer
├── server/          # Node.js/Express backend
│   └── src/
│       ├── config/       # Database config
│       ├── controllers/  # Route handlers
│       ├── models/       # Data models
│       └── routes/       # API routes
└── db/              # Database setup scripts
```

## Prerequisites

- Node.js 18+
- MySQL 8.0+

## Setup

### 1. Database

```bash
mysql -u root < db/setup.sql
```

### 2. Backend

```bash
cd server
npm install
npm run dev
```

The API runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd client
npm install
npm start
```

The app runs on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint                | Description           |
|--------|-------------------------|-----------------------|
| GET    | /api/todos              | List all todos        |
| GET    | /api/todos/stats        | Get todo statistics   |
| GET    | /api/todos/:id          | Get a single todo     |
| POST   | /api/todos              | Create a todo         |
| PUT    | /api/todos/:id          | Update a todo         |
| PATCH  | /api/todos/:id/toggle   | Toggle completion     |
| DELETE | /api/todos/:id          | Delete a todo         |
| GET    | /api/categories         | List all categories   |
| POST   | /api/categories         | Create a category     |
| PUT    | /api/categories/:id     | Update a category     |
| DELETE | /api/categories/:id     | Delete a category     |
| GET    | /api/health             | Health check          |

### Query Parameters (GET /api/todos)

- `search` - Search by title/description
- `priority` - Filter by priority (low, medium, high)
- `completed` - Filter by status (true, false)
- `category_id` - Filter by category
- `sort_by` - Sort field (created_at, due_date, priority, title)
- `order` - Sort order (asc, desc)
