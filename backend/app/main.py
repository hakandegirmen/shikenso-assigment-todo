from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import crud, models, schemas
from .database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/todos/", response_model=List[schemas.ToDoItem])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_todo_items(db)

@app.post("/todos/", response_model=schemas.ToDoItem)
def create_todo(todo: schemas.ToDoItemCreate, db: Session = Depends(get_db)):
    return crud.create_todo_item(db, todo)

@app.get("/todos/{todo_id}", response_model=schemas.ToDoItem)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    db_todo = crud.get_todo_item(db, todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return db_todo

@app.put("/todos/{todo_id}", response_model=schemas.ToDoItem)
def update_todo(todo_id: int, todo: schemas.ToDoItemCreate, db: Session = Depends(get_db)):
    db_todo = crud.update_todo_item(db, todo_id, todo)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return db_todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    success = crud.delete_todo_item(db, todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo item not found")
    return {"message": "Todo item deleted successfully"}