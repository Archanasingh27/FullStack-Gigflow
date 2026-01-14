import { useState } from "react";

export default function BidModal({
  gig,
  bidForm,
  setBidForm,
  loading,
  onClose,
  onSubmit,
}) {
  const [alert, setAlert] = useState(null); 

  if (!gig) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    //validation
    if (!bidForm.message.trim()) {
      setAlert({ type: "error", message: "Please enter a message." });
      return;
    }

    if (!bidForm.price || bidForm.price <= 0) {
      setAlert({ type: "error", message: "Please enter a valid price." });
      return;
    }

    try {
      await onSubmit(e);

      setAlert({ type: "success", message: "Bid submitted successfully!" });

      
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 1200);


    } catch (err) {
      
      setAlert({
        type: "error",
        message:
          err?.response?.data?.message || "Failed to submit bid. Try again.",
      });
      
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b flex justify-between bg-slate-50">
          <div>
            <h3 className="text-xl font-bold">Submit Bid</h3>
            <p className="text-sm text-slate-500">{gig.title}</p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Alert */}
        {alert && (
          <div
            className={`mx-6 mt-4 px-4 py-3 rounded-xl text-sm font-medium
              ${alert.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {alert.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <textarea
            rows={4}
            placeholder="Your pitch..."
            className="w-full p-3 border rounded-xl"
            value={bidForm.message}
            onChange={(e) =>
              setBidForm({ ...bidForm, message: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Your price"
            className="w-full p-3 border rounded-xl"
            value={bidForm.price}
            onChange={(e) =>
              setBidForm({ ...bidForm, price: Number(e.target.value) })
            }
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Bid"}
          </button>
        </form>
      </div>
    </div>
  );
}
