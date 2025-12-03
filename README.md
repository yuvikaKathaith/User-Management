# User Management CRUD Application

A modern, responsive user management application built with React, Vite, and React Router. This application provides full CRUD (Create, Read, Update, Delete) functionality using the JSONPlaceholder API.

## Features

- **View Users**: Display all users in a responsive card grid with search functionality
- **User Details**: View comprehensive user information including contact, address, and company details
- **Create User**: Add new users with form validation
- **Edit User**: Update existing user information
- **Delete User**: Remove users with confirmation dialog
- **Loading States**: Beautiful loading spinners during API calls
- **Error Handling**: Comprehensive error messages and alerts
- **Responsive Design**: Fully responsive layout that works on mobile and desktop

## Technologies Used

- **React 18** - UI library with functional components and hooks
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **JSONPlaceholder API** - Mock REST API for testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yuvikaKathaith/User-Management
cd user-management
```
2. Install dependencies:
  ```
  npm install
  ```

3. Start the development server:
  ```
  npm run dev
  ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
├── components/        # Reusable components
│   ├── Layout.jsx        # Main layout with navigation
│   ├── UserCard.jsx      # User card component
│   ├── UserForm.jsx      # Reusable form for create/edit
│   ├── LoadingSpinner.jsx # Loading state component
│   ├── ErrorAlert.jsx    # Error message component
│   └── SuccessAlert.jsx  # Success message component
├── pages/             # Page components
│   ├── Home.jsx          # User list page
│   ├── UserDetail.jsx    # User detail page
│   ├── CreateUser.jsx    # Create user page
│   └── EditUser.jsx      # Edit user page
├── App.jsx           # Main app component with routing
├── main.jsx          # Application entry point
└── index.css         # Global styles

\`\`\`

## API Integration

This application uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API:

**Note**: JSONPlaceholder is a mock API, so POST, PUT, and DELETE requests don't actually persist data on the server, but they simulate the correct response.

## Features in Detail

### Search Functionality
The home page includes a search bar that filters users by name, email, or username in real-time.

### Form Validation
Create and edit forms include validation for:
- Required fields (name, username, email, phone)
- Email format validation
- Visual error messages

### Responsive Design
- Mobile-first approach
- Card grid adapts to screen size
- Navigation optimized for all devices

### User Experience
- Loading spinners during API calls
- Success/error alerts with auto-dismiss
- Confirmation dialogs for destructive actions
- Smooth transitions and hover effects
