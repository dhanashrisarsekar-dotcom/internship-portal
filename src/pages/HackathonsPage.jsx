import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, Users, Clock, Calendar, SearchX, Plus, Sparkles } from 'lucide-react';
import { hackathons as rawHackathons, categories } from '../data/hackathons';

const HackathonsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('registered'); // registered, deadline, prize
  const [filteredHackathons, setFilteredHackathons] = useState(rawHackathons);

  useEffect(() => {
    let result = rawHackathons;

    // Filter by Category
    if (categoryParam !== 'all') {
      result = result.filter(h => h.category.toLowerCase() === categoryParam.toLowerCase());
    }

    // Filter by Search
    if (searchTerm.trim() !== '') {
      result = result.filter(h => 
        h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        h.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'registered') {
        return (b.registered || 0) - (a.registered || 0);
      }
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === 'prize') {
        // Extract numeric value from prize string (e.g., "₹5,00,000" -> 500000, "$10,000" -> 10000)
        const getPrizeNum = (str) => {
          const matched = str.replace(/,/g, '').match(/\d+/);
          return matched ? parseInt(matched[0], 10) : 0;
        };
        return getPrizeNum(b.prize) - getPrizeNum(a.prize);
      }
      return 0;
    });

    setFilteredHackathons(result);
  }, [categoryParam, searchTerm, sortBy]);

  const handleCategoryClick = (cat) => {
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const getBadgeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'local': return 'bg-green-100 text-green-700';
      case 'national': return 'bg-blue-100 text-blue-700';
      case 'international': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Banner */}
      <div className="bg-[#008bdc] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl border-white text-white font-extrabold mb-4 pt-4">Hackathons</h1>
          <p className="text-blue-100 text-xl font-medium mb-10"><Sparkles className="inline-block w-5 h-5 mr-2 -mt-1"/>Compete. Build. Win.</p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by title, organizer, or skill tag..."
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
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-1 md:flex-none uppercase text-xs tracking-wider font-bold px-6 py-2.5 rounded-lg transition-all capitalize whitespace-nowrap ${
                  categoryParam === cat ? 'bg-[#008bdc] text-white shadow-sm' : 'text-gray-500 hover:bg-blue-50 hover:text-[#008bdc]'
                }`}
              >
                {cat}
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
              <option value="registered">Most Registered</option>
              <option value="deadline">Deadline Soon</option>
              <option value="prize">Prize (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {filteredHackathons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <SearchX className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700">No hackathons found</h3>
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
            {filteredHackathons.map((hack) => (
              <div key={hack.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col h-full group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeColor(hack.category)}`}>
                    {hack.category}
                  </span>
                  <div className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 flex items-center gap-1">
                    👥 {(hack.registered || 0).toLocaleString()}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#008bdc] transition-colors leading-tight mb-2">{hack.title}</h2>
                <p className="text-sm font-medium text-gray-500 mb-5">By {hack.organizer}</p>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Prize Pool</span>
                    <span className="text-lg font-black text-emerald-600 block leading-none">{hack.prize}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Deadline</span>
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400"/> {new Date(hack.deadline).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Mode</span>
                    <span className="text-sm font-bold text-gray-700">{hack.mode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Duration</span>
                    <span className="text-sm font-bold text-gray-700">{hack.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {hack.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="bg-blue-50 text-[#008bdc] px-2.5 py-1 rounded-md text-[11px] font-bold">
                      #{tag}
                    </span>
                  ))}
                  {hack.tags.length > 3 && (
                    <span className="bg-gray-100 text-gray-500 px-2py-1 rounded-md text-[11px] font-bold">+{hack.tags.length - 3}</span>
                  )}
                </div>

                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
                  <Link to={`/hackathons/${hack.id}`} className="flex-1 py-3 text-center rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:border-[#008bdc] hover:text-[#008bdc] transition-colors">
                    Know More
                  </Link>
                  <Link to={`/hackathons/${hack.id}/apply`} className="flex-1 py-3 text-center rounded-xl bg-[#008bdc] text-white font-bold shadow-md shadow-sky-200 hover:bg-blue-700 transition-colors">
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
        to="/hackathons/create" 
        className="fixed bottom-10 right-10 bg-slate-900 text-white shadow-2xl shadow-slate-400/50 flex items-center gap-2 px-6 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform z-50 hover:bg-slate-800 border border-slate-700"
      >
        <Plus className="w-5 h-5" /> Create Hackathon
      </Link>
    </div>
  );
};

export default HackathonsPage;
