import { useEffect, useState } from "react";
import api from "../../api";
import { useApp } from "../../context/AuthContext.jsx";

import HeroSection from "./HeroSection";
import GigCard from "./GigCard";
import BidModal from "./BidModal";
 import { useNavigate } from "react-router-dom";

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [bidGig, setBidGig] = useState(null);
  const [bidForm, setBidForm] = useState({ message: "", price: "" });
  const [loading, setLoading] = useState(false);

 

const { user } = useApp();
const navigate = useNavigate();


  const fetchGigs = async (query = "") => {
    const res = await api.get(`/gigs${query ? `?search=${query}` : ""}`);
    setGigs(res.data);
  };

  useEffect(() => { fetchGigs(); }, []);
  useEffect(() => {
    const t = setTimeout(() => fetchGigs(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const submitBid = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.post("/bids", { ...bidForm, gigId: bidGig._id });
    setBidGig(null);
    setBidForm({ message: "", price: "" });
    fetchGigs(search);
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <HeroSection search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gigs.map((gig) => (
          <GigCard
  key={gig._id}
  gig={gig}
  user={user}
  onApply={(gig) =>
    user ? setBidGig(gig) : navigate("/login")
  }
  onManage={(id) => navigate(`/dashboard/gigs/${id}`)}

/>

        ))}
      </div>

      {bidGig && (
        <BidModal
          gig={bidGig}
          bidForm={bidForm}
          setBidForm={setBidForm}
          loading={loading}
          onClose={() => setBidGig(null)}
          onSubmit={submitBid}
        />
      )}
    </div>
  );
}
