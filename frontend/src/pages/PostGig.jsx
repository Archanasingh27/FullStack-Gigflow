import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom"; 
import { useApp } from "../context/AuthContext.jsx";

export default function PostGigPage() {
  const navigate = useNavigate();
    const { user} = useApp();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: ""
  });
  const [loading, setLoading] = useState(false);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await api.post("/gigs", {
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
      });

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => setActiveView("home")}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Post a New Gig
        </h2>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gig Title
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Project Description
            </label>
            <textarea
              rows={6}
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Total Budget ($)
            </label>
            <input
              type="number"
              min="5"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Publish Gig to Marketplace"}
          </button>
        </form>
      </div>
    </div>
  );
}
