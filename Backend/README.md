# User Management API Documentation

## Endpoints

### Create User
- **URL:** `/users`
- **Method:** `POST`
- **Description:** Create a new user
- **Required Data:**
```json
{
    "firstName": "string (min 3 characters)",
    "lastName": "string (min 3 characters)",
    "email": "valid email address",
    "department": "string (min 3 characters)"
}
```
- **Success Response:**
  - **Code:** 201
  - **Example:**
```json
{
    "_id": "64f5e21c93f2e123456789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering"
}
```
- **Error Responses:**
  - **Code:** 400 (Bad Request)
  - **Conditions:** Invalid input data or user already exists

### Get All Users
- **URL:** `/users`
- **Method:** `GET`
- **Description:** Retrieve all users
- **Success Response:**
  - **Code:** 200
  - **Example:**
```json
[
    {
        "_id": "64f5e21c93f2e123456789",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "department": "Engineering"
    },
    {
        "_id": "64f5e21c93f2e987654321",
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com",
        "department": "Marketing"
    }
]
```

### Get User by ID
- **URL:** `/users/:id`
- **Method:** `GET`
- **Description:** Retrieve a specific user by ID
- **Success Response:**
  - **Code:** 200
  - **Example:**
```json
{
    "_id": "64f5e21c93f2e123456789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "department": "Engineering"
}
```
- **Error Response:**
  - **Code:** 404 (Not Found)
  - **Condition:** User ID not found

### Update User
- **URL:** `/users/:id`
- **Method:** `PUT`
- **Description:** Update an existing user
- **Required Data:**
```json
{
    "firstName": "string (min 3 characters)",
    "lastName": "string (min 3 characters)",
    "email": "valid email address",
    "department": "string (min 3 characters)"
}
```
- **Success Response:**
  - **Code:** 200
  - **Example:**
```json
{
    "_id": "64f5e21c93f2e123456789",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.updated@example.com",
    "department": "Management"
}
```
- **Error Responses:**
  - **Code:** 400 (Bad Request) - Invalid input data
  - **Code:** 404 (Not Found) - User ID not found

### Delete User
- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Description:** Delete a user
- **Success Response:**
  - **Code:** 200
  - **Example:**
```json
{
    "message": "User deleted successfully"
}
```
- **Error Responses:**
  - **Code:** 404 (Not Found) - User ID not found
  - **Code:** 400 (Bad Request) - Error during deletion
