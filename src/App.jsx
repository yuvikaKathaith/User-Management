/**
 * Main App Component
 * Handles routing for the User Management application
 * Routes:
 * - / : Home page with user list
 * - /user/:id : User detail page
 * - /create : Create new user page
 * - /edit/:id : Edit user page
 */
import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import UserDetail from "./pages/UserDetail"
import CreateUser from "./pages/CreateUser"
import EditUser from "./pages/EditUser"
import { Toaster } from "react-hot-toast"


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
       <Toaster position="top-right" reverseOrder={false} />
    </Layout>
  )
}

export default App
