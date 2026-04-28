import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search, ChevronLeft, ChevronRight, ChevronDown,
  Wallet, Briefcase, Bell, Home, Clock, Star, Filter, X
} from 'lucide-react';

// ─── Sample Data ───────────────────────────────────────────────────────────────
import { jobsData } from './data/jobsData';

// ─── Company Logo Placeholder ──────────────────────────────────────────────────
const CompanyLogo = () => (
  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0">
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <rect width="40" height="40" rx="4" fill="#f3f4f6" />
      <rect x="8" y="14" width="24" height="18" rx="2" fill="#d1d5db" />
      <rect x="13" y="8" width="14" height="10" rx="2" fill="#9ca3af" />
      <rect x="16" y="23" width="8" height="9" rx="1" fill="#f9fafb" />
    </svg>
  </div>
);

// ─── Tag pill ──────────────────────────────────────────────────────────────────
const TagPill = ({ label }) => {
  const map = {
    "International":  "text-purple-700 bg-purple-50",
    "Fresher Job":    "text-green-700  bg-green-50",
    "Part time":      "text-orange-600 bg-orange-50",
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${map[label] || "text-gray-600 bg-gray-100"}`}>
      {label}
    </span>
  );
};

// ─── Single Job Card ───────────────────────────────────────────────────────────
const JobCard = ({ job }) => {
  const detailUrl = `/jobs/detail/${job.id}`;
  const openDetail = (e) => {
    e.preventDefault();
    window.open(detailUrl, '_blank', 'noopener,noreferrer');
  };
  return (
  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#008bdc] transition-all group">
    {/* Header */}
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={detailUrl}
            onClick={openDetail}
            className="font-semibold text-[15px] text-gray-900 hover:text-[#008bdc] hover:underline transition-colors leading-snug cursor-pointer"
          >
            {job.title}
          </a>
          {job.activelyHiring && (
            <span className="text-[11px] font-semibold text-[#008bdc] border border-[#008bdc]/40 bg-blue-50 rounded-full px-2 py-0.5 whitespace-nowrap">
              Actively hiring
            </span>
          )}
        </div>
        <p className="text-gray-500 text-[13px] mt-0.5">
          {job.company}{job.companyLocation ? ` (${job.companyLocation})` : ""}
        </p>
      </div>
      <CompanyLogo />
    </div>

    {/* Meta */}
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-[13px] text-gray-600">
      <span className="flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-gray-400" />{job.type}</span>
      <span className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-gray-400" />{job.salary}</span>
      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-gray-400" />{job.experience}</span>
    </div>

    {/* Description */}
    <p className="text-gray-500 text-[13px] mt-3 line-clamp-2 leading-relaxed">{job.description}</p>

    {/* Skills */}
    {job.skills.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {job.skills.slice(0, 4).map((s, i) => (
          <span key={i} className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{s}</span>
        ))}
        {job.skills.length > 4 && (
          <span className="text-[11px] text-[#008bdc] font-medium self-center">+{job.skills.length - 4} more</span>
        )}
      </div>
    )}

    {/* Footer */}
    <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-gray-100 flex-wrap">
      <span className={`flex items-center gap-1 text-[12px] font-medium ${
        ["Just now", "Today"].includes(job.postedAt) ? "text-green-600" : "text-[#008bdc]"
      }`}>
        <Clock className="w-3.5 h-3.5" />{job.postedAt}
      </span>
      {job.badge === "early" && (
        <span className="flex items-center gap-1 text-[12px] text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full font-medium">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />Be an early applicant
        </span>
      )}
      {job.tags.map((t, i) => <TagPill key={i} label={t} />)}
      <a
        href={detailUrl}
        onClick={openDetail}
        className="ml-auto text-[#008bdc] font-bold text-[12px] flex items-center gap-0.5 hover:underline"
      >
        View details <ChevronRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
  );
};

// ─── Filter Sidebar (extracted so it can be used in both desktop + mobile) ─────
const FilterSidebar = ({ filters, setFilters, onClose }) => {
  const { profile, location, wfh, partTime, salary, experience, search } = filters;
  const set = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-5">
      {onClose && (
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[16px] text-gray-800">Filters</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
        </div>
      )}

      {/* Save Alert */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-2 cursor-pointer hover:border-[#008bdc] transition-colors">
        <Bell className="w-4 h-4 text-[#008bdc]" />
        <span className="text-[#008bdc] font-semibold text-[13px]">Save this search as alert</span>
      </div>

      {/* Panel */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
        {!onClose && (
          <h3 className="font-bold text-gray-700 text-[14px] flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#008bdc]" />Filters
          </h3>
        )}

        {/* Profile */}
        <div>
          <label className="text-[13px] font-semibold text-gray-700 block mb-1.5">Profile</label>
          <input
            type="text" placeholder="e.g. Marketing" value={profile}
            onChange={e => set("profile", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#008bdc] transition"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-[13px] font-semibold text-gray-700 block mb-1.5">Location</label>
          <input
            type="text" placeholder="e.g. Delhi" value={location}
            onChange={e => set("location", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#008bdc] transition"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2.5">
          {[["wfh", "Work from home"], ["partTime", "Part-time"]].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox" checked={filters[key]}
                onChange={e => set(key, e.target.checked)}
                className="w-4 h-4 accent-[#008bdc] rounded"
              />
              <span className="text-[13px] text-gray-700 group-hover:text-[#008bdc]">{label}</span>
            </label>
          ))}
        </div>

        {/* Salary Slider */}
        <div>
          <label className="text-[13px] font-semibold text-gray-700 block mb-2">
            Annual salary (in lakhs){salary > 0 ? ` — ₹${salary}L+` : ""}
          </label>
          <input
            type="range" min={0} max={10} step={1} value={salary}
            onChange={e => set("salary", Number(e.target.value))}
            className="w-full accent-[#008bdc]"
          />
          <div className="flex justify-between text-[11px] text-gray-400 mt-1">
            {[0, 2, 4, 6, 8, 10].map(v => <span key={v}>{v}</span>)}
          </div>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="text-[13px] font-semibold text-gray-700 block mb-1.5">Years of experience</label>
          <select
            value={experience} onChange={e => set("experience", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-500 outline-none focus:border-[#008bdc] bg-white"
          >
            <option value="">Select years of experience</option>
            <option value="0">No experience (Fresher)</option>
            <option value="1">1 year</option>
            <option value="2">2 years</option>
            <option value="3">3+ years</option>
          </select>
        </div>

        {/* Clear All */}
        <div className="text-right">
          <button
            onClick={() => setFilters({ profile: "", location: "", wfh: true, partTime: false, salary: 0, experience: "", search: "" })}
            className="text-[#008bdc] font-semibold text-[13px] hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-3 text-gray-400 text-[12px]">
          <div className="flex-1 border-t border-gray-200" />OR<div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Search */}
        <div>
          <p className="text-[14px] font-bold text-gray-700 mb-2 text-center">Search</p>
          <div className="flex gap-2">
            <input
              type="text" placeholder="e.g. Design, Mumbai, Infosys"
              value={search} onChange={e => set("search", e.target.value)}
              onKeyDown={e => e.key === "Enter" && e.preventDefault()}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-[13px] outline-none focus:border-[#008bdc]"
            />
            <button className="bg-[#008bdc] text-white px-3 py-2 rounded-lg hover:bg-[#0079c0] transition">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Jobs Page ────────────────────────────────────────────────────────
const WFHJobsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    profile: searchParams.get('category') || "",
    location: searchParams.get('location') || "",
    wfh: searchParams.get('type') === 'wfh',
    partTime: searchParams.get('partTime') === 'true',
    salary: 0,
    experience: searchParams.get('experience') === 'Fresher' ? "0" : "",
    search: "",
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setFilters({
      profile: searchParams.get('category') || "",
      location: searchParams.get('location') || "",
      wfh: searchParams.get('type') === 'wfh',
      partTime: searchParams.get('partTime') === 'true',
      salary: 0,
      experience: searchParams.get('experience') === 'Fresher' ? "0" : "",
      search: "",
    });
  }, [searchParams]);

  // Apply filters
  const filtered = jobsData.filter(job => {
    const q = (filters.search || filters.profile).toLowerCase();
    if (q && !job.title.toLowerCase().includes(q) &&
        !job.company.toLowerCase().includes(q) &&
        !job.category?.toLowerCase().includes(q) &&
        !job.skills.some(s => s.toLowerCase().includes(q))) return false;
    
    if (filters.partTime && (!job.tags || !job.tags.includes("Part time"))) return false;
    if (filters.wfh && job.type !== "wfh" && (!job.tags || !job.tags.includes("Work from home")) && job.location !== "Work from home") return false;
    if (filters.location && !job.location?.toLowerCase().includes(filters.location.toLowerCase()) && !job.companyLocation?.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.experience === "0" && job.experience !== "Fresher") return false;
    
    return true;
  });

  let pageTitle = "Latest Jobs";
  let pageDesc = "Latest Jobs in India";
  if (filters.wfh) { pageTitle = "Work From Home Jobs"; pageDesc = "Latest Online Work From Home (WFH)/ Remote Jobs in India"; }
  else if (filters.experience === "0") { pageTitle = "Fresher Jobs"; pageDesc = "Latest Jobs for Freshers"; }
  else if (filters.location) { pageTitle = `Jobs in ${filters.location}`; pageDesc = `Latest Jobs in ${filters.location}`; }
  else if (filters.profile) { pageTitle = `${filters.profile} Jobs`; pageDesc = `Latest ${filters.profile} Jobs`; }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b sticky top-0 z-50 px-6 lg:px-10 py-3 flex items-center justify-between">
        <div
          className="text-[#008bdc] font-black text-2xl italic tracking-tighter cursor-pointer"
          onClick={() => navigate('/')}
        >
          CAREERBRIDGE
        </div>
        <div className="hidden md:flex items-center gap-6 text-[14px] font-semibold text-gray-500">
          <button className="hover:text-[#008bdc] flex items-center gap-1">
            Internships <ChevronDown className="w-4 h-4" />
          </button>
          <Link to="/courses" className="hover:text-[#008bdc] flex items-center gap-1">
            Courses
            <span className="ml-1 bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">OFFER</span>
            <ChevronDown className="w-4 h-4" />
          </Link>
          <button className="text-[#008bdc] border-b-2 border-[#008bdc] pb-0.5 flex items-center gap-1">
            Jobs <ChevronDown className="w-4 h-4" />
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-gray-500 hover:text-[#008bdc]">Login / Register <ChevronDown className="w-4 h-4 inline" /></button>
        </div>
      </nav>

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-[#008bdc]">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button className="hover:text-[#008bdc]">Jobs</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-medium">{pageTitle}</span>
        </div>
      </div>

      {/* ── Page Title ── */}
      <div className="text-center py-5 bg-white border-b">
        <h1 className="text-2xl font-bold text-gray-900">{filtered.length.toLocaleString()} {pageTitle}</h1>
        <p className="text-gray-500 text-[13px] mt-1">{pageDesc}</p>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex gap-6 items-start">

        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-[280px] flex-shrink-0 sticky top-[70px]"
          style={{
            height: 'calc(100vh - 70px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin',
            scrollbarColor: '#008bdc #f1f5f9',
            paddingRight: '4px',
          }}
        >
          <style>{`
            aside::-webkit-scrollbar {
              width: 5px;
            }
            aside::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 10px;
            }
            aside::-webkit-scrollbar-thumb {
              background: #008bdc;
              border-radius: 10px;
            }
            aside::-webkit-scrollbar-thumb:hover {
              background: #0079c0;
            }
          `}</style>
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilterOpen(false)} />
            <div className="relative bg-gray-50 w-[300px] h-full overflow-y-auto p-5 ml-auto shadow-2xl">
              <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        )}

        {/* Job Listings */}
        <main className="flex-1 min-w-0">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-600 bg-white shadow-sm"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400 bg-white rounded-xl border border-gray-200">
              <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-gray-600">No jobs match your filters</p>
              <p className="text-[13px] mt-1">Try adjusting your search or clearing filters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((job, idx) => (
                <React.Fragment key={job.id}>
                  <JobCard job={job} />
                  
                </React.Fragment>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WFHJobsPage;
