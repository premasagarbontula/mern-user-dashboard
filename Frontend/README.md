# User Management Dashboard Frontend

A React-based User Management System built with Vite, featuring a modern and responsive user interface.

## Features

- View list of users with pagination
- Add new users
- Edit existing user information
- Delete users
- Responsive sidebar navigation
- Form validation for user inputs

## Tech Stack

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Fetch for API communication

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx       # Navigation sidebar
│   │   ├── UserList.jsx      # Displays paginated user list
│   │   ├── UserForm.jsx      # Form for adding/editing users
│   │   └── ...
│   ├── App.jsx              # Main application component
│   └── main.jsx            # Application entry point
```

## Available Routes

- `/` - Home page displaying list of users
- `/add` - Add new user form
- `/edit/:userId` - Edit existing user form

## Component Details

### UserList

- Displays paginated list of users
- Features:
  - Delete user functionality
  - Edit user navigation
  - Pagination controls

### UserForm

- Handles both creation and editing of users
- Features:
  - Input validation
  - Error handling
  - Success notifications

### Sidebar

- Responsive navigation component
- Links to main application routes

## API Integration

The frontend communicates with the backend API using the following endpoints:

- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `GET /users/:id` - Fetch specific user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
