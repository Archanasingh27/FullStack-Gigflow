export default function GigCard({ gig, user, onApply, onManage }) 
{
  const ownerId =
    typeof gig.ownerId === "object" ? gig.ownerId._id : gig.ownerId;

  const isOwner = user && user._id === ownerId;

  
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between mb-4">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            GIG
          </span>
          <span className="text-lg font-bold">${gig.budget}</span>
        </div>

        <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-3 mb-6">
          {gig.description}
        </p>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold">
            {gig.ownerId?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-xs font-semibold">{gig.ownerId?.name}</p>
            <p className="text-[10px] text-slate-400">
              {new Date(gig.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isOwner ? (
          <button onClick={() => onManage(gig._id)} className="text-xs font-bold text-blue-600">
            Manage
          </button>
        ) : (
          <button
            onClick={() => onApply(gig)}
            className="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
