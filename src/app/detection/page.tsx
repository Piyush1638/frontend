"use client";
import Logo from "@/components/Logo";
import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DetectionResponse {
  filename: string;
  people_count: number;
  image: string;
}

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const auth_session = localStorage.getItem("auth_session");

    if (!auth_session) {
      router.push("/login");
    }
  }, [router]);

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [detectionResults, setDetectionResults] = useState<DetectionResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = (): void => {
    setImages([]);
    setImagePreviews([]);
    setDetectionResults([]);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setImages((prev) => [...prev, ...filesArray]);
      setImagePreviews((prev) => [
        ...prev,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]);
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

      if (!response.ok) throw new Error("Failed to detect people");

      const data = await response.json();
      setDetectionResults(
        Array.isArray(data.detections) ? data.detections : []
      );
    } catch (error) {
      console.error("Error detecting people:", error);
      setDetectionResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Logo/>
        <div className="flex items-center justify-center">
          {images.length !== 0 && (
            <button
              onClick={handleReset}
              className="  cursor-pointer px-6 py-2 rounded-lg hover:underline text-white font-semibold"
              disabled={loading}
            >
              Reset
            </button>
          )}
          <LogoutButton />
        </div>
      </div>

      {/* Upload Prompt */}
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
            <span className="text-4xl">📷</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            Detect Humans in Your Image
          </h2>
          <p className="text-gray-300 max-w-md mb-6">
            Upload an image and our intelligent system will scan it to detect
            how many people are present.
          </p>
        </div>
      )}

      {/* Always show this upload + reset control */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
          Select Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white font-semibold"
          disabled={loading}
        >
          Reset
        </button> */}
      </div>

      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Image Previews</h2>
            <button
              onClick={handleUpload}
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg text-white font-semibold"
              disabled={loading}
            >
              {loading ? "Processing..." : "Upload & Detect"}
            </button>
          </div>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="w-full rounded-xl shadow-lg ring-1 ring-white/10"
              />
            ))}
          </div>
        </div>
      )}

      {/* Detection Results */}
      {detectionResults.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Detection Results</h2>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {detectionResults.map((result, index) => (
              <div
                key={index}
                className="break-inside-avoid bg-white/10 p-3 rounded-xl shadow-md"
              >
                <img
                  src={`data:image/png;base64,${result.image}`}
                  alt={`Detected ${result.filename}`}
                  className="w-full rounded"
                />
                <p className="mt-2 text-sm text-white">
                  People Detected:{" "}
                  <span className="text-green-400 font-bold">
                    {result.people_count}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
