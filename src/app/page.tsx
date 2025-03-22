"use client";
import React, { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [peopleCount, setPeopleCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8000/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPeopleCount(response.data.people_count);
    } catch (error) {
      console.error("Error detecting people:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">People Detection App</h1>
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>
      {peopleCount !== null && (
        <p className="mt-4 text-lg font-semibold">
          Detected People: {peopleCount}
        </p>
      )}
    </div>
  );
}
