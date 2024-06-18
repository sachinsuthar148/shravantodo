
## API Endpoints

### User Authentication

#### Sign Up

- **Endpoint**: `POST /api/auth/signup`
- **Headers**: `Content-Type: application/json`
- **Body**:
    ```json
    {
      "username": "testuser",
      "email": "testuser@example.com",
      "password": "testpassword"
    }
    ```
- **Response**:
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "id": "user_id",
        "username": "testuser",
        "email": "testuser@example.com"
      }
    }
    ```

#### Log In

- **Endpoint**: `POST /api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```
- **Response**:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

### Todo Management

#### Create Todo

- **Endpoint**: `POST /api/todos`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer your_jwt_token`
- **Body**:
    ```json
    {
      "title": "Sample Todo",
      "description": "This is a sample todo",
      "tags": ["sample", "todo"]
    }
    ```
- **Response**:
    ```json
    {
      "id": "todo_id",
      "title": "Sample Todo",
      "description": "This is a sample todo",
      "tags": ["sample", "todo"],
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
    ```

#### Get All Todos

- **Endpoint**: `GET /api/todos`
- **Headers**: `Authorization: Bearer your_jwt_token`
- **Query Params**: 
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of todos per page.
- **Response**:
    ```json
    {
      "todos": [
        {
          "id": "todo_id",
          "title": "Sample Todo",
          "description": "This is a sample todo",
          "tags": ["sample", "todo"],
          "user": "user_id",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalTodos": 1
      }
    }
    ```

#### Get Single Todo

- **Endpoint**: `GET /api/todos/:id`
- **Headers**: `Authorization: Bearer your_jwt_token`
- **Response**:
    ```json
    {
      "id": "todo_id",
      "title": "Sample Todo",
      "description": "This is a sample todo",
      "tags": ["sample", "todo"],
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
    ```

#### Update Todo

- **Endpoint**: `PUT /api/todos/:id`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer your_jwt_token`
- **Body** (any fields you want to update):
    ```json
    {
      "title": "Updated Todo",
      "description": "This is an updated todo",
      "tags": ["updated", "todo"]
    }
    ```
- **Response**:
    ```json
    {
      "id": "todo_id",
      "title": "Updated Todo",
      "description": "This is an updated todo",
      "tags": ["updated", "todo"],
      "user": "user_id",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
    ```

#### Delete Todo

- **Endpoint**: `DELETE /api/todos/:id`
- **Headers**: `Authorization: Bearer your_jwt_token`
- **Response**:
    ```json
    {
      "message": "Todo removed"
    }
    ```

#### Search Todos

- **Endpoint**: `GET /api/todos/search`
- **Headers**: `Authorization: Bearer your_jwt_token`
- **Query Params**: 
  - `query`: Search string to filter todos.
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of todos per page.
- **Response**:
    ```json
    {
      "todos": [
        {
          "id": "todo_id",
          "title": "Sample Todo",
          "description": "This is a sample todo",
          "tags": ["sample", "todo"],
          "user": "user_id",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalTodos": 1
      }
    }
    ```
