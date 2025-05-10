from fastapi.testclient import TestClient
from app.main import app

def test_create_todo(client, sample_todo_data):
    response = client.post("/todos/", json=sample_todo_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == sample_todo_data["title"]
    assert data["description"] == sample_todo_data["description"]
    assert "id" in data

def test_read_todos(client, sample_todo_data):
    # Create a todo first
    client.post("/todos/", json=sample_todo_data)
    
    response = client.get("/todos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["title"] == sample_todo_data["title"]

def test_read_todo(client, sample_todo_data):
    # Create a todo first
    create_response = client.post("/todos/", json=sample_todo_data)
    todo_id = create_response.json()["id"]
    
    response = client.get(f"/todos/{todo_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == sample_todo_data["title"]

def test_update_todo(client, sample_todo_data):
    # Create a todo first
    create_response = client.post("/todos/", json=sample_todo_data)
    todo_id = create_response.json()["id"]
    
    updated_data = {
        "title": "Updated Todo",
        "description": "Updated Description",
        "completed": True
    }
    
    response = client.put(f"/todos/{todo_id}", json=updated_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == updated_data["title"]
    assert data["completed"] == updated_data["completed"]

def test_delete_todo(client, sample_todo_data):
    # Create a todo first
    create_response = client.post("/todos/", json=sample_todo_data)
    todo_id = create_response.json()["id"]
    
    # Delete the todo
    response = client.delete(f"/todos/{todo_id}")
    assert response.status_code == 200
    
    # Verify it's deleted
    get_response = client.get(f"/todos/{todo_id}")
    assert get_response.status_code == 404

# Invalid data tests

def test_read_invalid_todo(client):
    response = client.get("/todos/999")  # Non-existent ID
    assert response.status_code == 404

def test_create_invalid_todo(client):
    invalid_data = {
        "title": "",  # Empty title should be invalid
        "completed": False
    }
    response = client.post("/todos/", json=invalid_data)
    assert response.status_code == 422  # Validation error


def test_create_todo_missing_title(client):
    response = client.post("/todos/", json={
        "description": "Test Description",
        "completed": False
    })
    assert response.status_code == 422

def test_create_todo_invalid_date_format(client):
    response = client.post("/todos/", json={
        "title": "Test Todo",
        "description": "Test Description",
        "completed": False,
        "due_date": "invalid-date"
    })
    assert response.status_code == 422

def test_update_todo_invalid_id(client, sample_todo_data):
    response = client.put("/todos/999", json=sample_todo_data)
    assert response.status_code == 404