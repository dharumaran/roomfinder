import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Check your email for the login link")
    }
  }

  return (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-2">
        Welcome Back
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Login using your email to continue
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2.5 rounded hover:bg-gray-800 transition"
        >
          {loading ? "Sending link..." : "Send Login Link"}
        </button>
      </form>
    </div>
  </div>
)

}
