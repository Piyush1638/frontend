"use client";
import { useState } from "react";

interface DetectionResponse {
  filename: string;
  people_count: number;
  image: string;
}

export default function Home() {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [detectionResults, setDetectionResults] = useState<DetectionResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages(filesArray);
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file))); // Create preview URLs
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (images.length === 0) {
      alert("Please select images!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("http://127.0.0.1:8000/detect/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to detect people");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      // Extract `detections` array properly
      setDetectionResults(
        Array.isArray(data.detections) ? data.detections : []
      );
    } catch (error) {
      console.error("Error detecting people:", error);
      setDetectionResults([]); // Reset results on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#4e54c8] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">People Detection App</h1>

      <div className="area">
			<ul className="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>

      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg mb-4">
        Select Images
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
      </label>

      <div className="flex items-center justify-center flex-wrap gap-4 mt-4">
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Uploaded Preview ${index}`}
            className="w-80 h-full object-cover rounded-lg shadow-lg"
          />
        ))}
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg disabled:bg-gray-600"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Detect"}
      </button>

      <div className="flex flex-wrap gap-4 mt-6">
        {detectionResults.length > 0 ? (
          detectionResults.map((result, index) => (
            <div key={index} className="text-center w-80">
              {" "}
              {/* Adjust width as needed */}
              <div className="relative aspect-[3/2] rounded-lg shadow-lg overflow-hidden">
                <img
                  src={`data:image/png;base64,${result.image}`}
                  alt={`Detected ${result.filename}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-lg font-semibold mt-2">Image: {index}</p>
              <p className="mt-1 text-lg font-semibold">
                People:{" "}
                <span className="text-yellow-400">{result.people_count}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
}
