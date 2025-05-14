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
- Node.js 18.13.0 or higher
- npm 9.0.0 or higher
- Angular CLI 19.2.11

You can check your versions with:

```bash
node --version
npm --version
ng version
```

## Project Structure

```bash
├── backend/
│   ├── app/
│   │   ├── models/      # Database models
│   │   ├── schemas/     # Pydantic schemas
│   │   └── routes/      # API endpoints
│   ├── tests/           # Backend tests
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/  # Angular components
    │   │   ├── services/    # API services
    │   │   └── models/      # TypeScript interfaces
    │   └── assets/
    ├── package.json
    └── tailwind.config.js
```

## Future Improvements

1. Testing

   - Add comprehensive unit tests for frontend components
   - Implement integration tests for API interactions
   - Add end-to-end testing

2. Features

   - User authentication and multiple user support
   - Categories/Tags for todos
   - Priority levels
   - Due date notifications
   - Bulk actions (delete, complete)

3. Technical Improvements
   - State management solution (NgRx/RxJS)
   - Offline support
   - Performance optimizations
   - Docker containerization

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
uvicorn app.main:app --reload
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
npm run start
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
