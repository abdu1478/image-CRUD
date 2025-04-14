import { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:5000/upload", formData);
      
      setUploadedImage({
        id: res.data._id,
        name: res.data.name
      });
      
    } catch (err) {
      setError(err.response?.data || "Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-6 mt-10">
      <h1 className="text-2xl font-semibold text-center text-gray-800">Upload Image</h1>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-sm p-1 cursor-pointer focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {uploadedImage && (
        <div className="pt-4">
          <p className="text-green-600 text-center">Upload successful!</p>
          <p className="text-center">
            Image ID: <span className="font-mono">{uploadedImage.id}</span>
          </p>
          <p className="text-center">
            Image Name: <span className="font-mono">{uploadedImage.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}