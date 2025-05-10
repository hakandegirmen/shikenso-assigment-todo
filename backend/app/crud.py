from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

def get_todo_items(db: Session) -> List[models.ToDoItem]:
    return db.query(models.ToDoItem).all()

def create_todo_item(db: Session, todo: schemas.ToDoItemCreate) -> models.ToDoItem:
    db_todo = models.ToDoItem(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todo_item(db: Session, todo_id: int) -> Optional[models.ToDoItem]:
    return db.query(models.ToDoItem).filter(models.ToDoItem.id == todo_id).first()

def update_todo_item(db: Session, todo_id: int, todo: schemas.ToDoItemCreate) -> Optional[models.ToDoItem]:
    db_todo = get_todo_item(db, todo_id)
    if db_todo:
        for key, value in todo.model_dump().items():
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo_item(db: Session, todo_id: int) -> bool:
    db_todo = get_todo_item(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
        return True
    return False