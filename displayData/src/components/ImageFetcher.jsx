import { useState } from "react";
import axios from "axios";

export default function ImageFetcher() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchImage = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setError("Please enter an ID or name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const endpoint = searchType === "id" 
        ? `http://localhost:5000/image/${searchTerm}`
        : `http://localhost:5000/image/name/${searchTerm}`;

      const response = await axios.get(endpoint, { responseType: "blob" });
      
      const url = URL.createObjectURL(response.data);
      setImageUrl(url);
    } catch (err) {
      setError(err.response?.data || "Failed to fetch image");
      setImageUrl("");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setDeleteError("");
      const response = await axios.delete("http://localhost:5000/uploads");
      setDeleteError(response.data.message || "Failed to delete images");
      setImageUrl(""); 
      setSearchTerm(""); 
      setShowDeleteConfirm(false); 
      
    } catch (err) {
      setDeleteError(err.response?.data || "Failed to delete images");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 mt-10">
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Fetch Image</h1>
        
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setSearchType("id")}
            className={`flex-1 py-2 rounded-lg ${searchType === "id" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          >
            By ID
          </button>
          <button
            onClick={() => setSearchType("name")}
            className={`flex-1 py-2 rounded-lg ${searchType === "name" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
          >
            By Name
          </button>
        </div>
        
        <form onSubmit={fetchImage} className="flex space-x-2">
          <input
            type="text"
            placeholder={`Enter image ${searchType}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`${loading ? "bg-indigo-300" : "bg-indigo-600"} text-white hover:bg-indigo-700 font-medium py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50`}
          >
            {loading ? "Fetching..." : "Fetch"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {imageUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Fetched Image:</h2>
            <img
              src={imageUrl}
              alt="Fetched from MongoDB"
              className="w-full max-w-full rounded-lg shadow"
            />
          </div>
        )}
      </div>

      <div className="bg-white shadow-2xl p-4 rounded-2xl flex justify-center">
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          className="border-none bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg cursor-pointer text-lg active:scale-95 transition-all"
        >
          Delete all Images
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black opacity-85 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">
              This will permanently delete ALL images. Continue?
            </p>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete All"}
              </button>
            </div>

            {deleteError && (
              <p className="Error text-red-500 mt-2 text-sm">{deleteError}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}