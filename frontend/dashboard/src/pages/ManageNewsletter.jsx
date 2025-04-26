import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsletters } from "@/store/slices/newsletterSlice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ManageNewsletter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure that newsletters are correctly destructured from Redux store
  const { newsletters, loading, error } = useSelector((state) => state.newsletter);

  useEffect(() => {
    // Dispatch action to fetch newsletters from the server
    dispatch(fetchNewsletters());
  }, [dispatch]);

  const handleReturnToDashboard = () => navigate("/");

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle errors
  if (error) {
    toast.error(`❌ ${error}`);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mt-0 mb-20">Manage Newsletters</h2>
        <div className="flex justify-end mb-6">
          <Button className="w-fit" onClick={handleReturnToDashboard}>
            Return to Dashboard
          </Button>
        </div>

        {/* Check if newsletters exist and is an array */}
        {Array.isArray(newsletters) && newsletters.length === 0 ? (
          <div>No newsletters available.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {/* Ensure newsletters is an array before calling map */}
            {Array.isArray(newsletters) &&
              newsletters.map((newsletter) => (
                <div
                  key={newsletter._id}
                  className="bg-white p-4 rounded shadow-md relative"
                  style={{ width: "500px", height: "200px" }} // Card width and height
                >
                  {/* Subject Title */}
                  <h3 className="font-semibold text-sm mb-2 text-gray-800">Subject:</h3>
                  <h4 className="font-semibold text-xs text-gray-700">{newsletter.subject}</h4>

                  {/* Message Title */}
                  <p className="font-semibold text-sm mt-2 text-gray-800">Message:</p>
                  <p
                    className="text-xs text-gray-600 overflow-hidden"
                    style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                  >
                    {newsletter.text?.substring(0, 100)}...
                  </p>

                  {/* Created At (Bottom Right) */}
                  <p className="absolute bottom-2 right-4 text-xs text-gray-500">
                    {new Date(newsletter.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNewsletter;
