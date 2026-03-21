import React , { useEffect, useState } from "react"
import api from "../api/axios"
import { Link } from "react-router-dom"

function Dashboard() {
  const [images, setImages] = useState([])
  const [sort, setSort] = useState("newest")
  
  const fetchImages = async () => {
  const res = await api.get(`/images?sort=${sort}`)
  setImages(res.data)
}

  const handleDelete = async (id) => {
    await api.delete(`/images/${id}`)
    fetchImages()
  }

  const handleLogout = async () => {
  await api.post("/auth/logout")
  window.location.href = "/"
}

  useEffect(() => {
  fetchImages()
}, [sort])

  return (
    <div className="p-6">
     <div className="flex justify-between mb-6">
  <h1 className="text-2xl font-bold">Admin Dashboard</h1>

  <div className="flex gap-3">
    <Link
      to="/upload"
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Upload Image
    </Link>

    <button
      onClick={handleLogout}
      className="bg-gray-700 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
  
</div>
 <select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
  className="mb-4 border p-2 rounded"
>
  <option value="newest">Newest</option>
  <option value="oldest">Oldest</option>
  <option value="popular">Most Popular</option>
</select>
      <div className="grid grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img._id} className="border p-4 rounded shadow">
            <img src={img.imageUrl} alt="" className="h-40 w-full object-cover mb-2" />
            <h3 className="font-semibold">{img.title}</h3>

            <button
              onClick={() => handleDelete(img._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

            <button
  onClick={() => {
    const newTitle = prompt("Enter new title")
    if (newTitle) {
      api.put(`/images/${img._id}`, { title: newTitle })
        .then(fetchImages)
    }
  }}
  className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
