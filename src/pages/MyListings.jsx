import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function MyListings() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMyRooms()
  }, [])

  const fetchMyRooms = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("You must be logged in")
      return
    }

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      alert(error.message)
    } else {
      setRooms(data)
    }

    setLoading(false)
  }

  const deleteRoom = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    )

    if (!confirmDelete) return

    const { error } = await supabase
      .from("rooms")
      .delete()
      .eq("id", id)

    if (error) {
      alert(error.message)
    } else {
      setRooms((prev) => prev.filter((room) => room.id !== id))
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        My Listings
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && rooms.length === 0 && (
        <p>No rooms added yet</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border rounded p-4 space-y-2"
          >
            <h2 className="text-lg font-semibold">
              {room.title}
            </h2>

            <p>📍 {room.location}</p>
            <p>₹ {room.price}</p>
            <p>{room.property_type}</p>

            <button
              onClick={() => deleteRoom(room.id)}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
