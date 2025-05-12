# Todo List Management System

A simple todo list application built with FastAPI (backend) and Angular (frontend) that allows users to manage their tasks efficiently.

## Features

- Create, edit, and delete todo items
- Mark todos as complete/incomplete
- Filter between completed and open tasks
- Search todos by title
- Sort by due date
- Form validation for required fields

## Prerequisites

- Python 3.8+
- Node.js & npm
- Angular CLI

## Setup & Running

### Backend

1. Navigate to backend directory and create virtual environment:

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

2. Install dependencies and run server:

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run at `http://localhost:8000`

### Running Backend Tests

From the backend directory with your virtual environment activated:

```bash
# Run all tests
pytest

# Run tests with detailed output
pytest -v

# Run tests and show coverage report
pytest --cov=app
```

### Frontend

1. Navigate to frontend directory and install dependencies:

```bash
cd frontend
npm install
```

2. Run the application:

```bash
ng serve
```

Frontend will run at `http://localhost:4200`

## API Documentation

FastAPI provides automatic interactive API documentation. Once the backend server is running, you can access:

- Swagger UI: `http://localhost:8000/docs`

  - Interactive documentation where you can try out the API endpoints directly
  - Shows request/response schemas and examples

- ReDoc: `http://localhost:8000/redoc`
  - Alternative documentation view
  - Better for reading and understanding the API structure

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo

## Data Model

Todo Item:

- `id`: Unique identifier
- `title`: Task title (required)
- `description`: Task description (optional)
- `completed`: Completion status
- `due_date`: Due date (optional)

## Technologies Used

- Backend: FastAPI, SQLAlchemy, SQLite
- Frontend: Angular, Tailwind CSS, ng-icons
