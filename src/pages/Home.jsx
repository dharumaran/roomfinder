import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
    const [user, setUser] = useState(null)

const [locationFilter, setLocationFilter] = useState("")
const [minPrice, setMinPrice] = useState("")
const [maxPrice, setMaxPrice] = useState("")
const [propertyType, setPropertyType] = useState("")
const [tenantPreference, setTenantPreference] = useState("")

  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRooms()
  }, [])
useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user)
  })
}, [])

const fetchRooms = async () => {
  let query = supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false })

  if (locationFilter) {
    query = query.ilike("location", `%${locationFilter}%`)
  }

  if (minPrice) {
    query = query.gte("price", minPrice)
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice)
  }

  if (propertyType) {
    query = query.eq("property_type", propertyType)
  }

  if (tenantPreference) {
    query = query.eq("tenant_preference", tenantPreference)
  }

  const { data, error } = await query

  if (error) {
    alert(error.message)
  } else {
    setRooms(data)
  }

  setLoading(false)
}


  return (
  <div>
    {/* Page Title */}
    <h1 className="text-3xl font-bold mb-6">
      Find Your Next Room
    </h1>

    {/* Filters */}
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Search location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Property Type</option>
          <option>1 BHK</option>
          <option>2 BHK</option>
          <option>3 BHK</option>
          <option>1 Bed</option>
          <option>2 Bed</option>
        </select>

        <select
          value={tenantPreference}
          onChange={(e) => setTenantPreference(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Tenant</option>
          <option>Bachelor</option>
          <option>Family</option>
          <option>Girls</option>
          <option>Working</option>
        </select>
      </div>

      <button
        onClick={fetchRooms}
        className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Apply Filters
      </button>
    </div>

    {/* States */}
    {loading && (
      <p className="text-gray-500">Loading rooms…</p>
    )}

    {!loading && rooms.length === 0 && (
      <p className="text-gray-500 text-center">
        No rooms available at the moment
      </p>
    )}

    {/* Room Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rooms
  .filter((room) => !user || room.owner_id !== user.id)
  .map((room) => (

        <div
          key={room.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition p-4 space-y-2"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            {room.title}
          </h2>

          <p className="text-sm text-gray-500">
            📍 {room.location}
          </p>

          <p className="text-xl font-bold text-green-700">
            ₹ {room.price}
          </p>

          <p className="text-sm text-gray-600">
            {room.property_type} · {room.tenant_preference}
          </p>

          <div className="pt-2 border-t text-sm text-gray-700">
            📞 {room.contact}
          </div>
        </div>
      ))}
    </div>
  </div>
)
}