export default function HeroSection({ search, setSearch }) {
  return (
    <section className="bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-900 rounded-[2rem] p-8 md:p-16 text-white overflow-hidden relative shadow-2xl shadow-blue-200">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase bg-blue-400/20 rounded-full">
          🚀 The future of work is here
        </span>

        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          Find the perfect talentfor your project.
        </h1>

        <p className="text-blue-100 text-lg mb-10">
          Post jobs, hire experts, and build amazing products with GigFlow.
        </p>

        {/*  Search */}
        <div className="relative bg-white border rounded-2xl border-slate-200 focus:ring-blue-400 ">
          <input
            type="text"
            placeholder="Search gigs by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-xl text-slate-900 "
          />
          <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
      </div>

      <i className="fas fa-briefcase absolute -bottom-10 -right-10 text-[280px] text-white/5 rotate-12"></i>
    </section>
  );
}
