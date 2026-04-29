import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, SearchX, Plus, Sparkles, Building2, Calendar, Banknote } from 'lucide-react';
import { internships as rawInternships, internshipTypes } from '../data/internships';

export default function InternshipsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParam = searchParams.get('type') || 'all';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('applied'); // applied, deadline, stipend
  const [filteredInternships, setFilteredInternships] = useState(rawInternships);

  useEffect(() => {
    let result = rawInternships;

    // Filter by Type
    if (typeParam !== 'all') {
      result = result.filter(h => h.type === typeParam || h.mode === typeParam);
    }

    // Filter by Search
    if (searchTerm.trim() !== '') {
      result = result.filter(h => 
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.skills.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'applied') {
        return (b.applicants || 0) - (a.applicants || 0);
      }
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === 'stipend') {
        // Extract numeric value from stipend string (e.g., "₹80,000/month" -> 80000)
        const getStipendNum = (str) => {
          const matched = str.replace(/,/g, '').match(/\d+/);
          return matched ? parseInt(matched[0], 10) : 0;
        };
        return getStipendNum(b.stipend) - getStipendNum(a.stipend);
      }
      return 0;
    });

    setFilteredInternships(result);
  }, [typeParam, searchTerm, sortBy, rawInternships.length]); // rawInternships.length added to re-render if a new one is posted

  const handleTypeClick = (val) => {
    if (val === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ type: val });
    }
  };

  const getBadgeColor = (badge) => {
    if (!badge) return '';
    switch (badge.toLowerCase()) {
      case 'actively hiring': return 'bg-green-100 text-green-700';
      case 'top company': return 'bg-purple-100 text-purple-700';
      case 'part-time': return 'bg-yellow-100 text-yellow-700';
      case 'mba preferred': return 'bg-blue-100 text-blue-700';
      case 'high openings': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="bg-[#008bdc] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl border-white text-white font-extrabold mb-4 pt-4">Find Your Perfect Internship</h1>
          <p className="text-blue-100 text-xl font-medium mb-10"><Sparkles className="inline-block w-5 h-5 mr-2 -mt-1"/>Gain real experience at top companies</p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by role, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl shadow-lg border-0 outline-none text-gray-800 text-lg focus:ring-4 focus:ring-blue-300 transition-shadow"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          
          {/* Filters */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto w-full md:w-auto">
            {internshipTypes.map(type => (
              <button 
                key={type.value}
                onClick={() => handleTypeClick(type.value)}
                className={`flex-1 md:flex-none uppercase text-xs tracking-wider font-bold px-6 py-2.5 rounded-lg transition-all capitalize whitespace-nowrap ${
                  typeParam === type.value ? 'bg-[#008bdc] text-white shadow-sm' : 'text-gray-500 hover:bg-blue-50 hover:text-[#008bdc]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Sort By:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2.5 border border-gray-200 rounded-xl outline-none font-medium text-gray-700 bg-white cursor-pointer hover:border-blue-300 w-full md:w-auto"
            >
              <option value="applied">Most Applied</option>
              <option value="deadline">Deadline Soon</option>
              <option value="stipend">Stipend (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {filteredInternships.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SearchX className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No internships found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => { setSearchTerm(''); setSearchParams({}); }}
              className="mt-6 text-[#008bdc] font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <div key={internship.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col h-full group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{internship.logo}</span>
                    <span className="text-sm font-medium text-gray-500">{internship.company}</span>
                  </div>
                  {internship.badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeColor(internship.badge)}`}>
                      {internship.badge}
                    </span>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#008bdc] transition-colors leading-tight mb-4">{internship.title}</h2>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Stipend</span>
                    <span className="text-lg font-black text-[#008bdc] block leading-none">{internship.stipend}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Duration</span>
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-1">{internship.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</span>
                    <span className="text-sm font-bold text-gray-700">{internship.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><Building2 className="w-3 h-3"/> Mode</span>
                    <span className="text-sm font-bold text-gray-700 capitalize">{internship.mode.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {internship.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="bg-blue-50 text-[#008bdc] px-2.5 py-1 rounded-md text-[11px] font-bold">
                      {skill}
                    </span>
                  ))}
                  {internship.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-[11px] font-bold">+{internship.skills.length - 3}</span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400 font-bold mb-6 mt-auto">
                    <span>👥 {(internship.applicants || 0).toLocaleString()} Applied</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> By {new Date(internship.deadline).toLocaleDateString('en-GB')}</span>
                </div>

                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
                  <Link to={`/internships/${internship.id}`} className="flex-1 py-3 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-[#008bdc] hover:text-[#008bdc] transition-colors">
                    View Details
                  </Link>
                  <Link to={`/internships/${internship.id}/apply`} className="flex-1 py-3 text-center rounded-xl bg-[#008bdc] text-white font-bold shadow-md shadow-sky-200 hover:bg-blue-700 transition-colors">
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
        to="/internships/post" 
        className="fixed bottom-10 right-10 bg-slate-900 text-white shadow-2xl shadow-slate-400/50 flex items-center gap-2 px-6 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform z-50 hover:bg-slate-800 border border-slate-700"
      >
        <Plus className="w-5 h-5" /> Post Internship
      </Link>
    </div>
  );
};


