import React , { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Upload() {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", image)

    await api.post("/images", formData)

    navigate("/dashboard")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleUpload} className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-xl font-bold mb-4">Upload Image</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-4 p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Upload
        </button>
      </form>
    </div>
  )
}

export default Upload
