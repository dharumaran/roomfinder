import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AddRoom() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [tenantPreference, setTenantPreference] = useState("")
  const [contact, setContact] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from("rooms").insert([
      {
        title,
        location,
        price,
        property_type: propertyType,
        tenant_preference: tenantPreference,
        contact,
        owner_id: user.id
      }
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Room added successfully")
      setTitle("")
      setLocation("")
      setPrice("")
      setPropertyType("")
      setTenantPreference("")
      setContact("")
    }
  }

  return (
  <div className="min-h-[70vh] flex items-start justify-center">
    <div className="bg-white w-full max-w-xl mt-10 p-6 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">
        Add a New Room
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Room title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Monthly rent"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Property type</option>
          <option>1 BHK</option>
          <option>2 BHK</option>
          <option>3 BHK</option>
          <option>1 Bed</option>
          <option>2 Bed</option>
        </select>

        <select
          value={tenantPreference}
          onChange={(e) => setTenantPreference(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Tenant preference</option>
          <option>Bachelor</option>
          <option>Family</option>
          <option>Girls</option>
          <option>Working</option>
        </select>

        <input
          type="text"
          placeholder="Contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  </div>
)

}
