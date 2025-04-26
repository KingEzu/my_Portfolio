import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscribers, unsubscribeSubscriber } from "../store/slices/newsletterSlice";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react"; // Importing Trash Icon

const ManageSubscribersPage = () => {
  const dispatch = useDispatch();
  const { subscribers, loading, error } = useSelector((state) => state.newsletter);

  useEffect(() => {
    dispatch(fetchSubscribers());
  }, [dispatch]);

  const handleUnsubscribe = (id) => {
    dispatch(unsubscribeSubscriber(id));
  };

  if (loading) return <div className="text-center py-5 text-gray-500 dark:text-gray-300">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-5">Manage Subscribers</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr className="text-left">
              <th className="border p-3">#</th>
              <th className="border p-3">Email</th>
              <th className="border p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length > 0 ? (
              subscribers.map((subscriber, index) => (
                <tr key={subscriber._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{subscriber.email}</td>
                  <td className="border p-3 text-right">
                    <button
                      onClick={() => handleUnsubscribe(subscriber._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center border p-5 text-gray-500 dark:text-gray-400">
                  No subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-center space-x-4">
        <Link
          to="/"
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          Return to Dashboard
        </Link>
        <Link
          to="/send-newsletter"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Send Newsletter
        </Link>
      </div>
    </div>
  );
};

export default ManageSubscribersPage;
