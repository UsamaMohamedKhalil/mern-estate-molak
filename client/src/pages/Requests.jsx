import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Requests() {
  const { currentUser } = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/requests/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        throw new Error(data.message);
      }
      setRequests(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">My Requests</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-700 text-center">{error}</p>}
      {requests.length === 0 && !loading && !error && (
        <p className="text-center">You haven't made any requests yet.</p>
      )}
      {requests.length > 0 && (
        <div className="flex flex-col gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/request/${request._id}`}>
                <div>
                  <p className="text-slate-700 font-semibold">{request.name}</p>
                  <p className="text-slate-600">Max Price: ${request.maxPrice}</p>
                  {/* Add more details as needed */}
                </div>
              </Link>
              {/* Additional actions/buttons for requests */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
