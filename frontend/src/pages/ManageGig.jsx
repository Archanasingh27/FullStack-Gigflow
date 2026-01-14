import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function ManageGigPage() {
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hiringId, setHiringId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const gigRes = await api.get(`/gigs/${gigId}`);
      setGig(gigRes.data);

      const bidRes = await api.get(`/bids/${gigId}`);
      setBids(bidRes.data);
    } catch (err) {
      alert("Failed to load gig data");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gigId]);

  const handleHire = async (bidId) => {
    if (!window.confirm("Hire this freelancer? This will close the gig.")) return;

    try {
      setHiringId(bidId);
      await api.patch(`/bids/${bidId}/hire`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Hiring failed");
    } finally {
      setHiringId(null);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!gig) return <p className="text-center py-20">Gig not found</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white p-2 rounded-full hover:bg-slate-100"
        >
          ←
        </button>

        <div>
          <h2 className="text-3xl font-bold">{gig.title}</h2>

          {/*  Gig Status */}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full mt-1 inline-block
              ${gig.status === "open"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
              }`}
          >
            {gig.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bids */}
      {bids.length === 0 ? (
        <p className="text-center py-10 text-slate-500">No bids received yet.</p>
      ) : (
        bids.map((bid) => (
          <div
            key={bid._id}
            className="bg-white p-6 rounded-3xl border flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{bid.freelancerId.name}</h4>
              <p className="text-sm text-slate-500">${bid.price}</p>
              <p className="italic mt-2">"{bid.message}"</p>
            </div>

            {/*  Bid Status */}
            {bid.status === "hired" ? (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold">
                HIRED
              </span>
            ) : bid.status === "rejected" ? (
              <span className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl font-bold">
                REJECTED
              </span>
            ) : gig.status === "open" ? (
              <button
                disabled={hiringId === bid._id}
                onClick={() => handleHire(bid._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
              >
                {hiringId === bid._id ? "Hiring..." : "Hire"}
              </button>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}
