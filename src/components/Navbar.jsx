import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          RoomFinder
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-gray-600 transition"
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                to="/add-room"
                className="hover:text-gray-600 transition"
              >
                Add Room
              </Link>

              <Link
                to="/my-listings"
                className="hover:text-gray-600 transition"
              >
                My Listings
              </Link>

              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <Link
              to="/login"
              className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
