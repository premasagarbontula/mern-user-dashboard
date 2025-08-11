# User Management Dashboard

A full-stack web application for managing users with React frontend and Node.js backend.

![App Main View](./Frontend/src/assets/App%20View%20users%20view.png)
![App Add Users View](./Frontend/src/assets/Add%20user%20View.png)

## Project Structure

```
├── Backend/
│   ├── controllers/
│   │   └── userController.js    # User CRUD operations
│   ├── db/
│   │   └── db.js               # Database connection
│   ├── models/
│   │   └── userModel.js        # User schema
│   ├── routes/
│   │   └── userRoutes.js       # API routes
│   ├── app.js                  # Express app configuration
│   └── server.js               # Server entry point
│
├── Frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── vite.config.js
```

## Features

- User management with CRUD operations
- Responsive design with Tailwind CSS
- Form validation
- Loading states
- Pagination
- Error handling
- RESTful API

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- PropTypes

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Express Validator
- CORS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=3000
DB_CONNECT=mongodb://localhost:27017/user-management
```

4. Start the server:

```bash
npm run server
```

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
VITE_BASE_URL=http://localhost:3000/api/v1
```

4. Start development server:

```bash
npm run dev
```

## API Endpoints

### Users

- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Available Scripts

### Backend

- `npm run server` - Start backend server with nodemon
- `npm start` - Start backend server
- `npm run dev` - Start both frontend and backend

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
