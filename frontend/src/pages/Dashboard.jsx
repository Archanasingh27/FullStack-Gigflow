import { useEffect, useState } from "react";
import { useApp } from "../context/AuthContext.jsx";
import api from "../api";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const { user } = useApp();
  const navigate = useNavigate();
  
  const [myGigs, setMyGigs] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboard = async () => {
      try {
        const [gigsRes, bidsRes] = await Promise.all([
          api.get("/gigs"),
          api.get("/bids/my"),
        ]);

        // only gigs owned by me
        const ownedGigs = gigsRes.data.filter((g) =>
          (typeof g.ownerId === "object"
              ? g.ownerId._id
              : g.ownerId) === user._id
        );

        setMyGigs(ownedGigs);
        setMyBids(bidsRes.data);
      } catch (err) {
        console.error("Dashboard fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <span className="text-slate-500">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">

      {/* HEADER */}
      <header>
        <h2 className="text-4xl font-black">Dashboard</h2>
        <p className="text-slate-500 mt-1">
          Welcome back, {user?.name}
        </p>
      </header>

    
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat label="My Gigs" value={myGigs.length} />
        <Stat label="My Bids" value={myBids.length} />
        <Stat
          label="Hired"
          value={myBids.filter((b) => b.status === "hired").length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* MY GIGS */}
        <section>
          <h3 className="text-xl font-bold mb-4">My Gigs</h3>

          {myGigs.length === 0 ? (
            <Empty text="You haven't posted any gigs yet." />
          ) : (
            <div className="space-y-4">
              {myGigs.map((gig) => (
                <div
                  key={gig._id}
                  className="bg-white border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
  <h4 className="font-bold">{gig.title}</h4>

  <div className="flex items-center gap-2 mt-1">
    <p className="text-xs text-slate-500">
      Budget: ${gig.budget}
    </p>

    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
        gig.status === "assigned"
          ? "bg-blue-100 text-blue-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {gig.status === "assigned" ? "ASSIGNED" : "OPEN"}
    </span>
  </div>
</div>


                  <button
                    onClick={() =>
                      navigate(`/dashboard/gigs/${gig._id}`)
                    }
                    className="text-sm font-bold text-blue-600"
                  >
                    Manage
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MY BIDS */}
        <section>
          <h3 className="text-xl font-bold mb-4">My Bids</h3>

          {myBids.length === 0 ? (
            <Empty text="You haven't applied to any gigs yet." />
          ) : (
            <div className="space-y-4">
              {myBids.map((bid) => (
                <div
                  key={bid._id}
                  className="bg-white border rounded-xl p-4"
                >
                  <div className="flex justify-between">
                    <h4 className="font-bold">
                      {bid.gigId?.title || "Gig"}
                    </h4>
                    <StatusBadge status={bid.status} />
                  </div>

                  <p className="text-sm italic mt-2">
                    "{bid.message}"
                  </p>

                  <p className="text-sm font-bold mt-2">
                    ${bid.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ----------------- HELPERS ----------------- */

function Stat({ label, value }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-slate-500 text-sm">{label}</p>
      <p className="text-3xl font-black">{value}</p>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="bg-slate-50 border border-dashed p-8 rounded-xl text-center text-slate-400">
      {text}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    hired: "bg-green-100 text-green-700",
    rejected: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`text-xs font-bold px-2 py-1 rounded ${map[status]}`}
    >
      {status}
    </span>
  );
}
