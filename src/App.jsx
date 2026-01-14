import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import AddRoom from "./pages/AddRoom"
import MyListings from "./pages/MyListings"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/my-listings" element={<MyListings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
