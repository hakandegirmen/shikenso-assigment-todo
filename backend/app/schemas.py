from pydantic import BaseModel, ConfigDict, constr
from datetime import datetime, timezone
from typing import Optional

class ToDoItemBase(BaseModel):
    title: constr(min_length=1)
    description: Optional[str] = None
    completed: bool = False
    due_date: Optional[datetime] = None

    model_config = ConfigDict(
        json_encoders={
            datetime: lambda v: v.replace(tzinfo=timezone.utc).isoformat() if v else None
        }
    )

class ToDoItemCreate(ToDoItemBase):
    pass

class ToDoItem(ToDoItemBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
