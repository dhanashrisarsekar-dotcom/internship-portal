import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search, ChevronLeft, ChevronRight, ChevronDown,
  Wallet, Briefcase, Bell, Home, Clock, Star, Filter, X, Plus, MapPin, SearchX, Calendar, Building2
} from 'lucide-react';

// ─── Sample Data ───────────────────────────────────────────────────────────────
import { jobsData } from './data/jobsData';

// ─── Company Logo Placeholder ──────────────────────────────────────────────────
const CompanyLogo = () => (
  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 flex-shrink-0 text-xl overflow-hidden">
    🏢
  </div>
);

// ─── Main Jobs Page ────────────────────────────────────────────────────────
const WFHJobsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    profile: searchParams.get('category') || "",
    location: searchParams.get('location') || "",
    wfh: searchParams.get('type') === 'wfh',
    partTime: searchParams.get('partTime') === 'true',
    salary: 0,
    experience: searchParams.get('experience') === 'Fresher' ? "0" : "",
    search: "",
  });
  
  const [sortBy, setSortBy] = useState('recent');

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
  let filtered = jobsData.filter(job => {
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

  // Apply sorting
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'applied') return (b.applicants || 0) - (a.applicants || 0);
    return 0; // Default: no sort for 'recent'
  });

  const activeTab = filters.wfh ? 'wfh' : filters.partTime ? 'partTime' : filters.experience === '0' ? 'fresher' : 'all';

  const handleTabClick = (tabId) => {
    const newFilters = { ...filters };
    if (tabId === 'all') {
      newFilters.wfh = false; newFilters.partTime = false; newFilters.experience = '';
      setSearchParams({});
    }
    if (tabId === 'wfh') {
      newFilters.wfh = true; newFilters.partTime = false; newFilters.experience = '';
      setSearchParams({ type: 'wfh' });
    }
    if (tabId === 'partTime') {
      newFilters.wfh = false; newFilters.partTime = true; newFilters.experience = '';
      setSearchParams({ partTime: 'true' });
    }
    if (tabId === 'fresher') {
      newFilters.wfh = false; newFilters.partTime = false; newFilters.experience = '0';
      setSearchParams({ experience: 'Fresher' });
    }
    setFilters(newFilters);
  };

  const getBadgeColor = (badge) => {
    if (!badge) return '';
    switch (badge.toLowerCase()) {
      case 'actively hiring': return 'bg-green-100 text-green-700';
      case 'fresher friendly': return 'bg-purple-100 text-purple-700';
      case 'part-time': return 'bg-yellow-100 text-yellow-700';
      case 'urgent': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Navbar omitted, use the App router Navbar if exists or just standard app navigation */}

      {/* ── HERO SECTION ── */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl border-white text-white font-extrabold mb-4 pt-4">Find Your Dream Job</h1>
          <p className="text-blue-100 text-xl font-medium mb-10">Explore full-time opportunities at top companies</p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by role, company, or skills..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg border-0 outline-none text-gray-800 text-lg focus:ring-4 focus:ring-blue-300 transition-shadow"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          
          {/* ── FILTER TABS ── */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto w-full md:w-auto">
            {[
              { id: 'all', label: 'All Jobs' },
              { id: 'wfh', label: 'Work from Home' },
              { id: 'partTime', label: 'Part-Time' },
              { id: 'fresher', label: 'Fresher Jobs' }
            ].map(type => (
              <button 
                key={type.id}
                onClick={() => handleTabClick(type.id)}
                className={`flex-1 md:flex-none uppercase text-xs tracking-wider font-bold px-6 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === type.id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 bg-white border border-transparent hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* ── SORT DROPDOWN ── */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Sort By:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2.5 border border-gray-200 rounded-xl outline-none font-medium text-gray-700 bg-white cursor-pointer hover:border-blue-300 w-full md:w-auto text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="applied">Most Applied</option>
            </select>
          </div>
        </div>

        {/* ── JOB CARDS ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SearchX className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No jobs found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => handleTabClick('all')}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <div key={job.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 p-6 flex flex-col h-full group">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <CompanyLogo />
                    <span className="text-sm font-medium text-gray-500">{job.company}</span>
                  </div>
                  {job.activelyHiring && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeColor('actively hiring')}`}>
                      Actively Hiring
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight mb-4">{job.title}</h2>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Salary</span>
                    <span className="text-lg font-bold text-blue-600 block leading-none">{job.salary}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Experience</span>
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-1">{job.experience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</span>
                    <span className="text-sm font-bold text-gray-700">{job.location || job.companyLocation || 'Remote'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><Building2 className="w-3 h-3"/> Mode</span>
                    <span className="text-sm font-bold text-gray-700 capitalize">{job.type === 'wfh' ? 'Work from home' : 'On-site'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-[11px] font-bold">+{job.skills.length - 3}</span>
                  ) || (job.tags && job.tags.slice(0, 2).map((t, i) => (
                    <span key={'tag'+i} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-[11px] font-bold">
                      {t}
                    </span>
                  )))}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 font-bold mb-6 mt-auto">
                    <span>👥 {(job.applicants || Math.floor(Math.random() * 500)).toLocaleString()} Applied</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {job.postedAt || 'Recently'}</span>
                </div>

                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
                  <Link to={`/jobs/detail/${job.id}`} className="flex-1 py-3 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-blue-600 hover:text-blue-600 transition-colors">
                    View Details
                  </Link>
                  <Link to={`/jobs/apply/${job.id}`} className="flex-1 py-3 text-center rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link 
        to="/jobs" 
        className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center gap-2 px-5 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform z-50 text-sm"
      >
        <Plus className="w-5 h-5" /> Post a Job
      </Link>
    </div>
  );
};

export default WFHJobsPage;
