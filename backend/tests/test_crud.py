from app import crud
from app.schemas import ToDoItemCreate
from datetime import datetime

def test_create_todo(db, sample_todo_data):
    todo = ToDoItemCreate(**sample_todo_data)
    db_todo = crud.create_todo_item(db, todo)
    assert db_todo.title == sample_todo_data["title"]
    assert db_todo.description == sample_todo_data["description"]
    assert db_todo.completed == sample_todo_data["completed"]

def test_get_todo(db, sample_todo_data):
    # Create a todo first
    todo = ToDoItemCreate(**sample_todo_data)
    db_todo = crud.create_todo_item(db, todo)
    
    # Test getting the todo
    retrieved_todo = crud.get_todo_item(db, db_todo.id)
    assert retrieved_todo is not None
    assert retrieved_todo.title == sample_todo_data["title"]

def test_get_all_todos(db, sample_todo_data):
    # Create multiple todos
    todo1 = ToDoItemCreate(**sample_todo_data)
    todo2 = ToDoItemCreate(title="Second Todo", description="Another test", completed=True)
    
    crud.create_todo_item(db, todo1)
    crud.create_todo_item(db, todo2)
    
    todos = crud.get_todo_items(db)
    assert len(todos) == 2
    assert todos[0].title == sample_todo_data["title"]
    assert todos[1].title == "Second Todo"

def test_update_todo(db, sample_todo_data):
    # Create a todo first
    todo = ToDoItemCreate(**sample_todo_data)
    db_todo = crud.create_todo_item(db, todo)
    
    # Update the todo
    updated_data = ToDoItemCreate(
        title="Updated Todo",
        description="Updated Description",
        completed=True
    )
    
    updated_todo = crud.update_todo_item(db, db_todo.id, updated_data)
    assert updated_todo.title == "Updated Todo"
    assert updated_todo.completed == True

def test_delete_todo(db, sample_todo_data):
    # Create a todo first
    todo = ToDoItemCreate(**sample_todo_data)
    db_todo = crud.create_todo_item(db, todo)
    
    # Delete the todo
    success = crud.delete_todo_item(db, db_todo.id)
    assert success == True
    
    # Verify it's deleted
    deleted_todo = crud.get_todo_item(db, db_todo.id)
    assert deleted_todo is None